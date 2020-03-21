import moment, { Moment } from "moment"
import { IMessage } from "@tc2tc/twitch-chat-receiver"


/**
 * The converter of Twitch messages.
 */
export default class MessageConverter {

    private readonly date: string
    private readonly time: string
    private readonly username: string
    private readonly text: string

    /**
     * Creates an instance of MessageConverter.
     *
     * @param message - Twitch message.
     * @param dateFormat - Format of date.
     * @param timeFormat - Format of time.
     * @memberof MessageConverter
     * @example
     * ```javascript
     * const converter = new MessageConverter(msg)
     * ```
     */
    public constructor(message: IMessage, dateFormat: string = "DD.MM.YYYY", timeFormat: string = "HH:mm:ss") {

        const m: Moment = moment(message.time)

        this.date = m.format(dateFormat)
        this.time = m.format(timeFormat)
        this.username = message.username
        this.text = message.text

    }

    /**
     * Gets message for console.
     *
     * @returns Message for console.
     * @memberof MessageConverter
     * @example
     * ```javascript
     * const converter = new MessageConverter(msg)
     * const consoleMessage = converter.getConsole()
     * ```
     */
    public getForConsole(): string {

        const msg: string = `[${this.date}] [${this.time}] <${this.username}>: ${this.text}`

        return msg

    }

    /**
     * Gets message for telegram.
     *
     * @returns Message for telegram.
     * @memberof MessageConverter
     * @example
     * ```javascript
     * const converter = new MessageConverter(msg)
     * const telegramMessage = converter.getTelegram()
     * ```
     */
    public getForTelegram(): string {

        const textForHtml: string = this.text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")

        const textWithHighlightedNames: string = textForHtml.replace(/@\w*/gi, (match: string) => {

            const isName: boolean = !(/^https?$/i).test(match)

            if (isName) {

                return `<code>${match}</code>`

            }

            return match

        })

        const msg: string = `<code>${this.date} ${this.time}</code>\n<b>&lt;${this.username}&gt;:</b> ${textWithHighlightedNames}`

        return msg

    }

}
