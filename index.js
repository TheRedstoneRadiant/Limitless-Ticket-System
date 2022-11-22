// const express = require("express");

const {
  Client,
  Intents,
  Permissions
} = require("discord.js");

const client = new Client({
  intents: 32727,
});

client.login(process.env["DISCORD_TOKEN"]);

client.on("guildMemberAdd", async (member) => {
	const channel = await member.guild.channels.create({
		name: `${member.user.username}`,
		permissionOverwrites: [
	    	{
	       		id: member.guild.roles.everyone.id,
	       		deny: ['ViewChannel'],
	    	},
	    	{
	    		id: member.id,
	    		allow: ['ViewChannel']
	    	}
	  	],
	});

	channel.send("@everyone");
});
