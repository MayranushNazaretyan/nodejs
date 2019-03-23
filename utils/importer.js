import csvToJson from 'convert-csv-to-json';
import 'babel-core/register';
import 'babel-polyfill';

export class Importer {
    constructor(path) {
        this.path = path;
    }

    async import() {
        const json = await csvToJson.getJsonFromCsv(this.path);
        return json;
    }

    importSync() {
        const json = csvToJson.getJsonFromCsv(this.path);
        return json;
    }
}
