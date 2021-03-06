const dbSetting = require('./setting/dataBaseSetting');
const index = require('./setting/indexSetting');
const router = require('./setting/routerSeetting');

const projectCreator = require('./filesCreator/projectCreator');
const folderquestion = require('./questions/newFile');
const packagesInstallation = require('./packageInstalation');

const fileName = '';

async function newFolder() {
  fileName = await folderquestion.filequestion();
}

async function apiSettings() {
  const indexdata = await index.indexSettings();
  console.log('indexdata', indexdata);
  const dbDetail = await dbSetting.databaseSettings();
  console.log('dbDetail', dbDetail);
  const endpoints = await router.routerSettings(dbDetail);
  console.log('endpoints', endpoints);
  await projectCreator.makingAllFiles(indexdata, endpoints, dbDetail);
  packagesInstallation.run(indexdata.framework, dbDetail);
}
module.exports = { apiSettings, newFolder };
