import js from './compilers/js'
// import cc from './cc'
import fs from 'fs';
require('./express')
import bt from "./bot"

// let c = require('./compilers/c');
let cpp = require('./compilers/cpp');
import Hlp from './helpers';
// let py = require('./compilers/py');
let h = new Hlp()
let compiler = 'c'
import { Scenes, session, Telegraf } from "telegraf";
require('dotenv').config()
// Handler factories
const { enter, leave } = Scenes.Stage;
const codeScene = new Scenes.BaseScene<Scenes.SceneContext>("code");

codeScene.enter(async (ctx, next) => {
  await ccode(ctx, next)
})
  let func: any = {};
codeScene.on("message", async (ctx: any, next: any)=> {
  let code = ctx.message.text
  if (compiler == 'c') {
 await ccode(ctx, next)  
} else if(compiler == 'cpp'){
  cpp(code, ctx, bot)
}
 else if(compiler == 'js'){
  js(code, ctx)
} else if(compiler == 'py'){
   // py(code)
}
  // await next()
});

const bot = new Telegraf<Scenes.SceneContext>(process.env.TOKEN as any);
bt(bot as any)
const stage = new Scenes.Stage<Scenes.SceneContext>([codeScene], {
	ttl: 40,
});
bot.use(session());
bot.use(stage.middleware());
bot.start(ctx => ctx.reply(
`* If you are new then please say freely to our developer @PanditSiddharth to give you access for this bot its 100% free

Give me /code command to replying your c code or after /code command you can give me your code

I will excecute your code till 40 seconds

for more enter /help Join @LogicBots for new bots and updates`
));
// bot.help(ctx => ctx.reply('I can compile your c code send me /code command then send your code and you can leave session by /leave command it will excecute 25 seconds i will listen your code which is starts with #include otherwise no response'));
bot.command("code", async (ctx: any) => {
    let jsonString = fs.readFileSync('./data.txt');
     if(JSON.parse(jsonString.toString()).id.indexOf(ctx.message.from.id) != -1)
  ctx.scene.enter("code")
  else {
    let id: any = await ctx.reply('You are not allowed now\nBut can be allowed by @PanditSiddharth 100% free')
  await bot.telegram.sendMessage(1791106582, "By " + (ctx.message.username ? "@" + ctx.message.from.username : ctx.message.from.id + " " + ctx.message.from.first_name))
  await h.sleep(10000)
    try {
    await ctx.deleteMessage(id.message_id)  
    } catch (error) {}
  }
  
});
bot.command("res", ctx => ctx.scene.enter("res"));
// bot.on("message", ctx => ctx.reply("Try /code or /greeter"));

bot.launch({dropPendingUpdates: true});







let ccode = async (ctx: any, next: any) => {
  let code: any;

  if (ctx.message.reply_to_message)
  code = ctx.message.reply_to_message.text
  else 
  code = ctx.message.text
  
  let id: any = ctx.message.from.id
  let u: any = await ctx.getChatMember(id)
  let mess: any = `From [${id}]: [${u.user.first_name}](tg://user?id=${id})\nText: ${code}`

  const regex = /\/bin\/sh|poisixspawn|sys|spawn|libdl|dlfcn|rename|mmap|open|read|write|lseek|close|open|read|write|lseek|close|O_DIRECT|aio_read|aio_write|aio_return|setvbuf|fread|fwrite|fgetc|fputc|ftell|fclose|fseek|feof|fopen|popen|fwrite|fgets|fputs|fread|fread|fprintf|fscanf|remove|stdio_ext|windows|fcntl|execl|exec|libeuv|libev|limits|fork|system\((?:[^)]*(?:(?:rm\s*-rf)|(?:sh\s*-c)|(?:mkfs)|(?:dd))[^)]*)\)/gm;

  if((ctx.message.text as string).match(regex)){
    try {
    ctx.reply(`Please don't send harmfull code`);
      return await bot.telegram.sendMessage(1791106582, mess, {parse_mode: 'Markdown'}).catch(async (err: any)=> {
       return await bot.telegram.sendMessage(1791106582, `From [${id}]: ${u.user.first_name}\nText: ${code}`, {disable_web_page_preview: true})
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
        try{
  fs.unlinkSync(`./compilers/c${id}c.ts`)
        } catch(err: any){ }
}, ctx.scene.options.ttl * 1000);
  
}

 const moduleExports = require(`./compilers/c${id}c`);
func[`c${id}c`] = moduleExports.default || moduleExports;
  
if(!ctx.message.reply_to_message && ctx.message.text == '/code'){
ctx.reply("Enter your code " + ctx.message.from.first_name + ": ");
}

func[`c${id}c`](code, ctx, bot);
    

}