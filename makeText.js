/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov'); 

// Get command-line arguments
const [method, path] = process.argv.slice(2);

function generateTextFromFile(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file ${filePath}: ${err.message}`);
            process.exit(1);
        } else {
            const mm = new MarkovMachine(data);
            console.log(mm.makeText());
        }
    });
}

async function generateTextFromUrl(url) {
    try {
        const response = await axios.get(url);
        const mm = new MarkovMachine(response.data);
        console.log(mm.makeText());
    } catch (err) {
        console.error(`Error fetching URL ${url}: ${err.message}`);
        process.exit(1);
    }
}

// Determine whether to read from file or URL
if (method === 'file') {
    generateTextFromFile(path);
} else if (method === 'url') {
    generateTextFromUrl(path);
} else {
    console.error("Unknown method. Use 'file <path>' or 'url <url>'.");
    process.exit(1);
}

// const mm = new MarkovMachine("the cat in the hat");

// console.log("Generated text (default 100 words):");
// console.log(mm.makeText());

// console.log("\nGenerated text (50 words):");
// console.log(mm.makeText(50));
