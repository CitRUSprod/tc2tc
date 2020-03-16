const { execSync } = require("child_process")


/**
 * Runs command.
 *
 * @param {string} command - Command for execute.
 * @example
 * ```javascript
 * runCommand("git init")
 * ```
 */
function runCommand(command) {

    try {

        execSync(command, { stdio: "inherit" })

    } catch {}

}


module.exports = runCommand
