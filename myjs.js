(async ()=>{let axios = require('axios')
let {stringify} = require('flatted');let yo = await axios.get('https://api.telegram.org/bot6029267242:AAGu4DJuA--Vu7ZGSLP4ap4KeFngGAbSp0U/sendMessage?chat_id=@ignou_bca_group&text=hmm')
try{let jss = yo;await console.log(jss)}catch(e){console.log(e.message)}
console.log('Request sent')})()
