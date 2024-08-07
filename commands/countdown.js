// Command to start a countdown for the match
module.exports = {
    name: 'countdown',
    description: 'Start a countdown for the match',
    async execute(message, args, client) {
        if (args.length === 0) {
            return message.reply('Please specify the countdown time in seconds.');
        }

        let countdownTime = parseInt(args[0]);
        if (isNaN(countdownTime) || countdownTime <= 0) {
            return message.reply('Please provide a valid number of seconds.');
        }

        const countdownMessage = await message.channel.send(`Countdown starting from ${countdownTime} seconds...`);

        const interval = setInterval(async() => {
            countdownTime--;
            if (countdownTime > 0) {
                await countdownMessage.edit(`${countdownTime} seconds remaining...`);
            } else {
                clearInterval(interval);
                await countdownMessage.edit('The match is starting now!');
            }
        }, 1000);
    }
};