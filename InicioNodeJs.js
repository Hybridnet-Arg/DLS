// backgroundService.js
const { exec } = require('child_process');

exec('npm start', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing 'npm start': ${error.message}`);
    return;
  }
  console.log(`npm start output: ${stdout}`);
});
