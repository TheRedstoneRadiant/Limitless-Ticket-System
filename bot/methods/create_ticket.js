const { ticketCollection } = require("../../index");

module.exports = async (interaction, ticketType) => {
    const { openCategory } = await ticketCollection.findOne({ _id: 'categories' });

    const existingTicket = await ticketCollection.findOne({ user: interaction.user.id, open: true });
    if (existingTicket) {
        interaction.reply({
            embeds: [
                {
                    title: `You already have an open ticket!`,
                    description: `<#${existingTicket.channel}>`,
                    color: 5094616
                },
            ],
            ephemeral: true
        });

        return null;
    }

    // Generate ticket ID
    const ticketId = Math.random().toString().substr(2, 6);

    // Create ticket channel
    const channel = await interaction.guild.channels.create({
        name: `ticket-${ticketId}`,
        topic: `${interaction.user.username}'s ${ticketType} ticket`,
        parent: openCategory,  // "Open" category
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

    ticketCollection.insertOne({ _id: ticketId, channel: channel.id, user: interaction.user.id, open: true, assignee: null });

    interaction.reply({
        embeds: [
            {
                title: "Ticket Created!",
                description: `<#${channel.id}>`,
                color: 5094616,
                footer: {
                    iconURL: 'https://i.imgur.com/kY65sQa.png',
                    text: 'Limitless Reloaded',
                },
            },
        ],
        ephemeral: true
    });

    // Ping user
    channel.send(`<@${interaction.user.id}>`)
        .then(m => m.delete());

    // Send ticket closure embed
    channel.send({
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

    return channel;
}
