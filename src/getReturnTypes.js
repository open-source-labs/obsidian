
export default function getReturnTypes(typeDefs) {

  const querySchema = typeDefs.definitions.filter((el) => el.name.value === 'Query')[0].fields;

  const querySchemaReturnTypes = {};

  querySchema.forEach(schema => {
    querySchemaReturnTypes[schema.name.value] = findType(schema);
  })

  console.log('object of Return Types',querySchemaReturnTypes);

  return querySchemaReturnTypes;
}

function findType(schema) {
  const typeObj = {};

  if (schema.type.kind === 'ListType') {
    typeObj.kind = 'ListType';
    typeObj.type = findType(schema.type).type;
  } else if (schema.type.kind === 'NamedType'){
    typeObj.kind = 'NamedType';
    typeObj.type = schema.type.name.value;
  } else if (schema.type.kind === 'NonNullType'){
    return findType(schema.type);
  }

  return typeObj;
}