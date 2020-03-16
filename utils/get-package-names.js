const fs = require("fs-extra")
const getPackagesPath = require("./get-packages-path")


/**
 * Gets package names.
 *
 * @returns {Array<string>} Package names.
 * @example
 * ```javascript
 * getPackageNames()
 * // => ["app", ...packages]
 * ```
 */
function getPackageNames() {

    const packagesPath = getPackagesPath()

    if (fs.existsSync(packagesPath)) {

        const filesAndFolders = fs.readdirSync(packagesPath)
        const folders = filesAndFolders.filter(f => fs.statSync(getPackagesPath(f)).isDirectory())

        const packages = folders.filter(folder => {

            const packageJsonExists = fs.existsSync(getPackagesPath(folder, "package.json"))
            const indexTsExists = fs.existsSync(getPackagesPath(folder, "src/index.ts"))

            return packageJsonExists && indexTsExists

        })

        return packages

    }

    return []

}


module.exports = getPackageNames
