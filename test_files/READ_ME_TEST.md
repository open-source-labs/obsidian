Please see below for details on how to run Obsidian's test suite and additional testing resources:

How to Run Obsidian Tests:
To run all tests call:
deno test --allow-env
This can be called from the root obsidian directory and it will locate and call all test files

To run a specific test file call:
deno test --allow-env path/test_file.ts
deno test --allow-all test_files
Example: deno test --allow-env test_files/rhum_test_files/restructure_test.ts

Additional Deno Testing Resources:

1. Deno Testing Docs: https://deno.land/manual/testing
2. Rhum Testing Docs: https://deno.land/x/rhum@v1.1.4
