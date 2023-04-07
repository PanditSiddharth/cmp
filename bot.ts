import { Telegraf } from "telegraf";

const bt = (bot: any) => {
  const fs = require('fs');
  const filePath = './dt.txt';

bot.start( async (ctx: any) => {
ctx.reply(`𝗥𝗲𝗮𝗹𝘁𝗶𝗺𝗲 𝗶/𝗼 𝗰𝗼𝗺𝗽𝗶𝗹𝗲𝗿 𝗯𝗼𝘁
Its 100% free made for helping to students

/𝗰𝗼𝗱𝗲 to excecute your c code in bot ttl: 40 seconds or recreate session 
/𝗽𝘆 𝗼𝗿 /𝗽𝘆𝘁𝗵𝗼𝗻 to execute your python code
/𝗹𝗲𝗮𝘃𝗲 to leave session (if you not want excecute your code)
/help to see full help list

  bot owner @Panditsiddharth 
  Join @LogicBOts @LogicB_Support
`).catch(()=> {})
})

bot.help( async (ctx: any) => {
ctx.reply(`𝗥𝗲𝗮𝗹𝘁𝗶𝗺𝗲 𝗶/𝗼 𝗰𝗼𝗺𝗽𝗶𝗹𝗲𝗿 𝗯𝗼𝘁

/start basic command for see some help
/auth For giving access to user so user can excecute his/her codes
/unauth remove access
/auths to see auth users list
/code to excecute your c code in bot ttl: 40 seconds or recreate session 
/py or /python to execute your python code
/leave to leave session (if you not want excecute your code)
/help to see this list again

  bot owner @Panditsiddharth 
`);
})
  

bot.command('auths', async (ctx: any) => {
  try {
  let mess = 'Auth Users\n'
  // let jso : any = [];
  let arr: any = readJSON()
    
  for (const idd of arr) {
    try{
    // let u: any = await ctx.getChatMember(id)
    mess += await `[${idd.id}]: [${idd.name}](tg://user?id=${idd.id})\n`
      // await jso.push({id, "name": u.user.first_name})
    }catch(err:any){}
  }
    
  ctx.replyWithMarkdown(mess)
    // writeJSON(jso)
      } catch (error: any) {
    ctx.reply('Error: ' + error.message)
  }
});

bot.command('auth', async (ctx: any) => {
    try {
      if(ctx.message && !list.includes(ctx.message.from.id))
        return ctx.reply('You are not allowed to add more users')
      let value: any;
      let id: any;
      if(ctx.message && ctx.message.reply_to_message){
        id = ctx.message.reply_to_message.from.id;
      } else {
        value = ctx.message.text;
      var match = value.match(/\/auth\s+(\d+)/);
      id = match ? match[1] : null;
      // id = 12345674
      }
      if(await updateJSON(id, ctx)){
        ctx.reply(`${(await ctx.getChatMember(id)).user.first_name} is successfully added to access this bot`)
      }
      else ctx.reply(`Can't add null id !!`)
    } catch (error: any) {
      ctx.reply('Error: ' + error);
    }
  });

bot.command('unauth', async (ctx: any) => {
    try {
        if(ctx.message && !list.includes(ctx.message.from.id))
        return ctx.reply('You are not allowed to remove users')
      let value: any;
      let id: any;
      if(ctx.message && ctx.message.reply_to_message){
        id = ctx.message.reply_to_message.from.id;
      } else {
        value = ctx.message.text;
      let match = value.match(/\/unauth\s+(\d+)/);
      id = match ? match[1] : null;
        // console.log(id)
      }
       if(removeId(id))
        ctx.reply(`${(await ctx.getChatMember(id)).user.first_name} is removed to access the bot`)
else ctx.reply(`Id null i can't remove`)
    } catch (error: any) {
      ctx.reply('Error: ' + error);
    }
  });
  
  let list: any = [1791106582,1942730863,1580821417,1643271211]
  // Function to write a new JSON object to the file
  function writeJSON(data: any) {
    const jsonString = JSON.stringify(data);
    fs.writeFileSync(filePath, jsonString);
  }

  // Function to read the current JSON objects from the file
  function readJSON() {
    const jsonString = fs.readFileSync(filePath);
    return JSON.parse(jsonString);
  }

  // Function to update an existing JSON object in the file
  let updateJSON = async (value: any, ctx: any) => {
    let data: any = readJSON();
  if(!isNaN(parseInt(value))){
    try {
    let u: any = await ctx.getChatMember(value)
    data.push({"id": parseInt(value), "name": u.user.first_name})
    console.log(data)
    writeJSON(data);
    return true
          } catch (error) { }
      }
    return false
  }

  // Function to remove a specific value from the ids array in the file
  function removeId(id: any) {
  let data = readJSON();
  if(!isNaN(parseInt(id)) ){
    let data = readJSON();
    let farr = data.filter((item:any) => { return item.id != parseInt(id) });
    console.log(farr)
    writeJSON(farr);
    return true
  }
    return false
  }
}

export default bt;