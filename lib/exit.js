var events = require("./events.js")

module.exports = function(exitCode){
  var args = {exitCode}
  events.emit("beforeExit", args)
  if (process && process.exit){
    process.exit(args.exitCode)
  }
}
