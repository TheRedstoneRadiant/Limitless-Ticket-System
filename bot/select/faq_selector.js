const { ObjectId } = require("mongodb");
const { faqCollection } = require("../../index");

module.exports = async function (interaction) {
    // Unselect question
    for (let option of interaction.message.components[0].components[0].data.options) {
        option.default = false;
    };
    
    // Update component
    await interaction.update({components: interaction.message.components});
    
    // Find selected question
    const question = await faqCollection.findOne({ _id: ObjectId(interaction.values[0]) });

    // Ephemeral question reply
    await interaction.followUp({
        embeds: [
            {
                title: `**${question.question}**`,
                description: question.answer,
                color: 5094616,
                footer: {
                    iconURL: 'https://i.imgur.com/kY65sQa.png',
                    text: 'Limitless Reloaded',
                }
            }
        ],
        ephemeral: true
    });
};