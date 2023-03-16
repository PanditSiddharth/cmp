import js from './compilers/js'
// import cc from './cc'
import fs from 'fs';
require('./express')

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

codeScene.enter((ctx: any) => {
  ctx.reply("Enter your code " + ctx.message.from.first_name + ": ")
});

  let func: any = {};
codeScene.on("message", async (ctx: any, next: any)=> {
  let code = ctx.message.text
  let compiler = 'c'

  if(compiler == 'c'){
    let id = ctx.message.from.id

  // if file not exists
if (!fs.existsSync(`./compilers/c${id}c.ts`)) {
// Read the original JavaScript file synchronously
const data = fs.readFileSync('./compilers/c.ts', 'utf8');

// Replace all instances of "cyoyoc" with "myvalue"
const modifiedData = data.replace(/cyoyoc/g, `c${id}c`);
  
// Write the modified data to a new JavaScript file synchronously
     await fs.writeFileSync(`./compilers/c${id}c.ts`, modifiedData);

      setTimeout(() => {
  fs.unlinkSync(`./compilers/c${id}c.ts`)
}, ctx.scene.options.ttl * 1000);
  
} else {
}
   // = require(`./compilers/c${id}c`)
 // console.log(func["cc2"])
if(ctx.message.text == '/code')
  ctx.scene.enter("code")
    const moduleExports = require(`./compilers/c${id}c`);
func[`c${id}c`] = moduleExports.default || moduleExports;
func[`c${id}c`](code, ctx, bot);
    // console.log(func[`c${id}c`])
  //     if(ctx.message.text.startsWith('/leave')){
  //       ctx.scene
  // }
    
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

const stage = new Scenes.Stage<Scenes.SceneContext>([codeScene], {
	ttl: 25,
});
bot.use(session());
bot.use(stage.middleware());
bot.start(ctx => ctx.reply('I can compile your c code send me /code command then send your code for more /help i will listen your code which is starts with #include otherwise no response'));
bot.help(ctx => ctx.reply('I can compile your c code send me /code command then send your code and you can leave session by /leave command it will excecute 25 seconds i will listen your code which is starts with #include otherwise no response'));
bot.command("code", ctx => ctx.scene.enter("code"));
bot.command("res", ctx => ctx.scene.enter("res"));
// bot.on("message", ctx => ctx.reply("Try /code or /greeter"));

bot.launch({dropPendingUpdates: true});