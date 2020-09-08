
export default function getObsidianSchema(typeDefs) {
  // console.log(typeDefs.definitions)
  const obsidianTypeSchema = getTypeSchema(typeDefs)

  // Grabs just the query schema from the typedefs object
  const querySchema = typeDefs.definitions.filter((el) => el.name.value === 'Query')[0].fields;

  // Build the object to return
  const querySchemaReturnTypes = {};
  const querySchemaArgTypes = {};

  // Invoke findTypes helper on each query schema in order to store the type
  querySchema.forEach(schema => {
    querySchemaReturnTypes[schema.name.value] = findType(schema);
    querySchemaArgTypes[schema.name.value] = findArgs(schema);
  })

  console.log('object of Return Types',querySchemaReturnTypes);

  return {
    returnTypes: querySchemaReturnTypes,
    argTypes: querySchemaArgTypes,
    obsidianTypeSchema
  }
}

function findType(schema) {
  // Build the output
  const typeObj = {};

  // ListType always overrides the kind since we need to know that we will have
  // to hash multiple objects in normalize.js
  if (schema.type.kind === 'ListType') {
    typeObj.kind = 'ListType';
    typeObj.type = findType(schema.type).type; // recursively calls in order to find the type schema this is referring to

  // NamedType is our final destination- have to know what type schema to
  // reference when receiving results
  } else if (schema.type.kind === 'NamedType'){
    typeObj.kind = 'NamedType';
    typeObj.type = schema.type.name.value;

  // "Eats" NonNullType, as our hash does not care about this type
  } else if (schema.type.kind === 'NonNullType'){
    return findType(schema.type);
  }

  return typeObj;
}

function getTypeSchema(typeDefs) {
  const types = typeDefs.definitions.filter(el => el.name.value !== 'Query' && el.name.value !== 'Mutation');
  // console.log('types w/out queries', types)

  const typeSchemaForObsidian = {};

  types.forEach(type => {
    // console.log('individual field',type.fields[0]);
    const fieldObj = type.fields.reduce((acc, field) => {
      const type = findType(field).type;
      const scalar = type === 'ID' || type === 'String' || type === 'Boolean' || type === 'Int' || type === 'Float' ? true: false;
      acc[field.name.value] = {
        type,
        scalar
      };
      return acc;
    }, {});

    typeSchemaForObsidian[type.name.value] = fieldObj;
  })

  console.log('full schema', typeSchemaForObsidian);

  return typeSchemaForObsidian
}

const findArgs = schema => {
  console.log(schema.arguments);
}
