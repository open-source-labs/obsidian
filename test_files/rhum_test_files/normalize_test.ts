import { Rhum } from "https://deno.land/x/rhum@v1.1.4/mod.ts";

Rhum.testPlan("app_test.ts", () => {
    Rhum.testSuite("normalizeTestSuite", () => {
        Rhum.testCase("normalizeTestSuite test one", async () => {
        const result = true;
        Rhum.asserts.assertEquals(true, result);
        });
        Rhum.testCase("normalizeTestSuite test two", async () => {
            const result = true;
            Rhum.asserts.assertEquals(true, result);
        });
        Rhum.testCase("normalizeTestSuite test three", async () => {
            const result = true;
            Rhum.asserts.assertEquals(true, result);
        });
    });
});

Rhum.run();