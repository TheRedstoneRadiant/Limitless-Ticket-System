const { createTicket } = require("../methods/create_ticket");

module.exports = async (interaction) => {
    const ticketChannel = createTicket(interaction, "Support");

    await ticketChannel.send("Please state your issue, our staff team will review you shortly.");
}