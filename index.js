const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const files = require('./lib/files');
const creating  = require('./lib/inquirer');

  clear();
  if (files.directoryExists('.git')) {
    console.log(chalk.red('Already a Git repository!'));
    process.exit();
  }
  console.log(
    chalk.magenta(
      figlet.textSync('NODE.JS-API', { horizontalLayout: 'full' })
    )
    );

const run = async () => {
  try{
    const credentials = await creating.apiSettings();
  }catch(error){
    console.log(error)
  }
};
run();




