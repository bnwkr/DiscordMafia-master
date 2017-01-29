const Discord = require('discord.js');
const client = new Discord.Client();

client.login('token');

client.on('ready', () => {
	console.log('Successfully started!');
});

var game1Lobby = '275059795189563393';
var game1 = '275079458082521088';

client.on('message', message => {
	if(message.content === '!create') {
		message.channel.sendMessage('**Game 1 is starting in** `5` **minutes! Type** `!join` **to enter!**');
	}

	if(message.content === '!join') {
		if(message.member.roles.has(game1Lobby)) {
			message.delete();
			message.reply('you are already in the game!');
		} else {
			if(message.guild.roles.get(game1Lobby).members.size === 12) {
				message.channel.sendMessage("`Game 1` is now full!");
			} else {
				message.member.addRole(game1Lobby);
				message.channel.sendMessage(message.author.username + " has joined `Game1!`");
			}
		}
	}

  if(message.content === '!start') {
    if(message.member.roles.has(game1Lobby)) {
      message.member.removeRole(game1Lobby);
      message.member.addRole(game1);
    }
  }
});
