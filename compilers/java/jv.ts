import { Telegraf, Context } from "telegraf";
import Hlp from '../../helpers'
let { spawn, spawnSync } = require('child_process');
import fs from "fs"

let h = new Hlp();
const EventEmitter = require('events');
let mid: any = 0;
let editedMes: any = "Output: \n"
let java: any;
let fromId: any = 0;
const ctxemitter = new EventEmitter();
let ErrorMes: any = "Error: \n"
let buff = false
let javaFile: any;
interface Opt {
  code?: any; ter?: Boolean; onlyTerminate?: boolean
}
let cpjvoyojv = async (bot: Telegraf, ctx: any, obj: Opt = {}) => {
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
    let jvout = async (tempdata: any) => {
      let current = Date.now()
      if (previous + 30 > current)
        repeats++
      if (repeats > 5) {
        terminate()
        reply('It seems you are created infinite loop')
        ctx.scene.leave()
        return
      }
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
      // console.log('st: ' + data)
      if (mid == 0) {

        mid = await ctx.reply("" + editedMes)
          .catch(() => { })
      }
      else {
        await bot.telegram.editMessageText(ctx.chat.id, mid.message_id, undefined, editedMes)
          .catch((err) => { console.log(err) })
      }
      ctxemitter.once('ctx', async (ctxx: any) => {
        ctxemitter.removeAllListeners()
        console.log(EventEmitter.listenerCount(ctxemitter, 'ctx'))
        ctxx.deleteMessage().catch(() => { })

        try {
          await java.stdin.write(ctxx.message.text + "\n")
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
      if (java) {
        ctx.reply("Timout: " + ttl * 1000 + " Seconds")
        terminate()
        ctx.scene.leave()
      }
    })


    const regex = /(?<=\bpublic\s+class\s+)(\w+)\s*\{\s*public\s+static\s+void\s+main\s*\(\s*String\[\]\s+\w*\s*\)\s*\{/m;
    const match = code.match(regex)
    if (match) {
      javaFile = match[1];
      console.log('Found main class:' + javaFile);
    } else {
      terminate()
      console.log('No main class found.');
      return ctx.scene.leave()
    }

  try{
    fs.mkdirSync(`./files/java/jv${fromId}jv/`);
    } catch(err: any){}
    
    try{
    fs.writeFileSync(`./files/java/jv${fromId}jv/${javaFile}.java`, code);
    } catch(err: any){}
    
    const { status, stderr } = spawnSync(process.env.JAVAC as any, [`./files/java/jv${fromId}jv/${javaFile}.java`]);

    // try {
    //   fs.unlinkSync(`./files/java/jv${fromId}jv/${javaFile}.java`);
    // } catch (err) { }


    if (status != 0) {
      terminate()
      reply(stderr.toString())
      return ctx.scene.leave()
      // return console.error(stderr.toString());
    } else {
      // const { stdout } = spawnSync(`./files/java/jv${fromId}jv/${javaFile}.class`);
      // console.log(stdout.toString());
    }
 // ['-cp', '/path/to/compiled/class', 'Hello']
    java = spawn(process.env.JAVA as any, ['-cp', `./files/java/jv${fromId}jv/`, javaFile], {
      uid: 1000,
      gid: 1000,
      chroot: './compilers/java',
      maxBuffer: 1024 * 1024, // 1 MB
      env: {}
    });

    java.stdout.on('data', jvout);

    let m = true
    java.stderr.on('data', async (data: any) => {

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
    java.on("error", (err: any) => { console.log(err); terminate(); ctx.scene.leave() })
    java.on('close', (code: any) => {
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
    return java
  } catch (errr: any) {
    console.log(errr)
    ctx.reply("Some Error occoured")
      .then(async (mmm: any) => {
        await h.sleep(10000);
        ctx.deleteMessage(mmm.message_id).catch(() => { })
      }).catch(() => { })
    ctx.scene.leave();
    terminate()
  }
}

module.exports = cpjvoyojv

let terminate = async () => {
  buff = false
  mid = 0
  if (java) {
    java.removeAllListeners()
    await java.kill("SIGKILL")
    java = null
    console.log(java)
  }
  console.log('terminating...')
  if (ctxemitter)
    ctxemitter.removeAllListeners()

  h.sleep(700).then(() => { mid = 0 })

  ErrorMes = "Error: \n"
  editedMes = "Output: \n"

  try {
    if (fs.existsSync(`./files/java/jv${fromId}jv/${javaFile}.class`)) {
      fs.unlinkSync(`./files/java/jv${fromId}jv/${javaFile}.class`);
    }
  } catch (err: any) { }

  try {
    if (fs.existsSync(`./files/java/jv${fromId}jv/${javaFile}.java`)) {
      fs.unlinkSync(`./files/java/jv${fromId}jv/${javaFile}.java`);
    }
  } catch (err: any) { }

  try{
  fs.rmSync(`./files/java/jv${fromId}jv/`, { recursive: true });
  } catch (err){}
  
  if (fs.existsSync(`./compilers/java/jv${fromId}jv.ts`)) {
    try {
      fs.unlinkSync(`./compilers/java/jv${fromId}jv.ts`)
    } catch (err: any) { }
  }
  await h.sleep(700)
  return
}