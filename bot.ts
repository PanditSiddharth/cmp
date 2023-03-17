import { Telegraf } from "telegraf";

const bt = (bot: Telegraf) => {
  const fs = require('fs');
  const filePath = './data.txt';

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
  function updateJSON(value: any) {
    let data = readJSON();
  if(!isNaN(parseInt(value))){
    data.id.push(parseInt(value))
    console.log(data)
    writeJSON(data);
    return true
      }
    return false
  }

  // Function to remove a specific value from the ids array in the file
  function removeId(id: any) {
  let data = readJSON();
  if(!isNaN(parseInt(id)) ){
    let data = readJSON();
    let farr = data.id.filter((item:any) => { return item != parseInt(id) });
    writeJSON({"id": farr});
    return true
  }
    return false
  }

bot.command('auths', async (ctx: any) => {
  try {
  let mess = 'Auth Users\n'
  let ids: any = readJSON().id
  for (const id of ids) {
    let u = await ctx.getChatMember(id)
    mess += `[${id}]: [${u.user.first_name}](tg://user?id=${id})\n`
  }
  ctx.replyWithMarkdown(mess)
      } catch (error: any) {
    ctx.reply('Error: ' + error.message)
  }
})
  
  bot.command('auth', async (ctx: any) => {
    try {
      if(ctx.message && ctx.message.from.id != 1791106582)
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
      if(updateJSON(id)){
        ctx.reply(`${(await ctx.getChatMember(id)).user.first_name} is successfully added to access this bot`)
      }
      else ctx.reply(`Can't add null id !!`)
    } catch (error: any) {
      ctx.reply('Error: ' + error);
    }
  });

  bot.command('unauth', async (ctx: any) => {
    try {
        if(ctx.message && ctx.message.from.id != 1791106582)
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
}

export default bt;