import { Rhum } from 'https://deno.land/x/rhum@v1.1.11/mod.ts';
import destructureQueries, {
  findQueryStrings,
  createQueriesObj,
  splitUpQueryStr,
  findQueryFields,
  findClosingBrace,
} from '../../src/Browser/destructure.js';
import { test } from '../test_variables/destructure_variables.ts';

Rhum.testPlan('destructure.ts', () => {
  Rhum.testSuite('destructure helper function tests', () => {
    Rhum.testCase('findQueryStrings test', () => {
      const results = findQueryStrings(test.findQueryStringsTestData);
      Rhum.asserts.assertEquals(test.findQueryStringsResultData, results);
    });
    Rhum.testCase('createQueriesObj test', () => {
      const results = createQueriesObj(
        test.createQueriesObjTestData,
        'queries'
      );
      Rhum.asserts.assertEquals(test.createQueriesObjResultsData, results);
    });
    Rhum.testCase('findQueryFields test', () => {
      const results = findQueryFields(test.findQueryFieldsTestData);
      Rhum.asserts.assertEquals(test.findQueryFieldsResultData, results);
    });
    Rhum.testCase('findClosingBrace test', () => {
      const results = findClosingBrace(test.findClosingBraceTestData, 62);
      Rhum.asserts.assertEquals(test.findClosingBraceResultData, results);
    });
  });

  Rhum.testSuite('destructure single query tests', () => {
    Rhum.testCase('destructure single query string - no inputs', () => {
      const result = destructureQueries(test.ALL_ACTORS);
      Rhum.asserts.assertEquals(test.allActorsTestResult, result);
    });
    Rhum.testCase('destructure single query string - inputs', () => {
      const result = destructureQueries(test.ALL_ACTION_MOVIES);
      Rhum.asserts.assertEquals(test.allActionTestResult, result);
    });
  });

  Rhum.testSuite('destructure multi query tests', () => {
    Rhum.testCase('destructure multi query - input / non input', () => {
      const result = destructureQueries(test.ALL_ACTION_MOVIES_AND_ALL_ACTORS);
      Rhum.asserts.assertEquals(test.allActionActorsTestResult, result);
    });
  });

  Rhum.testSuite('destructure alias query tests', () => {
    Rhum.testCase('destructure multi alias query - input / non input', () => {
      const result = destructureQueries(test.newAliasTestQuery);
      Rhum.asserts.assertEquals(test.newAliasTestResult, result);
    });
  });

  Rhum.testSuite('destructure fragment tests', () => {
    Rhum.testCase(
      'destructure fragment tests - results in two seperate queries',
      () => {
        const result = destructureQueries(test.fragmentTestData);
        Rhum.asserts.assertEquals(test.fragmentResultData, result);
      }
    );
    Rhum.testCase('destructure fragment tests - results in one query', () => {
      const result = destructureQueries(test.fragmentTestData2);
      Rhum.asserts.assertEquals(test.fragmentResultData2, result);
    });
    Rhum.testCase('destructure fragment tests - nested fragments', () => {
      const result = destructureQueries(test.fragmentTestData3);
      Rhum.asserts.assertEquals(test.fragmentResultData3, result);
    });
  });

  // single variable test
  Rhum.testSuite('destructure single variable query tests', () => {
    Rhum.testCase('destructure single variable query string', () => {
      const result = destructureQueries(
        test.singleVariableTestData,
        test.singleVariableTestValue
      );
      Rhum.asserts.assertEquals(test.singleVariableTestResult, result);
    });
  });

  // multi variable test
  Rhum.testSuite('destructure multi variable query tests', () => {
    Rhum.testCase('destructure multi variable query', () => {
      const result = destructureQueries(
        test.multiVariableTestData,
        test.multiVariableTestValue
      );
      Rhum.asserts.assertEquals(test.multiVariableTestResult, result);
    });
  });

  // single directive test - @include: true
  Rhum.testSuite('destructure @include directive query tests', () => {
    Rhum.testCase('destructure @include directive (true) query', () => {
      const result = destructureQueries(
        test.includeDirectiveTestData,
        test.includeDirectiveTrueValues
      );
      Rhum.asserts.assertEquals(test.includeDirectiveTrueResult, result);
    });
  });

  // single directive test - @include: false
  Rhum.testSuite('destructure @include directive query tests', () => {
    Rhum.testCase('destructure @include directive (false) query', () => {
      const result = destructureQueries(
        test.includeDirectiveTestData,
        test.includeDirectiveFalseValues
      );

      Rhum.asserts.assertEquals(test.includeDirectiveFalseResult, result);
    });
  });
});

// single directive test - @skip: true
Rhum.testSuite('destructure @skip directive query tests', () => {
  Rhum.testCase('destructure @skip directive (true) query', () => {
    const result = destructureQueries(
      test.skipDirectiveTestData,
      test.skipDirectiveTrueValues
    );
    Rhum.asserts.assertEquals(test.skipDirectiveTrueResult, result);
  });
});

// single directive test - @skip: false
Rhum.testSuite('destructure @skip directive query tests', () => {
  Rhum.testCase('destructure @skip directive (false) query', () => {
    const result = destructureQueries(
      test.skipDirectiveTestData,
      test.skipDirectiveFalseValues
    );

    Rhum.asserts.assertEquals(test.skipDirectiveFalseResult, result);
  });
});

// TO-DO: queries with multiple directives (not just one @include/@skip)

Rhum.run();
