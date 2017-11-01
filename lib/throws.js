var doAssert = require("./do-assert.js")

module.exports = function(test, func, desc){
  var operator = "throws"
  var type = (typeof func)
  if (type != "function"){
    var message = `
      t.throws expects a function that throws an error as the first argument.
      Instead it was passed a ${type}: "${func}".
    `
    throw new Error(message)
  }

  var result = false
  var actual = "no exception thrown"
  try {
    func()
  } catch (ex){
    actual = ex
    result = true
  }
  var expected = "an exception to be thrown"
  doAssert({
    actual,
    desc,
    expected,
    operator,
    result,
    test
  })
}
