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
let editedMes:any = 'Your Code: \n';
let messageid: any = null;
const c41284431c = async (code: any, ctx: any, bot: Telegraf)=>{
  try {
    let userId: any = ctx.message.from.id
    let id: any = ctx.message.message_id
    
  if(ctx.message.text.startsWith('/leave') || ctx.message.text.startsWith('/code')){
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
      await console.log("41stdout " + data.toString());
    
      if (dat.includes('-1a\n')) {
          let str = dat.replace(/-1a\n/g, "");
            if(str != ""){
                if(mid == 0){
                  let mmid: any;
                  
                  // console.log(ctx.message)
                  if (code.length < 350) {
             ctx.deleteMessage().catch((err:any)=> {console.log("51 delete" + err)})
              editedMes = editedMes + mess + '\n\nOutput:\n' + str
                  mmid = await ctx.reply(editedMes, { disable_web_page_preview: true}) 
              
                  } 
                  else {
                  if (ctx.chat.type == 'private') {
              editedMes = editedMes + `tg://openmessage?user_id=${ctx.chat.id}&message_id=${id}` + '\n\nOutput:\n' + str
                  mmid = await ctx.reply(editedMes, { disable_web_page_preview: true}) 
                  
                  } 
                  else if(ctx.chat.type == "supergroup" && ctx.chat.username){
                    editedMes = editedMes + `https://t.me/${ctx.chat.username}/${id}` + '\n\nOutput:\n' + str
                  mmid = await ctx.reply(editedMes, { disable_web_page_preview: true}) 
                  } 
                  else {
                      editedMes = editedMes + `https://t.me/c/${ctx.chat.id}/${id}` + '\n\nOutput:\n' + str
                  mmid = await ctx.reply(editedMes, { disable_web_page_preview: true}) 
                  
                  }
                    
                  } // if length big
                  mid = mmid.message_id
                  console.log('74: mid assign: ' + mid)
               } else {
            editedMes = editedMes + str
                console.log(messageid + 77)
            console.log('78 deleted ' + await ctx.deleteMessage(messageid))
            await bot.telegram.editMessageText(ctx.chat.id, mid, undefined, editedMes, { disable_web_page_preview: true})
                  
               }
            }
        // myEmitter.on("ctx", async (ctx: any) => {
          // console.log(ctx.message)
        try {
        for (let i = 0; i < ttl * 10 ; i++) {
          await h.sleep(100)
            // console.log('running ' + i)
          if (loopterminator) {
          // console.log(gccProcess.kill())
            
            loopterminator = false
            console.log('93:loop terminating ' + i)
            await terminate()            
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
          console.log('Error in for loop: ' + error.message)
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
                  let mmid: any;
                  // await h.sleep(1000)
                  // console.log(ctx.message)
                  if (code.length < 350) {
             ctx.deleteMessage().catch((err: any) => {
               console.log('136: deletion error' + err)
             })
              editedMes = editedMes + mess + '\n\nOutput:\n' + dat
                  mmid = await ctx.reply(editedMes, { disable_web_page_preview: true}) 
              
                  } else {
                  if (ctx.chat.type == 'private') {
              editedMes = editedMes + `tg://openmessage?user_id=${ctx.chat.id.replace('-100', '')}&message_id=${id}` + '\n\nOutput:\n' + dat
                  mmid = await ctx.reply(editedMes, { disable_web_page_preview: true}) 
                  
                  } else if(ctx.chat.type == "supergroup" && ctx.chat.username){
                    editedMes = editedMes + `https://t.me/${ctx.chat.username}/${id}` + '\n\nOutput:\n' + dat
                  mmid = await ctx.reply(editedMes, { disable_web_page_preview: true}) 
                  
                  } else {
                      editedMes = editedMes + `https://t.me/c/${ctx.chat.id}/${id}` + '\n\nOutput:\n' + dat
                  mmid = await ctx.reply(editedMes, { disable_web_page_preview: true}) 
                  
                  }
                    
                  } // if not length big
                  mid = mmid.message_id
           } else {
            editedMes = editedMes + dat
             console.log(mid)
            console.log(messageid)
            await bot.telegram.editMessageText(ctx.chat.id, mid, undefined, editedMes, { disable_web_page_preview: true})
            ctx.deleteMessage(messageid).catch((err: any)=> {
              console.log('162 delete ' + err)
            })
             // ctx.reply(editedMes)
                  
           }
          } else {
          const phrases = dat.split(/\s+/);
         const uniquePhrases = [...new Set(phrases)];

        const outputString = uniquePhrases.join(' ');
            ctx.reply('Output: max length 500 letters exceeded check your code for any errors \n' + outputString);
            terminate()
          } 
            } catch (error: any) {
          ctx.reply('error in stdout only reply ' + error.message)
            terminate()
        }
        // ctx.reply(dat)
      }
} // function output
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
  let u: any = await ctx.getChatMember(userId)
 let mesg: any = `From [${userId}]: [${u.user.first_name}](tg://user?id=${userId})\nText: ${code}`
    try {
// ctx.replyWithMarkdown(`From: `)
  await bot.telegram.sendMessage(-1001782169405, mesg, {parse_mode: 'Markdown'});
  } catch(err:any){
      bot.telegram.sendMessage(-1001782169405, mesg);
  }
    
    setTimeout( () => {
  try {
  if(!terminated){
    terminated = false
  ctx.sendMessage('Excecution time up')
  }
  terminate()
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

gccProcess.stderr.on('data', async (data: string) => {
  console.error(`gccstderr: ${data}`);
  try {
      let stri = data + '.';
      let arri = stri.split('./files/')
      let strii : any = ''
    for (let i = 0; i < arri.length; i++) {
    if (arri[i].includes('error:')) {
      console.log(arri[i])
      strii += (arri[i] as string).substring(18);
    } // if
    } // for loop
      ctx.reply("" + strii)
      .then(async (msi: any) => {
      setTimeout( () => {
    ctx.deleteMessage(msi.message_id)
    .catch(()=> {})
},30000);
      })
      .catch(()=> {})
      if(strii.length > 20)
        terminate()
  } catch (error) {
    console.log(error)
  }
  // await terminate()
})

gccProcess.on('error', async (data: any) => {
  console.error(`gccerr: `);
  // await terminate()
})
gccProcess.on('close', async (code: any) => {
  if (code === 0) {
    
    // If compilation succeeds, execute the program
    programProcess = spawn('./files/' + outfile, [], {
  uid: 1000, 
  gid: 1000,  
  chroot: './files/',
  maxBuffer: 1024 * 1024, // 1 MB
  env: {}                                                                            
    });

    let inputCount = 0;

programProcess.stderr.on('data', async (data: any) => {
  console.error(`stderr: `);
            if(terminated)
             terminate()
          if (data.length < 400) {
            ctx.reply("" + data)
          } else {
            ctx.reply('stderror occured in code')
          } 
});

    programProcess.stdout.on('data', outfunc)

    programProcess.on('close', async (code : any) => {
      try {
      console.log('program process closed');  
        
      // programProcess.stdin.end();
      await terminate()
           } catch (error) {
      console.log('program process closing');  
        
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
      console.error("268 programProcess err" + err);
      await terminate()
    });

    programProcess.on('exit', async (code: any, s: any)=> {
      // console.log(code)
       // process.exit();
      console.log('275 program process exit ' + s);
      if (code == 0) {
        
      ctx.reply("Program terminated successfully")
      } else if(code != null){
      ctx.reply("Terminated with code: " + code)
      } else {
        ctx.reply('Program terminated: ' + s)
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
              if (errr.message.length < 400) {
            ctx.reply(errr.message)
          } else {
            ctx.reply('After all: error message length exceeded ');
          } 
        console.log('299 terminated because error')
        terminate()
  }

}

module.exports = c41284431c;

async function terminate() {
  if(programProcess)
 programProcess.removeAllListeners();
await h.sleep(3000)
ok = false
editedMes = 'Your Code: \n';
messageid = 0;
change = false;
mid = 0;
if(programProcess){
programProcess.kill();
programProcess = null;
  if(gccProcess){
    gccProcess.removeAllListeners()
    gccProcess = null;
  }
}
mess = null
loopterminator = true
  terminated = true
console.log('328 program terminated')
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

const rege: any = /if\s*\([^{}]*\)\s*[^{;]*;(?!})/g;

inputString = inputString.replace(rege, (match: any) => {
   let lines: any = match.split('\n');
let numLines = lines.length;
  let str: any ;
  if (numLines > 1) {
    str = lines[0] + "{\n" + lines[1] + '\n}'
  } else {
   const ifRegex = /if\s*\((.*?)\)/; // regular expression to match the entire "if" statement
const mtc: any = match.match(ifRegex);
   const substr: any = mtc.input.substring(mtc.index + mtc[0].length + 1);
    if(mtc.input.lastIndexOf(')') == mtc.index + mtc[0].indexOf(')') )
    str = mtc[0] + '{\n' +  substr + '\n}'
    else 
    str = mtc[0] + '){\n' +  substr + '\n}'
      console.log(mtc.input.lastIndexOf(')'))
  }
  return str;
});


                                     
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
    return 'itsC.c'
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