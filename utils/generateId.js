const { v4: uuidv4 } = require('uuid');

// Function to generate a unique ID
function generateId() {
    return uuidv4();
}

module.exports = generateId;