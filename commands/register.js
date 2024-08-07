const generateId = require('../utils/generateId');

// Command to register a new team
module.exports = {
    name: 'register',
    description: 'Register a new team',
    execute(message, args, client) {
        if (!client.registrationOpen) {
            return message.reply('Registration is currently closed.');
        }

        if (args.length < 4) {
            return message.reply('Please provide a team name and the usernames of 3 players.');
        }

        const [teamName, ...playerNames] = args;

        if (playerNames.length !== 3) {
            return message.reply('A team must have exactly 3 players.');
        }

        const playerIds = playerNames.map(playerName => {
            const playerId = Object.keys(client.players).find(id => client.players[id].playerName === playerName);
            if (!playerId) {
                return message.reply(`Player ${playerName} is not registered.`);
            }
            return playerId;
        });

        if (playerIds.includes(undefined)) {
            return; // Error already handled above
        }

        const teamId = generateId();
        const teamNumber = Object.keys(client.teams).length + 1; // Temporary team number for the current tournament

        client.teams[teamId] = { teamId, teamName, playerIds, score: 0, kills: 0, teamNumber };
        playerIds.forEach(playerId => {
            client.players[playerId].teams.push(teamId);
        });

        message.channel.send(`Team ${teamName} registered with players: ${playerNames.join(', ')}. Your permanent team ID is ${teamId} and your team number for this tournament is ${teamNumber}.`);
    }
};