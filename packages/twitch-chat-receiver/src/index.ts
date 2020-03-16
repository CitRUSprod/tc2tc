import ChatClient from "twitch-chat-client"


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

        this.client = new ChatClient(undefined)

        for (const channel of channels) {

            this.client.onRegister(() => this.client.join(channel))

        }

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

        this.client.onPrivmsg((channel: string, username: string, text: string) => {

            const message: IMessage = {
                time: Date.now(),
                channel: channel.slice(1),
                username,
                text
            }
            listener(message)

        })

    }

}
