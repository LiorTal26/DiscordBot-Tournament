const displayScoreTable = require('../utils/displayScoreTable');

// Command to display the score table
module.exports = {
    name: 'scoretable',
    description: 'Display the score table',
    execute(message, args, client) {
        displayScoreTable(message, client.teams, client.players);
    }
};