const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function executeCommand(command) {
  try {
    console.log('Running CMD:', command);
    const { stdout } = await exec(command); 
    return stdout;
  } catch (error) {
    console.error('Error executing command:', error.message);
    throw error;
  }
}

async function buildAndRun() {
  try {
    console.log('Building Frontend...');
    const buildMilestone = await executeCommand('nx build milestone');
    console.log('Frontend Build Completed Successfully', buildMilestone);

    console.log('Building Backend...');
    const buildApi = await executeCommand('nx build api');
    console.log('Backend Build Completed Successfully', buildApi);

    console.log('Starting containers...');
    const dockerUpOutput = await executeCommand('docker-compose up --detach');
    console.log('Containers started successfully', dockerUpOutput);

    
    console.log('Waiting for containers to initialize (20 seconds)...');
    await new Promise(resolve => setTimeout(resolve, 20000)); 

    console.log('Getting Logs');
    const logs = await executeCommand('docker-compose logs --tail=10')
    console.log('Container Logs', logs);

  } catch (error) {
    console.error('Error occurred during build and run process:', error.message);
    throw error;
  }
}

buildAndRun()
  .then(() => console.log('Script execution completed.'))
  .catch(error => console.error('Script execution failed:', error.message));
