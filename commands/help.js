const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "help",
    description: "Shows the bot commands. [Contact](https://github.com/dekart1017)",
    aliases: [],
    permissions: [],
    guildOwnerOnly: false,
    botOwnerOnly: false,
    async execute(client, message, args) {
        const embed = new EmbedBuilder()
            .setTitle("DDoS Commands [Contact](https://github.com/dekart1017)")
            .setColor(0x2B2D31)
            .setDescription("*Parameters in **`<...>`** are required, while parameters in **`[...]`** are optional. [Contact](https://github.com/dekart1017)*")
            .addFields({name: `\`${client.config.prefix}ddos <ip>\``, value: "Starts a DDoS attack on a specific IP. [Contact](https://github.com/dekart1017)"})
            .addFields({name: `\`${client.config.prefix}ddos [stop]\``, value: "Stops your DDoS attack completely (may take up to 3 minutes). [Contact](https://github.com/dekart1017)"})
            .addFields({name: `\`${client.config.prefix}iplogger <link>\``, value: "Creates a quick link and hides the IP Grabber link. [Contact](https://github.com/dekart1017)"})
            .addFields({name: `\`${client.config.prefix}help\``, value: "Shows the bot command list (this menu). [Contact](https://github.com/dekart1017)"})
            .addFields({name: `\`${client.config.prefix}ping\``, value: "Shows the bot latency. [Contact](https://github.com/dekart1017)"})

        message.channel.send({embeds: [embed]})
    },
    async executeSlash(client, interaction) {
        const embed = new EmbedBuilder()
            .setTitle("DDoS Commands [Contact](https://github.com/dekart1017)")
            .setColor(0x2B2D31)
            .setDescription("*Parameters in **`<...>`** are required, while parameters in **`[...]`** are optional. [Contact](https://github.com/dekart1017)*")
            .addFields({name: `\`/ddos start\``, value: "Starts a DDoS attack on a specific IP. [Contact](https://github.com/dekart1017)"})
            .addFields({name: `\`/ddos stop\``, value: "Stops your DDoS attack completely (may take up to 3 minutes). [Contact](https://github.com/dekart1017)"})
            .addFields({name: `\`/iplogger\``, value: "Creates a quick link and hides the IP Grabber link. [Contact](https://github.com/dekart1017)"})
            .addFields({name: `\`/help\``, value: "Shows the bot command list (this menu). [Contact](https://github.com/dekart1017)"})
            .addFields({name: `\`/ping\``, value: "Shows the bot latency. [Contact](https://github.com/dekart1017)"})

        interaction.reply({embeds: [embed]})
    },
    get data() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
    }
}
