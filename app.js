import { User } from './models/user';
import { Product } from './models/product';
import { Importer } from './models/importer';
import { DirWatcher } from './models/dirwatcher';
import config  from './config/config.json';

new User();
new Product();
console.log(config.name);

const watchPathUser = new DirWatcher('./data/users.csv');
watchPathUser.watch().then();
watchPathUser.on('change', (path) => {
    const obj = new Importer(path);
    obj.import().then(json => console.log('json async------------', json));
    const jsonSync = obj.importSync();
    console.log('jsonSync---------', jsonSync);
});

const watchPath = new DirWatcher('./data/products.csv');
watchPath.watch().then();
watchPath.on('change', (path) => {
    const obj = new Importer(path);
    obj.import().then(json => console.log('json async------------', json));
    const jsonSync = obj.importSync();
    console.log('jsonSync---------', jsonSync);
});

