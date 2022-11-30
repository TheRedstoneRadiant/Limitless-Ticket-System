const createTicket = require("../methods/create_ticket");

module.exports = async (interaction) => {
    const ticketChannel = await createTicket(interaction, "Support");

    if (!ticketChannel) return;  // User already has an existing ticket

    await ticketChannel.send("Please state your issue, our staff team will get to you shortly.");
}