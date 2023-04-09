import { Telegraf, Context } from "telegraf";
import Hlp from '../../helpers'
let { spawn, spawnSync } = require('child_process');
import fs from "fs"

let h = new Hlp();
const EventEmitter = require('events');
let mid: any = 0;
let editedMes: any = "Output: \n"
let cplus: any;
let fromId: any = 0;
const ctxemitter = new EventEmitter();
let ErrorMes: any = "Error: \n"

interface Opt {
  code?: any; ter?: Boolean; onlyTerminate?: boolean
}
let cpcppoyocpp = async (bot: Telegraf, ctx: any, obj: Opt = {}) => {
  // obj = obj || {}
  let code = obj.code || false
  let ter = obj.ter || false
  let onlyTerminate = obj.onlyTerminate || false

  try {
    if (onlyTerminate)
      return await terminate()
    if (ter)
      await terminate()
    if (ctx.message.text.startsWith('/code')) {
      terminate()
      // ctx.scene.leave()
      ctx.scene.enter('code')
    }

    if (("" + ctx.message.text).startsWith("/leave")) {
      reply('Session terminated')

      terminate()
      return ctx.scene.leave()
    }

    let cppout = async (data: any) => {

      // console.log('st: ' + data)
      if (mid == 0) {
        editedMes += data
        mid = await ctx.reply("" + editedMes)
          .catch(() => { })
      }
      else {

        editedMes += data
        await bot.telegram.editMessageText(ctx.chat.id, mid.message_id, undefined, editedMes)
          .catch((err) => { console.log(err) })
      }
      ctxemitter.once('ctx', async (ctxx: any) => {
    ctxemitter.removeAllListeners()
        console.log(EventEmitter.listenerCount(ctxemitter, 'ctx'))
        ctxx.deleteMessage().catch(() => { })

        try {
          await cplus.stdin.write(ctxx.message.text + "\n")
        } catch (err: any) { console.log(err) }
        editedMes += ctxx.message.text + "\n"
        console.log('yes')
      });
    }

    if (!code) {
      return await ctxemitter.emit('ctx', await (ctx));
    }

    code = code.replace(/\u00A0/mg, ' ')
    let ttl = ctx.scene.options.ttl
    fromId = ctx.message.from.id

    h.sleep(ttl * 1000).then(() => {
      code = false
      if (cplus) {
        ctx.reply("Timout: " + ttl * 1000 + " Seconds")
        terminate()
        ctx.scene.leave()
      }
    })

fs.writeFileSync(`./files/cplus/cpt${fromId}cpt.cpp`, code);

const { status, stderr } = spawnSync('g++', ['-o', `./files/cplus/cpp${fromId}cpp.out`, `./files/cplus/cpt${fromId}cpt.cpp`]);

    try{
fs.unlinkSync(`./files/cplus/cpt${fromId}cpt.cpp`);
    } catch(err){}
      
    
if (status != 0) {
  terminate()
  reply(stderr.toString())
  return ctx.scene.leave()
   // return console.error(stderr.toString());
} else {
  // const { stdout } = spawnSync(`./files/cplus/cpp${fromId}cpp.out`);
  // console.log(stdout.toString());
}

cplus = spawn(`./files/cplus/cpp${fromId}cpp.out`, [], {
      uid: 1000,
      gid: 1000,
      chroot: './compilers/cplus',
      maxBuffer: 1024 * 1024, // 1 MB
      env: {}
    });

    cplus.stdout.on('data', cppout);

    let m = true
    cplus.stderr.on('data', async (data: any) => {

      if (mid == 0 && m) {
        m = false
        ErrorMes = ErrorMes + data
        reply("" + ErrorMes, 30)
      }
      else {
        ErrorMes = ErrorMes + data
        bot.telegram.editMessageText(ctx.chat.id, mid.message_id, undefined, ErrorMes)
          .then(async (mmm: any) => {
            await h.sleep(30000);
            ctx.deleteMessage(mmm).catch(() => { })
          }).catch(() => { })

      }

      await h.sleep(10)
      ctx.scene.leave();
      terminate()
    });

    code = false
    cplus.on("error", (err: any) => { console.log(err); terminate(); ctx.scene.leave() })
    cplus.on('close', (code: any) => {
      if (code == 0) {
        reply('Program terminated successfully')

      } else {
        reply('Program terminated unsuccessfully')
      }
      ctx.scene.leave();
      terminate()
    });

    async function reply(mss: any, tim: any = 10) {
      return await ctx.reply(mss).then(async (mi: any) => {
        await h.sleep(tim * 1000)
        return await ctx.deleteMessage(mi.message_id).catch((err: any) => { })
      })
        .catch((err: any) => { })
    }
    return cplus
  } catch (errr: any) {
    ctx.reply("Some Error occoured")
      .then(async (mmm: any) => {
        await h.sleep(10000);
        ctx.deleteMessage(mmm.message_id).catch(() => { })
      }).catch(() => { })
    ctx.scene.leave();
    terminate()
  }
}

module.exports = cpcppoyocpp

let terminate = async () => {

  mid = 0
  if (cplus) {
    cplus.removeAllListeners()
    await cplus.kill("SIGKILL")
    cplus = null
    console.log(cplus)
  }
  console.log('terminating...')
  if (ctxemitter)
    ctxemitter.removeAllListeners()

  h.sleep(700).then(() => { mid = 0 })

  ErrorMes = "Error: \n"
  editedMes = "Output: \n"

    try {
    if (fs.existsSync(`./files/cplus/cpp${fromId}cpp.out`)) {
   fs.unlinkSync(`./files/cplus/cpp${fromId}cpp.out`);
    }
    } catch (err: any) { }

    try {
    if (fs.existsSync(`./files/cplus/cpt${fromId}cpt.cpp`)) {
   fs.unlinkSync(`./files/cplus/cpt${fromId}cpt.cpp`);
    }
    } catch (err: any) { }
  
  
  if (fs.existsSync(`./compilers/cplus/cpp${fromId}cpp.ts`)) {
    try {
      fs.unlinkSync(`./compilers/cplus/cpp${fromId}cpp.ts`)
    } catch (err: any) { }
  }
  await h.sleep(700)
  return
}