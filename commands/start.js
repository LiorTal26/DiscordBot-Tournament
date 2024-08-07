const generateMatches = require('../utils/generateMatches');
const displayMatches = require('../utils/displayMatches');

// Command to start the tournament
module.exports = {
    name: 'start',
    description: 'Start the tournament',
    execute(message, args, client) {
        if (Object.keys(client.teams).length !== 20) {
            return message.reply('Exactly 20 teams are required to start the tournament.');
        }
        message.channel.send('The tournament is starting!');
        client.matches = generateMatches(client.teams);
        displayMatches(message, client.matches);
    }
};