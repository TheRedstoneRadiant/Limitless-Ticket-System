const dmMessage = {
    content: "If you need any additional information or are still interested, send a DM to JohnWick#0002 or re-join Limitless Services here → https://discord.gg/7eEFyHnexS",
    embeds: [
        {
            title: 'CLICK HERE to Get Back to Limitless Services',
            description: `Thanks for your interest with Limitless Services.

**Hope I could assist in whatever your goal was today!**
Feel free to reach out to me directly with any urgent matters. @JohnWick#0002`,
            color: 5094616,
        }
    ]
};

module.exports = async function (interaction) {
    try {
        await interaction.user.send(dmMessage);
    } catch {
        // Unable to DM message
    };

    // TODO: Send Ticket Transcription

    await interaction.channel.delete();
};
