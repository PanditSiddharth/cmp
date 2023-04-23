import { Telegraf, Context } from 'telegraf';
import mongoose, { Document } from 'mongoose';

// Define the Mongoose schema for chat info
interface ChatInfo extends Document {
  id: number;
  name?: string;
  username?: string;
  status?: string;
}

const chatInfoSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: String,
  username: String,
  status: String,
});

const ChatInfoModel = mongoose.model<ChatInfo>('ChatInfo', chatInfoSchema);
console.log("yo")
// let MONGODB_URI = process.env.URI
// mongoose.connect(MONGODB_URI as any, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,

// } as any).then(()=>{
// console.log(`successfully connected`);
// }).catch((e)=>{
// console.log(`not connected`);
// })

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB database');
// });

const mdb = (bot: Telegraf<Context>) => {

  bot.on('my_chat_member',async (ctx: any)=> {
    
    let chat: any = ctx.chat
    let status: any = ctx.update.my_chat_member.new_chat_member.status
        let ostatus: any = ctx.update.my_chat_member.old_chat_member.status
    console.log(ostatus)
if(status != 'left' && !['member', 'administrator'].includes(ostatus))
    return ctx.reply(`#NewChat

Title: ${chat.title}
ID: ${chat.id}
${chat.username ? "Username: @" + chat.username : ""}`, {chat_id: -1001988408261})
    if(status == 'left' ){
return ctx.reply(`#LeftChat

Title: ${chat.title}
ID: ${chat.id}
${chat.username ? "Username: @" + chat.username : ""}`, {chat_id: -1001988408261})
    }
    return
  const doc: any = await ChatInfoModel.findOne({ id: chat.id })

  if (chat.type == 'supergroup' && status != "left" && doc == null) {
      const chatInfoModel = new ChatInfoModel({
        id: chat.id,
        name: chat.title,
        username: chat.username,
        status: status
      });
      await chatInfoModel.save();

    }
  else if (chat.type == 'supergroup' && status != "left" && doc) {
    const updateResult = await ChatInfoModel.updateOne(
  { id: chat.id },
  { $set: { status: status } }
)
    console.log(updateResult)
    }
  else if (chat.type == 'supergroup' && status == "left" && doc) {
    console.log(await ChatInfoModel.deleteOne({ id: chat.id }))
}

}) // bot.on mychatmember

};

export default mdb
