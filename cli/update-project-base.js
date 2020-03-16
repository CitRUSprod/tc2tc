const fs = require("fs-extra")
const { getRootPath, getUpdatePath, runCommand, saveJson } = require("../utils")
const { author, license, name } = require("../package.json")
const { version } = require("../lerna.json")


const blacklistedPaths = [
    ".git",
    ".gitignore",
    "README.md",
    "LICENSE",
    "packages"
]

const updatePath = getUpdatePath()


fs.removeSync(updatePath)


runCommand(`git clone https://github.com/CitRUSprod/project-base.git "${updatePath}"`)


for (const path of blacklistedPaths) {

    fs.removeSync(getUpdatePath(path))

}


const packageJsonPath = getUpdatePath("package.json")
const packageJson = fs.readJsonSync(packageJsonPath)
packageJson.author = author
packageJson.license = license
packageJson.name = name
saveJson(packageJsonPath, packageJson)

const lernaJsonPath = getUpdatePath("lerna.json")
const lernaJson = fs.readJsonSync(lernaJsonPath)
lernaJson.version = version
saveJson(lernaJsonPath, lernaJson)


const filesAndFolders = fs.readdirSync(updatePath)

for (const f of filesAndFolders) {

    fs.removeSync(getRootPath(f))

}

fs.copySync(updatePath, getRootPath())


fs.removeSync(updatePath)


runCommand("yarn")
console.log("Project base was successfully updated.")
