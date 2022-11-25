const { Client } = require("discord.js");

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
		if (interaction.customId.startsWith("ticket_")) {
			try {
				await require(`./bot/buttons/create_ticket`)(interaction);
			} catch (error) {
				console.log(
					`❌ Unable to execute ${interaction.customId} button. \n` + error
				);
			}
		} else {
			try {
				await require(`./bot/buttons/${interaction.customId}`)(interaction);
			} catch (error) {
				console.log(
					`❌ Unable to execute ${interaction.customId} button. \n` + error
				);
			}
		}
	}
});
