var allDone = require("./all-done.js")
var events = require("./events.js")
var exit = require("./exit.js")
var groupByOk = require("./group-by-ok.js")
var log = require("./log.js")
var R = require("ramda")

var finish = function(tests){
  if (allDone(tests)){
    events.emit("afterAll", tests)
    var grouped = groupByOk(tests)
    grouped.ok = grouped.ok || []
    grouped.not = grouped.not || []
    var results = {
      type: "done",
      tests,
      desc: getMessage(grouped.not.length),
      ok: grouped.not.length === 0,
      attemptedTestCount: tests.length,
      passedTestCount: grouped.ok.length,
      failedTestCount: grouped.not.length,
      skippedTestCount: countSkips(tests),
      attemptedAssertCount: countAsserts(tests),
      passedAssertCount: countOkAsserts(tests),
      failedAssertCount: countNotOkAsserts(tests)
    }
    log.done(results)
    exit(grouped.not.length)
  } else {
    setTimeout(R.partial(finish, [tests]), 0)
  }
}

var countSkips = function(tests){
  var isSkipped = (test) => test.skip
  var skipped = tests.filter(isSkipped).length
  return skipped
}

var countAsserts = function(tests){
  return tests.reduce(function(acc, test){
    acc += test.asserts.length
    return acc
  }, 0)
}

var countOkAsserts = function(tests){
  return tests.reduce(function(acc, test){
    acc += R.filter((assert)=>assert.ok, test.asserts).length
    return acc
  }, 0)
}

var countNotOkAsserts = function(tests){
  return tests.reduce(function(acc, test){
    acc += R.filter((assert)=> ! assert.ok, test.asserts).length
    return acc
  }, 0)
}

var getMessage = function(failureCount){
  if (failureCount > 0){
    return "there were test failures"
  }
  return "all tests passed"
}

module.exports = finish
