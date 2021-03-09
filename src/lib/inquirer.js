const dbSetting = require('./setting/dataBaseSetting');
const indexSetting = require('./setting/indexSetting');
const routerSetting = require('./setting/routerSeetting');

const projectCreator = require('./filesCreator/projectCreator');
const folderquestion = require('./questions/newFile');
const packagesInstallation = require('./packageInstalation');

async function newFolder() {
  await folderquestion.filequestion();
}

async function apiSettings() {
  const indexdata = await indexSetting.indexSettings();
  const dbDetail = await dbSetting.databaseSettings();
  const endpoints = await routerSetting.routerSettings(dbDetail);
  await projectCreator.makingAllFiles(indexdata, endpoints, dbDetail);
  await packagesInstallation.init();
  await packagesInstallation.run(indexdata.framework, dbDetail);
}
module.exports = { apiSettings, newFolder };
