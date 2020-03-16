const path = require("path")
const fs = require("fs-extra")


/**
 * Gets file tree.
 *
 * @param {string} folderPath - Folder path.
 * @returns {Array<object>} - File tree.
 * @example
 * ```javascript
 * getFileTree("[PATH]")
 * // => [{...}, ...filesAndFolders]
 * ```
 */
function getFileTree(folderPath) {

    if (fs.existsSync(folderPath)) {

        const filesAndFolders = fs.readdirSync(folderPath)

        const fileTree = filesAndFolders.map(f => {

            const p = path.join(folderPath, f)
            const isFolder = fs.statSync(p).isDirectory()

            return {
                name: f,
                ...isFolder ? {
                    type: "folder",
                    children: getFileTree(p)
                } : { type: "file" }
            }

        })

        return fileTree

    }

}


module.exports = getFileTree
