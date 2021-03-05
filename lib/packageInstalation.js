async function run(framework, database) {
  var installing = [];
  if (framework === 'koa') {
    installing = 'koa @koa/cors koa-bodyparser koa-router';
  } else if (framework === 'express') {
    installing = 'express cors body-parser';
  }
  if (database === 'mongoose') {
    installing = `mongoose ${installing}`;
  } else if (database === 'MySQL') {
    installing = `sequelize  ${installing}`;
  }
  var exec = require('child_process').exec;
  child = exec(`npm install --save-dev ${installing}`).stderr.pipe(
    process.stderr
  );
}

module.exports = { run };
