const chalk = require('chalk');

exports.highlightMessage = async function highlight(text) {
  console.log(chalk.red(text));
}

exports.successfulMessage = async function successful(text) {
  console.log(chalk.blue(text));
}

exports.failureMessage = async function faulure(error) {
  console.log('\n\n\n');
  console.log(chalk.red(`It's failure, because ID is incorrect.`));
  console.log(`more detail error message -> ${error.message}`);
  console.trace(error);
}