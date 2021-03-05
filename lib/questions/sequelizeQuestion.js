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
  let schema;
  await inquirer
    .prompt([
      {
        name: 'schema',
        type: 'input',
        message: 'introduce your schema',
        default: '//write your schema here',
      },
    ])
    .then(answer => {
      schema = answer.schema;
    });
  return schema;
}

module.exports = { databaseCollectionName, newSchema, schemaContent };
