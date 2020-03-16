const getRootPath = require("./get-root-path")


const updateDir = ".update"


/**
 * Gets update path.
 *
 * @param {...string} pathParts - Parts of path.
 * @returns {string} Update path.
 * @example
 * ```javascript
 * getUpdatePath("package.json")
 * // => "[PATH]/.update/package.json"
 * ```
 */
function getUpdatePath(...pathParts) {

    return getRootPath(updateDir, ...pathParts)

}


module.exports = getUpdatePath
