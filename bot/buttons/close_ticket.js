const { client, ticketCollection } = require("../../index");

const dmMessage = {
    content: "If you need any additional information or are still interested, send a DM to JohnWick#0002 or re-join Limitless Services here → https://discord.gg/7eEFyHnexS",
    embeds: [
        {
            url: 'https://discord.gg/7eEFyHnexS',
            title: 'CLICK HERE to Get Back to Limitless Services',
            description: `Thanks for your interest with Limitless Services.

**Hope I could assist in whatever your goal was today!**
Feel free to reach out to me directly with any urgent matters. @JohnWick#0002`,
            color: 5094616,
            footer: {
                iconURL: 'https://i.imgur.com/kY65sQa.png',
                text: 'Limitless Reloaded',
            },
            timestamp: new Date().toISOString()
        }
    ]
};

module.exports = async function (interaction) {
    const { user } = await ticketCollection.findOne({channel: interaction.channel.id});

    // DM message
    try {
        const ticketOwner = await client.users.fetch(user, false);
        await ticketOwner.send(dmMessage);
    } catch {
        // Unable to DM message
    };

    // TODO: Send Ticket Transcription

    // Delete Ticket
    await ticketCollection.deleteOne({channel: interaction.channel.id});
    await interaction.channel.delete();
};
