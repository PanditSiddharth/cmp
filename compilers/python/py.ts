import { Telegraf, Context } from "telegraf";
import Hlp from '../../helpers'
let { spawn } = require('child_process');
import fs from "fs"

let h = new Hlp();
const EventEmitter = require('events');
let mid: any = 0; 
let editedMes: any = "Output: \n"
let python: any;
let fromId: any = 0;
const ctxemitter = new EventEmitter();
let ErrorMes: any = "Error: \n"
let pyyoyopy = async (bot: Telegraf, ctx: any, code: any = false) => {

    try {

      if(("" + ctx.message.text).startsWith("/leave")){
        terminate()
        return ctx.scene.leave()
      }
    
  let pyout = async (data: any) => {
    console.log('st: ' + data)
    if(mid == 0){
    editedMes += data
    mid = await ctx.reply("" + editedMes)
    .catch(()=> {})
    }
    else{
    editedMes += data
    await bot.telegram.editMessageText(ctx.chat.id, mid.message_id, undefined, editedMes)
    .catch((err)=> {console.log(err)})
    console.log(`stdout: ${data}`);
    }
    ctxemitter.on('ctx', (ctxx:any) => {
    python.stdin.write(ctxx.message.text + "\n")
    editedMes += ctxx.message.text + "\n"
      console.log('yes')
    });
  }
  
  if(!code){
    console.log('code not exists')
  return ctxemitter.emit('ctx', (ctx));
  }
      
  let ttl = ctx.scene.options.ttl
      
  h.sleep(ttl * 1000).then(()=> {if (python) {
    ctx.reply("Timout: " + ttl * 1000 + " Seconds")
  }})
      
  fromId = ctx.message.from.id
  python = spawn(process.env.PYTHON as any, ['-c', code], {
  uid: 1000, 
  gid: 1000,  
  chroot: './compilers/python',
  maxBuffer: 1024 * 1024, // 1 MB
  env: {}   
  });

  python.stdout.on('data', pyout);

let m = true
  python.stderr.on('data',async (data: any) => {
    await h.sleep(100);
    if(mid == 0 && m){
      m = false
    ErrorMes = ErrorMes + data
    ctx.reply("" + ErrorMes)
    .then(async (mmm: any)=> {mid = mmm.message_id; await h.sleep(30000);
    ctx.deleteMessage(mmm.message_id).catch(()=> {})}).catch(()=> {})
    }
    else{
     ErrorMes = ErrorMes + data
    bot.telegram.editMessageText(ctx.chat.id, mid.message_id, undefined, ErrorMes)
    .then(async (mmm: any)=> {await h.sleep(30000);
    ctx.deleteMessage(mmm.message_id).catch(()=> {})}).catch(()=> {})
    // console.log(`stdout: ${data}`);
    }
    
    await h.sleep(10)
    ctx.scene.leave();
    terminate()
  });
      
  code = false
  python.on("error", (err: any) => {console.log(err); terminate(); ctx.scene.leave()})
  python.on('close', (code: any) => {
    if(code == 0){
      ctx.reply('Program terminated successfully')
      .then(async (mmm: any)=> {await h.sleep(10000);
      ctx.deleteMessage(mmm.message_id).catch(()=> {})}).catch(()=> {})
    } else {
      ctx.reply('Program terminated unsuccessfully')
      
    }
    ctx.scene.leave();
    terminate()
  });
    return python
        } catch (errr: any) {
    ctx.reply("Some Error occoured")
    .then(async (mmm: any)=> {await h.sleep(10000);
    ctx.deleteMessage(mmm.message_id).catch(()=> {})}).catch(()=> {})
      ctx.scene.leave();
     terminate()
    }
}

module.exports = pyyoyopy

let terminate = async () => {
  if (python) {
    python.removeAllListeners()
    await python.kill("SIGKILL")
    python = null
    console.log(python)
  }
  console.log('terminating...')
  if (ctxemitter) 
    ctxemitter.removeAllListeners()

// h.sleep(100).then(()=> {mid = 0})
  mid = 0
ErrorMes = "Error: \n"
editedMes = "Output: \n"
  
    if (fs.existsSync(`./compilers/python/py${fromId}py.ts`)) {
      try {
        fs.unlinkSync(`./compilers/python/py${fromId}py.ts`)
      } catch (err: any) { }
}
}