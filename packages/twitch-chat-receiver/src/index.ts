import { ChatClient, PrivmsgMessage } from "dank-twitch-irc"

export interface IMessage {
    time: number
    channel: string
    username: string
    text: string
}

/**
 * Twitch chat receiver.
 */
export default class TwitchChatReceiver {

    private readonly client: ChatClient

    /**
     * Creates an instance of TwitchChatReceiver.
     *
     * @param channels - Twitch channel names.
     * @memberof TwitchChatReceiver
     * @example
     * ```javascript
     * const receiver = new TwitchChatReceiver("forsen")
     * ```
     */
    public constructor(...channels: Array<string>) {

        this.client = new ChatClient()

        this.client.on("ready", () => {

            for (const channel of channels) {

                this.client.join(channel)

            }

        })

    }

    /**
     * Launches twitch chat client.
     *
     * @memberof TwitchChatReceiver
     * @example
     * ```javascript
     * const receiver = new TwitchChatReceiver("forsen")
     * await receiver.launch()
     * ```
     */
    public async launch(): Promise<void> {

        await this.client.connect()

    }

    /**
     * Calls a listener on a message.
     *
     * @param listener - The function that is called when a message is received.
     * @memberof TwitchChatReceiver
     * @example
     * ```javascript
     * const receiver = new TwitchChatReceiver("forsen")
     * await receiver.launch()
     *
     * receiver.onMessage(msg => {
     *     console.log(msg)
     * })
     * ```
     */
    public onMessage(listener: (message: IMessage) => void): void {

        this.client.on("PRIVMSG", (msg: PrivmsgMessage) => {

            const message: IMessage = {
                time: Date.now(),
                channel: msg.channelName,
                username: msg.displayName,
                text: msg.messageText
            }
            listener(message)

        })

    }

}
