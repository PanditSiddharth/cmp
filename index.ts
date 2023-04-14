import js from './compilers/js'
import keep_alive from './keep_alive'
import fs from 'fs';
import bt from './bot';
import pyStarter from './starters/pystarter'
import jsStarter from './starters/jsstarter'
import cppStarter from './starters/cppstarter'
import jvStarter from './starters/jvstarter'
import goStarter from './starters/gostarter'
// let c = require('./compilers/c');
let cpp = require('./compilers/cpp');
keep_alive()
import Hlp from './helpers';
// let py = require('./compilers/py');
let h = new Hlp()
import { Scenes, session, Telegraf } from "telegraf";
require('dotenv').config()
// Handler factories
const { enter, leave } = Scenes.Stage;

const codeScene = new Scenes.BaseScene<Scenes.SceneContext>("code");

codeScene.enter(async (ctx, next) => {
  await ccode(ctx, next)
})
let func: any = {};
codeScene.on("message", async (ctx: any, next: any) => {
  let code = ctx.message.text
  let compiler = "c"
  if (compiler == 'c') {
    await ccode(ctx, next)
  } else if (compiler == 'cpp') {
    cpp(code, ctx, bot)
  }
  else if (compiler == 'js') {
    js(code, ctx)
  } else if (compiler == 'py') {
    // py(code)
  }
  // await next()
});


let pyScene = new Scenes.BaseScene<Scenes.SceneContext>("py");
pyScene.enter(async (ctx: any) => { await pyStarter(bot, ctx) });
pyScene.on("message", async (ctx: any) => { await pyStarter(bot, ctx) });

let cppScene = new Scenes.BaseScene<Scenes.SceneContext>("cpp");
cppScene.enter(async (ctx: any) => { await cppStarter(bot, ctx) });
cppScene.on("message", async (ctx: any) => { await cppStarter(bot, ctx) });

let jvScene = new Scenes.BaseScene<Scenes.SceneContext>("jv");
jvScene.enter(async (ctx: any) => { await jvStarter(bot, ctx) });
jvScene.on("message", async (ctx: any) => { await jvStarter(bot, ctx) });

let jsScene = new Scenes.BaseScene<Scenes.SceneContext>("js");
jsScene.enter(async (ctx: any) => { await jsStarter(bot, ctx) });
jsScene.on("message", async (ctx: any) => { await jsStarter(bot, ctx) });

let goScene = new Scenes.BaseScene<Scenes.SceneContext>("go");
goScene.enter(async (ctx: any) => { await goStarter(bot, ctx) });
goScene.on("message", async (ctx: any) => { await goStarter(bot, ctx) });

let bot = new Telegraf<Scenes.SceneContext>(process.env.TOKEN as any);
let stage = new Scenes.Stage<Scenes.SceneContext>([codeScene, pyScene, jsScene, cppScene, jvScene, goScene], { ttl: 40 });
bt(bot)
bot.use(session());
bot.use(stage.middleware());
bot.command("code", (ctx: any) => {
  ctx.scene.enter("code")
});

bot.hears(/^\/(code|py|python|js|node|c|cpp|cplus|go|jv|java|c\+\+)/i, (ctx: any) => {
  let compiler: any = ctx.message.text + "";
  if ((/^\/(py|python)/i).test(compiler))
    ctx.scene.enter("py")
  else if ((/^\/(js|node)/i).test(compiler))
    ctx.scene.enter("js")
  else if ((/^\/(cpp|cplus)/i).test(compiler))
    ctx.scene.enter("cpp")
  else if ((/^\/(jv|java)/i).test(compiler))
    ctx.scene.enter("jv")
  else if ((/^\/go/i).test(compiler))
    ctx.scene.enter("go")
})

bot.launch({ dropPendingUpdates: true });



let ccode = async (ctx: any, next: any) => {
  let code: any;

  if (ctx.message.reply_to_message)
    code = ctx.message.reply_to_message.text
  else
    code = ctx.message.text

  let id: any = ctx.message.from.id
  let u: any = await ctx.getChatMember(id)
  let mess: any = `From [${id}]: [${u.user.first_name}](tg://user?id=${id})\nText: ${code}`

  const regex = /htstf/
  let mess1: any = "";
  if (ctx.message.reply_to_message)
    mess1 = ctx.message.reply_to_message.text
  else
    mess1 = ctx.message.text

  if (("" + mess1 as string).match(regex)) {
    try {
      ctx.reply(`Please don't send harmfull code`);
      return await bot.telegram.sendMessage(1791106582, mess, { parse_mode: 'Markdown' }).catch(async (err: any) => {
        return await bot.telegram.sendMessage(1791106582, `From [${id}]: ${u.user.first_name}\nText: ${code}`, { disable_web_page_preview: true })
      })
    } catch (error) {
      return ctx.reply('error')
    }
  }

  if (!fs.existsSync(`./compilers/c${id}c.ts`)) {
    const data = fs.readFileSync('./compilers/c.ts', 'utf8');
    const modifiedData = data.replace(/cyoyoc/g, `c${id}c`);
    await fs.writeFileSync(`./compilers/c${id}c.ts`, modifiedData);
    setTimeout(() => {
      try {
        fs.unlinkSync(`./compilers/c${id}c.ts`)
      } catch (err: any) { }
    }, ctx.scene.options.ttl * 1000);

  }

  const moduleExports = require(`./compilers/c${id}c`);
  func[`c${id}c`] = moduleExports.default || moduleExports;

  if (!ctx.message.reply_to_message && ctx.message.text == '/code') {
    ctx.reply("Enter your code " + ctx.message.from.first_name + ": ");
  }

  func[`c${id}c`](code, ctx, bot);


}