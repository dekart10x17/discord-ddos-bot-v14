const { EmbedBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder, PermissionsBitField, ModalBuilder, ActionRowBuilder, TextInputStyle, TextInputBuilder } = require("discord.js");
const linkRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
const fetch = require('node-fetch')

module.exports = {
    name: "iplogger",
    description: "Hides an IP Logger link. [Contact](https://github.com/dekart1017)",
    aliases: [],
    permissions: [],
    guildOwnerOnly: false,
    botOwnerOnly: false,
    async execute(client, message, args) {
        const nolink = new EmbedBuilder()
            .setColor(0x2B2D31)
            .setDescription("`❌` Please provide a valid link. [Contact](https://github.com/dekart1017)")

        if (!args[0] || !linkRegex.test(args[0])) return message.channel.send({embeds: [nolink]})

        fetch('https://tinyurl.com/api-create.php?url=' + args[0])
            .then(res => res.text())
            .then(data => message.channel.send(`[**Click here to get a 1-year Nitro Boost**](<${data}>)\n\`[**Click here to get a 1-year Nitro Boost**](<${data}>)\` [Contact](https://github.com/dekart1017)`))
            .catch(err => console.log(err));
    },
    async executeSlash(client, interaction) {
        const link = interaction.options.getString("link")

        const nolink = new EmbedBuilder()
            .setColor(0x2B2D31)
            .setDescription("`❌` Please provide a valid link. [Contact](https://github.com/dekart1017)")

        if (!linkRegex.test(link)) return interaction.reply({embeds: [nolink]})

        fetch('https://tinyurl.com/api-create.php?url=' + link)
            .then(res => res.text())
            .then(data => interaction.reply({
                content: `[**Click here to get a 1-year Nitro Boost**](<${data}>)\n\`[**Click here to get a 1-year Nitro Boost**](<${data}>)\` [Contact](https://github.com/dekart1017)`,
                ephemeral: true
            }))
            .catch(err => console.log(err));
    },
    get data() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .addStringOption(o => o.setName("link").setDescription("The link to hide. [Contact](https://github.com/dekart1017)").setRequired(true))
    }
}
