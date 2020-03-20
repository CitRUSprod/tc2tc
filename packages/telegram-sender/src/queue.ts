type AsyncFunction = () => Promise<any>


/**
 * Function queue.
 */
class Queue {

    private readonly functions: Array<AsyncFunction> = []
    private launched: boolean = false

    /**
     * Adds function to queue.
     *
     * @param fn - Async function.
     * @memberof Queue
     * @example
     * ```javascript
     * const queue = new Queue()
     * queue.add(() => new Promise(resolve => {
     *     setTimeout(resolve, 1000)
     * }))
     * ```
     */
    public add(fn: AsyncFunction): void {

        this.functions.push(fn)

        if (!this.launched) {

            this.launched = true
            this.run()

        }

    }

    /**
     * Runs function queue.
     *
     * @memberof Queue
     * @example
     * ```javascript
     * this.run()
     * ```
     */
    private async run(): Promise<void> {

        const fn: AsyncFunction | undefined = this.functions.shift()

        if (fn !== undefined) {

            await fn()

        }

        if (this.functions.length > 0) {

            await this.run()

        } else {

            this.launched = false

        }

    }

}


export default Queue
