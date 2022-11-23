const ticketType = {
    "ticket_pricing": "Pricing",
    "ticket_support": "Support",
    "ticket_bugreport": "Bug Report",
};

module.exports = async function (interaction) {
    const existingTicketChannel = await interaction.guild.channels.cache.find(channel => channel.name === `${ticketType[interaction.customId]}-${interaction.user.username}`.toLowerCase());
    if (existingTicketChannel) {
        return await interaction.reply({
            embeds: [
                {
                    title: `You already have an open ${ticketType[interaction.customId]} ticket!`,
                    description: `<#${existingTicketChannel.id}>`,
                    color: 5094616,
                },
            ],
            ephemeral: true
        });
    }

    const channel = await interaction.guild.channels.create({
		name: `${ticketType[interaction.customId]}-${interaction.user.username}`,
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

    await interaction.reply({
        embeds: [
            {
                title: 'Ticket Created!',
                description: `<#${channel.id}>`,
                color: 5094616,
            },
        ],
        ephemeral: true
    });

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
                        custom_id: "close_ticket"
                    }
                ],
            },
        ],
    });
}