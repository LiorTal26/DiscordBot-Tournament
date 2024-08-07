// Command to signal the end of a match and prompt for results
module.exports = {
    name: 'endmatch',
    description: 'Signal the end of a match and prompt for results',
    execute(message, args, client) {
        if (client.currentMatch !== null) {
            return message.reply('A match is already pending results. Please enter the results first.');
        }

        client.currentMatch = generateId();
        message.channel.send('The match has ended! Please enter the results using the command: !result <teamId1> <kills1> <teamId2> <kills2> ... <teamId20> <kills20>');
    }
};