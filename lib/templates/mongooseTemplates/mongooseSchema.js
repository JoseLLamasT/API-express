function schemaCreator(schemaData){
  return (`
const mongoose = require('mongoose');
const { Schema } = mongoose;
   const ${schemaData.collection} = new Schema({
     ${schemaData.schema}

   });
  module.exports = mongoose.model('${schemaData.name}',${schemaData.collection});`
)
}

function collectionCreator(shcemaData){
  let result=""
  for(key in schemaData){
result += `
${key}: ${schemaData[key]}`
  }
  return result
}

module.exports = {schemaCreator}