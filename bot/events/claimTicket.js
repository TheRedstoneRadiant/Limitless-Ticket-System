const { ticketCollection } = require("../../index");

module.exports = async (message) => {
    const { inProgressCategory } = await ticketCollection.findOne({ _id: 'categories' });

    ticketCollection.updateOne({ channel: message.channel.id }, { $set: { assignee: message.author.id } });
    await message.channel.edit({ parent: inProgressCategory });  // Move ticket to "in progress" category

    console.debug(`${message.channel.name} was claimed by ${message.author.tag}`);
}