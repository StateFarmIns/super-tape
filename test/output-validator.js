/* eslint no-console: off */
var test = require("../lib/clear-tape.js")
var through = require("through")

var stream = through()

var tokenMatcher = /\{(\w*)\}/

var expects = ""
var testName = ""
var failCount = 0

console.log("Listening for test results...")

//Many of our internal tests are intended to fail, in order
//to test our asserts. This process "transforms" the results
//to let us test failing asserts, and still know when
//our tests _actually_ fail.
stream.on("data", function(row){
  if (row.type === "test"){
    expects = tokenMatcher.exec(row.name)[1]
    testName = row.name
  } else if (row.type === "assert"){
    var reallyOk = (row.ok && expects === "ok") || expects === "skip"
    var okToBeNotOk = (!row.ok && expects === "notOk")
    if (reallyOk || okToBeNotOk){
      console.log("ok", testName, row.id)
    } else {
      console.log("notOk", testName, row.id)
      failCount++
    }
  }
})

//We can edit the exitCode before the tests exit.
test.events.on("beforeExit", function(args){
  args.exitCode = failCount
})


module.exports = stream
