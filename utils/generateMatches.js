// Function to generate match pairs
function generateMatches(teams) {
    const teamNames = Object.keys(teams);
    const matches = [];
    for (let i = 0; i < teamNames.length; i += 2) {
        matches.push([teamNames[i], teamNames[i + 1]]);
    }
    return matches;
}

module.exports = generateMatches;