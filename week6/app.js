//const fs = require('fs');
//function writeCB() {}
//fs.writeFile("data.txt", "This is a message for you", (err) => {
    //if (err) {
      //return console.error('Error writing file:', err);
    //} else {
      //console.log('File written successfully.');
      //fs.readFile("data.txt", "utf8", (err, data) => {
        //if (err) {
          //return console.error('Error reading file:', err);
        //} else {
          //console.log('File contents:', data);
        //}
    //});
    //}
//});

const logger = require('./logger.js');
logger.log();