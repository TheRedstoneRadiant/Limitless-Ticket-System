const { faqCollection } = require("../../index");

module.exports = async function (interaction) {
    // Generate FAQ select menu options
    let faqOptions = [];

    await faqCollection.find({}).forEach(question => {
        faqOptions.push({label: question.question, value: question._id.toString()});
    });

    // Send FAQ prompt
    await interaction.channel.send({
        embeds: [
            {
                title: 'Frequently Asked Questions',
                description: 'Select an option from the dropdown below.',
                color: 5094616
            },
        ],
        components: [
            {
                type: 1,
                components: [
                    {
                        options: faqOptions,
                        placeholder: "Frequently Asked Questions",
                        type: 3,
                        custom_id: 'faq_selector'
                    }
                ]
            },
        ],
    });

    // Send support prompt
    await interaction.channel.send({
        embeds: [
            {
                title: 'Need Help?',
                description: 'Click the button below to create a ticket.',
                color: 5094616,
                footer: {
                    iconURL: 'https://i.imgur.com/kY65sQa.png',
                    text: 'Limitless Reloaded',
                }
            },
        ],
        components: [
            {
                type: 1,
                components: [
                    {
                        type: 2,
                        label: 'Create a ticket',
                        style: 2,
                        emoji: {
                            id: null,
                            name: "📨"
                        },
                        custom_id: "faq_support"
                    }
                ]
            },
        ],
    });

    // Reply to interaction
    await interaction.reply({
        embeds: [
            {
                title: '✅ Prompt created!',
                footer: {
                    iconURL: "https://i.imgur.com/kY65sQa.png",
                    text: 'Limitless Reloaded',
                },
                color: 5094616
            },
        ],
        ephemeral: true
    });
}