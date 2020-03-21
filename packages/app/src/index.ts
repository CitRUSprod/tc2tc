import path from "path"
import _ from "lodash"
import fs from "fs-extra"
import TwitchChatReceiver, { IMessage } from "@tc2tc/twitch-chat-receiver"
import TelegramSender from "@tc2tc/telegram-sender"
import MessageConverter from "./message-converter"
import getConfig, { IConfig } from "./get-config"


interface ITelegramConnection {
    channel: string
    botToken: string
}


const { version }: { version: string } = fs.readJsonSync(path.join(process.cwd(), "lerna.json"))
console.log(`Twitch Chat to Telegram Channel (TC2TC) v${version}\n`)


getConfig()
    .then(async (config: Readonly<IConfig>) => {

        const twitchChannels: Array<string> = _.map(config.channelPairs, "twitch")
        const telegramChannels: Array<string> = _.map(config.channelPairs, "telegram")

        const receiver: TwitchChatReceiver = new TwitchChatReceiver(...twitchChannels)
        const sender: TelegramSender = new TelegramSender(config.telegramBotTokens, config.httpsProxy)

        const inaccessible: Array<ITelegramConnection> = []

        for (const telegramChannel of telegramChannels) {

            const states: Array<boolean> = await sender.checkAccess(telegramChannel)

            for (let i: number = 0; i < states.length; i++) {

                if (!states[i]) {

                    inaccessible.push({
                        channel: telegramChannel,
                        botToken: config.telegramBotTokens[i]
                    })

                }

            }

        }

        if (inaccessible.length > 0) {

            console.log("Bad connections:")

            let maxLength: number = 0

            for (const tg of inaccessible) {

                const shortToken: string = tg.botToken.split(":")[0]

                if (maxLength < shortToken.length) {

                    maxLength = shortToken.length

                }

            }

            for (const tg of inaccessible) {

                const shortToken: string = tg.botToken.split(":")[0]
                const spacing: string = " ".repeat(maxLength - shortToken.length)

                console.log(`  Bot: ${shortToken}${spacing} | Channel: ${tg.channel}`)

            }

            return

        }

        await receiver.launch()

        receiver.onMessage((msg: IMessage) => {

            const channel: string | undefined = _.find(config.channelPairs, { twitch: msg.channel })?.telegram

            if (channel !== undefined) {

                const converter: MessageConverter = new MessageConverter(msg)
                console.log(converter.getForConsole())
                sender.send(channel, converter.getForTelegram())

            }

        })

    })
    .catch((err: Error) => {

        console.error(err.message)

    })
