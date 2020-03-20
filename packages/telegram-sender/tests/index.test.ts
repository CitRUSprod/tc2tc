import TelegramSender from "../src"


const mockCheckAccess: jest.Mock = jest.fn()
const mockSend: jest.Mock = jest.fn()

jest.mock("../src/telegram-bot", () => jest.fn().mockImplementation(() => ({
    checkAccess: mockCheckAccess,
    send: mockSend
})))


const sender: TelegramSender = new TelegramSender(["BOT_TOKEN"])


describe("TelegramSender: checkAccess", () => {

    beforeEach(() => {

        jest.clearAllMocks()

    })

    test("should be defined", () => {

        expect(sender.checkAccess).toBeDefined()

    })

    test("should be called one time", () => {

        sender.checkAccess("CHANNEL")
        expect(mockCheckAccess).toBeCalledTimes(1)

    })

})


describe("TelegramSender: send", () => {

    beforeEach(() => {

        jest.clearAllMocks()

    })

    test("should be defined", () => {

        expect(sender.send).toBeDefined()

    })

    test("should be called one time", () => {

        sender.send("CHANNEL", "MESSAGE")
        expect(mockSend).toBeCalledTimes(1)

    })

})
