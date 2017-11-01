var settings = require("./settings.js")

var check = function(test){
  if (settings.skipMatch){
    checkSkip(test, settings.skipMatch)
  }
  if (settings.onlyMatch){
    checkOnly(test, settings.onlyMatch)
  }
}

var checkSkip = function(test, match){
  if (isMatch(test, match)){
    test.skip = true
    test.skipReason = `Skipping tests that match '${match}'`
  }
}

var isMatch = function(test, match){
  if (match.test){
    return match.test(test.name)
  }
  return test.name.includes(match)
}

var checkOnly = function(test, match){
  if (!isMatch(test, match)){
    test.skip = true
    test.skipReason = `Only running tests that match '${match}'`
  }
}

module.exports = {
  check
}
