const program = require('commander');
const fs = require('fs');
const csvToJson = require('convert-csv-to-json');

program
    .version('0.1.0')
    .option('-a, --action [type]', 'Add action [action]', 'action')
    .option('-f, --file [type]', 'Add file [file]', 'file')
    .option('-h, --help', 'Add help')
    .parse(process.argv);

process.argv.forEach((val, index) => {
    if (index === 2 && (val === '--help' || val === '-h')) {
        console.log('Help!');
    } else if (index === 2 && (val.indexOf('--action') === -1 || val.indexOf('-a') === -1)) {
        console.log('Action required!');
    } else if(index === 2 && (val.indexOf('--action') > -1 || val.indexOf('-a') > -1) && program.action.toString() === 'reverse') {
       reverse();
    } else if(index === 2 && (val.indexOf('--action') > -1 || val.indexOf('-a') > -1) && program.action.toString() === 'transform') {
       transform();
    } else if(index === 2 && (val.indexOf('--action') > -1 || val.indexOf('-a') > -1) && program.action.toString() === 'outputFile') {
        if (!program.file) {
            console.log('File value is required for output file!');
        } else {
            outputFile(program.file);
        }
    } else if(index === 2 && (val.indexOf('--action') > -1 || val.indexOf('-a') > -1) && program.action.toString() === 'convertFromFile') {
        if (!program.file) {
            console.log('File value is required for convert from file!');
        } else {
            convertFromFile(program.file);
        }
    } else if(index === 2 && (val.indexOf('--action') > -1 || val.indexOf('-a') > -1) && program.action.toString() === 'convertToFile') {
        if (!program.file) {
            console.log('File value is required for convert to file!');
        } else {
            convertToFile(program.file);
        }
    }
});

function reverse() {
    process.stdin.on('data', data => {
        process.stdout.write(data.reverse());
    });
}

function transform() {
    process.stdin.on('data', data => {
        process.stdout.write(data.toString().toUpperCase());
    });
}

function outputFile(file) {
    const filePath = '../data/' + file;
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(process.stdout);
}


function convertFromFile(file) {
    const filePath = '../data/' + file;
    const json = csvToJson.getJsonFromCsv(filePath);
    if (json) {
        let data = JSON.stringify(json);
        process.stdout.write(data);
    }
}

function convertToFile(file) {
    const filePath = '../data/' + file;
    const json = csvToJson.getJsonFromCsv(filePath);
    if (json) {
        const wstream = fs.createWriteStream(file.replace('.csv', '') + '.json');
        let data = JSON.stringify(json);
        wstream.write(data);
        wstream.end();
    }
}

