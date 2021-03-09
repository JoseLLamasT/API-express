let content = require('../templates/expressTemplates/expressIndex');
let controllersContent = require('../templates/expressTemplates/expressControllers');
const envContent = require('../templates/envTemplate');
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
      console.log('server folder has been created successfully.');
    }
  );

  fs.writeFile(
    './server/router.js',
    rouContent.rou(endpoints, frameworkCongfi.framework),
    function (err) {
      if (err) throw err;
      console.log('server/router has been  created successfully.');
    }
  );

  ensureDirSync('./server/controllers');
  fs.writeFile(
    './server/controllers/controllers.js',
    controllersContent.controllersCreator(endpoints, db),
    function (err) {
      if (err) throw err;
      console.log(
        'server/controllers/controllers has been created successfully.'
      );
    }
  );

  if (db.type === 'sequelize') {
    sequalizeCreator.sequializeCreator(db);
    fs.writeFile(
      './server/.env',
      envContent.envMakersequelizaDb(frameworkCongfi, db),
      function (err) {
        if (err) throw err;
        console.log('.env has been created successfully.');
      }
    );
  } else if (db.type === 'mongoose') {
    mongooseCreator.mongooseCreator(db);
    fs.writeFile(
      './server/.env',
      envContent.envMakerMongoose(frameworkCongfi, db),
      function (err) {
        if (err) throw err;
        console.log('.env has been created successfully.');
      }
    );
  }
}
module.exports = { makingAllFiles };
