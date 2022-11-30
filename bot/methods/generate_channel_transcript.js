const { AttachmentBuilder, CommandInteractionOptionResolver } = require("discord.js");

module.exports = async (channel) => {
    let transcript = `<!DOCTYPE html><html lang="en"><head><title>${channel.name}</title><style>@import url('https://fonts.cdnfonts.com/css/whitney-2'); body{background-color: #32353b; color: white; font-family: 'Whitney Book', sans-serif;}.messages{margin-left: 12px; margin-top: 20px;}.message{margin-bottom: 30px;}.author{display: flex; justify-content: flex-start;}.author > *{margin: 0;}.pfp{width: 40px; height: 40px; border-radius: 50%;}.username{margin-left: 13px; font-family: 'Whitney Semibold', sans-serif;}.timestamp{font-size: 12px; color: #a3a6aa; margin: 3px 0 0 8px;}.message-content{margin-top: -18px; margin-left: 52px;}img.attachment{max-width: 400px; margin-left: 52px;}</style></head><body> <main class="messages">`;

    let messages = [];

    // Create message pointer
    let message = await channel.messages
        .fetch({ limit: 1 })
        .then(messagePage => (messagePage.size === 1 ? messagePage.at(0) : null));

    while (message) {
        await channel.messages
            .fetch({ limit: 100, cache: false, before: message.id })
            .then(messagePage => {
                messagePage.forEach(msg => messages.push(msg));

                // Update message pointer to be last message
                message = 0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
            })
    };

    messages.reverse();

    for (const message of messages) {
        let content = '';

        if (message.content) {
            content = message.content;
        }

        message.attachments.forEach(attachment => {
            if (attachment.contentType.startsWith("image")) {
                content += `<br><img class="attachment" src="${attachment.url}">`
            } else {
                content += `<br>${attachment.name}: ${attachment.url}`;
            };
        });

        if (!content) {
            continue;
        }

        transcript += `<div class="message"><div class="author"><img class="pfp" src="${message.author.displayAvatarURL()}" alt="${message.author.username}"><p class="username">${message.author.username}</p><span class="timestamp">${new Date(message.createdTimestamp).toLocaleString()}</span></div><p class="message-content">${content}</p></div>`;
    }

    transcript += "</main></body></html>";

    return new AttachmentBuilder(Buffer.from(transcript), { name: `${channel.name}.html` });
}
