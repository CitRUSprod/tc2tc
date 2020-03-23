import { Agent } from "https"
import Telegraf, { ContextMessageUpdate } from "telegraf"
import { HttpsProxyAgent } from "https-proxy-agent"


interface IDelays {
    [channel: string]: Promise<any>
}


/**
 * Waits for the specified time.
 *
 * @param ms - Delay.
 * @returns Void.
 * @example
 * ```javascript
 * await delay(5000)
 * ```
 */
function delay(ms: number): Promise<void> {

    return new Promise((r: Function) => setTimeout(r, ms))

}


/**
 * Telegram bot.
 */
export default class TelegramBot {

    private readonly bot: Telegraf<ContextMessageUpdate>
    private readonly delays: IDelays = {}

    /**
     * Creates an instance of TelegramBot.
     *
     * @param botToken - Telegram bot token.
     * @param [proxy] - HTTPS proxy.
     * @memberof TelegramBot
     * @example
     * ```javascript
     * const bot = new TelegramBot("BOT_TOKEN")
     * ```
     */
    public constructor(botToken: string, proxy?: string) {

        if (proxy === undefined) {

            this.bot = new Telegraf(botToken)

        } else {

            const agent: Agent = new HttpsProxyAgent(`http://${proxy}`) as any as Agent
            this.bot = new Telegraf(botToken, { telegram: { agent } })

        }

    }

    /**
     * Checks channel access.
     *
     * @param channel - Telegram channel.
     * @returns Access state.
     * @memberof TelegramBot
     * @example
     * ```javascript
     * const bot = new TelegramBot("BOT_TOKEN")
     * const success = await bot.checkAccess("CHANNEL")
     * ```
     */
    public async checkAccess(channel: string): Promise<boolean> {

        try {

            await this.bot.telegram.getChatAdministrators(`@${channel}`)

            return true

        } catch {

            return false

        }

    }

    /**
     * Sends message to telegram channel.
     *
     * @param channel - Telegram channel.
     * @param message - Message to send.
     * @memberof TelegramBot
     * @example
     * ```javascript
     * const bot = new TelegramBot("BOT_TOKEN")
     * await bot.send("CHANNEL", "Hello world")
     * ```
     */
    public async send(channel: string, message: string): Promise<void> {

        if (this.delays[channel] !== undefined) {

            await this.delays[channel]

        }

        try {

            await this.bot.telegram.sendMessage(`@${channel}`, message, { parse_mode: "HTML" })
            this.delays[channel] = delay(3000)

        } catch {

            await delay(3000)
            await this.send(channel, message)

        }

    }

}
