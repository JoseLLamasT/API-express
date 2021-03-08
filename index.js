const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const files = require('./lib/files');
const creating = require('./lib/inquirer');
const filequestion = require('./lib/questions/newFile');

clear();
console.log(
  chalk.magenta(figlet.textSync('NODE.JS-API', { horizontalLayout: 'full' }))
);
if (files.directoryExists('server')) {
  console.log(
    chalk.red('the process was stopped because a server folder already exist')
  );
  process.exit();
}
console.log(chalk.yellow('set up'));

const run = async () => {
  try {
    await creating.apiSettings();
  } catch (error) {
    console.log(error);
  }
};
run();
