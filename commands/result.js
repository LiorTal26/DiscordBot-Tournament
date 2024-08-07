const updateScores = require('../utils/updateScores');
const displayScoreTable = require('../utils/displayScoreTable');

// Command to enter match result and kills for all teams
module.exports = {
    name: 'result',
    description: 'Enter match result and kills for all teams',
    execute(message, args, client) {
        if (client.currentMatch === null) {
            return message.reply('No match is pending results. Please end a match first using !endmatch.');
        }

        if (args.length !== 40) {
            return message.reply('You must provide the rank and kills for all 20 teams. Example usage: !result <teamId1> <kills1> <teamId2> <kills2> ... <teamId20> <kills20>');
        }

        const matchId = client.currentMatch;
        const rankings = [];

        let mostKills = 0;
        let mostKillsTeam = '';
        let lastTeam = '';
        let winningTeam = '';

        for (let i = 0; i < 40; i += 2) {
            const teamId = args[i];
            const kills = parseInt(args[i + 1]);
            if (!client.teams[teamId]) {
                return message.reply(`Invalid team ID: ${teamId}`);
            }
            rankings.push({ teamId, rank: (i / 2) + 1, kills });

            if (kills > mostKills) {
                mostKills = kills;
                mostKillsTeam = teamId;
            }

            if ((i / 2) + 1 === 1) {
                winningTeam = teamId;
            }

            if ((i / 2) + 1 === 20) {
                lastTeam = teamId;
            }
        }

        updateScores(client.teams, rankings);

        client.matches[matchId] = {
            tournamentId: client.currentTournamentId,
            matchId: matchId,
            rankings: rankings
        };

        client.currentMatch = null;
        message.channel.send(`Scores updated!`);
        displayScoreTable(message, client.teams);

        const winningTeamName = client.teams[winningTeam].teamName;
        const mostKillsTeamName = client.teams[mostKillsTeam].teamName;
        const lastTeamName = client.teams[lastTeam].teamName;

        message.channel.send(`🏆 Congratulations to **${winningTeamName}** for winning this match!`);
        if (mostKills > 20) {
            message.channel.send(`🔥 **${mostKillsTeamName}** achieved more than 20 kills this match! Incredible performance!`);
        }
        message.channel.send(`💔 **${lastTeamName}**, better luck next time!`);
        message.channel.send(`🔫 **${mostKillsTeamName}** had the most kills this match with **${mostKills}** kills!`);
    }
};