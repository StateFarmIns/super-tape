var R = require("ramda")
var settings = require("./settings.js")

var parse = function(tags=""){
  return R.reject(R.isEmpty, tags.split(" ").map((tag) => tag.trim()))
}

var skipCheck = function(test){
  checkSkipTags(test)
  checkOnlyTags(test)
}

var checkSkipTags = function(test){
  if (test.skip){
    return
  }

  if (settings.skipTags && settings.skipTags.length){
    var skipped = R.intersection(test.settings.tags, settings.skipTags)
    if (skipped.length){
      test.skip = true
      test.skipReason = `skipping tag(s): ${skipped.join(" ")}`
    }
  }
}

var checkOnlyTags = function(test){
  if (test.skip){
    return
  }
  if (settings.onlyTags && settings.onlyTags.length){
    var notSkipped = R.intersection(test.settings.tags, settings.onlyTags)
    if (notSkipped.length === 0){
      test.skip = true
      test.skipReason = `only running tag(s): ${settings.onlyTags.join(" ")}`
    }
  }
}

module.exports = {
  parse,
  skipCheck
}
