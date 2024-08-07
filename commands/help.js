// Command to list all available commands
module.exports = {
    name: 'help',
    description: 'List all available commands',
    aliases: ['commands', 'assist'],
    execute(message, args, client) {
        const fields = client.commands.map(cmd => ({
            name: cmd.name,
            value: cmd.description,
            inline: true
        }));

        const embed = {
            color: 0x0099ff,
            title: 'Available Commands',
            fields
        };

        message.channel.send({ embeds: [embed] });
    }
};