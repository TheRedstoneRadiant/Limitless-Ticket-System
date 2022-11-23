const {
	Client,
	Intents,
	Permissions
} = require("discord.js");

const client = new Client({
	intents: 32727,
});

client.login(process.env["DISCORD_TOKEN"]);

client.on("ready", () => {
	console.log('✅ Connected to Discord.');

	client.user.setActivity({
		name: `the ticket stall <3`,
		type: 3,
	});
});

client.on('interactionCreate', async (interaction) => {
	if (interaction.isCommand()) {
		try {
			await require(`./bot/commands/${interaction.commandName}`)(interaction);
		} catch (error) {
			console.log(
				`❌ Unable to execute ${interaction.commandName} command. \n` + error
			);
		}
	} else if (interaction.isButton()) {
		try {
			await require(`./bot/buttons/${interaction.customId}`)(interaction);
		} catch (error) {
			console.log(
				`❌ Unable to execute ${interaction.customId} button. \n` + error
			);
		}
	}
});

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
