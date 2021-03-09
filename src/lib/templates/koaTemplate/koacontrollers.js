let logic;
let callingSchema;
function controllersCreator(methods, db) {
  if (db.type === 'mongoose') {
    logic = require('./mongooseControllers');
    callingSchema = "db = require('../models/schema')";
    db.table = '_';
  } else {
    logic = require('./squalizeControllers');
    callingSchema = ` {${db.table} } = require('../models/DBconnection')`;
  }
  return `
const ${callingSchema};
  ${methodString(methods, db.table)}
    
module.exports = {${exporters}}`;
}

let exporters = [];
function methodString(methods, tableName) {
  let result = '';
  if (methods.getAll) {
    exporters.push('getAll');
    result += `
  async function getAll(ctx){
      ${logic.getAllLogic(tableName)}
  }`;
  }
  if (methods.getById) {
    exporters.push('getById');
    result += `
  async function getById(ctx){
      ${logic.getByIdLogic(tableName)}
  }`;
  }
  if (methods.post) {
    exporters.push('addingOne');
    result += `
  async function addingOne(ctx){
      ${logic.postLogic(tableName)}
  }
      `;
  }
  if (methods.put) {
    exporters.push('updateOne');
    result += `
  async function updateOne(ctx){
     ${logic.putLogic(tableName)}
  }
    `;
  }
  if (methods.deleteById) {
    exporters.push('deleteOne');
    result += `
  async function deleteOne(ctx){
      ${logic.deleteLogic(tableName)}
  }
      `;
  }
  exporters.join(',');
  return result;
}
module.exports = { controllersCreator };
