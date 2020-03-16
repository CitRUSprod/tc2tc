const { runCommand } = require("../utils")
const { name } = require("../package.json")


const [
    packageName,
    ...args
] = process.argv.slice(2)


const fullName = `@${name}/${packageName}`
const command = `yarn workspace ${fullName} ${args.join(" ")}`


runCommand(command)
