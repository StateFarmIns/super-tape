var R = require("ramda")

module.exports = function(tests){
  var done = tests.reduce(function(acc, test){
    return acc && R.has('ok', test)
  }, true)
  return done
}
