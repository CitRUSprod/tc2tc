import TwitchChatReceiver from "@tc2tc/twitch-chat-receiver"


const mockConnect: jest.Mock = jest.fn()
const mockOnPrivmsg: jest.Mock = jest.fn()

jest.mock("twitch-chat-client", () => jest.fn().mockImplementation(() => ({
    onRegister: jest.fn(),
    connect: mockConnect,
    onPrivmsg: mockOnPrivmsg
})))


const receiver: TwitchChatReceiver = new TwitchChatReceiver("forsen")


describe("TwitchChatReceiver: launch", () => {

    beforeEach(() => {

        jest.clearAllMocks()

    })


    test("should be defined", () => {

        expect(receiver.launch).toBeDefined()

    })

    test("should be called one time", () => {

        receiver.launch()
        expect(mockConnect).toBeCalledTimes(1)

    })

})


describe("TwitchChatReceiver: onMessage", () => {

    beforeEach(() => {

        jest.clearAllMocks()

    })

    test("should be defined", () => {

        expect(receiver.onMessage).toBeDefined()

    })

    test("should be called one time", () => {

        receiver.onMessage(jest.fn())
        expect(mockOnPrivmsg).toBeCalledTimes(1)

    })

})
