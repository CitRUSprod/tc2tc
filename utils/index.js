const _ = require("lodash")
const fs = require("fs-extra")


const modules = _.without(fs.readdirSync(__dirname), "index.js")


const utils = {}

for (const m of modules) {

    const util = _.camelCase(m.replace(/\.js$/, ""))
    utils[util] = require(`./${m}`)

}


module.exports = utils
