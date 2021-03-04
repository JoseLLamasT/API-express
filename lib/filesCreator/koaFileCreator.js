const content = require('../templates/koaTemplate/koaIndex');
const rouContent = require('../templates/routerTemplate/routerTemplate');
const controllersContent = require('../templates/koaTemplate/koacontrollers');
const dbCreator = require('./mongooseFileCreator')
const fs = require('fs');



function ensureDirSync (newDest) {
  if (!fs.existsSync(newDest)) 
  fs.mkdirSync(newDest)
  else return false
}

function koaCreator(frameworkCongfi, endpoints, db) {
  ensureDirSync ('server')  
  fs.writeFile('./server/index.js', 
  content.inde(frameworkCongfi.port), function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
  });

  fs.writeFile('./server/router.js', 
  rouContent.rou(endpoints,frameworkCongfi.framework), function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
  });

  ensureDirSync('./server/controllers')
  fs.writeFile('./server/controllers/controllers.js',
    controllersContent.controllersCreator(endpoints),function (err) {
      if (err) throw err;
      console.log('File is created successfully.');
    });
 dbCreator.mongooseCreator(db)
}
module.exports = { koaCreator };
