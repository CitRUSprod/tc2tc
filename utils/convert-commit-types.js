/**
 * Convert commit types to commitizen format.
 *
 * @param {{ [name: string]: string }} [typesObject={}] - Commit types object.
 * @returns {Array<{ name: string, value: string }>} Types in commitizen format.
 * @example
 * ```javascript
 * convertCommitTypes({ "feat": "A new feature", "fix": "A bug fix" })
 * // => [{ name: "feat: A new feature", value: "feat" }, { name: "fix:  A bug fix", value: "fix" }]
 * ```
 */
function convertCommitTypes(typesObject = {}) {

    let maxLength = 0

    for (const typeName in typesObject) {

        if (maxLength < typeName.length) {

            maxLength = typeName.length

        }

    }

    const types = []

    for (const typeName in typesObject) {

        const spacing = " ".repeat(maxLength - typeName.length)

        types.push({
            name: `${typeName}:${spacing} ${typesObject[typeName]}`,
            value: typeName
        })

    }

    return types

}


module.exports = convertCommitTypes
