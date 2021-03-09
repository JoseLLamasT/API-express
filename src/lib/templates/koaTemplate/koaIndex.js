function inde(port, db) {
  let connection;
  if (db.type === 'mongoose') {
    connection = 'await connection';
  } else {
    connection = `await connection.sequelize.sync({force:false})`;
  }
  return `
  require('dotenv').config() 
  const router = require('./router');
  const connection = require('./models/DBconnection')
  const Koa = require('koa');
  const bodyParser = require('koa-bodyparser');
  const cors = require('@koa/cors');
  
  const app = new Koa();
  const PORT = process.env.PORT;
  
  app.use(cors());
  app.use(bodyParser());
  app.use(router.routes());

  (async function () {
    try {
      ${connection};
      app.listen(PORT, () => {
        (console.log('server runing at http//:localhost/' + PORT));
      });
    } catch (error) {
      console.log(error);
    }
  })()
  `;
}

module.exports = { inde };
