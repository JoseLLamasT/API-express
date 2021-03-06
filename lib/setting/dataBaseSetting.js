const db = require('../questions/databaseQuestions');
const sequelize = require('../questions/sequelizeQuestion');
const mongooseSchema = require('../questions/mongooseQuestions');

let dbDetail = {};
async function databaseSettings() {
  let newDatabase = await db.databaseConection();
  if (newDatabase) dbDetail.name = await db.databaseName();
  dbDetail.type = await db.dataBaseType();
  if (dbDetail.type === 'mongoose')
    dbDetail = { ...dbDetail, ...mongooseSetting() };
  else if (dbDetail.type === 'sequelize')
    dbDetail = { ...dbDetail, ...sequalizeSetting() };
  return dbDetail;
}

async function mongooseSetting() {
  dbDetail.collection = await mongooseSchema.databaseCollectionName();
  let wantSquema = await mongooseSchema.newSchema();
  if (wantSquema) dbDetail.schema = [];
  while (wantSquema) {
    let schema = await mongooseSchema.schemaContent();
    dbDetail.schema.push(schema);
    wantSquema = await mongooseSchema.newSchema();
  }
  return dbDetail;
}

async function sequalizeSetting() {
  dbDetail.table = await sequelize.databaseTablaName();
  dbDetail.confi = await sequelize.confi();
  let setRows = await sequelize.declareRows();
  if (setRows) dbDetail.rows = [];
  while (setRows) {
    let newRow = await sequelize.dataType();
    dbDetail.rows.push(newRow);
    setRows = await sequelize.declareRows();
  }
  return dbDetail;
}
module.exports = { databaseSettings };
