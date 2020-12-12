import { Rhum } from "https://deno.land/x/rhum@v1.1.4/mod.ts";

Rhum.testPlan("destructure.ts", () => {
    Rhum.testSuite("destructureTestSuite part one", () => {
        Rhum.testCase("destructureTestSuite test one", async () => {
        const result = true;
        Rhum.asserts.assertEquals(true, result);
        });
        Rhum.testCase("destructureTestSuite test two", async () => {
            const result = true;
            Rhum.asserts.assertEquals(true, result);
        });
        Rhum.testCase("destructureTestSuite test three", async () => {
            const result = true;
            Rhum.asserts.assertEquals(true, result);
        });
    });

    Rhum.testSuite("destructureTestSuite part two", () => {
        Rhum.testCase("destructureTestSuite test one", async () => {
        const result = true;
        Rhum.asserts.assertEquals(true, result);
        });
        Rhum.testCase("destructureTestSuite test two", async () => {
            const result = true;
            Rhum.asserts.assertEquals(true, result);
        });
        Rhum.testCase("destructureTestSuite test three", async () => {
            const result = true;
            Rhum.asserts.assertEquals(true, result);
        });
    });


});

Rhum.run();