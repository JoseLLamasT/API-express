const inquirer = require('inquirer');

async function databaseCollectionName() {
  let name;
  await inquirer
    .prompt([
      {
        name: 'collection',
        type: 'input',
        message:
          'how you collection is called? by default it is call COLLECTION',
        default: 'COLLECTION',
      },
    ])
    .then(answer => {
      name = answer.collection;
    });
  return name;
}

async function newSchema() {
  let result;
  await inquirer
    .prompt([
      {
        name: 'newSchemaConfirm',
        type: 'confirm',
        message: 'Do you want a new schema?',
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
        message: 'row name',
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
