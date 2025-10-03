module.exports = {
    name: "interactionCreate",
    async execute(client, interaction) {
        if (!interaction.guild) return;

        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;

            // permission check
            if (command.permissions) {
                if (command.botOwnerOnly) {
                    if (!client.config.owners.includes(interaction.user.id)) return interaction.reply({
                        content: `❌ **You must be the bot owner to run this command. [Contact](https://github.com/dekart1017)**`,
                        ephemeral: true
                    });
                };

                if (command.guildOwnerOnly) {
                    if (interaction.member.guild.ownerId != interaction.user.id && !client.config.owners.includes(interaction.user.id)) return interaction.reply({
                        content: `❌ **You must be the server owner to run this command. [Contact](https://github.com/dekart1017)**`,
                        ephemeral: true
                    });
                };

                const authorPerms = interaction.channel.permissionsFor(interaction.user) || interaction.member.permissions;
                if (!authorPerms.has(command.permissions) && !client.config.owners.includes(interaction.user.id)) return interaction.reply({
                    content: `❌ **You do not have the required permissions to run this command. [Contact](https://github.com/dekart1017)**`,
                    ephemeral: true
                });
            };

            command.executeSlash(client, interaction);
            console.log("[CMD-S]".brightBlue, `${interaction.guild.name} | ${interaction.channel.name} | ${interaction.user.tag} | ${command.name}`);
        };
    }
}
