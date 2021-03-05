function schemaCreator(name, schema) {
  return `
module.exports = (sequelize, DataTypes) => {
  const ${name} = sequelize.define('${name}', {
    ${prettySchema(schema)}
  });  
};
`;
}

function prettySchema(schema) {
  let result ="";
  for (let i = 0; i < schema.length; i++) {
    if (i === 0) result = `${schema[i]},`;
    else {
result = `${result}
    ${schema[i]},`;
    }
  }
  return result;
}

module.exports = { schemaCreator };
