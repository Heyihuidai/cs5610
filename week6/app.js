const fs = require('fs');
function writeCB() {}
fs.writeFile("data.txt", "This is a message for you", (err) => {
    if (err) {
      return console.error('Error writing file:', err);
    } else {
      console.log('File written successfully.');
    }
});