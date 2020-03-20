import Queue from "../src/queue"


const queue: Queue = new Queue()


describe("Queue: add", () => {

    beforeEach(() => {

        jest.clearAllMocks()

    })

    test("should be defined", () => {

        expect(queue.add).toBeDefined()

    })

})
