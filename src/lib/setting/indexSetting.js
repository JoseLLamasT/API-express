const index = require('../questions/indexQuestions');
let indexdata = {};
async function indexSettings() {
  indexdata.framework = await index.framework();
  indexdata.port = await index.port();
  console.log(indexdata);
  return indexdata;
}
module.exports = { indexSettings };
