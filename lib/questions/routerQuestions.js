const inquirer = require ('inquirer');

async function creatingRouter (){
  let result  = false
   await inquirer
  .prompt([
    {
      name: "router",
      type: "confirm",
      message: "Do you want a new router file?",
    },
  ])
  .then((answer) => {
   result = answer.router
  });
   return   result   
}

async function creatingMethods (){
  let method =[]
   await inquirer 
  .prompt([
    {
      type: "checkbox",
      message: "pick the methods you want (use tab to select them):",
      name: "methods",
      choices: ["getAll", "getById","post", "put", "deleteById"]
    }
  ])
  .then((answer)=>{
    method = answer.methods
  })
  return method
}

 async function endPoints(method){
   let response 
   await inquirer
  .prompt([
    {
      name: "endPoint",
      type: "input",
      message: `choose the end point for ${method} method`,
    },
  ])
  .then((answer) => {
    response = answer.endPoint
  });
  return response
 }
module.exports={creatingMethods,endPoints,creatingRouter}