const express = require('express');
const app = express();

app.get('/hello', (req:any, res: any) => {
  res.send('Hello, world!');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
module.exports = app;