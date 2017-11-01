var test = require("../lib/clear-tape.js")

test.events.on("beforeAll", function(){
  test.onlyMatch("itHasOnly")
  test.onlyTags("hasOnlyTag")
})

test("this test runs because both itHasOnly and hasOnlyTag", function(t){
  t.pass("only me")
  t.end()
}, {
  tags: "hasOnlyTag"
})

test("won't run", function(t){
  t.fail("this should never happen")
  t.end()
}, {
  tags: "hasOnlyTag"
})

test("won't run itHasOnly but no tag", function(t){
  t.fail("this should never happen")
  t.end()
})
