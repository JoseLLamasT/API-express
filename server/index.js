
    const router = require('./router');
    const connection = require('./models/DBconnection')
    const express = require('express');
    const bodyParser = require('body-parser');
    const cors = require('cors');
    
    const app = express();
    const PORT = 5000;
    
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json())
    
    app.use(router);
  
    (async function () {
      try {
        await connection;
        app.listen(PORT, () => {
          console.log('🚀 🚀 🚀 server runing at http//:localhost/' + PORT);
        });
      } catch (error) {
        console.log(error);
      }
    })()
    