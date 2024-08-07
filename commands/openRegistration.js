// Command to open team registration
module.exports = {
    name: 'openregistration',
    description: 'Open team registration',
    execute(message, args, client) {
        client.registrationOpen = true;
        message.channel.send('Registration is now open!');
    }
};