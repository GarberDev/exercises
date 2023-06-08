const fs = require('fs');
const axios = require('axios');
const process = require('process');

function cat(path) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.error(`Error: ${err}`);
      process.exit(1);
    }
    console.log(data);
  });
}

async function webCat(url) {
  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (err) {
    console.error(`Error: ${err}`);
    process.exit(1);
  }
}

const arg = process.argv[2];

if (arg.startsWith('http')) {
  webCat(arg);
} else {
  cat(arg);
}