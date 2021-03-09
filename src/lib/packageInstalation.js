const util = require('util');
const exec = util.promisify(require('child_process').exec);
async function run(framework, database) {
  var installing = [];
  if (framework === 'koa') {
    installing = 'koa @koa/cors koa-bodyparser koa-router dotenv';
  } else if (framework === 'express') {
    installing = 'express cors body-parser dotenv';
  }
  if (database.type === 'mongoose') {
    installing = `mongoose ${installing}`;
  } else {
    installing = `sequelize mysql2 mysql ${installing}`;
  }
  await exec(`npm install  ${installing}`);
}

async function init() {
  await process.chdir('./server');
  await exec(`npm init --yes`);
}
module.exports = { run, init };
