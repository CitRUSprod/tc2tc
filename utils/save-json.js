const fs = require("fs-extra")


/**
 * Saves JSON file.
 *
 * @param {string} path - JSON file path.
 * @param {object} json - JSON object.
 * @example
 * ```javascript
 * saveJson("test.json", {
 *     "foo": "bar"
 * })
 * // JSON file saved
 * ```
 */
function saveJson(path, json) {

    const file = `${JSON.stringify(json, null, 4)}\n`
    fs.outputFileSync(path, file)

}


module.exports = saveJson
