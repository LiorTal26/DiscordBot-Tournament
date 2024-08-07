// Command to remove a team and provide a reason
module.exports = {
    name: 'removeteam',
    description: 'Remove a team and provide a reason',
    execute(message, args, client) {
        const [teamId, ...reasonArr] = args;
        const reason = reasonArr.join(' ');

        if (!client.teams[teamId]) {
            return message.reply(`Invalid team ID: ${teamId}`);
        }

        const teamName = client.teams[teamId].teamName;
        delete client.teams[teamId];

        message.channel.send(`Team ${teamName} (ID: ${teamId}) has been removed. Reason: ${reason}`);
    }
};