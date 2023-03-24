let py = (code: any) => {
  let input = require('../../input');
let out = require('../../output');
let Hlp = require('../../helpers')
let { spawn } = require('child_process');
let h = new Hlp();

let pythonCompiler = spawn('python', ['-u', './py.py']);

let stdoutBuffer: any = '';
pythonCompiler.stdout.on('data', async (data: any) => {
  stdoutBuffer += data.toString();
  let printStatements = stdoutBuffer.split('\n');
  stdoutBuffer = printStatements.pop();

  for (let printStatement of printStatements) {
    if (printStatement.trim() !== '') {
      console.log(`print statement: ${printStatement}`);
    }
  }
    pythonCompiler.stdin.write("a" + '\n')

});

pythonCompiler.stdin.on('data', (data: any) => {
  console.log(`stdin`);

});



pythonCompiler.stderr.on('data', (data: any) => {
  console.error(`stderr: ${data}`);
});

pythonCompiler.on('close', (code: any) => {
  console.log(`child process exited with code ${code}`);
});
    
function sleep(ms: any) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function inpt(question: any) {
  return new Promise((resolve) => {
    readline.question(question, resolve);
  });
}
}