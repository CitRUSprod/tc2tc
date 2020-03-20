import _ from "lodash"
import TwitchChatReceiver, { IMessage } from "@tc2tc/twitch-chat-receiver"
import TelegramSender from "@tc2tc/telegram-sender"
import getConfig, { IConfig } from "./get-config"


interface ITelegramConnection {
    channel: string
    botToken: string
}


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

            for (const tg of inaccessible) {

                console.log(`  Bot: ${tg.botToken.slice(0, 9)} | Channel: ${tg.channel}`)

            }

            return

        }

        await receiver.launch()

        receiver.onMessage((msg: IMessage) => {

            const channel: string | undefined = _.find(config.channelPairs, { twitch: msg.channel })?.telegram

            if (channel !== undefined) {

                console.log(msg.text)
                sender.send(channel, msg.text)

            }

        })

    })
    .catch((err: Error) => {

        console.error(err.message)

    })
