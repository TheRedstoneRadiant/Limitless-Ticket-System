// Imports
const { Client } = require("discord.js");
const { MongoClient, ServerApiVersion } = require('mongodb');

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
	}

	// Select Menu
	else if (interaction.isSelectMenu()) {
		try {
			await require(`./bot/select/${interaction.customId}`)(interaction);
		} catch (error) {
			console.log(
				`❌ Unable to execute ${interaction.customId} select menu. \n` + error
			);
		}
	}
});

// Connect to MongoDB
const mongoClient = new MongoClient(process.env["MONGODB_URI"], { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// Mongo Collections
const db = mongoClient.db(process.env["MONGO_DATABASE"]);
const faqCollection = db.collection("faqCollection");

// Exports
module.exports = { client, faqCollection };
