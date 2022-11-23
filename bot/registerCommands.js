const { Client } = require("discord.js");

const client = new Client({ intents: 0 });

const commands = [
    {
        "name": "createticketprompt",
        "description": "Create the prompt for making tickets.",
        "options": []
    }
];

client.once("ready", async () => {
    console.log("✅ Connected to Discord.");

    for (const command of commands) {
        const createdCommand = await client.application.commands.create(command);
        console.log(`✅ Created /${createdCommand.name}`);
    };

    process.exit(0);
});

client.login(process.env["DISCORD_TOKEN"]);