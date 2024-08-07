// Command to set the number of matches today
module.exports = {
    name: 'matchestoday',
    description: 'Set the number of matches for today',
    execute(message, args, client) {
        if (args.length === 0) {
            return message.reply('Please specify the number of matches for today.');
        }

        const numMatches = parseInt(args[0]);
        if (isNaN(numMatches) || numMatches <= 0) {
            return message.reply('Please provide a valid number of matches.');
        }

        client.numMatchesToday = numMatches;
        message.channel.send(`The number of matches set for today is ${numMatches}.`);
    }
};