const path = require("path")
const fs = require("fs-extra")
const { getFilePaths, getPackageNames, getPackagesPath, runCommand, saveJson, sortObject } = require("../utils")


const projectPath = path.join(__dirname, "..")
const projectName = path.basename(projectPath)


const mainPackageJsonPath = path.join(projectPath, "package.json")
const mainPackageJson = fs.readJsonSync(mainPackageJsonPath)
const oldProjectName = mainPackageJson.name
mainPackageJson.name = projectName
saveJson(mainPackageJsonPath, mainPackageJson)


const packageNames = getPackageNames()

for (const name of packageNames) {

    const packageJsonPath = getPackagesPath(name, "package.json")
    const packageJson = fs.readJsonSync(packageJsonPath)
    packageJson.name = `@${projectName}/${name}`

    /**
     * Changes dependencies in packages.
     *
     * @param {boolean} [isDev=false] - Dependencies type.
     * @example
     * ```javascript
     * changeDependencies()
     * // Dependencies changed
     * ```
     */
    function changeDependencies(isDev = false) {

        const dependencies = isDev ? packageJson.devDependencies : packageJson.dependencies

        if (dependencies !== undefined) {

            for (const dependency in dependencies) {

                const re = new RegExp(`^@${oldProjectName}\\/(.+)$`)
                const matchArray = dependency.match(re)

                if (matchArray !== null) {

                    const packageName = matchArray[1]
                    const version = dependencies[dependency]
                    delete dependencies[dependency]
                    dependencies[`@${projectName}/${packageName}`] = version

                }

            }

            const sortedDependencies = sortObject(dependencies)

            if (isDev) {

                packageJson.devDependencies = sortedDependencies

            } else {

                packageJson.dependencies = sortedDependencies

            }

        }

    }

    changeDependencies()
    changeDependencies(true)

    saveJson(packageJsonPath, packageJson)

    const filePaths = getFilePaths(getPackagesPath(name), /^(?!dist)[^/]+\/.+[^/]\.ts$/)

    for (const filePath of filePaths) {

        const absFilePath = getPackagesPath(name, filePath)
        const file = fs.readFileSync(absFilePath, "utf8")
        const re = new RegExp(`"@${oldProjectName}\\/(.+)"`, "g")
        const newFile = file.replace(re, `"@${projectName}/$1"`)
        fs.writeFileSync(absFilePath, newFile)

    }

}


runCommand("yarn")
console.log("The project name was successfully synchronized.")
