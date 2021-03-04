const inquirer = require ('inquirer');

async function framework(){
  let frameworktype;
  await inquirer
  .prompt([
    {
      name: "frameworkSelector",
      type: "list",
      message: "Choose your crust:",
      choices: ["express", "koa"],
    },
  ])
  .then((answer) => {
    frameworktype = answer.frameworkSelector
  });
  return frameworktype
}

 async function port(){
   let response 
   await inquirer
  .prompt([
    {
      name: "port",
      type: "number",
      message: `choose the port you are using, as a default it will be 
      http//:localhost/3000)`,
      default: 3000
    },
  ])
  .then((answer) => {
    response = answer.port
  });
  return response
 }
module.exports={framework, port}