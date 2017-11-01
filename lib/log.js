var browserStdout = require("browser-stdout")
var logJson = require("./log-json.js")
var logTap = require("./log-tap.js")
var R = require("ramda")
var settings = require("./settings.js")

var loggers = {}

var comment = function(text){
  writeAll("comment", text)
}

var done = function(tests, grouped){
  writeAll("done", tests, grouped)
}

var error = function(ex){
  writeAll("error", ex)
}

var init = function(){
  if (process.stdout){
    if (settings.defaultOutput === "stdout"){
      pipeTap(process.stdout)
    }
  } else {
    pipeTap(browserStdout({label: false}))
  }
  if (loggers.tap){
    loggers.tap.version()
  }
}

var notOk = function(assert){
  writeAll("notOk", assert)
}

var ok = function(assert){
  writeAll("ok", assert)
}

var pipeJson = function(listener){
  loggers.json = logJson
  logJson.pipe(listener)
}

var pipeTap = function(listener){
  loggers.tap = logTap
  logTap.pipe(listener)
}

var test = function(test){
  writeAll("test", test)
}

var writeAll = function(type, ...args){
  R.values(loggers).forEach(function(logger){
    logger[type](...args)
  })
}

module.exports = {
  comment,
  done,
  error,
  init,
  notOk,
  ok,
  pipeJson,
  pipeTap,
  test
}
