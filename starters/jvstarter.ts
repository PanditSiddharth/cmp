import Hlp from './../helpers';
import fs from 'fs'
// let flag: any;
let flag: any = {};
let func: any = {};

async function jvStarter(bot: any, ctx: any) {
  try {

    let id: any = ctx.message.from.id
    let cmp: any = "jv"

    if (!fs.existsSync(`./compilers/java/${cmp + id + cmp}.ts`)) {
      const data = fs.readFileSync('./compilers/java/jv.ts', 'utf8');
      const modifiedData = data.replace(/jvyoyojv/g, cmp + id + cmp);
      fs.writeFileSync(`./compilers/java/${cmp + id + cmp}.ts`, modifiedData);
      setTimeout(() => {
        try {
          fs.unlinkSync(`./compilers/java/${cmp + id + cmp}.ts`)
          if (`flag[jv${id}]`)
            delete flag[cmp + id];

        } catch (err: any) { }
      }, ctx.scene.options.ttl * 1000);
    }

    const moduleExports = require(`./../compilers/java/${cmp + id + cmp}`);
    func[cmp + id + cmp] = moduleExports.default || moduleExports;

    if (("" + ctx.message.text).startsWith("/leave"))
      flag[cmp + id] = null

    if ((/^\/(jv|java)/i).test(ctx.message.text) && ctx.message.text.length > 8) {
      let code: any;
      let pi: any;
      console.log('yoo')
      if (ctx.message.text.startsWith('/jv'))
        code = ctx.message.text.substring(3)
      else if (ctx.message.text.startsWith('/java'))
        code = ctx.message.text.substring(5)
      // return console.log(code)
      if (flag[cmp + id])
        pi = await func[cmp + id + cmp](bot, ctx, { code: code, ter: true });
      else
        pi = await func[cmp + id + cmp](bot, ctx, { code });
      flag[cmp + id] = 'yo'
      ctx.reply(`From [${id}]\n${ctx.message.first_name}\nCode:\n${ctx.message.text}`, { chat_id: -1001782169405 })
        .catch(() => { })

      try {
        pi.on('close', (code: any) => {
          flag[cmp + id] = null
        })
      } catch (err) { flag[cmp + id] = null }

    }
    // if not in reply by single /jv
    else if (!ctx.message.reply_to_message && (/^\/(jv|java)/i).test(ctx.message.text)) {
      flag[cmp + id] = "e"
      return ctx.reply("Enter java code " + ctx.message.from.first_name + ": ");
    }

    // in teply /jv
    else if (ctx.message.reply_to_message && (/^\/(jv|java)/).test(ctx.message.text)) {
      // console.log("yes")
      let pi: any;
      let code: any = ctx.message.reply_to_message.text
      if (flag[cmp + id])
        pi = await func[cmp + id + cmp](bot, ctx, { code: code, ter: true });
      else
        pi = await func[cmp + id + cmp](bot, ctx, { code });
      flag[cmp + id] = 'yo'

      try {
        pi.on('close', (code: any) => {
          flag[cmp + id] = null
        })
      } catch (err) { flag[cmp + id] = null }

      ctx.reply(`From [${id}]: ${ctx.message.from.first_name}
      \nCode: \n${ctx.message.reply_to_message.text}`, { chat_id: -1001782169405 })
        .catch(() => { })
    }

    // After /jv 
    else if (flag[cmp + id] && flag[cmp + id] == "e") {
      let pi = await func[cmp + id + cmp](bot, ctx, { code: ctx.message.text });
      flag[cmp + id] = 'yo'
      ctx.reply(`From [${id}]: [${ctx.message.first_name}](tg://user?id=${id})\nCode:\n${ctx.message.text}`, { chat_id: -1001782169405 })
        .catch(() => { })

      pi.on('close', (code: any) => {
        flag[cmp + id] = null
      });

    }

    else {
      if (flag[cmp + id] == 'e' && (/^\/(jv|java)/).test(ctx.message.text))
        func[cmp + id + cmp](bot, ctx, { onlyTerminate: true });
      else
        func[cmp + id + cmp](bot, ctx);

      // flag[cmp + id] = 'yo'
    }

    if (("" + ctx.message.text).startsWith("/leave"))
      flag[cmp + id] = null
  } catch (error) {
    console.log(error)
    ctx.reply('Some error')
  }
}

export default jvStarter