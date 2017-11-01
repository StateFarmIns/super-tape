var doAssert = require("./do-assert.js")

module.exports = function(test, actual, expected, desc){
  var result = (actual == expected)
  var operator = "equal"
  doAssert({
    actual,
    desc,
    expected,
    operator,
    result,
    test
  })
}
