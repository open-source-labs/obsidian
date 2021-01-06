To run tests:

1. Call deno test [specific_file.ts] --allow-env --allow-read --allow-net to run tests on that file
2. Call deno test [folder] --allow-env --allow-read --allow-net to run all test files in that folder (test files match the pattern '\*test.ts')

Other Notes:
One challenge is how do we test functionality that is not exported?
In Node, we can use a package called reqire.
In Deno, this package does not currently exist.

Some possible workarounds:

1. export everything (bad practice, exposes a ton of functionality that probably shouldn't be exposed)
2. create a test environment that exports all functions when in test - see second ranked answer
   https://stackoverflow.com/questions/14874208/how-to-access-and-test-an-internal-non-exports-function-in-a-node-js-module
3. port rewire into Deno, lol

Deno Testing Resources:

1. Deno Manual Testing Docs: https://deno.land/manual/testing
2. Lightweight Deno Testing Framework Rhum Docs: https://dev.to/crookse_/why-we-created-rhum-for-testing-deno-projects-33mf
