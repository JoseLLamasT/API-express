const db = require('../questions/databaseQuestions');
const sequelize = require('../questions/sequelizeQuestion');
const mongooseSchema = require('../questions/mongooseQuestions');
const confirmation = require('../questions/newFile');
let dbDetail = {};

async function databaseSettings() {
  let newDatabase = await db.databaseConection();
  if (newDatabase) dbDetail.name = await db.databaseName();
  dbDetail.type = await db.dataBaseType();
  if (dbDetail.type === 'mongoose') await mongooseSetting();
  else if (dbDetail.type === 'sequelize') await sequalizeSetting();
  return dbDetail;
}

async function mongooseSetting() {
  dbDetail.collection = await mongooseSchema.databaseCollectionName();
  let wantSquema = await mongooseSchema.newSchema('schema');
  if (wantSquema) {
    dbDetail.schema = [];
    let setSquema = await mongooseSchema.newSchema(
      'property or value to the schema'
    );
    while (setSquema) {
      let schema = await mongooseSchema.schemaContent();
      dbDetail.schema.push(schema);
      setSquema = await mongooseSchema.newSchema(
        'property or value to the schema'
      );
    }
  }
  console.log(dbDetail);
  let confirm = await confirmation.agree();
  if (!confirm) await mongooseSetting();
}

async function sequalizeSetting() {
  dbDetail.table = await sequelize.databaseTablaName();
  dbDetail.confi = await sequelize.confi();
  let newTbale = await sequelize.declareRows('table');
  if (newTbale) {
    let setSquema = await sequelize.declareRows(
      'property or value to the schema'
    );
    dbDetail.rows = [];
    while (setSquema) {
      let newRow = await sequelize.dataType();
      dbDetail.rows.push(newRow);
      setSquema = await sequelize.declareRows(
        'property or value to the schema'
      );
    }
  }
  console.log(dbDetail);
  let confirm = await confirmation.agree();
  if (!confirm) await sequalizeSetting();
}
module.exports = { databaseSettings };
