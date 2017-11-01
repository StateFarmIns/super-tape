var through = require("through")

var stream = through()

var comment = function(text){
  var msg = {
    type: comment,
    content: text
  }
  stream.queue(msg)
}

var done = function(results){
  stream.queue(results)
}

var error = function(ex){
  var msg = {
    type: "error",
    error: ex
  }
  stream.queue(msg)
}

var notOk = function(assert){
  var msg = {
    type: "assert",
    actual: assert.actual,
    desc: assert.desc,
    error: assert.error,
    expected: assert.expected,
    id: assert.id,
    ok: false,
    operator: assert.operator
  }
  stream.queue(msg)
}

var ok = function(assert){
  var msg = {
    type: "assert",
    actual: assert.actual,
    desc: assert.desc,
    expected: assert.expected,
    id: assert.id,
    ok: true,
    operator: assert.operator
  }
  stream.queue(msg)
}

var pipe = function(listener){
  stream.pipe(listener)
}

var test = function(test){
  var msg = {
    type: "test",
    name: test.name
  }
  stream.queue(msg)
}

module.exports = {
  comment,
  done,
  error,
  notOk,
  ok,
  pipe,
  test
}
