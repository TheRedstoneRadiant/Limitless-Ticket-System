// Map buttons to ticket names
const ticketType = {
    "ticket_pricing": "Pricing",
    "ticket_support": "Support",
    "ticket_bugreport": "Bug Report",
};

module.exports = async function (interaction) {
    // Find existing ticket by channel topic
    const existingTicketChannel = await interaction.guild.channels.cache.find(channel => channel.topic == interaction.user.id);
    if (existingTicketChannel) {
        return await interaction.reply({
            embeds: [
                {
                    title: `You already have an open ticket!`,
                    description: `<#${existingTicketChannel.id}>`,
                    color: 5094616
                },
            ],
            ephemeral: true
        });
    }

    // Create ticket channel
    const channel = await interaction.guild.channels.create({
        name: `${ticketType[interaction.customId]}-${interaction.user.username}`,
        topic: interaction.user.id,  // Channel topic: User ID
        permissionOverwrites: [
            {
                id: interaction.guild.roles.everyone.id,
                deny: ['ViewChannel'],
            },
            {
                id: interaction.user.id,
                allow: ['ViewChannel']
            }
        ],
    });

    // Defer interaction
    interaction.deferUpdate();

    // Ping user
    channel.send(`<@${interaction.user.id}>`)
        .then(m => m.delete());

    // Send ticket closure embed
    await channel.send({
        embeds: [
            {
                title: 'Close Ticket',
                description: 'Click the button to close your ticket.',
                color: 5094616,
            },
        ],
        components: [
            {
                type: 1,
                components: [
                    {
                        type: 2,
                        label: 'Close',
                        style: 2,
                        emoji: {
                            id: null,
                            name: "🔒"
                        },
                        custom_id: "confirm_close_ticket"
                    }
                ],
            },
        ],
    });
}