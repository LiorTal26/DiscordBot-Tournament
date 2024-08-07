require('dotenv').config(); // Load environment variables from .env file
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
const generateId = require('./utils/generateId');

// Initialize the bot client with necessary intents
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Create collections to store commands and aliases
client.commands = new Collection();
client.aliases = new Collection();

// Load command files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    if (command.aliases) {
        command.aliases.forEach(alias => {
            client.aliases.set(alias, command.name);
        });
    }
}

// Helper function to load JSON data from a file
function loadJson(path) {
    if (fs.existsSync(path)) {
        return JSON.parse(fs.readFileSync(path));
    } else {
        return {};
    }
}

// Load data from JSON files
client.teams = loadJson('./data/teams.json');
client.players = loadJson('./data/players.json');
client.tournaments = loadJson('./data/tournaments.json');
client.matches = loadJson('./data/matches.json');

// Event handler for when the bot becomes ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.registrationOpen = false;
    client.currentTournamentId = generateId(); // Generate a new tournament ID for the current session
    client.currentMatch = null; // Track the state of the current match
    client.numMatchesToday = 0; // Initialize the number of matches today
});

// Event handler for new messages
client.on('messageCreate', message => {
    // Ignore messages from bots or messages that don't start with the prefix
    if (message.author.bot || !message.content.startsWith(config.prefix)) return;

    // Extract command name and arguments from the message
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    let commandName = args.shift().toLowerCase();

    // Check if the command exists in the collection
    if (!client.commands.has(commandName)) {
        if (client.aliases.has(commandName)) {
            commandName = client.aliases.get(commandName);
        } else {
            return;
        }
    }

    const command = client.commands.get(commandName);

    // Execute the command
    try {
        command.execute(message, args, client);
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }
});

// Helper function to save JSON data to a file
function saveJson(path, data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
    console.log(`Data saved to ${path}`);
}

// Save data to JSON files on process exit and other termination signals
function saveData() {
    saveJson('./data/teams.json', client.teams);
    saveJson('./data/players.json', client.players);
    saveJson('./data/tournaments.json', client.tournaments);
    saveJson('./data/matches.json', client.matches);
}

// Listen for termination signals to save data
process.on('exit', saveData);
process.on('SIGINT', () => {
    saveData();
    process.exit();
});
process.on('SIGTERM', () => {
    saveData();
    process.exit();
});
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    saveData();
    process.exit(1);
});

// Event handler for when the bot joins a new server
client.on('guildCreate', guild => {
    const channel = guild.systemChannel || guild.channels.cache.find(channel => channel.type === 'GUILD_TEXT' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'));
    if (channel) {
        channel.send('Hello! I am your Tournament Bot. Use `!help` to see all commands.');
    }
});

// Login the bot using the token from the .env file
client.login(process.env.BOT_TOKEN);