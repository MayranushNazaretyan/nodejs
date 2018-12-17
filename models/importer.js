import csvToJson from 'convert-csv-to-json';
import 'babel-core/register';
import 'babel-polyfill';

export class Importer {
    constructor(path) {
        this.path = path;
    }

    async import() {
        try {
            return await csvToJson.getJsonFromCsv(this.path);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    importSync() {
        return csvToJson.getJsonFromCsv(this.path);
    }
}
