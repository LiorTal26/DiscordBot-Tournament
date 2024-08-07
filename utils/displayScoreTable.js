// Function to display the score table
function displayScoreTable(message, teams, players) {
    if (Object.keys(teams).length === 0) {
        return message.channel.send('No teams have registered yet.');
    }

    const fields = Object.keys(teams).map(teamId => {
        const team = teams[teamId];
        const playersList = team.playerIds.map(id => {
            const player = players[id];
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
        title: 'Current Scores',
        fields,
    };

    message.channel.send({ embeds: [embed] });
}

module.exports = displayScoreTable;