const { name } = require("./package.json")


module.exports = {
    mode: "modules",
    out: "docs",
    inputFiles: "packages",
    exclude: "**/*.test.ts",
    lernaExclude: [`@${name}/app`],
    name,
    excludePrivate: true,
    hideGenerator: true
}
