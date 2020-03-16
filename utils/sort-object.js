/**
 * Sorts keys in JavaScript object.
 *
 * @param {object} obj - JavaScript object.
 * @returns {object} Sorted JavaScript object.
 * @example
 * ```javascript
 * sortObject({ b: 2, c: 3, a: 1 })
 * // => { a: 1, b: 2, c: 3 }
 * ```
 */
function sortObject(obj) {

    return Object.keys(obj).sort()
        .reduce((result, key) => {

            result[key] = obj[key]

            return result

        }, {})

}


module.exports = sortObject
