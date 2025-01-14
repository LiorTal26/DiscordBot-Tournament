// Function to update team scores based on match results
const scoreMap = {
    1: 12,
    2: 9,
    3: 7,
    4: 5,
    5: 4,
    6: 3,
    7: 3,
    8: 2,
    9: 2,
    10: 2,
    11: 1,
    12: 1,
    13: 1,
    14: 1,
    15: 1,
    16: 0,
    17: 0,
    18: 0,
    19: 0,
    20: 0
};

function updateScores(teams, rankings) {
    rankings.forEach(({ teamId, rank, kills }) => {
        if (teams[teamId]) {
            teams[teamId].score += (scoreMap[rank] || 0) + kills;
        }
    });
}

module.exports = updateScores;