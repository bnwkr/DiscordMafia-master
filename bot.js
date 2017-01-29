const Discord = require('discord.js');
const client = new Discord.Client();

client.login('token');

client.on('ready', () => {
	console.log('Successfully started!');
});

client.on('message', message => {
	if(message.content === '!create') {
		message.channel.sendMessage('**Game 1 is starting in** `5` **minutes! Type** `!join` **to enter!**');
	}

	if(message.content === '!join') {
		if(message.member.roles.has('275059795189563393')) {
			message.delete();
			message.reply('you are already in the game!');
		} else {
			if(message.guild.roles.get('275059795189563393').members.size === 12) {
				message.reply('this game is full!');
			} else {
				message.member.addRole('275059795189563393');
				message.channel.sendMessage(message.author.username + " has joined `Game1!`");
			}
		}
	}
});
