let logic;
function controllersCreator(methods, db) {
  let callingSchema;
  if (db.type === 'mongoose') {
    logic = require('./mongooseControllers');
    callingSchema = "db = require('../models/schema')";
    db.table = '_';
  } else {
    logic = require('./squalizeControllers');
    callingSchema = ` {${db.table} } = require('../models/DBconnection')`;
  }
  return `
const ${callingSchema}
  ${methodString(methods, db.table)}
    
module.exports = {${exporters}}`;
}

let exporters = [];
function methodString(methods, table) {
  let result = '';
  if (methods.getAll) {
    exporters.push('getAll');
    result += `
  async function getAll (req,res) {
      ${logic.getAllLogic(table)}
  }
  
  `;
  }
  if (methods.getById) {
    exporters.push('getById');
    result += `
  async function getById (req,res) {
      ${logic.getByIdLogic(table)}
  }
  
  `;
  }
  if (methods.post) {
    exporters.push('addingOne');
    result += `
  async function addingOne (req,res) {
      ${logic.postLogic(table)}
  };

  `;
  }
  if (methods.put) {
    exporters.push('updateOne');
    result += `
  async function updateOne (req,res) {
     ${logic.putLogic(table)}
  };

   `;
  }
  if (methods.deleteById) {
    exporters.push('deleteOne');
    result += `
  async function deleteOne (req,res) {
      ${logic.deleteLogic(table)}
  };
  
  `;
  }
  exporters.join(',');
  return result;
}
module.exports = { controllersCreator };
