 import * as fs from "fs";
 import { EventEmitter }from 'events';
 import 'babel-core/register';
 import 'babel-polyfill';
 import { promisify } from 'util';

 const readFileAsync = promisify(fs.readFile);
 const delay = 5000;

export class DirWatcher extends EventEmitter {
    constructor(path) {
        super();
        this.path = path;
    }

    async watch() {
        let file = await readFileAsync(this.path);
        console.log(file);
        setInterval(() => {
            const newFile = readFileAsync(this.path);
            newFile.then(nf => {
                const x = Buffer.compare(file, nf);
                if (x) {
                    console.log('trigger change');
                    this.emit('change', this.path);
                    file = nf;
                }
            });
        }, delay);
    }
}
