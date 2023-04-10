import { Telegraf } from "telegraf";
import mdb from "./db";
const bt = (bot: any) => {
  const fs = require('fs');
  const filePath = './dt.txt';
  mdb(bot as any)
  bot.hears(/^\/(v|version)/, (ctx: any) => {
    ctx.reply(`=========================
𝗥𝗲𝗮𝗹𝘁𝗶𝗺𝗲 𝗶/𝗼 𝗰𝗼𝗺𝗽𝗶𝗹𝗲𝗿 𝗯𝗼𝘁
=========================

𝐕𝐞𝐫𝐬𝐢𝐨𝐧: 0.3.0
𝐕𝐞𝐫𝐬𝐢𝐨𝐧 𝐧𝐨.: 6
𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫: @PanditSiddharth

𝗙𝗲𝗮𝘁𝘂𝗿𝗲𝘀:
  # 𝐍𝐨𝐝𝐞 𝐣𝐬 𝐜𝐨𝐦𝐩𝐢𝐥𝐞𝐫
  # 𝐏𝐲𝐭𝐡𝐨𝐧 𝐜𝐨𝐦𝐩𝐢𝐥𝐞𝐫
  # 𝐂 𝐜𝐨𝐦𝐩𝐢𝐥𝐞𝐫
  # 𝐂++ 𝐂𝐨𝐦𝐩𝐢𝐥𝐞𝐫
  # 𝐉𝐚𝐯𝐚 𝐜𝐨𝐦𝐩𝐢𝐥𝐞𝐫
=========================
`).catch(() => { })
  })
  bot.start(async (ctx: any) => {
    ctx.reply(`𝗥𝗲𝗮𝗹𝘁𝗶𝗺𝗲 𝗶/𝗼 𝗰𝗼𝗺𝗽𝗶𝗹𝗲𝗿 𝗯𝗼𝘁
Its 100% free made for helping to students

/𝗰𝗼𝗱𝗲 to excecute your c code
/𝗽𝘆 𝗼𝗿 /𝗽𝘆𝘁𝗵𝗼𝗻 to execute your python code
/𝗷𝘀 𝗼𝗿 /𝗻𝗼𝗱𝗲 to execute your javascript code
/𝗰𝗽𝗽 𝗼𝗿 /𝗰𝗽𝗹𝘂𝘀 to execute your cplus code
/𝗷𝘃 𝗼𝗿 /𝗷𝗮𝘃𝗮 to execute your java code
/𝗹𝗲𝗮𝘃𝗲 to leave session (if you not want excecute your code)
/help to see full help list

  bot owner @Panditsiddharth 
  Join @LogicBOts @LogicB_Support
`).catch(() => { })
  })

  bot.help(async (ctx: any) => {
    ctx.reply(`𝗥𝗲𝗮𝗹𝘁𝗶𝗺𝗲 𝗶/𝗼 𝗰𝗼𝗺𝗽𝗶𝗹𝗲𝗿 𝗯𝗼𝘁

/version or /v to see latest version and features
/𝗰𝗼𝗱𝗲 to excecute your c code
/𝗽𝘆 𝗼𝗿 /𝗽𝘆𝘁𝗵𝗼𝗻 to execute your python code
/𝗷𝘀 𝗼𝗿 /𝗻𝗼𝗱𝗲 to execute your javascript code
/𝗰𝗽𝗽 𝗼𝗿 /𝗰𝗽𝗹𝘂𝘀 to execute your c++ code
/𝗷𝘃 𝗼𝗿 /𝗷𝗮𝘃𝗮 to execute your java code
/leave to leave session (if you not want excecute your code)
/help to see updated commands in bot

  bot owner @Panditsiddharth 
`);
  })


  bot.command('auths', async (ctx: any) => {
    try {
      let mess = 'Auth Users\n'
      // let jso : any = [];
      let arr: any = readJSON()

      for (const idd of arr) {
        try {
          // let u: any = await ctx.getChatMember(id)
          mess += await `[${idd.id}]: [${idd.name}](tg://user?id=${idd.id})\n`
          // await jso.push({id, "name": u.user.first_name})
        } catch (err: any) { }
      }

      ctx.replyWithMarkdown(mess)
      // writeJSON(jso)
    } catch (error: any) {
      ctx.reply('Error: ' + error.message)
    }
  });

  bot.command('auth', async (ctx: any) => {
    try {
      if (ctx.message && !list.includes(ctx.message.from.id))
        return ctx.reply('You are not allowed to add more users')
      let value: any;
      let id: any;
      if (ctx.message && ctx.message.reply_to_message) {
        id = ctx.message.reply_to_message.from.id;
      } else {
        value = ctx.message.text;
        var match = value.match(/\/auth\s+(\d+)/);
        id = match ? match[1] : null;
        // id = 12345674
      }
      if (await updateJSON(id, ctx)) {
        ctx.reply(`${(await ctx.getChatMember(id)).user.first_name} is successfully added to access this bot`)
      }
      else ctx.reply(`Can't add null id !!`)
    } catch (error: any) {
      ctx.reply('Error: ' + error);
    }
  });

  bot.command('unauth', async (ctx: any) => {
    try {
      if (ctx.message && !list.includes(ctx.message.from.id))
        return ctx.reply('You are not allowed to remove users')
      let value: any;
      let id: any;
      if (ctx.message && ctx.message.reply_to_message) {
        id = ctx.message.reply_to_message.from.id;
      } else {
        value = ctx.message.text;
        let match = value.match(/\/unauth\s+(\d+)/);
        id = match ? match[1] : null;
        // console.log(id)
      }
      if (removeId(id))
        ctx.reply(`${(await ctx.getChatMember(id)).user.first_name} is removed to access the bot`)
      else ctx.reply(`Id null i can't remove`)
    } catch (error: any) {
      ctx.reply('Error: ' + error);
    }
  });

  let list: any = [1791106582, 1942730863, 1580821417, 1643271211]
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
    if (!isNaN(parseInt(value))) {
      try {
        let u: any = await ctx.getChatMember(value)
        data.push({ "id": parseInt(value), "name": u.user.first_name })
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
    if (!isNaN(parseInt(id))) {
      let data = readJSON();
      let farr = data.filter((item: any) => { return item.id != parseInt(id) });
      console.log(farr)
      writeJSON(farr);
      return true
    }
    return false
  }
}

export default bt;