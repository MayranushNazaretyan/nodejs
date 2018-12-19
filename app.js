import { User } from './models/user';
import { Product } from './models/product';
import { Importer } from './models/importer';
import { DirWatcher } from './models/dirwatcher';
import config  from './config/config.json';

new User();
new Product();
console.log(config.name);

const watchPath = new DirWatcher('./data');
watchPath.watch('./data');
watchPath.on('change', async (path) => {
    const obj = new Importer(path);
    const jsonAsync = await obj.import();
    console.log(jsonAsync, '---------jsonAsync');
    const jsonSync = obj.importSync();
    console.log(jsonSync, '---------jsonSync');
});

