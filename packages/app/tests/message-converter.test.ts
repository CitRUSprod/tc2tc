import MessageConverter from "../src/message-converter"


const converter: MessageConverter = new MessageConverter({
    time: 0,
    channel: "forsen",
    username: "pepega",
    text: "Hello world"
})


describe("MessageConverter: getForConsole", () => {

    test("should be defined", () => {

        expect(converter.getForConsole).toBeDefined()

    })

    test("should return console message", () => {

        expect(converter.getForConsole()).toBe("[01.01.1970] [03:00:00] <pepega>: Hello world")

    })

})


describe("MessageConverter: getForTelegram", () => {

    test("should be defined", () => {

        expect(converter.getForTelegram).toBeDefined()

    })

    test("should return telegram message", () => {

        expect(converter.getForTelegram()).toBe("<code>01.01.1970 03:00:00</code>\n<b>&lt;pepega&gt;:</b> Hello world")

    })

})
