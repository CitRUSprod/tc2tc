const getPackageNames = require("./get-package-names")
const getPackagesPath = require("./get-packages-path")


/**
 * Gets entry for webpack.
 *
 * @param {boolean} [isDev=false] - Build type.
 * @returns {{ [package: string]: string }} Entry for webpack.
 * @example
 * ```javascript
 * getEntry(true)
 * // => { app: ["source-map-support/register", "[PATH]/packages/app/src/index.ts"], ...entries }
 * ```
 */
function getEntry(isDev = false) {

    const packageNames = getPackageNames()

    const entry = {}

    for (const name of packageNames) {

        entry[name] = [
            ...isDev ? ["source-map-support/register"] : [],
            getPackagesPath(name, "src/index.ts")
        ]

    }

    return entry

}


module.exports = getEntry
