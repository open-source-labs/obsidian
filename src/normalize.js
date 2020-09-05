
export default function normalizeResult(query, result, returnTypes) {
  console.log('result ',result)
  
  for(let key in result.data) {
    const hashedQuery = destructureResultKeyValues(key, result.data[key], returnTypes);
  }

}

function destructureResultKeyValues(queryType, fields, returnTypes) {
  const typeSchemaName = returnTypes.queryType.type;


}

function hashGenerator() {

}

