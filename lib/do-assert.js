var assertError = require("./assert-error.js")
var id = require("./id.js")
var log = require("./log.js")

module.exports = function(args){
  var assert = {
    actual: args.actual,
    expected: args.expected,
    desc: args.desc,
    id: id.next(),
    operator: args.operator
  }
  args.test.asserts.push(assert)
  if (args.result){
    assert.ok = true
    log.ok(assert)
  } else {
    assert.ok = false
    assert.error = assertError(args.expected, args.actual, args.desc)
    log.notOk(assert)
    throw assert.error
  }
}
