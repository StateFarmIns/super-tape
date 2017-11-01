var R = require("ramda")

module.exports = R.groupBy(function(test){
  if (test.ok){
    return "ok"
  }
  return "not"
})
