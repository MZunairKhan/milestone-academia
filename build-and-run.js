const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function buildAndRun() {
  try {
    await exec('nx run milestone:build:production');

    await exec('nx run api:build');

    await exec('docker-compose up');

    console.log('Build and run process completed successfully.');
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

buildAndRun();
