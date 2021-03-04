const inquirer = require ('inquirer');

async function databaseConection(){
  let result;
   await inquirer
  .prompt([
    {
      name: "database",
      type: "confirm",
      message: "Do you want a new database Connection?",
    },
  ])
  .then((answer) => {
   result = answer.database
  });
   return   result;
}

async function dataBaseType(){
  let dataBasetype;
  await inquirer
  .prompt([
    {
      name: "dataBaseSelector",
      type: "list",
      message: "Choose your crust:",
      choices: ["MySQL", "mongoose"],
    },
  ])
  .then((answer) => {
    dataBasetype = answer.dataBaseSelector
  });
  return dataBasetype
}

async function databaseName(){
  let name;
   await inquirer
  .prompt([
    {
      name: "databaseName",
      type: "input",
      message: "how you database is called? by default it is call DB",
      default: "DB"
    },
  ])
  .then((answer) => {
    name = answer.databaseName
  });
   return   name;
}




module.exports = {databaseConection, dataBaseType,databaseName}