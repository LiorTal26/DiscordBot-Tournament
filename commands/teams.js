// Command to list all registered teams
module.exports = {
    name: 'teams',
    description: 'List all registered teams',
    execute(message, args, client) {
        if (Object.keys(client.teams).length === 0) {
            return message.channel.send('No teams have registered yet.');
        }

        const fields = Object.keys(client.teams).map(teamId => {
            const team = client.teams[teamId];
            const playersList = team.playerIds.map(id => {
                const player = client.players[id];
                return player ? player.playerName : 'Unknown';
            }).join(', ');
            return {
                name: `Team ${team.teamNumber} - ${team.teamName}`,
                value: `Players: ${playersList}\nScore: ${team.score}`,
                inline: false
            };
        });

        const embed = {
            color: 0x0099ff,
            title: 'Registered Teams',
            fields,
        };

        message.channel.send({ embeds: [embed] });
    }
};