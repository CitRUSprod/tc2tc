const _ = require("lodash")
const fs = require("fs-extra")


/**
 * Saves file.
 *
 * @param {string} path - File path.
 * @param {Array<string>} content - File content.
 * @example
 * ```javascript
 * saveFile("index.js", [
 *     "console.log(1)",
 *     "console.log(2)"
 * ])
 * // File saved
 * ```
 */
function saveFile(path, content) {

    const lines = [...content]

    if (_.last(lines) !== "") {

        lines.push("")

    }

    const file = lines.join("\n")
    fs.outputFileSync(path, file)

}


module.exports = saveFile
