// Imports
const { Client } = require("discord.js");

// Initialize Bot
const client = new Client({
	intents: 32727,
});

// Login
client.login(process.env["DISCORD_TOKEN"]);

client.on("ready", () => {
	console.log('✅ Connected to Discord.');

	// Set bot activity
	client.user.setActivity({
		name: `Your Tickets`,
		type: 3                 // Activity Types: https://discord.dev/topics/gateway-events#activity-object-activity-types
	});
});

client.on('interactionCreate', async (interaction) => {
	// Slash commands
	if (interaction.isCommand()) {
		try {
			await require(`./bot/commands/${interaction.commandName}`)(interaction);
		} catch (error) {
			console.log(`❌ Unable to execute ${interaction.commandName} command. \n` + error);
		}
	}
	
	// Buttons
	else if (interaction.isButton()) {
		try {
			// Ticket creation
			if (interaction.customId.startsWith("ticket_")) {
				return await require(`./bot/buttons/create_ticket`)(interaction);
			}
			
			// All other buttons
			await require(`./bot/buttons/${interaction.customId}`)(interaction);
		} catch (error) {
			console.log(`❌ Unable to execute ${interaction.customId} button. \n` + error);
		}
	};
});

// Export bot
module.exports = { client };
