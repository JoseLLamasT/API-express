const inquirer = require('inquirer');

async function agree() {
  let result = false;
  await inquirer
    .prompt([
      {
        name: 'confirmation',
        type: 'confirm',
        message: 'do you agree with those values?',
      },
    ])
    .then(answer => {
      result = answer.confirmation;
    });
  return result;
}

module.exports = { agree };
