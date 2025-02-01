const fs = require('fs');

// Read the JSON file
fs.readFile('games.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // Parse the JSON data
    let gamesArray;
    try {
        gamesArray = JSON.parse(data);
    } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        return;
    }

    // Add the "image" parameter to each object with a dot in between
    gamesArray.forEach(game => {
        game.image = game.id + '.' + game.img; // Concatenate with a dot
    });

    // Write the updated array back to a new JSON file
    fs.writeFile('games.json', JSON.stringify(gamesArray, null, 2), (writeErr) => {
        if (writeErr) {
            console.error('Error writing the file:', writeErr);
            return;
        }
        console.log('Updated games data has been written to updatedGames.json');
    });
});