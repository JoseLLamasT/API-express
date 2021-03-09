const dbConnectionTemplate = require('../templates/sequalizeTemplate/sequalizeConnextion');
const schemaTemplate = require('../templates/sequalizeTemplate/sequalizeSchema');
const fs = require('fs');

function ensureDirSync(newDest) {
  if (!fs.existsSync(newDest)) fs.mkdirSync(newDest);
  else return false;
}

function sequializeCreator(data) {
  ensureDirSync('./server/models');
  fs.writeFile(
    './server/models/DBconnection.js',
    dbConnectionTemplate.dbSetConection(data),
    function (err) {
      if (err) throw err;
    }
  );
  fs.writeFile(
    './server/models/schema.js',
    schemaTemplate.schemaCreator(data.table, data.rows),
    function (err) {
      if (err) throw err;
    }
  );
  console.log('File is created successfully.');
}
module.exports = { sequializeCreator };
