var fail = require("./fail.js")
var R = require("ramda")
var runTest = require("./run-test.js")
var settings = require("./settings.js")

var queue = []

var add = function(test){
  queue.push(test)
}

var runNext = function(){
  if (queue.length > 0){
    var nextTest = queue.splice(0,1)[0]

    var promise = runTest(nextTest)
    promise.then(runNext)
      .catch(runNext)

    watchTimeout(nextTest, promise)
    return null
  }
}

var watchTimeout = function(test, promise){
  var timeout = test.settings.timeout || settings.testTimeout
  setTimeout(function(){
    var hasOk = R.has("ok")
    if (!hasOk(test) || test.ok === undefined){
      test.ok = false
      var desc = `test timed out after ${timeout}ms`
      var actual = "test did not finish in time"
      var expected = `test should call end() or return a promise within ${timeout}ms`
      fail(test, desc, actual, expected)
      promise.cancel()
      runNext()
    }
  }, timeout)
}

var start = function(){
  runNext()
}

module.exports = {
  add,
  start
}
