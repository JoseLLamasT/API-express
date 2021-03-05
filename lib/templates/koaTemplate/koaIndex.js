
  function inde (port) {
  return(`
  const router = require('./router');
  const connection = require('./models/DBconnection')
  const Koa = require('koa');
  const bodyParser = require('koa-bodyparser');
  const cors = require('@koa/cors');
  
  const app = new Koa();
  const PORT = ${port};
  
  app.use(cors());
  app.use(bodyParser());
  app.use(router.routes());

  (async function () {
    try {
      await connection;
      app.listen(PORT, () => {
        (console.log('🚀 🚀 🚀 server runing at http//:localhost/' + PORT);
      });
    } catch (error) {
      console.log(error);
    }
  })()
  `)
};

module.exports = {inde}

