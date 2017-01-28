const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Successfully started!');
});

client.login('token');
