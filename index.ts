import js from './compilers/js'
// import cc from './cc'
import fs from 'fs';
import bt from './bot';
// let c = require('./compilers/c');
let cpp = require('./compilers/cpp');

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
codeScene.on("message", async (ctx: any, next: any)=> {
  let code = ctx.message.text
  let compiler = "c"
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


let pyScene = new Scenes.BaseScene<Scenes.SceneContext>("py");
pyScene.enter(pyFunc);
pyScene.on("message", pyFunc);

let jsScene = new Scenes.BaseScene<Scenes.SceneContext>("js");
jsScene.enter(pyFunc);
jsScene.on("message", pyFunc);

let bot = new Telegraf<Scenes.SceneContext>(process.env.TOKEN as any);
let stage = new Scenes.Stage<Scenes.SceneContext>([codeScene, pyScene, jsScene], { ttl: 40 });
bt(bot)
bot.use(session());
bot.use(stage.middleware());
bot.command("code", (ctx: any) => {
  ctx.scene.enter("code")
});

bot.hears(/\/code|\/py|\/python|\/js|\/javascript|\/c/, (ctx: any) => {
  let compiler: any = ctx.message.text + "";
  if ((/\/py|\/python/).test(compiler))
    ctx.scene.enter("py")
  else if ((/\/js|\/javascript/).test(compiler))
    ctx.scene.enter("js")
})

bot.launch({ dropPendingUpdates: true });




// let flag: any;
let flag: any = {};
async function pyFunc(ctx: any) {
  try {
    
  let id: any = ctx.message.from.id
  let cmp: any = "py"

  if (!fs.existsSync(`./compilers/python/${cmp + id + cmp}.ts`)) {
    const data = fs.readFileSync('./compilers/python/py.ts', 'utf8');
    const modifiedData = data.replace(/pyyoyopy/g, cmp + id + cmp);
    await fs.writeFileSync(`./compilers/python/${cmp + id + cmp}.ts`, modifiedData);
    setTimeout(() => {
      try {
        fs.unlinkSync(`./compilers/python/${cmp + id + cmp}.ts`)
        if (`flag[py${id}]`)
          delete flag[cmp + id];

      } catch (err: any) { }
    }, ctx.scene.options.ttl * 1000);
  }

  const moduleExports = require(`./compilers/python/${cmp + id + cmp}`);
  func[cmp + id + cmp] = moduleExports.default || moduleExports;

      if(("" + ctx.message.text).startsWith("/leave"))
    flag[cmp + id] = null
        
    
  if (!ctx.message.reply_to_message && (ctx.message.text == '/py' || ctx.message.text == "/python")) {
    flag[cmp + id] = "e"
    return ctx.reply("Enter python code " + ctx.message.from.first_name + ": ");
  } 
    
  else if (ctx.message.reply_to_message && (/\/py|\/python/).test(ctx.message.text) && flag[cmp + id] != "yo") {
    console.log("yes")
      let pi = await func[cmp + id + cmp](bot, ctx, ctx.message.reply_to_message.text);

      pi.on('close', async (code: any) => {
     flag[cmp + id] = null
    // console.log(`child process exited with code ${code}`);
    // ctx.scene.leave();
  });
      flag[cmp + id] = 'yo'
      ctx.reply(`From [${id}]: ${ctx.message.from.first_name}
      \nCode: \n${ctx.message.reply_to_message.text}`, {chat_id: -1001782169405})
    .catch(()=> {})
  } else if (flag[cmp + id] && flag[cmp + id] == "e") {
      let pi = await func[cmp + id + cmp](bot, ctx, ctx.message.text);
      flag[cmp + id] = 'yo'
      ctx.reply(`From [${id}]: [${ctx.message.first_name}](tg://user?id=${id})\nCode:\n${ctx.message.text}`, {chat_id: -1001782169405})
    .catch(()=> {})
    
      pi.on('close', (code: any) => {
     flag[cmp + id] = null
    // console.log(`child process exited with code ${code}`);
    // ctx.scene.leave();
  });

    
  } else {
      func[cmp + id + cmp](bot, ctx);
      // flag[cmp + id] = 'yo'
  }

    if(("" + ctx.message.text).startsWith("/leave"))
    flag[cmp + id] = null
    } catch (error) {
    console.log(error)
    ctx.reply('Some error')
  }
}

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
    // /\/bin\/sh|poisixspawn|sys|spawn|libdl|dlfcn|rename|mmap|open|read|write|lseek|close|open|read|write|lseek|close|O_DIRECT|aio_read|aio_write|aio_return|setvbuf|fread|fwrite|fgetc|fputc|ftell|fclose|fseek|feof|fopen|popen|fwrite|fgets|fputs|fread|fread|fprintf|fscanf|remove|stdio_ext|windows|fcntl|execl|exec|libeuv|libev|limits|fork\((?:[^)]*(?:(?:rm\s*-rf)|(?:sh\s*-c)|(?:mkfs)|(?:dd))[^)]*)\)/gm;

  let mess1: any = "";
  if (ctx.message.reply_to_message) 
  mess1 = ctx.message.reply_to_message.text
  else 
 mess1 = ctx.message.text
  
  if(("" + mess1 as string).match(regex)){
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