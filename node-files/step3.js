const fs = require('fs');
const axios = require('axios');
const process = require('process');

function cat(path, outputFile) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    if (outputFile) {
      fs.writeFile(outputFile, data, (err) => {
        if (err) {
          console.error(`Couldn't write ${outputFile}:`);
          console.error(err);
          process.exit(1);
        }
      });
    } else {
      console.log(data);
    }
  });
}

async function webCat(url, outputFile) {
  try {
    const response = await axios.get(url);
    const data = response.data;
    if (outputFile) {
      fs.writeFile(outputFile, data, (err) => {
        if (err) {
          console.error(`Couldn't write ${outputFile}:`);
          console.error(err);
          process.exit(1);
        }
      });
    } else {
      console.log(data);
    }
  } catch (err) {
    console.error(`Error: ${err}`);
    process.exit(1);
  }
}
const args = process.argv.slice(2);
const outputIndex = args.indexOf('--out');

if (outputIndex !== -1) {
  if (args.length < 3) {
    console.error("Missing necessary arguments. Usage: node step3.js [--out outputFile] inputFileOrURL");
    process.exit(1);
  }
  const outputFile = args[outputIndex + 1];
  const input = args[outputIndex + 2]; 
  if (input.startsWith('http')) {
    webCat(input, outputFile);
  } else {
    cat(input, outputFile);
  }
} else {
  if (args.length < 1) {
    console.error("Missing necessary arguments. Usage: node step3.js [--out outputFile] inputFileOrURL");
    process.exit(1);
  }
  const input = args[0];
  if (input.startsWith('http')) {
    webCat(input);
  } else {
    cat(input);
  }
}