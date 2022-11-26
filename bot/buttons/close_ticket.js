module.exports = async function (interaction) {
    await interaction.reply({
        embeds: [
            {
                title: 'Confirm',
                description: 'Are you sure you want to close this ticket?',
                color: 16711680,
            },
        ],
        components: [
            {
                type: 1,
                components: [
                    {
                        type: 2,
                        label: '',
                        style: 2,
                        emoji: {
                            id: null,
                            name: "✅"
                        },
                        custom_id: "confirm_close_ticket"
                    }
                ],
            },
        ],
        ephemeral: true
    });
}