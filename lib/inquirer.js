const dbSetting = require('./setting/dataBaseSetting');
const indexSetting = require('./setting/indexSetting');
const routerSetting = require('./setting/routerSeetting');

const projectCreator = require('./filesCreator/projectCreator');
const folderquestion = require('./questions/newFile');
const packagesInstallation = require('./packageInstalation');

const fileName = '';

async function newFolder() {
  fileName = await folderquestion.filequestion();
}

async function apiSettings() {
  const indexdata = await indexSetting.indexSettings();
  console.log('indexdata', indexdata);
  const dbDetail = await dbSetting.databaseSettings();
  console.log('Data Base Details', dbDetail);
  const endpoints = await routerSetting.routerSettings(dbDetail);
  console.log('endpoints', endpoints);
  await projectCreator.makingAllFiles(indexdata, endpoints, dbDetail);
  packagesInstallation.run(indexdata.framework, dbDetail);
}
module.exports = { apiSettings, newFolder };
