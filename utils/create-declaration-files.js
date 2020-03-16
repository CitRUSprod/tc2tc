const ts = require("typescript")
const fs = require("fs-extra")
const getPackageNames = require("./get-package-names")
const getPackagesPath = require("./get-packages-path")


/**
 * Creates d.ts files.
 *
 * @returns {"created" | "updated" | undefined} Declarations creation status.
 * @example
 * ```javascript
 * createDeclarationFiles()
 * // Declaration files created
 * ```
 */
function createDeclarationFiles() {

    const packageNames = getPackageNames()

    const paths = {}

    for (const name of packageNames) {

        const srcFilePath = getPackagesPath(name, "src/index.ts").replace(/\\/g, "/")
        const distFilePath = getPackagesPath(name, "dist/index.d.ts").replace(/\\/g, "/")

        paths[srcFilePath] = distFilePath

    }

    const options = {
        declaration: true,
        emitDeclarationOnly: true
    }

    let status

    const host = ts.createCompilerHost(options)

    host.writeFile = (filePath, content) => {

        const srcFilePath = filePath.replace(/\.d\.ts$/, ".ts")
        const distFilePath = paths[srcFilePath]

        if (distFilePath !== undefined) {

            if (fs.existsSync(distFilePath)) {

                const file = fs.readFileSync(distFilePath, "utf8")

                if (file !== content) {

                    if (status === undefined) {

                        status = "updated"

                    }

                    fs.outputFileSync(distFilePath, content)

                }

            } else {

                status = "created"
                fs.outputFileSync(distFilePath, content)

            }

        }

    }

    const program = ts.createProgram(Object.keys(paths), options, host)
    program.emit()

    return status

}


module.exports = createDeclarationFiles
