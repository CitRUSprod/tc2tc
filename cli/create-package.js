const _ = require("lodash")
const fs = require("fs-extra")
const { getPackagesPath, runCommand, saveFile, saveJson } = require("../utils")
const { author, license, name } = require("../package.json")
const { version } = require("../lerna.json")


const packageNames = process.argv.slice(2).map(n => _.kebabCase(n))


for (const packageName of packageNames) {

    if (fs.existsSync(getPackagesPath(packageName))) {

        console.log(`The ${packageName} package already exists.`)

        continue

    }

    const fullName = `@${name}/${packageName}`
    const packageNameInCamelCase = _.camelCase(packageName)

    const packageJson = {
        name: fullName,
        version,
        main: "dist/index.js",
        types: "dist/index.d.ts",
        author,
        license,
        scripts: { test: "jest --colors" },
        jest: { preset: "ts-jest" }
    }

    const indexTs = [
        "/**",
        " * Logs package name.",
        " *",
        " * @example",
        " * ```javascript",
        ` * ${packageNameInCamelCase}()`,
        ` * // Console output: "Package: ${fullName}"`,
        " * ```",
        " */",
        `function ${packageNameInCamelCase}(): void {`,
        "",
        `    console.log("Package: ${fullName}")`,
        "",
        "}",
        "",
        "",
        `export default ${packageNameInCamelCase}`
    ]

    const indexTestTs = [
        `import ${packageNameInCamelCase} from "../src"`,
        "",
        "",
        `describe("${packageName}", () => {`,
        "",
        `    test("should log package name", () => {`,
        "",
        "        console.log = jest.fn()",
        `        ${packageNameInCamelCase}()`,
        `        expect(console.log).toHaveBeenCalledWith("Package: ${fullName}")`,
        "",
        "    })",
        "",
        "})"
    ]

    saveJson(getPackagesPath(packageName, "package.json"), packageJson)
    saveFile(getPackagesPath(packageName, "src/index.ts"), indexTs)
    saveFile(getPackagesPath(packageName, "tests/index.test.ts"), indexTestTs)

    console.log(`The ${packageName} package was successfully created.`)

}


console.log("Creating symlinks...")
runCommand("yarn")
console.log("Symlinks were successfully created.")
