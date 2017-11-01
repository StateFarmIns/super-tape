var diff = require("./diff.js")
var through = require("through")
var util = require("util")

var stream = through()

var diffableOperators = [
  "equal",
  "deepEqual",
  "deepLooseEqual"
]

var comment = function(text){
  write(`# ${text}`)
}

var done = function(results){
  write("")
  write(`1..${results.attemptedAssertCount}`)
  write(`# tests   ${results.attemptedTestCount}`)
  write(`# pass    ${results.passedTestCount}`)
  write(`# fail    ${results.failedTestCount}`)
  write(`# skip    ${results.skippedTestCount}`)
  write("")
  write(`# asserts ${results.attemptedAssertCount}`)
  write(`# pass    ${results.passedAssertCount}`)
  write(`# fail    ${results.failedAssertCount}`)
  write("")
  if (results.ok){
    write("\n# ok")
  } else {
    write("\n# not ok")
  }
}

var error = function(ex){
  write(`not ok - the test threw an error`)
  write("  ---")
  write(`  ${util.inspect(ex)}`)
  write("  ...")
}

var notOk = function(assert){
  var expected = util.inspect(assert.expected)
  var actual = util.inspect(assert.actual)
  var coloredDiff = diff(expected, actual)

  write(`not ok ${assert.id} - ${assert.desc}`)
  write("  ---")
  write(`  expected: ${expected}`)
  write(`    actual: ${actual}`)
  if (assert.operator){
    if (diffableOperators.includes(assert.operator)){
      write(`      diff: ${coloredDiff}`)
    }
    write(`  operator: ${assert.operator}`)
  }
  write("  ...")
}

var ok = function(assert){
  write(`ok ${assert.id} - ${assert.desc}`)
}

var pipe = function(listener){
  stream.pipe(listener)
}

var test = function(test){
  write(`# ${test.name}`)
}

var version = function(){
  write("TAP version 13")
}

var write = function(msg){
  stream.queue(`${msg}\n`)
}

module.exports = {
  comment,
  done,
  error,
  notOk,
  ok,
  pipe,
  test,
  version
}
