const logic = require('./controllersLogic');
function controllersCreator(methods) {
  return `
const db = require('../models/schema');
  ${methodString(methods)}
    
module.exports = {${exporters}}`;
}

let exporters = [];
function methodString(methods) {
  let result="";
  if (methods.getAll) {
    exporters.push('getAll');
    result += `
  async function getAll(ctx){
      ${logic.getAllLogic()}
  }`;
  }
  if (methods.getById) {
    exporters.push('getById');
    result += `
  async function getById(ctx){
      ${logic.getByIdLogic()}
  }`;
  }
  if (methods.post) {
    exporters.push('addingOne');
    result += `
  async function addingOne(ctx){
      ${logic.postLogic()}
  }
      `;
  }
  if (methods.put) {
    exporters.push('update');
    result += `
  async function update(ctx){
     ${logic.putLogic()}
  }
    `;
  }
  if (methods.deleteById) {
    exporters.push('deleteOne');
    result += `
  async function deleteOne(ctx){
      ${logic.deleteLogic()}
  }
      `;
  }
  exporters.join(',');
  return result;
}
module.exports = { controllersCreator };
