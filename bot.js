const Discord = require('discord.js');
const client = new Discord.Client();

client.login('token');

client.on('ready', () => {
    console.log('Successfully started!');
});

client.on('message', message => {
  if(message.content === '!create'){
    message.channel.sendMessage('**Game 1 is starting in** `5` **minutes! Type** `!join` **to enter!**');
  }
});

client.on('message', message => {
  if(message.content === '!join'){
    //WE CAN'T GET THIS RIGHT ARGHHHH//
    message.channel.sendMessage(message.author.username + 'has joined Game1!');
  }
});
