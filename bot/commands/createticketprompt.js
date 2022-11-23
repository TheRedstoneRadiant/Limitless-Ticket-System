module.exports = async function (interaction) {
    await interaction.channel.send({
        embeds: [
            {
                title: 'Create a ticket :tickets:',
                description: 'Choose the option that best describes your issue.',
                color: 5094616,
            },
        ],
        components: [
            {
                type: 1,
                components: [
                    {
                        type: 2,
                        label: 'Pricing',
                        style: 1,
                        emoji: {
                            id: null,
                            name: "💸"
                        },
                        custom_id: "ticket_pricing"
                    },
                    {
                        type: 2,
                        label: 'Support',
                        style: 1,
                        emoji: {
                            id: null,
                            name: "❓"
                        },
                        custom_id: "ticket_support"
                    },
                    {
                        type: 2,
                        label: 'Report a bug',
                        style: 1,
                        emoji: {
                            id: null,
                            name: "🧐"
                        },
                        custom_id: "ticket_bugreport"
                    },
                ],
            },
        ],
    });

    await interaction.reply({
        embeds: [
            {
                title: '✅ Prompt created!',
                footer: {
                    iconURL: "https://i.imgur.com/kY65sQa.png",
                    text: 'Limitless Reloaded',
                },
                color: 5094616
            },
        ],
        ephemeral: true
    })
}