const fs = require('fs');
import Hlp from '../helpers'
import {Telegraf} from "telegraf"

const { spawn } = require('child_process');
let change = false;
let mid = 0;
let programProcess: any = null;
let gccProcess: any = null;
let mess: any;
let terminated: any = false
let loopterminator: any = false
const EventEmitter = require('events');
// Create a new EventEmitter instance
const myEmitter = new EventEmitter();
let ok = false
let ttl:any = 31;
let h: any = new Hlp();
let editedMes:any = 'Input: \n';
let messageid: any = null;
const cyoyoc = async (code: any, ctx: any, bot: Telegraf)=>{
  try {
  if(ctx.message.text.startsWith('/leave') || ctx.message.text.startsWith('/leave')){
    if(programProcess){
      programProcess.removeAllListeners()
      gccProcess.removeAllListeners()
    }
    ctx.scene.leave()
    return await terminate()
  }
  ttl = ctx.scene.options.ttl
  mess = ctx.message.text + "\n"
  messageid = ctx.message.message_id
    // console.log(ctx)
   ok = true
  async function outfunc (data:  any) {
      let dat = data.toString()
      await console.log(data.toString());
    
      if (dat.includes('-1a\n')) {
          let str = dat.replace(/-1a\n/g, "");
            if(str != ""){
                if(mid == 0){
            editedMes = editedMes + mess + '\n\nOutput:\n' + str
            ctx.deleteMessage()
                let mmid = await ctx.reply(editedMes)
                  mid = mmid.message_id
                  // console.log(messs)
              // mid = ctx.message.message_id
               } else {
            editedMes = editedMes + str
                console.log(messageid)
            ctx.deleteMessage(messageid)
            bot.telegram.editMessageText(ctx.chat.id, mid, undefined, editedMes)
                  
               }
            }
        // myEmitter.on("ctx", async (ctx: any) => {
          // console.log(ctx.message)
        try {
        for (let i = 0; i < ttl * 10 ; i++) {
          await h.sleep(100)
            console.log('running ' + i)
          if (loopterminator) {
          console.log(gccProcess.kill())
            loopterminator = false
            console.log('yeeeeeeeeees ' + i)
        
            // programProcess.kill();

            break;
          }
          if(change && ok){
            console.log('yes')
            ok = false
          await programProcess.stdin.write(mess + '\n') 
            editedMes = editedMes + mess
            break;
          }
        }
         } catch (error: any) {
          console.log(error.message)
          if (error.message.length < 400) {
            ctx.reply(error.message)
          } else {
            ctx.reply('some error occoured');
          } 
          terminate()
        }
        // })
      }
      else {
        try {
           // if(mid == 0){
        if (dat.length < 500) {
           if(mid == 0){
        editedMes = editedMes + mess + '\n\nOutput:\n' + dat
            let hmid = await ctx.reply(editedMes)
             mid = hmid.message_id
           } else {
            editedMes = editedMes + dat
            // console.log(messageid)
            ctx.deleteMessage(messageid)
            bot.telegram.editMessageText(ctx.chat.id, mid, undefined, editedMes)
                  
           }
          } else {
          const phrases = dat.split(/\s+/);
         const uniquePhrases = [...new Set(phrases)];

        const outputString = uniquePhrases.join(' ');
            ctx.reply('Output: max length 500 letters exceeded check your code for any errors \n' + outputString);
            terminate()
          } 
            } catch (error) {
          ctx.reply('error in stdout only reply')
            terminate()
        }
        // ctx.reply(dat)
      }
}
  await h.sleep(200)
  ok = false

    if(change){
    myEmitter.emit('ctx', ctx)
    // console.log(typeof(code))
  }
  change = true
  
  if(!code.includes('#include')){
    console.log('yoooooooooooo')
    return
  } else {
    // console.log('yes commed')
  }
// change = true

    setTimeout(() => {
  try {
  if(!terminated){
    terminated = false
  ctx.sendMessage('Excecution time up')
  }
  programProcess.kill(); 
  } catch (error) { }
}, ttl * 1000);
    
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


gccProcess = spawn('gcc', ['-o', './files/' + outfile, './files/' + filename, '-lm'], {stdio: ['pipe', 'inherit']});


gccProcess.stderr.on('data', async (data: any) => {
  console.log("stderrgcc")
  // await terminate()
})
gccProcess.on('close', async (code: any) => {
  if (code === 0) {
    
    // If compilation succeeds, execute the program
    programProcess = spawn('./files/' + outfile);

    let inputCount = 0;

programProcess.stderr.on('data', async (data: any) => {
  console.error(`stderr: ${data}`);
  // await terminate()
          if (data.length < 400) {
            ctx.reply(data)
          } else {
            ctx.reply('stderror occured in code')
          } 
});

    programProcess.stdout.on('data', outfunc)

    programProcess.on('close', async (code : any) => {
      try {
      console.log('program terminated');   
      programProcess.stdin.end();
      await h.sleep(200)
      // programProcess.removeAllListeners();
      console.log(programProcess.kill)
      await terminate()
           } catch (error) {
      await terminate()
      }
    })
    
    programProcess.on('error', async (err: any) => {
      // Handle the error here
        if (err.length < 400) {
            ctx.reply(err)
          } else {
            ctx.reply('error occured in code')
          } 
      console.error("err" + err);
      await terminate()
    });

    programProcess.on('exit', async (code: any)=> {
      // console.log(code)
       // process.exit();
      console.log('exit');
      if (code == 0) {
        
      ctx.reply("Program terminated successfully")
      } else {
      ctx.reply("Terminated with code: " + code)
      }
      await terminate()
    })
  } else {
    // If compilation fails, handle the error here

            ctx.reply('compilation failed with code: ' + code)
          
    console.error('Compilation failed' + code);
  }
});

      } catch (errr: any) {
              if (errr.length < 400) {
            ctx.reply(errr.message)
          } else {
            ctx.reply('Error occoured');
          } 
        terminate()
  }

}

module.exports = cyoyoc;

async function terminate() {
ok = false
editedMes = 'Input: \n';
messageid = null;
change = false;
mid = 0;
programProcess = null;
mess = null
loopterminator = true
  terminated = true
console.log('program terminated')
h.sleep(2000)
.then(()=>{
loopterminator = false;
  // // terminated = false
})
// gccProcess.removeAllListeners();
// programProcess.removeAllListeners()
  return true
}

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
    // file.close()
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