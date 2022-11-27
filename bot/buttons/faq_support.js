// Buttons for support prompt
const supportButtons = [
    {
        type: 2,
        label: 'Pricing',
        style: 3,
        emoji: {
            id: null,
            name: "💸"
        },
        custom_id: "ticket_pricing"
    },
    {
        type: 2,
        label: 'Support',
        style: 2,
        emoji: {
            id: null,
            name: "❓"
        },
        custom_id: "ticket_support"
    },
];

module.exports = async (interaction) => {
    await interaction.reply({
        embeds: [
            {
                title: 'Create a Ticket',
                description: 'Select the option that best describes your issue.',
                color: 5094616,
            },
        ],
        components: [
            {
                type: 1,
                components: supportButtons
            },
        ],
        ephemeral: true
    });
}