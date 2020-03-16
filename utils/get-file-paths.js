const path = require("path")
const getFileTree = require("./get-file-tree")


/**
 * Gets file paths from file tree.
 *
 * @param {object} fileTree - File tree.
 * @param {string} [folderPath=.] - Folder path.
 * @returns {Array<string>} File paths.
 * @example
 * getFilePathsFromFileTree()
 * // => ["[PATH]/index.js", ...paths]
 */
function getFilePathsFromFileTree(fileTree, folderPath = ".") {

    const filePaths = []

    for (const f of fileTree) {

        const p = path.join(folderPath, f.name).replace(/\\/g, "/")

        if (f.type === "folder") {

            filePaths.push(...getFilePathsFromFileTree(f.children, p))

        } else {

            filePaths.push(p)

        }

    }

    return filePaths

}


/**
 * Gets file paths.
 *
 * @param {string} folderPath - Folder path.
 * @param {RegExp} regExpForPath - RegExp for path.
 * @returns {Array<string>} File paths.
 * @example
 * ```javascript
 * getFilePaths("[PATH]")
 * // => ["[PATH]/index.js", ...paths]
 * ```
 */
function getFilePaths(folderPath, regExpForPath) {

    const fileTree = getFileTree(folderPath)
    const filePaths = getFilePathsFromFileTree(fileTree)

    const goodPaths = filePaths.filter(p => p.match(regExpForPath))

    return goodPaths

}


module.exports = getFilePaths
