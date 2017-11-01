var Bluebird = require("bluebird")
var deepEqual = require("./deep-equal.js")
var deepLooseEqual = require("./deep-loose-equal.js")
var doesNotThrow = require("./does-not-throw.js")
var end = require("./end.js")
var equal = require("./equal.js")
var fail = require("./fail.js")
var log = require("./log.js")
var matcher = require("./matcher.js")
var notDeepEqual = require("./not-deep-equal.js")
var notDeepLooseEqual = require("./not-deep-loose-equal.js")
var notOk = require("./not-ok.js")
var ok = require("./ok.js")
var pass = require("./pass.js")
var tags = require("./tags.js")
var throws = require("./throws.js")

var runTest = function(test){
  return new Bluebird(function(resolve, reject){
    try {
      tags.skipCheck(test)
      matcher.check(test)
      if (test.skip === true){
        log.test(test)
        pass(test, `# skip - ${test.skipReason || ""}`)
        test.ok = true
        return resolve()
      }

      var contextEnd = function(){
        end(test)
        resolve()
      }
      var context = {
        comment: log.comment,
        deepEqual: tryAssert(deepEqual, test, reject),
        deepLooseEqual: tryAssert(deepLooseEqual, test, reject),
        doesNotThrow: tryAssert(doesNotThrow, test, reject),
        end: contextEnd,
        equal: tryAssert(equal, test, reject),
        fail: tryAssert(fail, test, reject),
        notDeepEqual: tryAssert(notDeepEqual, test, reject),
        notDeepLooseEqual: tryAssert(notDeepLooseEqual, test, reject),
        notOk: tryAssert(notOk, test, reject),
        ok: tryAssert(ok, test, reject),
        pass: tryAssert(pass, test, reject),
        throws: tryAssert(throws, test, reject)
      }
      log.test(test)
      var response = test.func(context)
      if (response && response.then && response.catch){
        return response
          .then(function(){
            test.ok = true
            pass(test, "test promise resolved")
            resolve()
          })
          .catch(function(ex){
            test.ok = false
            var desc = "test promise rejected"
            var actual = "promise returned from test was rejected"
            var expected = "promises returned from tests should resolve"
            fail(test, desc, actual, expected)
            log.error(ex)
            reject(ex)
          })
      }
    } catch (ex) {
      if (!ex.expected && !ex.actual){
        log.error(ex)
      }
      test.ok = false
      reject(ex)
    }
  })
}

var tryAssert = function(func, test, reject){
  return function(...args){
    try {
      func(test, ...args)
    } catch (ex) {
      if (!ex.expected && !ex.actual){
        log.error(ex)
      }
      test.ok = false
      reject()
    }
  }
}

module.exports = runTest
