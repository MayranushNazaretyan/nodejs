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
        this.obj = this.createObject(path);
    }

    async createObject(path) {
        const obj = {};
        fs.readdir(path, (err, files) => {
            files.forEach(async file => {
                obj[file] = await readFileAsync(path + '/' + file);
            });
        });
        return obj;
    }

    async watch(path) {
        setInterval(() => {
            fs.readdir(path, (err, files) => {
                files.forEach(async file => {
                    const newFile = await readFileAsync(path + '/' + file);
                    const obj = await this.obj;
                        const x = Buffer.compare(obj[file], newFile);
                        if (x) {
                            this.emit('change', path);
                            obj[file] = newFile;
                        }
                });
            });
        }, delay);
    }
}
