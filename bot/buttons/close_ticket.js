const { client, faqCollection, ticketCollection } = require("../../index");
const createTranscript = require("../methods/generate_channel_transcript");

module.exports = async function (interaction) {
    const { dmMessage } = await faqCollection.findOne({_id: "dmMessage"})
    const { user } = await ticketCollection.findOne({ channel: interaction.channel.id });

    // DM message & transcript
    dmMessage.embeds[0].timestamp = new Date().toISOString(); // Set embed timestamp

    const transcript = await createTranscript(interaction.channel);

    // Fetch ticket owner
    client.users.fetch(user, false)
        .then(ticketOwner => ticketOwner.send({...dmMessage, files: [transcript]})) // Send message
        .catch(_ => null); // Failed to DM message

    // Delete Ticket
    ticketCollection.updateOne({ channel: interaction.channel.id }, { $set: { open: false } }); // Mark ticket as closed
    interaction.channel.delete(); // Delete ticket channel
};
