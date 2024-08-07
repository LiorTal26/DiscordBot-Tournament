// Fun Easter Egg command
module.exports = {
    name: 'easteregg',
    description: 'A fun little surprise!',
    execute(message, args, client) {
        message.channel.send('🥚 You found the Easter Egg! Congratulations! 🎉');
    }
};