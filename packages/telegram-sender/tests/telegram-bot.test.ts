import TelegramBot from "../src/telegram-bot"


const mockGetChatAdministrators: jest.Mock = jest.fn()
const mockSendMessage: jest.Mock = jest.fn()

jest.mock("telegraf", () => jest.fn().mockImplementation(() => ({
    telegram: {
        sendMessage: mockSendMessage,
        getChatAdministrators: mockGetChatAdministrators
    }
})))


const bot: TelegramBot = new TelegramBot("BOT_TOKEN")


describe("TelegramBot: checkAccess", () => {

    beforeEach(() => {

        jest.clearAllMocks()

    })

    test("should be defined", () => {

        expect(bot.checkAccess).toBeDefined()

    })

    test("should be called one time", () => {

        bot.checkAccess("CHANNEL")
        expect(mockGetChatAdministrators).toBeCalledTimes(1)

    })

})


describe("TelegramBot: send", () => {

    beforeEach(() => {

        jest.clearAllMocks()

    })

    test("should be defined", () => {

        expect(bot.send).toBeDefined()

    })

    test("should be called one time", () => {

        bot.send("CHANNEL", "MESSAGE")
        expect(mockSendMessage).toBeCalledTimes(1)

    })

})
