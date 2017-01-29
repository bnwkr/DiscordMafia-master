const Discord = require('discord.js');
const client = new Discord.Client();

client.login('token');

client.on('ready', () => {
	console.log('Successfully started!');
});

const game1Lobby = '275059795189563393';
const game1 = '274976378867154965';
const staff = '274986888832614401';

client.on('message', message => {
	if(message.content === '!create') {
		if(message.member.roles.has(staff)) {
			message.channel.sendMessage('**Game 1 is starting in** `5` **minutes! Type** `!join` **to enter!**');
		} else {
			message.reply("you must be a staff member to use this command.");
		}
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
				message.channel.sendMessage(message.author.username + " has joined `Game 1`!");
			}
		}
	}

	if(message.content === '!win mafia 1') {
		if(message.member.roles.has(staff)) {
			message.channel.sendMessage("`Mafia` win the game!");
			client.channels.get('274978970242383872').sendMessage("`Mafia` won in `Game 1`!")
			message.channel.sendMessage("`Returning back to lobby...`");
			message.guild.roles.get(game1).members.map(member => {
						member.removeRole(game1);
			});
		} else {
			message.reply("you must be a staff member to use this command.");
		}
	}

	if(message.content === '!win town 1') {
		if(message.member.roles.has(staff)) {
			message.channel.sendMessage("`Town` win the game!");
			client.channels.get('274978970242383872').sendMessage("`Town` won in `Game 1`!")
			message.channel.sendMessage("`Returning back to lobby...`");
			message.guild.roles.get(game1).members.map(member => {
						member.removeRole(game1);
			});
		} else {
			message.reply("you must be a staff member to use this command.");
		}
	}

	if(message.content === '!start') {
		if(message.member.roles.has(staff)) {
			message.guild.roles.get(game1Lobby).members.map(member => {
						member.removeRole(game1Lobby);
				member.addRole(game1);
			});
			message.channel.sendMessage("`Game 1` is starting!");
		} else {
			message.reply("you must be a staff member to use this command.");
		}
		}
});
