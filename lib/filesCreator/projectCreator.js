let content = require('../templates/expressTemplates/expressIndex');
let controllersContent = require('../templates/expressTemplates/expressControllers');

const rouContent = require('../templates/routerTemplate/routerTemplate');
const mongooseCreator = require('./mongooseFileCreator');
const sequalizeCreator = require('./sequializeCreator');
const fs = require('fs');

function ensureDirSync(newDest) {
  if (!fs.existsSync(newDest)) fs.mkdirSync(newDest);
  else return false;
}

function makingAllFiles(frameworkCongfi, endpoints, db) {
  if (frameworkCongfi.framework === 'koa') {
    content = require('../templates/koaTemplate/koaIndex');
    controllersContent = require('../templates/koaTemplate/koacontrollers');
  }
  ensureDirSync('server');
  fs.writeFile(
    './server/index.js',
    content.inde(frameworkCongfi.port, db),
    function (err) {
      if (err) throw err;
      console.log('File is created successfully.');
    }
  );

  fs.writeFile(
    './server/router.js',
    rouContent.rou(endpoints, frameworkCongfi.framework),
    function (err) {
      if (err) throw err;
      console.log('File is created successfully.');
    }
  );

  ensureDirSync('./server/controllers');
  fs.writeFile(
    './server/controllers/controllers.js',
    controllersContent.controllersCreator(endpoints, db),
    function (err) {
      if (err) throw err;
      console.log('File is created successfully.');
    }
  );
  if (db.type === 'sequelize') sequalizeCreator.sequializeCreator(db);
  else mongooseCreator.mongooseCreator(db);
}
module.exports = { makingAllFiles };
