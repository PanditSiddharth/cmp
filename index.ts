import js from './compilers/js'
let c = require('./compilers/c');
let cpp = require('./compilers/cpp');
let Hlp = require('./helpers');
// let py = require('./compilers/py');
const express = require('express');
const app = express();
const port = 80;
let h = new Hlp()
import { Scenes, session, Telegraf } from "telegraf";
require('dotenv').config()
// Handler factories
const { enter, leave } = Scenes.Stage;

  
let cod = `
#include <stdio.h>
int main(){
  int r;
  printf("Jay Shree Ganesha\n");

  for (int i = 0; i < 3; i++) {
  scanf("%d", &r);
  // scanf("%d", &r);
  }
  return 0;
}
`
// let code = cod
let ok = false;
let terminate = false;
let cb: any = null;
let sendingData = null;
let writeData: any = null;
let s = async (cbb: any) => {
cbb.stdout.on('data', async (data:  any) => {
      // await h.sleep(1000)
     cb = data.toString()
      await console.log(data.toString())
if (cb && cb.includes('-1a\n')) {
  for(let i = 0; i < 60; i++){
    if(terminate){
      await h.sleep(2000)
      terminate = false
      break;
    }
  await h.sleep(1000)
    console.log("stdin " + writeData)
    
    if(writeData){
    cbb.stdin.write(writeData + '\n');
      writeData = null;
      break;
    }
  }
  
}
    });

    cbb.on('close', async (code : any) => {
      console.log('program terminated');   
      cbb.stdin.end();
      await h.sleep(200)
      cbb.removeAllListeners();
      terminate = true;
    })
  
}
export default s;

module.exports = app
// app.listen(port, () => {
//   console.log(`App listening at http://localhost:${port}`);
// });

// Greeter scene
const codeScene = new Scenes.BaseScene<Scenes.SceneContext>("code");
codeScene.enter((ctx: any) => {
  ctx.reply("Enter your code " + ctx.message.from.first_name + ": ")
});
// codeScene.leave(ctx => ctx.reply("Bye"));
// codeScene.hears("hi", enter<Scenes.SceneContext>("greeter"));
codeScene.on("message", async (ctx: any, next: any)=> {
  let code = ctx.message.text
  let compiler = 'c'

  if(compiler == 'c'){
  c(code)
} else if(compiler == 'cpp'){
  cpp(code)
}
 else if(compiler == 'js'){
  js(code)
} else if(compiler == 'py'){
   // py(code)
}
  await next()
});
codeScene.on("message", enter<Scenes.SceneContext>("res"));

// Echo scene
const resScene = new Scenes.BaseScene<Scenes.SceneContext>("res");
resScene.enter(async (ctx: any) => {
// let inter = setInterval( async ()=>{
  for(let i = 0; i < 30; i++){
  await h.sleep(500)
   console.log('first scene running')
    
  if(cb != null){
    if (cb.includes('-1a\n')) {
    let str = cb.replace(/-1a\n/g, "");
      if (str != "") {
        await ctx.reply(str)
        console.log('code scene')
        cb = null;
        ok = true;  
        break;
         // console.log(clearInterval(inter))
        
      }
      // writeData = ctx.message.text
    } else {
        ctx.reply(cb)
        console.log('code scene else')
          if(terminate){
      await h.sleep(2000)
      terminate = false
      ctx.scene.leave();
      break;
    }

    }
    if(terminate){
      await h.sleep(2000)
      terminate = false
      ctx.scene.leave();
      break;
    }
    // clearInterval(inter)
    
    cb = null;
    ok = true
        break;
  }
}
});
resScene.command("back", leave<any>());
resScene.command("code", enter<any>('code'));

resScene.on("message",async (ctx: any)=>{
      writeData = ctx.message.text
  for(let i = 0; i < 30; i++){
   console.log('first scene ' + cb)
    await h.sleep(500)
  if(cb != null){

    let str = cb.replace(/-1a\n/g, "");
      if (str != "") {
        ctx.reply(str)
        console.log('res1 scene')
      }else {
        ctx.reply(str)
        ok = true;
         cb = null;
         console.log('break first')
         break;
        
      }
    ok = true;
    cb = null;
    console.log('break')
    break;
  }
    if(terminate){
      await h.sleep(2000)
    console.log('last break')
      
      terminate = false
      ctx.scene.leave()
      break;
    }
    // clearInterval(inter)
}
});

resScene.leave(ctx => ctx.reply("program terminated"));
resScene.on("text", ctx => ctx.reply(ctx.message.text));
resScene.on("message", ctx => ctx.reply("Only text messages please"));

const bot = new Telegraf<Scenes.SceneContext>(process.env.TOKEN as any);

const stage = new Scenes.Stage<Scenes.SceneContext>([codeScene, resScene], {
	ttl: 100,
});
bot.use(session());
bot.use(stage.middleware());
bot.command("code", ctx => ctx.scene.enter("code"));
bot.command("res", ctx => ctx.scene.enter("res"));
// bot.on("message", ctx => ctx.reply("Try /code or /greeter"));

bot.launch();