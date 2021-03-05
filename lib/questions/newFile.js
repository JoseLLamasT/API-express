const inquirer = require ('inquirer');

async function gitExist (){
  let result  = false
   await inquirer
  .prompt([
    {
      name: "router",
      type: "confirm",
      message: "its Already a Git repository, do you want continue and make a new foulder",
    },
  ])
  .then((answer) => {
   result = answer.router
  });
   return   result   
}

async function filequestion(){
  let fileName;
  await inquirer
  .prompt([
    {
      name: "fileName",
      type: "input",
      message: `where do you want to install your server , by default it will be 
      install in a server folder`,
      default: "server"
    },
  ])
  .then((answer) => {
    fileName = answer.fileName
  });
  return fileName
}

 
module.exports={filequestion,gitExist}