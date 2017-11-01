# super-tape
A tap-producing test harness, inspired by tape, but with more robust features for integration testing.

tape is a great unit testing tool, but integration testing often requires a bit more flexibility, and more configuration options.

super-tape does just about everything tape can do, but also provides the following additional features:

- Built-in support for Promises and async/await
- Built-in asserts and better error messages for tests that return promises
- More robust messaging and error-handling, so you can see what went wrong when your tests fail
- Configurable timeouts for long-running tests (tests won't just hang forever)
- `beforeAll` and `afterAll` events for simpler configuration and integrations with other tools
- A more robust default TAP logger that logs both test counts and assert counts
- Logs available as streams in both TAP and JSON formats
- Allows the runner's exit code to be checked and even altered as tests exit, which can be useful in certain situations (like clear-tape's own integration tests)
- A modular, functional programming style that is a breeze to read and maintain

# API

## test(name, callback, [options])

Create a new test with the given name. The callback will be called when the test is run and passed a test context object with several assert functions. Tests are run in the order they are declared.
