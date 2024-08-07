const generateId = require('../utils/generateId');

// Command to add a new team
module.exports = {
    name: 'addteam',
    description: 'Add a new team',
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
                message.reply(`Player ${playerName} is not registered.`);
                return null;
            }
            return playerId;
        });

        if (playerIds.includes(null)) {
            return; // Error already handled above
        }

        const teamId = generateId();
        const teamNumber = Object.keys(client.teams).length + 1; // Temporary team number for the current tournament

        client.teams[teamId] = { teamId, teamName, playerIds, score: 0, kills: 0, teamNumber };
        playerIds.forEach(playerId => {
            client.players[playerId].teams.push(teamId);
        });

        const embed = {
            color: 0x0099ff,
            title: 'Team Registration',
            description: `Team ${teamName} registered successfully!`,
            fields: [
                { name: 'Team Name', value: teamName, inline: true },
                { name: 'Team ID', value: teamId, inline: true },
                { name: 'Team Number', value: teamNumber, inline: true },
                { name: 'Players', value: playerNames.join(', '), inline: false },
            ],
        };

        message.channel.send({ embeds: [embed] });
    }
};