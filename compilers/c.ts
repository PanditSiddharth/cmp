const fs = require('fs');
import s from '../index'
const c = async (code: any)=>{
const inp = require('../input');
const out = require('../output');
const Hlp = require('../helpers')
const { spawn } = require('child_process');

const EventEmitter = require('events');

const myEmitter = new EventEmitter();

let cod = await mstr(code);
// Write the C code to the file
  let filename: any = await handleCFileAdded()
  if(!filename)
    filename = 'cfile.c'
  let outfile = filename.replace(".c", "");
fs.writeFileSync('./files/' + filename, cod, {flag: 'w'}, (err: any) => {
  if (err) throw err;
  console.log(`C code written to ${filename}`);
});

const h = new Hlp();

const gccProcess = spawn('gcc', ['-o', './files/' + outfile, './files/' + filename], {stdio: ['pipe', 'inherit']});


gccProcess.stderr.on('data', (data: any) => {
  console.log(data.toString())
})
gccProcess.on('close', async (code: any) => {
  if (code === 0) {
    
    // If compilation succeeds, execute the program
    const programProcess = spawn('./files/' + outfile);

    let inputCount = 0;
s(programProcess)

programProcess.stderr.on('data', (data: any) => {
  console.error(`stderr: ${data}`);
});



    
    programProcess.on('error', (err: any) => {
      // Handle the error here
      console.error("err" + err);
    });

    programProcess.on('exit', (code: any)=> {
      // console.log(code)
       // process.exit();
    })
  } else {
    // If compilation fails, handle the error here
    console.error('Compilation failed' + code);
  }
});

}

module.exports = c;

function replaceString(str: any) {
  if (str.includes('-1a\n')) {
    str = str.replace(/-1a\n/g, "yo");
    return str;
  }
  return false;
}

async function mstr(inputString : any) {
  // Replace all occurrences of '\n' with '\\n'
  // inputString = inputString.replace(/\n/g, '\\n');
// const regex = /printf\s*\(([^)]*)\)\s*;\s*(?!(.*\n)*.*fflush\s*\(\s*stdout\s*\)\s*;\s*\n)/g;
// const subst = 'printf($1);\n\tfflush(stdout);\n';
inputString = inputString.replace(/^\s+/mg, '');
const regex = /printf\s*\(([^)]*)\)\s*;\s*(?!(.*\n)*.*(\/\/.*)?(printf\s*\(([^)]*)\)\s*;)?\s*fflush\s*\(\s*stdout\s*\)\s*;\s*\n)/g;
const subst = 'printf($1);\n\tfflush(stdout);\n';

  
inputString = inputString.replace(regex, subst);
inputString = await nton(inputString);
  // Replace all occurrences of 'scanf(any text)' with 'printf("-1a\\n");\n\tfflush(stdout);\n\tscanf(any text which is in previous scanf)'


const scanfRegex = /(?<!\/\/\s*)scanf\(([^)]+)\)/g;
inputString = inputString.replace(scanfRegex, `printf("-1a\\n");\n\tfflush(stdout);\n\tscanf($1)`);
  return inputString;
}

async function nton(inputCode: any) {
  // Regular expression to match double-quoted strings
  const stringRegex = /"([^"\\]|\\.)*"/g;

  // Replace newline characters with \\n within each matched string
  const outputCode = inputCode.replace(stringRegex, function(match: any) {
    return match.replace(/\n/g, '\\n');
  });

  return outputCode;
}


async function handleCFileAdded() {
  // Get all .c files in the directory
  let cFilesDir = './files/'
  
  const cFiles = fs.readdirSync(cFilesDir).filter((file : any) => file.endsWith('.c'));

  // If there are more than 10 .c files, delete the oldest file
  if (cFiles.length > 4) {
    const oldestCFile = getOldestCFile(cFiles);

      return oldestCFile;
  } else {

    let file: any = fs.openSync('./files/cfile' + Math.floor(Date.now()/100000000000) + '.c', 'w');
    console.log(file)
    file.close()
    return 'thisa.c'
  }
}

// Get the oldest .c file in the directory
function getOldestCFile(cFiles: any) {
  let oldestFile = cFiles[0];
  let cFilesDir = './files'
  let oldestFileMtime = fs.statSync(`${cFilesDir}/${oldestFile}`).mtime;

  for (let i = 1; i < cFiles.length; i++) {
    const file = cFiles[i];
    const fileMtime = fs.statSync(`${cFilesDir}/${file}`).mtime;

    if (fileMtime < oldestFileMtime) {
      oldestFile = file;
      oldestFileMtime = fileMtime;
    }
  }

  return oldestFile;
}