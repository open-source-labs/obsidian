import { Rhum } from 'https://deno.land/x/rhum@v1.1.4/mod.ts';
import normalizeResult from '../../src/normalize.js';

Rhum.testPlan('normalize.ts', () => {
  Rhum.testSuite('normalize test suite one', () => {
    Rhum.testCase('normalize', async () => {
      let result = normalizeResult('', {}, {}, {});
      Rhum.asserts.assertEquals(result, {});
    });
  });
});

Rhum.run();
