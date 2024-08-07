// Command to close team registration
module.exports = {
    name: 'endregistration',
    description: 'End team registration',
    execute(message, args, client) {
        client.registrationOpen = false;
        message.channel.send('Registration is now closed!');
    }
};