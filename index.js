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
console.log(chalk.yellow('set up'));
//  if (files.directoryExists('server')) {
//    console.log(chalk.red('server already exist!'));
//    let makeFile = filequestion.gitExist()
//    if(makeFile){
//      (async function () {
//        const credentials = await creating.newFolder()
//        console.log(credentials)
//      })();
//    }else{
//      process.exit();
//    }
//  }

const run = async () => {
  try {
    await creating.apiSettings();
  } catch (error) {
    console.log(error);
  }
};
run();
