module.exports = {
    name: "messageCreate",
    async execute(client, message) {
        if (!message.inGuild() || message.author.bot) return;

        // prefix handling
        if (!message.content.startsWith(client.config.prefix)) return;

        // get command
        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) || client.commands.find(command => command.aliases && command.aliases.includes(commandName));
        if (!command) return;

        // permission check
        if (command.permissions) {
            if (command.botOwnerOnly) {
                if (!client.config.owners.includes(message.author.id)) return;
            };

            if (command.guildOwnerOnly) {
                if (message.guild.ownerId != message.author.id && !client.config.owners.includes(message.author.id)) 
                    return message.reply("❌ **You must be the server owner to run this command. [Contact](https://github.com/dekart1017)**").catch(() => {});
            };

            const authorPerms = message.channel.permissionsFor(message.author) || message.member.permissions;
            if (!authorPerms.has(command.permissions) && !client.config.owners.includes(message.author.id)) 
                return message.reply("❌ **You do not have the required permissions to run this command. [Contact](https://github.com/dekart1017)**").catch(() => {});
        };

        command.execute(client, message, args);
        console.log("[CMD]".brightBlue, `${message.guild.name} | ${message.channel.name} | ${message.author.tag} | ${command.name}`);
    }
}
