var log = require("./log.js")
var settings = require("./settings.js")
var through = require("through")

var disableDefault = function(){
  settings.defaultOutput = false
}

var onData = function(listener, type){
  var stream = through()
  stream.on("data", listener)

  if (type === "json"){
    log.pipeJson(stream)
  } else if (type === "tap"){
    log.pipeTap(stream)
  }
}

var pipe = function(listener, type){
  if (type === "json"){
    log.pipeJson(listener)
  } else if (type === "tap"){
    log.pipeTap(listener)
  }
}

module.exports = {
  disableDefault,
  onData,
  pipe
}
