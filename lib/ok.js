var doAssert = require("./do-assert.js")

module.exports = function(test, actual, desc){
  var result = actual
  var expected = "a truthy value"
  var operator = "ok"
  doAssert({
    actual,
    desc,
    expected,
    operator,
    result,
    test
  })
}
