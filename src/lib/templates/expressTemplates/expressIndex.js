function inde(port, db) {
  let res;
  if (db.type === 'mongoose') {
    res = 'connection';
  } else {
    res = `connection.sequelize.sync({force:false})`;
  }
  return `
require('dotenv').config() 
const router = require('./router');
const connection = require('./models/DBconnection')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
    
const app = express();
const PORT = process.env.PORT;
    
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json())
    
app.use(router);
  
(async function () {
  try {
    await ${res};
    app.listen(PORT, () => {
      console.log('server runing at http//:localhost/' + PORT);
    });
  } catch (error) {
    console.log(error);
  }
})()
    `;
}

module.exports = { inde };
