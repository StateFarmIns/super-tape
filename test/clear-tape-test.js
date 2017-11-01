var test = require("../lib/clear-tape.js")
var outputValidator = require("./output-validator.js")

//This gets fired before our tests start running.
//So it doesn't need to come before the tests are defined.
test.events.on("beforeAll", function(){
  test.output.disableDefault()
  test.output.pipe(outputValidator, "json")
  test.skipTags("skipMe")
  test.skipMatch("descriptionSkip")
})

test("ok {ok}", function(t){
  t.ok(true, "it's true")
  t.end()
})

test("ok {notOk}", function(t){
  t.ok(false, "it's false")
  t.end()
})

test("async {ok}", function(t){
  setTimeout(function(){
    t.ok(true, "finally!")
    t.end()
  }, 200)
})

test("async {notOk}", function(t){
  setTimeout(function(){
    t.ok(false, "wha wha")
    t.end()
  })
})

test("equal {ok}", function(t){
  t.equal("foo", "foo", "foo is foo")
  t.end()
})

test("equal {notOk}", function(t){
  t.equal("foo", "not foo", "foo is not not foo")
  t.end()
})

test("neverending {notOk}", function(t){
  t.comment("It feels like we're forgetting something...")
},{
  timeout: 200
})

test.skip("skipped {skip}", "Skipped because it's always failing!", function(t){
  t.ok(false, "Why doesn't this ever work?")
  t.end()
})

test("promise {ok}", function(t){
  return new Promise(function(resolve, reject){
    t.comment("wait for it...")
    setTimeout(resolve, 100)
  })
})

test("promise {notOk}", function(t){
  return new Promise(function(resolve, reject){
    setTimeout(reject, 100)
  })
})

test("throws an error {notOk}", function(t){
  undefined.undefined.undefined()
  t.end()
})

test("notOk {ok}", function(t){
  t.notOk(false, "should be falsey")
  t.end()
})

test("notOk {notOk}", function(t){
  t.notOk(true, "should be falsey")
  t.end()
})

test("deepEqual {ok}", function(t){
  var actual = {a: "foo", b: ["bar", "baz"]}
  var expected = {a: "foo", b: ["bar", "baz"]}
  t.deepEqual(actual, expected, "nested objects are equal")
  t.end()
})

test("deepEqual {notOk}", function(t){
  var actual = {a: "food", c: ["barf", "bags"]}
  var expected = {a: "foo", b: ["bar", "baz"]}
  t.deepEqual(actual, expected, "nested objects are equal")
  t.end()
})

test("deepEqual {notOk}", function(t){
  var actual = [1, 2, 3]
  var expected = ["1", "2", "3"]
  t.deepEqual(actual, expected, "uses strict equality")
  t.end()
})

test("notDeepEqual {ok}", function(t){
  var actual = ["one", "two", "three"]
  var expected = ["one", "two", "three", "four"]
  t.notDeepEqual(actual, expected, "nested objects are not equal")
  t.end()
})

test("notDeepEqual {ok}", function(t){
  var actual = {a: 1}
  var expected = {a: "1"}
  t.notDeepEqual(actual, expected, "uses strict equality")
  t.end()
})

test("notDeepEqual {notOk}", function(t){
  var actual = [1, 2, 3]
  var expected = [1, 2, 3]
  t.notDeepEqual(actual, expected, "nested objects are not equal")
  t.end()
})

test("deepLooseEqual {ok}", function(t){
  var actual = {a: 1, b: 2, c: 3}
  var expected = {a: 1, b: "2", c: " 3 "}
  t.deepLooseEqual(actual, expected, "uses loose equality")
  t.end()
})

test("deepLooseEqual {notOk}", function(t){
  var actual = {a: 1, b: 2, c: 3}
  var expected = "{a: 1, b: 2, c: 3}"
  t.deepLooseEqual(actual, expected, "not even close, buddy")
  t.end()
})

test("notDeepLooseEqual {ok}", function(t){
  var actual = {a: "1s", b: 2, c: 3.0}
  var expected = {a: 1, b: 2, c: [33]}
  t.notDeepLooseEqual(actual, expected, "just loose enough")
  t.end()
})

test("notDeepLooseEqual {notOk}", function(t){
  var actual = {a: 1, b: "2", c: 3}
  var expected = {a: "1", b: 2, c: 3}
  t.notDeepLooseEqual(actual, expected, "wait, those are actually the same?")
  t.end()
})

test("throws {ok}", function(t){
  t.throws(function(){
    throw new Error("It's an error.")
  }, "nice error")
  t.end()
})

test("throws {notOk}", function(t){
  t.throws(function(){
    t.comment("Not an error.")
  }, "no errors here")
  t.end()
})

test("throws invalid args {notOk}", function(t){
  t.throws("not a function", "bad request")
  t.end()
})

test("doesNotThrow {ok}", function(t){
  t.doesNotThrow(function(){
    t.comment("Not an error.")
  }, "it didn't throw")
  t.end()
})

test("doesNotThrow {notOk}", function(t){
  t.doesNotThrow(function(){
    throw new Error("It's an error.")
  }, "it barfed")
  t.end()
})

test("doesNotThrow invalid args {notOk}", function(t){
  t.doesNotThrow("not a function", "how could this possibly work?")
  t.end()
})

test("skipped by tags {skip}", function(t){
  t.fail("this should never happen")
  t.end()
}, {tags: "skipMe"})

test("skipped by matching 'descriptionSkip' {skip}", function(t){
  t.fail("this should never happen")
  t.end()
})
