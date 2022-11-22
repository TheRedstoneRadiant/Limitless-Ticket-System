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

// const app = express();
// app.set("view engine", "ejs");
// app.use(express.static("public"));

// app.get("/", (req, res) => {
//     res.render("index");
// });

// app.listen(8080, () => {
//     console.log("Listening on port 8080\nhttp://localhost:8080");
// });
