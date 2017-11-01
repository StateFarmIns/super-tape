var doAssert = require("./do-assert.js")

module.exports = function(test, actual, desc){
  var result = !actual
  var expected = "a falsey value"
  var operator = "notOk"
  doAssert({
    actual,
    desc,
    expected,
    operator,
    result,
    test
  })
}
