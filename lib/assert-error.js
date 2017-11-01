module.exports = function(expected, actual, desc){
  var error = new Error(`not ok - ${desc}`)
  error.expected = expected
  error.actual = actual
  error.desc = desc
  return error
}
