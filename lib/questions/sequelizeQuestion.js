const inquirer = require('inquirer');
function checking(value) {
  var pattern = /^[a-zA-Z]*$/;
  if (pattern.test(value)) return -1;
}

async function confi() {
  let confi = {};
  await inquirer
    .prompt([
      {
        name: 'host',
        type: 'input',
        message: 'host',
        default: 'localhost',
      },
    ])
    .then(answer => {
      confi.host = answer.host;
    });
  await inquirer
    .prompt([
      {
        name: 'username',
        type: 'input',
        message: 'username',
        default: 'root',
      },
    ])
    .then(answer => {
      confi.username = answer.username;
    });
  await inquirer
    .prompt([
      {
        name: 'dialect',
        type: 'input',
        message: 'dialect:',
        default: 'mysql',
      },
    ])
    .then(answer => {
      confi.dialect = answer.dialect;
    });
  await inquirer
    .prompt([
      {
        name: 'password',
        type: 'password',
        message: 'password:',
      },
    ])
    .then(answer => {
      confi.password = answer.password;
    });
  return confi;
}

let name;
async function databaseTablaName() {
  await inquirer
    .prompt([
      {
        name: 'table',
        type: 'input',
        message: 'how your table is called? by default it is call TABLE',
        default: 'TABLE',
      },
    ])
    .then(answer => {
      name = answer.table;
    });
  let valid = checking(name);
  if (!valid) {
    console.log('its not allow to user simbols, emty name or use numbers');
    await databaseTablaName();
  }
  return name;
}

async function declareRows(value) {
  let result;
  await inquirer
    .prompt([
      {
        name: 'makeRows',
        type: 'confirm',
        message: `do you want to set a new ${value}`,
      },
    ])
    .then(answer => {
      result = answer.makeRows;
    });
  return result;
}
let prymaryKey = false;
async function dataType() {
  let datarows, row, type, allow, key;
  await inquirer
    .prompt([
      {
        name: 'rows',
        type: 'input',
        message: 'property name',
      },
    ])
    .then(answer => {
      row = answer.rows;
    });

  await inquirer
    .prompt([
      {
        name: 'type',
        type: 'list',
        message: 'rows type',
        choices: [
          'DATE',
          'BOOLEAN',
          'TEXT',
          'BIGINT',
          'INTEGER',
          'DECIMAL',
          'STRING',
          'FLOAT',
        ],
      },
    ])
    .then(answer => {
      type = answer.type;
    });

  await inquirer
    .prompt([
      {
        name: 'allowNull',
        type: 'confirm',
        message: 'allowNull?',
      },
    ])
    .then(answer => {
      allow = answer.allowNull;
    });

  if (!prymaryKey) {
    await inquirer
      .prompt([
        {
          name: 'key',
          type: 'confirm',
          message: `is ${row} a primary Key?`,
        },
      ])
      .then(answer => {
        key = answer.key;
      });

    if (key) {
      datarows = `${row}: {type: DataTypes.${type}, allowNull:${allow}, primaryKey: true}`;
    } else {
      datarows = `${row}: {type: DataTypes.${type}, allowNull:${allow}}`;
    }
    prymaryKey = true;
  }
  return datarows;
}

module.exports = { confi, databaseTablaName, dataType, declareRows };
