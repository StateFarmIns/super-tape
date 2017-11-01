var jsdiff = require('diff')
var chalk = require('chalk')

module.exports = function(actual, expected, useColor=true){
  var diff = jsdiff.diffChars(actual, expected);
  if (useColor){
    return diff.reduce(colorDiff, "")
  }
  return diff.reduce(symbolDiff, "")
}

var colorDiff = function(acc, part){
  if (part.added){
    acc += chalk.green(part.value)
  } else if (part.removed){
    acc += chalk.red(part.value)
  } else {
    acc += part.value
  }
  return acc
}

var symbolDiff = function(acc, part){
  if (part.added){
    acc = `${acc}+❲${part.value}❳`
  } else if (part.removed){
    acc = `${acc}-❲${part.value}❳`
  } else {
    acc += part.value
  }
  return acc
}
