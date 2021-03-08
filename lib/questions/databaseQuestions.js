const inquirer = require('inquirer');
function checking(value) {
  var pattern = /^[a-zA-Z]*$/;
  if (pattern.test(value)) return -1;
}
async function databaseConection() {
  let result;
  await inquirer
    .prompt([
      {
        name: 'database',
        type: 'confirm',
        message: 'Do you want a new database Connection?',
      },
    ])
    .then(answer => {
      result = answer.database;
    });
  return result;
}

async function dataBaseType() {
  let dataBasetype;
  await inquirer
    .prompt([
      {
        name: 'dataBaseSelector',
        type: 'list',
        message: 'Choose an ORM:',
        choices: ['sequelize', 'mongoose'],
      },
    ])
    .then(answer => {
      dataBasetype = answer.dataBaseSelector;
    });
  return dataBasetype;
}

let name;
async function databaseName() {
  await inquirer
    .prompt([
      {
        name: 'databaseName',
        type: 'input',
        message: ' enter the name of the database.(default: DB)',
        default: 'DB',
      },
    ])
    .then(answer => {
      name = answer.databaseName;
    });
  let valid = checking(name);
  if (!valid) {
    console.log('its not allow to user simbols, emty name or use numbers');
    await databaseName();
  }
  return name;
}

module.exports = { databaseConection, dataBaseType, databaseName };
