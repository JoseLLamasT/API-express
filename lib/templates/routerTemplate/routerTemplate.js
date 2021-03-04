
function rou (methods, framework) {
  console.log(frameworkType(framework))
  return(`${frameworkType(framework)}
const controllers = require('./controllers/controllers')

    //router-Methods Start
     ${methodString(methods)}

    //router-Methods End
    
module.exports = router
    `)
  }
function frameworkType(framework){
  let result =""
  if (framework === "koa"){
    result = `
const Router = require('koa-router');
const router = new Router();`
  }else{
    result = `
const express = require('express');
const router = express.Router();`
  }
  
  return result
}
function methodString(methods){
  let result="";
  if(methods.getAll) result += `
  router.get('/${methods.getAll}', controllers.getAll);`
  if(methods.getById) result += `
  router.get('/${methods.getById}', controllers.getById);`
  if (methods.post) result += `
  router.post('/${methods.post}', controllers.addingOne);`
  if (methods.put) result += `
  router.put('/${methods.put}', controllers.update);`
  if (methods.deleteById) result += `
  router.get('/${methods.deleteById}', controllers.deleteOne);`

return result;
}

module.exports = {rou}
