// Function to display match pairs
function displayMatches(message, matches) {
    const fields = matches.map((match, index) => ({
        name: `Match ${index + 1}`,
        value: `${match[0]} vs ${match[1]}`,
        inline: false
    }));

    const embed = {
        color: 0x0099ff,
        title: 'Match Pairs',
        fields,
    };

    message.channel.send({ embeds: [embed] });
}

module.exports = displayMatches;