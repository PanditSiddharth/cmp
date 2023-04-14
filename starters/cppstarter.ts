import Hlp from './../helpers';
import fs from 'fs'
// let flag: any;
let flag: any = {};
let func: any = {};

async function cppStarter(bot: any, ctx: any) {
  try {

    let id: any = ctx.message.from.id
    let cmp: any = "cpp"

    if (!fs.existsSync(`./compilers/cplus/${cmp + id + cmp}.ts`)) {
      const data = fs.readFileSync('./compilers/cplus/cpp.ts', 'utf8');
      const modifiedData = data.replace(/cppyoyocpp/g, cmp + id + cmp);
      fs.writeFileSync(`./compilers/cplus/${cmp + id + cmp}.ts`, modifiedData);
      setTimeout(() => {
        try {
          fs.unlinkSync(`./compilers/cplus/${cmp + id + cmp}.ts`)
          if (`flag[cpp${id}]`)
            delete flag[cmp + id];

        } catch (err: any) { }
      }, ctx.scene.options.ttl * 1000);
    }

    const moduleExports = require(`./../compilers/cplus/${cmp + id + cmp}`);
    func[cmp + id + cmp] = moduleExports.default || moduleExports;

    if (("" + ctx.message.text).startsWith("/leave"))
      flag[cmp + id] = null

    if ((/^\/(cpp|cplus)/i).test(ctx.message.text) && ctx.message.text.length > 8) {
      let code: any;
      let pi: any;
      console.log('yoo')
      if (ctx.message.text.startsWith('/cpp'))
        code = ctx.message.text.substring(4)
      else if (ctx.message.text.startsWith('/cplus'))
        code = ctx.message.text.substring(6)
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
    // if not in reply by single /cpp
    else if (!ctx.message.reply_to_message && (/^\/(cpp|cplus)/i).test(ctx.message.text)) {
      flag[cmp + id] = "e"
      return ctx.reply("Enter cplus code " + ctx.message.from.first_name + ": ");
    }

    // in teply /cpp
    else if (ctx.message.reply_to_message && (/^\/(cpp|cplus)/).test(ctx.message.text)) {
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

    // After /cpp 
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
      if (flag[cmp + id] == 'e' && (/^\/(cpp|cplus)/).test(ctx.message.text))
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

export default cppStarter