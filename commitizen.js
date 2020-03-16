const { Separator } = require("inquirer")
const types = require("./commit.types.json")
const { convertCommitTypes, getPackageNames } = require("./utils")


module.exports = {

    types: convertCommitTypes(types),

    scopes: [
        ...getPackageNames(),
        new Separator(),
        {
            name: "empty",
            value: false
        }
    ],

    allowBreakingChanges: [
        "feat",
        "fix"
    ],

    skipQuestions: [
        "body",
        "footer"
    ],

    upperCaseSubject: true

}
