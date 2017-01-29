const Discord = require('discord.js');
const client = new Discord.Client();

client.login('Mjc1MDM2OTM1NDM1NzE0NTYw.C27QoQ.p3SvzvjiGvGsUWKSv89oZt0vko8');

client.on('ready', () => {
	console.log('Successfully started!');
	client.user.setGame('discord.io/mafia', 'https://www.twitch.tv/twitch', 1);
});

const game1Lobby = '275059795189563393';
const game1 = '274976378867154965';
const staff = '274986888832614401';
const modLogs = '274996413593681921';

client.on('message', message => {

	const params = message.content.split(" ").slice(1);

	if(message.content === '!create') {
		if(message.member.roles.has(staff)) {
			message.delete();
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
				client.channels.get('275022062459027457').sendMessage("`Game 1` is now full!");
			} else {
				message.member.addRole(game1Lobby);
				message.channel.sendMessage(message.author.username + " has joined `Game 1`!");
				client.channels.get('275022062459027457').sendMessage(message.author.username + " has joined `Game 1`!");
			}
		}
	}

	if(message.content === '!leave') {
		message.delete();
		message.member.removeRole(game1Lobby);
		message.member.removeRole(game1);
		message.channel.sendMessage(message.author.username + " has left `Game 1`!");
	}

	if(message.content === '!win mafia 1') {
		if(message.member.roles.has(staff)) {
			message.delete();
			message.channel.sendMessage("`Mafia` win the game!");
			client.channels.get('274978970242383872').sendMessage("`Mafia` won in `Game 1`!");
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
			message.delete();
			message.channel.sendMessage("`Town` win the game!");
			client.channels.get('274978970242383872').sendMessage("`Town` won in `Game 1`!");
			message.channel.sendMessage("`Returning back to lobby...`");
			message.guild.roles.get(game1).members.map(member => {
				member.removeRole(game1);
			});
		} else {
			message.reply("you must be a staff member to use this command.");
		}
	}

	if(message.content === '!win') {
		message.delete();
		message.channel.sendMessage("```Usage: !win <mafia/town> <Game #>```");
	}

	if(message.content === '!start') {
		if(message.member.roles.has(staff)) {
			message.delete();
			message.guild.roles.get(game1Lobby).members.map(member => {
				member.removeRole(game1Lobby);
				member.addRole(game1);
			});
			message.channel.sendMessage("`Game 1` is starting!");
		} else {
			message.reply("you must be a staff member to use this command.");
		}
	}

	if(message.content.startsWith("!kill")) {
			if(!message.member.roles.has(staff)) return message.reply("you must be a staff member to use this command.");
			if(message.mentions.users.size === 0) return message.reply("please mention a user.");

			let killMember = message.guild.member(message.mentions.users.first());
			if(!killMember) return message.reply("please mention a valid user.");

			killMember.addRole(274986487232069634).then(member => {
					member.removeRole(game1);
					message.channel.sendMessage("\`${member.user.username}\` ***has been killed in the night!***");
		 )};


	if(message.content.startsWith("!prune")) {
		if(message.member.roles.has(staff)) {
			var user = message.mentions.users.first();
			let messagecount = parseInt(params[0]);

			message.channel.fetchMessages({limit: 100})
			.then(messages => {
				var msg_array = messages.array();
				if (user !== undefined) {
					msg_array = msg_array.filter(m => m.author.id === user.id);
					message.delete();
				}
				msg_array.length = messagecount + 1;
				if (messagecount == 100) msg_array.length = 100;

				message.channel.bulkDelete(msg_array);
				message.channel.sendMessage(`**${messagecount}** messages pruned.`);
			})
			.catch(console.log);
		} else {
			message.reply("you must be a staff member to use this command.");
		}
	}

	if(message.content.startsWith("!kick")) {
		if(!message.member.roles.has(staff)) return message.reply("you must be a staff member to use this command.");
		if(message.mentions.users.size === 0) return message.reply("please mention a user.");

		let kickMember = message.guild.member(message.mentions.users.first());
		if(!kickMember) return message.reply("please mention a valid user.");
		let reason = message.content.split(" ").slice(2).join(" ");
		if(reason == null) return;

		kickMember.kick().then(member => {
			message.channel.sendMessage(`:ok_hand: kicked \`${member.user.username}#${member.user.discriminator}\` for \`${reason}\``);
			message.guild.channels.get(modLogs).sendMessage("", {
				embed: {
					title: "**User Kicked!**",
					description: "A user has been kicked from the server.",
					url: "http://discord.io/mafia",
					color: 16711680,
					fields: [
						{ name: "User Kicked", value: kickMember.toString(), inline: true },
						{ name: "Reason", value: reason, inline: true },
						{ name: "Kicked By", value: `${message.author.username}#${message.author.discriminator}`, inline: false }
					],
					timestamp: new Date()
				}
			});
		});
	}

});

process.on("unhandledRejection", err => {
	console.error("Uncaught Promise Error: \n" + err.stack);
});
