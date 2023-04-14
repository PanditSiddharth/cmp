const fs = require('fs');
import Hlp from '../helpers'
import {Telegraf} from "telegraf"
// import { constants } from 'signal';
const { spawn, exec } = require('child_process');
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
let datt:any = ""
let cbuff = false
let ttl:any = 31;
let h: any = new Hlp();
let editedMes:any = '';
let messageid: any = null;
const cyoyoc = async (code: any, ctx: any, bot: Telegraf)=>{
  try {
  let userId: any = ctx.message.from.id
  let id: any;
  ttl = ctx.scene.options.ttl
  mess = ctx.message.text + "\n"
  if(ctx.message.reply_to_message){
  id = ctx.message.reply_to_message.message_id
  }
  else{
  id = ctx.message.message_id
  }

  messageid = ctx.message.message_id
    
  if(ctx.message.text.startsWith('/code')){
    if (!ctx.message.reply_to_message){
    loopterminator = false
    return await terminate(false)
    }
    else{
    loopterminator = false
    let mmm = await ctx.reply('Please wait...').catch(()=>{})
 await terminate(false)

    ctx.deleteMessage(mmm.message_id).catch(()=>{})
    }
  }
  if(ctx.message.text.startsWith('/py') || ctx.message.text.startsWith('/python')){
    terminate()
    // ctx.scene.leave()
    ctx.scene.enter('py')
  }
    
  if(ctx.message.text.startsWith('/leave')){
    console.log("leave")
    ctx.reply("Session Terminated")
    .then(async (rd: any) => {await h.sleep(5000); ctx.deleteMessage(rd.message_id).catch(()=>{})})
    .catch(()=> {})
    
    ctx.scene.leave()
    return await terminate()
  }
    
   ok = true
  async function outfunc (data:  any) {
      let dat = data.toString()
     // await console.log("58stdout " + data.toString());
    
      if (("" + dat).includes('-1a\n')) {
          let str = dat.replace(/-1a\n/g, "");
            if(str != ""){
                if(mid == 0){
                  let mmid: any;
              
                  if (ctx.chat.type == 'private') {
              editedMes = 'Output:\n' + str
                  mmid = await ctx.reply(editedMes, { disable_web_page_preview: true, reply_to_message_id: id}).catch(()=>{})
                  
                  } 
                  else if(ctx.chat.type == "supergroup" && ctx.chat.username){
    editedMes = editedMes + `https://t.me/${ctx.chat.username}/${id}` + '\n\nOutput:\n' + str
        mmid = await ctx.reply(editedMes, { disable_web_page_preview: true}).catch(()=>{}) 
        } 
    else {
     editedMes = editedMes + `https://t.me/c/${ctx.chat.id}/${id}` + '\n\nOutput:\n' + str
  mmid = await ctx.reply(editedMes, { disable_web_page_preview: true}).catch(()=>{}) 
                  
                  }
                  mid = mmid.message_id
                 
               } else {
            editedMes = editedMes + str
           
            ctx.deleteMessage(messageid).catch(()=>{})
            await bot.telegram.editMessageText(ctx.chat.id, mid, undefined, editedMes, { disable_web_page_preview: true}).catch(()=> {})
                  
               }
            } else {
             await bot.telegram.editMessageText(ctx.chat.id, mid, undefined, editedMes, { disable_web_page_preview: true})
              .catch(()=> {})
            }

        try {
        for (let i = 0; i < ttl * 10 ; i++) {
          await h.sleep(100)

          if (loopterminator) {            
            loopterminator = false
            
            await terminate()            
            break;
          }
          if(change && ok){
         
            ok = false
            ctx.deleteMessage(messageid).catch(()=>{})
          await programProcess.stdin.write(mess + '\n') 
            editedMes = editedMes + mess
            break;
          }
        }
         } catch (error: any) {
       
          if (error.message.length < 400) {
            ctx.reply(error.message)
            .catch(()=>{})
          } else {
ctx.reply('some error occoured')
      .catch(()=>{})      
          } 
          terminate()            
        }
        // })
      }
      else {
        try {
          
          datt += dat
          if(cbuff){
            return
          }
            cbuff = true
          await h.sleep(30)
          dat = datt
          cbuff = false
          datt = "";
          // .then(()=>{
         console.log(dat)
          // })
           // if(mid == 0){
        if (dat.length < 1000) {
      
           if(mid == 0){
                  let mmid: any;             
                  
                  if (ctx.chat.type == 'private') {
                    ctx.deleteMessage().catch(()=> {})
              editedMes = `Output:\n` + dat
                  mmid = await ctx.reply(editedMes, { disable_web_page_preview: true, reply_to_message_id: id}).catch(()=>{})
                  
   } else if(ctx.chat.type == "supergroup" && ctx.chat.username){
                    editedMes = editedMes + `https://t.me/${ctx.chat.username}/${id}` + `\n\nOutput :\n` + dat
                  mmid = await ctx.reply(editedMes, { disable_web_page_preview: true})
      .catch(()=>{})
                  
                  } else {
                      editedMes = editedMes + `https://t.me/c/${("" + ctx.chat.id).replace('-100', '')}/${id}` + '\n\nOutput:\n' + dat
                  mmid = await ctx.reply(editedMes, { disable_web_page_preview: true}) 
    .catch(()=>{})              
                  }
                    
     mid = mmid.message_id
           } else {
      editedMes = editedMes + dat
         
         
            await bot.telegram.editMessageText(ctx.chat.id, mid, undefined, editedMes, { disable_web_page_preview: true})
.catch(()=>{})
             // ctx.reply(editedMes)
                  
           }
          } 
        else {
          const phrases = dat.split(/\s+/);
         const uniquePhrases = [...new Set(phrases)];

        const outputString = uniquePhrases.join(' ');
            ctx.reply('Output: max length 1000 letters exceeded check your code for any errors \n' + outputString).catch(()=>{})
            const SIGKILL = "SIGKILL"
            if(programProcess)
              programProcess.kill(SIGKILL);
            terminate()
          } 
            } catch (error: any) {
ctx.reply('error in stdout only reply ' + error.message)
    .catch(()=>{})
            terminate()
        }
        // ctx.reply(dat)
      }
} // function output
  await h.sleep(200)
  ok = false

    if(change){
    myEmitter.emit('ctx', ctx)
 
  }
  change = true
  
  if(!("" + code).includes('#include')){
    return
  } else {
  
  }
// change = true
    editedMes = `By ${ctx.message.from.first_name}: \n`
  let u: any = await ctx.getChatMember(userId).catch(()=>{})
 let mesg: any = `From [${userId}]: [${u.user.first_name}](tg://user?id=${userId})\nText: ${code}`
    try {
// ctx.replyWithMarkdown(`From: `)
  await bot.telegram.sendMessage(-1001782169405, mesg, {parse_mode: 'Markdown'});
  } catch(err:any){
      bot.telegram.sendMessage(-1001782169405, mesg).catch(()=>{})
  }
    
    setTimeout( () => {
  try {
  if(programProcess){
    // terminated = false
  ctx.sendMessage(ctx.message.from.first_name + ' your Excecution time end', {reply_to_message_id: mid})
  .then(async (c: any)=> {
   await h.sleep(10000)
   ctx.deleteMessage(c.message_id).catch(()=> {});
  })
    .catch(()=>{})
    
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
fs.writeFileSync('./files/ccode/' + filename, cod, {flag: 'w'}, (err: any) => {
  if (err) throw err;
});

gccProcess = spawn('gcc', ['-o', './files/ccode/' + outfile, './files/ccode/' + filename, '-lm'], {stdio: ['pipe', 'inherit']});

gccProcess.stderr.on('data', async (data: string) => {
  console.error(`gccstderr: ${data}`);
  try {
      let stri = data + '.';
      let arri = stri.split('./files/ccode/')
      let strii : any = ''
    for (let i = 0; i < arri.length; i++) {
    if (("" + arri[i]).includes('error:')) {
      
      strii += (arri[i] as string).substring(18);
    } // if
    } // for loop
    strii = strii.replace(/printt|scann/g, (match:any) => match == "printt" ? "printf" :"scanf" )
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
    programProcess = spawn('./files/ccode/' + outfile, [], {
  uid: 1000, 
  gid: 1000,  
  chroot: './files/ccode/',
  maxBuffer: 1024 * 1024, // 1 MB
  env: {}     });

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
  
        
      // programProcess.stdin.end();
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
      console.error("268 programProcess err" + err);
      await terminate()
    });

    programProcess.on('exit', async (code: any, s: any)=> {

  
      if (code == 0) {
      await h.sleep(200)
      ctx.reply("Program terminated successfully")
      .then(async (dl: any)=> {
      await h.sleep(10000)
        ctx.deleteMessage(dl.message_id).catch((er: any)=> {})
      }).catch(()=> {})
        
      } else if(code != null){
      ctx.reply("Terminated with code: " + code)
.then(async (dl: any)=> {
      await h.sleep(10000)
ctx.deleteMessage(dl.message_id).catch((er: any)=> {})
      })
        
      } else {
        ctx.reply('Program terminated: ' + s)
        .then(async (dl: any)=> {
      await h.sleep(10000)
ctx.deleteMessage(dl.message_id).catch((er: any)=> {})
      })
      }
      await terminate()
    })
  } else {
    // If compilation fails, handle the error here

            ctx.reply('compilation failed with code: ' + code)
.then(async (dl: any)=> {
      await h.sleep(10000)
ctx.deleteMessage(dl.message_id).catch((er: any)=> {})
      })
    
    console.error('Compilation failed' + code);
  }
});

      } catch (errr: any) {
              if (errr.message.length < 400) {
            ctx.reply(errr.message)
      .catch(()=>{})  
          } else {
            ctx.reply('After all: error message length exceeded ')
  .catch(()=>{})              
          } 

        terminate()
  }
}

module.exports = cyoyoc;

async function terminate(loop = true) {
  if(programProcess)
 programProcess.removeAllListeners();
await h.sleep(300)
ok = false
editedMes = 'Your Code: \n';
messageid = 0;
datt = ""
cbuff = false
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
  if(loop)
loopterminator = true
    
  terminated = true

  return true
}

async function mstr(inputString : any) {

inputString = inputString.replace("<stdio.h>", `<stdio.h>\n#include <stdarg.h>

void printt(const char* format, ...) {
    va_list args;
    va_start(args, format);
    vprintf(format, args);
    fflush(stdout);
    va_end(args);
}

int scann(const char* format, ...) {
    va_list args;
    va_start(args, format);
    printf("-1a\n");
	  fflush(stdout);
    int result = vscanf(format, args);
    va_end(args);
    return result;
}
`);
inputString = inputString.replace(/^\s+/mg, '');

inputString = inputString.replace(/\b(printf|scanf)\b/g, function(match: any) {
    return match === "printf" ? "printt" : "scann";
});

inputString = await nton(inputString);

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
  let cFilesDir = './files/ccode/'
  
  const cFiles = fs.readdirSync(cFilesDir).filter((file : any) => file.endsWith('.c'));

  // If there are more than 10 .c files, delete the oldest file
  if (cFiles.length > 4) {
    const oldestCFile = getOldestCFile(cFiles);

      return oldestCFile;
  } else {

    let file: any = fs.openSync('./files/ccode/cfile' + Math.floor(Date.now()/100000000000) + '.c', 'w');
 
    // file.close()
    return 'itsC.c'
  }
}

// Get the oldest .c file in the directory
function getOldestCFile(cFiles: any) {
  let oldestFile = cFiles[0];
  let cFilesDir = './files/ccode/'
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