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
let buff = false

interface Opt {
  code?: any; ter?: Boolean; onlyTerminate?: boolean
}
let pyyoyopy = async (bot: Telegraf, ctx: any, obj: Opt = {}) => {
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

    let previous = Date.now()
    let repeats = 0
    let pyout = async (tempdata: any) => {
      console.log(repeats)
      let current = Date.now()
      if (previous + 50 > current)
        repeats++
      if (repeats > 5) {
        terminate()
        reply('It seems you are created infinite loop')
        ctx.scene.leave()
        return
      }

      if (tempdata && tempdata.toString().length > 0)
        editedMes += tempdata.toString()
      // console.log(editedMes)

      if (buff) {
        return
      }
      buff = true
      await h.sleep(2)      
      buff = false
      if (repeats > 10)
        return
      console.log(editedMes)

      // console.log('st: ' + data)
      if (mid == 0) {
        mid = await ctx.reply("" + editedMes)
          .catch(() => { })
      }
      else {
        // editedMes += data
        try {
          await bot.telegram.editMessageText(ctx.chat.id, mid.message_id, undefined, editedMes)
            .catch((err) => { console.log(err) })
        } catch (err: any) { }
      }

      ctxemitter.once('ctx', async (ctxx: any) => {
        console.log(EventEmitter.listenerCount(ctxemitter, 'ctx'))
        ctxx.deleteMessage().catch(() => { })

        try {
          await python.stdin.write(ctxx.message.text + "\n")
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

    h.sleep(ttl * 1000).then(() => {
      code = false
      if (python) {
        ctx.reply("Timout: " + ttl * 1000 + " Seconds")
        terminate()
        ctx.scene.leave()
      }
    })

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
    python.stderr.on('data', async (data: any) => {

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
    python.on("error", (err: any) => { console.log(err); terminate(); ctx.scene.leave() })
    python.on('close', (code: any) => {
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
    return python
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

module.exports = pyyoyopy

let terminate = async () => {

  mid = 0
  buff = false
  if (python) {
    python.removeAllListeners()
    await python.kill("SIGKILL")
    python = null
    console.log(python)
  }
  console.log('terminating...')
  if (ctxemitter)
    ctxemitter.removeAllListeners()

  h.sleep(500).then(() => { mid = 0 })

  ErrorMes = "Error: \n"
  editedMes = "Output: \n"

  if (fs.existsSync(`./compilers/python/py${fromId}py.ts`)) {
    try {
      fs.unlinkSync(`./compilers/python/py${fromId}py.ts`)
    } catch (err: any) { }
  }
  await h.sleep(500)
  return
}