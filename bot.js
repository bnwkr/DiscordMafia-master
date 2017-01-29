const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Successfully started!');
});

client.on('message', message => {
  if(message.content === '!create'){
      message.channel.sendMessage('**Game 1 is starting in** `5` **minutes! Type** `!join` **to enter!**');
  }
});

client.login('Mjc1MDM2OTM1NDM1NzE0NTYw.C26-aA.JLuZlzc8k6tKHA64wiS0thW5pNU');
