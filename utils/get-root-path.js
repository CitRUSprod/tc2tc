const path = require("path")


/**
 * Gets root path.
 *
 * @param {...string} pathParts - Parts of path.
 * @returns {string} Root path.
 * @example
 * ```javascript
 * getRootPath("package.json")
 * // => "[PATH]/package.json"
 * ```
 */
function getRootPath(...pathParts) {

    return path.join(__dirname, "..", ...pathParts)

}


module.exports = getRootPath
