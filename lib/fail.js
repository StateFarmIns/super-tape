var assertError = require("./assert-error.js")
var id = require("./id.js")
var log = require("./log.js")

module.exports = function(test, desc="the test failed", actual="failure", expected="success"){
  var assert = {
    actual,
    expected,
    desc,
    id: id.next(),
    operator: "fail"
  }
  test.asserts = test.asserts || []
  test.asserts.push(assert)
  assert.ok = false
  assert.error = assertError(assert.expected, assert.actual, desc)
  log.notOk(assert)
}
