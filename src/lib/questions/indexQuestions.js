const inquirer = require('inquirer');

async function framework() {
  let frameworktype;
  await inquirer
    .prompt([
      {
        name: 'frameworkSelector',
        type: 'list',
        message: 'choose a server framework',
        choices: ['express', 'koa'],
      },
    ])
    .then(answer => {
      frameworktype = answer.frameworkSelector;
    });
  return frameworktype;
}

let response;
async function port() {
  await inquirer
    .prompt([
      {
        name: 'port',
        type: 'number',
        message: `which port is used,(default: http//:localhost/3000)`,
        default: 3000,
      },
    ])
    .then(answer => {
      response = answer.port;
    });
  if (typeof response != 'number' || !response) {
    console.log('the port can not be emty or be different than a number');
    await port();
  }
  return response;
}
module.exports = { framework, port };
