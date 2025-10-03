const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Shows the bot's ping. [Contact](https://github.com/dekart1017)",
    aliases: [],
    permissions: [],
    guildOwnerOnly: false,
    botOwnerOnly: false,
    async execute(client, message, args) {
        message.reply(`🏓 **My ping is:** ${client.ws.ping} ms. [Contact](https://github.com/dekart1017)`).catch(() => false);
    },
    async executeSlash(client, interaction) {
        interaction.reply(`🏓 **My ping is:** ${client.ws.ping} ms. [Contact](https://github.com/dekart1017)`).catch(() => false);
    },
    get data() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
    }
}
