var id = 0

var current = function(){
  return id
}

var next = function(){
  id++
  return id
}

module.exports = {
  current,
  next
}
