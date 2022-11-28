const { AttachmentBuilder } = require("discord.js");

module.exports = async (channel) => {
    let transcript = `
<!DOCTYPE html>
<html>
    <body>
        Lorem Ipsum Dolor Sit Amet
    </body>
</html>`;

    return new AttachmentBuilder(Buffer.from(transcript), {name: `${channel.name}.html`});
}
