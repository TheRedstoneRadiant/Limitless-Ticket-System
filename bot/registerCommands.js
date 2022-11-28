// Registers slash commands with the Discord API.

// Imports
const { Client } = require("discord.js");

// Predefined command array
const commands = [
    {
        "name": "createsupportprompt",
        "description": "Create support prompt.",
    }
];

// Initialize bot
const client = new Client({ intents: 0 });

// Login
client.login(process.env["DISCORD_TOKEN"]);

client.once("ready", async () => {
    console.log("✅ Connected to Discord.");

    // Iterate over commands array
    for (const command of commands) {
        // Register slash command
        client.application.commands.create(command)
            .then(createdCommand => {
                console.info(`✅ Created /${createdCommand.name}`);
            });
    };
});
