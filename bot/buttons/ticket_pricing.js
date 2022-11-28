const { pricingCollection } = require("../../index");
const { createTicket } = require("../methods/create_ticket");

module.exports = async (interaction) => {
    const ticketChannel = await createTicket(interaction, "Pricing");

    // Fetch prices
    let prices = [];
    await pricingCollection.find({}).forEach(product => {
        prices.push({ name: `**${product.product}**`, value: `$${product.price}` });
    });

    await ticketChannel.send({
        embeds: [
            {
                title: 'Pricing',
                color: 5094616,
                fields: prices,
                footer: {
                    iconURL: 'https://i.imgur.com/kY65sQa.png',
                    text: 'Limitless Reloaded',
                }
            }
        ]
    });
}