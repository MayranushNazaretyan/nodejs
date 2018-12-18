import * as fs from "fs";
import csvToJson from 'convert-csv-to-json';
import 'babel-core/register';
import 'babel-polyfill';

export class Importer {
    constructor(path) {
        this.path = path;
    }

    async import() {
        fs.readdir(this.path, (err, files) => {
            files.forEach(async file => {
                const json = await csvToJson.getJsonFromCsv(this.path + '/' + file);
                console.log(json, '--------async json');
            });
        });
    }

    async importSync() {
        var files = fs.readdirSync(this.path);
        files.forEach(file => {
            const json = csvToJson.getJsonFromCsv(this.path + '/' + file);
            console.log(json, '--------sync json');
        });
    }
}
