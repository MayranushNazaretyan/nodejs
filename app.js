import { User } from './models/user';
import { Product } from './models/product';
import config  from './config/config.json';

new User();
new Product();
console.log(config.name);
