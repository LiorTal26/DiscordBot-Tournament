const generateId = require('../utils/generateId');

// Command to register a new user
module.exports = {
    name: 'userregister',
    description: 'Register a new user',
    execute(message, args, client) {
        const userName = args.join(' '); // Get the user-provided name
        if (!userName) {
            return message.reply('Please provide a name to register.');
        }

        const userId = generateId(); // Generate a unique ID for the user

        if (client.players[userId]) {
            return message.reply('You are already registered.');
        }

        client.players[userId] = { playerId: userId, playerName: userName, teams: [] };

        const embed = {
            color: 0x0099ff,
            title: 'User Registration',
            description: `User registered successfully!`,
            fields: [
                { name: 'User Name', value: userName, inline: true },
                { name: 'User ID', value: userId, inline: true },
            ],
        };

        message.channel.send({ embeds: [embed] });
    }
};