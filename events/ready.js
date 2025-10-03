const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const fs = require('fs');

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.log(`[READY] ${client.user.username} (${client.user.id}) is ready | ${client.guilds.cache.size.toLocaleString('en-US')} servers | ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0).toLocaleString('en-US')} users. [Contact](https://github.com/dekart1017)`.green);
    
        const commands = [];

        const commandFiles = fs.readdirSync(`${process.cwd()}/commands`).filter(file => file.endsWith(".js"));
        commandFiles.forEach(commandFile => {
            const command = require(`${process.cwd()}/commands/${commandFile}`);
            if (command.data && !command.botOwnerOnly) commands.push(command.data.toJSON());
        });

        const rest = new REST({ version: '10' }).setToken(client.token);

        rest.put(
            // Routes.applicationGuildCommands(client.user.id, guildId), { body: commands } // Guild commands
            Routes.applicationCommands(client.user.id), { body: commands } // Global commands
            )
            .then((data) => console.log(`[SLASH] ${data.length} commands loaded! [Contact](https://github.com/dekart1017)`.green))
            .catch(console.error);
    }
}
