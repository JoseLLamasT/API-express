
const express = require('express');
const router = express.Router();
const controllers = require('./controllers/controllers')

    //router-Methods Start
     
  router.get('/get', controllers.getAll);
  router.get('/getById/crazy/:id', controllers.getById);
  router.post('/post/crazy', controllers.addingOne);
  router.put('/put/crazy/:id', controllers.update);
  router.delete('/deleteById/crazy/:id', controllers.deleteOne);

    //router-Methods End
    
module.exports = router
    