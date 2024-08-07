// Command to add kills for a team
module.exports = {
    name: 'addkills',
    description: 'Add kills for a team',
    execute(message, args, client) {
        const [teamId, kills] = args;
        if (!client.teams[teamId]) {
            return message.reply('Invalid team ID.');
        }
        client.teams[teamId].kills += parseInt(kills);
        message.channel.send(`Added ${kills} kills to team ${client.teams[teamId].teamName}.`);
    }
};