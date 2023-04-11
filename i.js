const { spawn, exec } = require('child_process');

// Spawn a child process to run the "ls" command
// spawn('pip', ['install', '-r', 'requirements.txt'], { stdio: inherit });
// installer.on('data', (data) => {
//   console.log(data)
// })

let installer = exec('pip install -r requirements.txt', (stderr, std, err) => {
  if (stderr)
    return console.log(stderr)
  conosle.log(std)
});
// installer.on('data', (data) => {
//   console.log(data)
// })