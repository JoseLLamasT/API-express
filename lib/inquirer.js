const index = require('./questions/indexQuestions');
const db = require('./questions/databaseQuestions');
const sequelize = require('./questions/sequelizeQuestion');
const mongooseSchema = require('./questions/mongooseQuestions');
const router = require('./questions/routerQuestions');

const projectCreator = require('./filesCreator/projectCreator');
const folderquestion = require('./questions/newFile');
const packagesInstallation = require('./packageInstalation');

const indexdata = {};
const endpoints = {};
const dbDetail = {};
const fileName = '';

async function newFolder() {
  fileName = await folderquestion.filequestion();
}

async function apiSettings() {
  await indexSettings();
  console.log('indexdata', indexdata);
  await databaseSettings();
  console.log('dbDetail', dbDetail);
  await routerSettings();
  console.log('endpoints', endpoints);
  await projectCreator.makingAllFiles(indexdata, endpoints, dbDetail);
  packagesInstallation.run(indexdata.framework, dbDetail);
}

async function indexSettings() {
  indexdata.framework = await index.framework();
  indexdata.port = await index.port();
  return indexdata;
}

async function routerSettings() {
  const newRouter = await router.creatingRouter();
  if (newRouter) {
    let methods = await router.creatingMethods();
    if (methods[0]) {
      for (let i = 0; i < methods.length; i++) {
        let endpointName = await router.endPoints(methods[i]);
        if (endpointName) endpoints[methods[i]] = endpointName;
        else {
          if (
            methods[i] === 'getById' ||
            methods[i] === 'put' ||
            methods[i] === 'deleteById'
          )
            endpoints[methods[i]] = `${methods[i]}/${dbDetail.collection}/:id`;
          else endpoints[methods[i]] = `${methods[i]}/${dbDetail.collection}`;
        }
      }
    }
  }
  return endpoints;
}

async function databaseSettings() {
  let newDatabase = await db.databaseConection();
  if (newDatabase) dbDetail.name = await db.databaseName();
  dbDetail.type = await db.dataBaseType();
  if (dbDetail.type === 'mongoose') {
    dbDetail.collection = await mongooseSchema.databaseCollectionName();
    let wantSquema = await mongooseSchema.newSchema();
    if (wantSquema) dbDetail.schema = [];
    while (wantSquema) {
      let schema = await mongooseSchema.schemaContent();
      dbDetail.schema.push(schema);
      console.log(schema);
      wantSquema = await mongooseSchema.newSchema();
    }
    return dbDetail;
  } else if (dbDetail.type === 'sequelize') {
    dbDetail.table = await sequelize.databaseTablaName();
    console.log(dbDetail.table);
    dbDetail.confi = await sequelize.confi();
    console.log(dbDetail.confi);
    let setRows = await sequelize.declareRows();
    if (setRows) dbDetail.rows = [];
    while (setRows) {
      let newRow = await sequelize.dataType();
      dbDetail.rows.push(newRow);
      console.log(newRow);
      setRows = await sequelize.declareRows();
    }
    return dbDetail;
  }
}

module.exports = { apiSettings, newFolder };
