let py = (code: any) => {
  let input = require('../../input');
let out = require('../../output');
let Hlp = require('../../helpers')
let { spawn } = require('child_process');
let h = new Hlp();

  const python = spawn('python', ['script.py']);

  python.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  python.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  python.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

}