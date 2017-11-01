var events = require("./events.js")
var finish = require("./finish.js")
var log = require("./log.js")
var output = require("./output.js")
var queue = require("./queue.js")
var R = require("ramda")
var settings = require("./settings.js")
var tags = require("./tags.js")

var tests = []

var firstTest = true

var clearTape = function(name, func, options = {}){
  if (firstTest){
    initHarness()
  }

  var testSettings = parseSettings(options)

  var test = {
    asserts: [],
    name,
    func,
    settings: testSettings
  }

  if (options.skip){
    test.skip = true
    test.skipReason = options.skipReason
  }

  tests.push(test)
  queue.add(test)
}

var initHarness = function(){
  firstTest = false
  setTimeout(emitBeforeAll, 0)
  setTimeout(log.init, 0)
  setTimeout(queue.start, 0)
  setTimeout(R.partial(finish, [tests]), 0)
}

var parseSettings = function(options){
  return {
    tags: tags.parse(options.tags),
    timeout: options.timeout
  }
}

clearTape.skip = function(name, skipReason){
  if (typeof skipReason !== "string"){
    skipReason = "Test was marked as skipped."
  }
  var test = {
    asserts: [],
    name,
    settings: {},
    skip: true,
    skipReason
  }
  tests.push(test)
  queue.add(test)
}

clearTape.skipTags = function(skipTags){
  settings.skipTags = tags.parse(skipTags)
}

clearTape.onlyTags = function(onlyTags){
  settings.onlyTags = tags.parse(onlyTags)
}

clearTape.skipMatch = function(skipMatch){
  settings.skipMatch = skipMatch
}

clearTape.onlyMatch = function(onlyMatch){
  settings.onlyMatch = onlyMatch
}

clearTape.output = output
clearTape.events = events
clearTape.settings = settings

var emitBeforeAll = function(){
  events.emit("beforeAll")
}

module.exports = clearTape
