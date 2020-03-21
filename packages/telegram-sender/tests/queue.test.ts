import Queue from "../src/queue"


const queue: Queue = new Queue()


describe("Queue: add", () => {

    test("should be defined", () => {

        expect(queue.add).toBeDefined()

    })

})
