var deepEqual = require("deep-equal")
var doAssert = require("./do-assert.js")

module.exports = function(test, actual, expected, desc){
  var result = ! deepEqual(actual, expected, {strict: false})
  var operator = "notDeepLooseEqual"
  doAssert({
    actual,
    desc,
    expected,
    operator,
    result,
    test
  })
}
