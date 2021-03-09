function schemaCreator(schemaData) {
  return `
const mongoose = require('mongoose');
const { Schema } = mongoose;
   const ${schemaData.collection} = new Schema({
     ${prettySchema(schemaData.schema)}

   });
  module.exports = mongoose.model(process.env.DATABASE_NAME,${
    schemaData.collection
  });`;
}

function prettySchema(schema) {
  let result = '';
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
