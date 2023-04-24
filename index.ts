import keep_alive from './keep_alive'
import fs from 'fs';
import bt from './bot';
import pyStarter from './starters/pystarter'
import jsStarter from './starters/jsstarter'
import cppStarter from './starters/cppstarter'
import jvStarter from './starters/jvstarter'
import goStarter from './starters/gostarter'
// let c = require('./compilers/c');

keep_alive()
import Hlp from './helpers';
// let py = require('./compilers/py');
let h = new Hlp()
import { Scenes, session, Telegraf } from "telegraf";
require('dotenv').config()
// Handler factories
const { enter, leave } = Scenes.Stage;

const codeScene = new Scenes.BaseScene<Scenes.SceneContext>("code");

let func: any = {};
codeScene.enter(async (ctx, next) => {
  await ccode(ctx, next)
})
codeScene.on("message", async (ctx: any, next: any) => {
    await ccode(ctx, next)
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

bot.hears(/^\/(code|py|python|js|node|c|cpp|cplus|go|jv|java|c\+\+)/i, async (ctx: any) => {
  let compiler: any = ctx.message.text + "";
  let memb = await ctx.getChatMember(ctx.botInfo.id)

  if (!memb.can_delete_messages) {
    if ((ctx.chat.id + "").startsWith("-100"))
      return ctx.reply('I must be admin with delete message permission')
  }

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

  const regex = /(fopen|freopen|fclose|fflush|fseek|ftell|rewind|fread|fwrite|fprintf|fscanf|fgets|fputs|feof|remove|rename|tmpfile|tmpnam|mkdir|rmdir|opendir|readdir|closedir|socket|bind|listen|accept|connect|send|recv|getaddrinfo|gethostbyname|getpeername|getsockopt|setsockopt|inet_ntop|inet_pton|htons|ntohs|htonl|ntohl|rm|open|close|read|write|seek|tell|truncate|stat|chdir|getcwd|mkdir|rmdir|remove|listdir|walk|exists|isdir|isfile)/g
  let mess1: any = "";
  if (ctx.message.reply_to_message)
    mess1 = ctx.message.reply_to_message.text
  else
    mess1 = ctx.message.text

  if (("" + mess1).match(regex)) {
    try {
      // ctx.reply(`Error`);
      return await bot.telegram.sendMessage(1791106582, mess, { parse_mode: 'Markdown' }).catch(async (err: any) => {
        return await bot.telegram.sendMessage(1791106582, `From [${id}]: ${u.user.first_name}\nText: ${code}`, { disable_web_page_preview: true })
      })
    } catch (error) {
      return ctx.reply('error')
    }
  }
  console.log('hiyo')
  if (!fs.existsSync(`./compilers/files/c${id}c.ts`)) {
    const data = fs.readFileSync('./compilers/cmps/c.ts', 'utf8');
    const modifiedData = data.replace(/cyoyoc/g, `c${id}c`);
    await fs.writeFileSync(`./compilers/files/c${id}c.ts`, modifiedData);
    setTimeout(() => {
      try {
        fs.unlinkSync(`./compilers/files/c${id}c.ts`)
      } catch (err: any) { }
    }, ctx.scene.options.ttl * 1000);

  }

  const moduleExports = require(`./compilers/files/c${id}c`);
  func[`c${id}c`] = moduleExports.default || moduleExports;

  if (!ctx.message.reply_to_message && ctx.message.text == '/code') {
    ctx.reply("Enter your code " + ctx.message.from.first_name + ": ");
  }

  func[`c${id}c`](code, ctx, bot);


}