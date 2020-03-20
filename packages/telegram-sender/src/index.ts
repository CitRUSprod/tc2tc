import TelegramBot from "./telegram-bot"
import Queue from "./queue"


interface IQueues {
    [channel: string]: {
        botIndex: number
        queue: Queue
    }
}


/**
 * Telegram sender.
 */
export default class TelegramSender {

    private readonly bots: Array<TelegramBot> = []
    private readonly queues: IQueues = {}

    /**
     * Creates an instance of TelegramSender.
     *
     * @param botTokens - Telegram bot tokens.
     * @param [proxy] - HTTPS proxy.
     * @memberof TelegramSender
     * @example
     * ```javascript
     * const sender = new TelegramSender()
     * ```
     */
    public constructor(botTokens: Array<string>, proxy?: string) {

        for (const botToken of botTokens) {

            const bot: TelegramBot = new TelegramBot(botToken, proxy)
            this.bots.push(bot)

        }

    }

    /**
     * Checks channel access.
     *
     * @param channel - Telegram channel.
     * @returns Access states.
     * @memberof TelegramSender
     * @example
     * ```javascript
     * const bot = new TelegramBot("BOT_TOKEN")
     * const success = await bot.checkAccess("CHANNEL")
     * ```
     */
    public async checkAccess(channel: string): Promise<Array<boolean>> {

        const result: Array<boolean> = []

        for (const bot of this.bots) {

            const success: boolean = await bot.checkAccess(channel)
            result.push(success)

        }

        return result

    }

    /**
     * Sends message to telegram channel.
     *
     * @param channel - Telegram channel.
     * @param message - Message to send.
     * @memberof TelegramSender
     * @example
     * ```javascript
     * const bot = new TelegramBot("BOT_TOKEN")
     * await bot.send("CHANNEL", "Hello world")
     * ```
     */
    public send(channel: string, message: string): void {

        if (this.queues[channel] === undefined) {

            this.queues[channel] = {
                botIndex: 0,
                queue: new Queue()
            }

        }

        const bot: TelegramBot = this.getBot(channel)

        this.queues[channel].queue.add(async () => {

            await bot.send(channel, message)

        })

    }

    /**
     * Gets bot.
     *
     * @param channel - Telegram channel.
     * @returns Telegram bot.
     * @memberof TelegramSender
     * @example
     * ```javascript
     * const bot = this.getBot("CHANNEL")
     * ```
     */
    private getBot(channel: string): TelegramBot {

        const bot: TelegramBot = this.bots[this.queues[channel].botIndex]
        this.queues[channel].botIndex++

        if (this.queues[channel].botIndex === this.bots.length) {

            this.queues[channel].botIndex = 0

        }

        return bot

    }

}
