const dbConnectionTemplate = require('../templates/mongooseTemplates/mongooseDBconection');
const schemaTemplate = require('../templates/mongooseTemplates/mongooseSchema');
const fs = require('fs');

function ensureDirSync(newDest) {
  if (!fs.existsSync(newDest)) fs.mkdirSync(newDest);
  else return false;
}

function mongooseCreator(data) {
  ensureDirSync('./server/models');
  fs.writeFile(
    './server/models/DBconnection.js',
    dbConnectionTemplate.dbSetConection(data.name),
    function (err) {
      if (err) throw err;
      console.log('File is created successfully.');
    }
  );
  fs.writeFile(
    './server/models/schema.js',
    schemaTemplate.schemaCreator(data),
    function (err) {
      if (err) throw err;
      console.log('File is created successfully.');
    }
  );
}
module.exports = { mongooseCreator };
