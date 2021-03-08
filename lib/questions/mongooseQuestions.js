const inquirer = require('inquirer');

function checking(value) {
  var pattern = /^[a-zA-Z]*$/;
  if (pattern.test(value)) return -1;
}
async function databaseCollectionName() {
  let name;
  await inquirer
    .prompt([
      {
        name: 'collection',
        type: 'input',
        message: 'enter the name of the database.(default; COLLECTION)',
        default: 'COLLECTION',
      },
    ])
    .then(answer => {
      name = answer.collection;
    });
  let valid = checking(name);
  if (!valid) {
    console.log('its not allow to user simbols, emty name or use numbers');
    await databaseCollectionName();
  }
  return name;
}

async function newSchema(value) {
  let result;
  await inquirer
    .prompt([
      {
        name: 'newSchemaConfirm',
        type: 'confirm',
        message: `Do you want to add a new ${value}?`,
      },
    ])
    .then(answer => {
      result = answer.newSchemaConfirm;
    });
  return result;
}

async function schemaContent() {
  let datarows, row, type, defaultValue, required;
  await inquirer
    .prompt([
      {
        name: 'rows',
        type: 'input',
        message: 'Property name',
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
          'String',
          'Boolean',
          'Date',
          'Number',
          'Array',
          'ObjectId',
          'Decimal128',
          'Mixed',
          'Buffer',
          'Map',
        ],
      },
    ])
    .then(answer => {
      type = answer.type;
    });

  await inquirer
    .prompt([
      {
        name: 'defaultValue',
        type: 'input',
        message: 'default value',
      },
    ])
    .then(answer => {
      defaultValue = answer.defaultValue;
    });

  await inquirer
    .prompt([
      {
        name: 'required',
        type: 'confirm',
        message: `is ${row} required?`,
      },
    ])
    .then(answer => {
      required = answer.required;
    });

  if (defaultValue) {
    datarows = `${row}: {type: ${type}, default:${defaultValue}, required: ${required}}`;
  } else {
    datarows = `${row}: {type: ${type}, required: ${required}}`;
  }
  return datarows;
}

module.exports = { databaseCollectionName, newSchema, schemaContent };
