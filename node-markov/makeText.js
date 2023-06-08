/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const process = require('process');
const MarkovMachine = require('./markov');

function generateText(text) {
  let mm = new MarkovMachine(text);
  console.log(mm.makeText());
}

function makeText(path, isUrl) {
  if (isUrl) {
    axios.get(path)
      .then((res) => {
        generateText(res.data);
      })
      .catch((err) => {
        console.error(`Error fetching ${path}: ${err}`);
        process.exit(1);
      });
  } else {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading ${path}: ${err}`);
        process.exit(1);
      } else {
        generateText(data);
      }
    });
  }
}

let path = process.argv[2];
let isUrl = path.startsWith('http://') || path.startsWith('https://');
makeText(path, isUrl);
