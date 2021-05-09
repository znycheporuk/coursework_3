import { Sequelize } from 'sequelize';
import config from '../../config';

const { user, password, database } = config.database;

export default new Sequelize(database, user, password, { dialect: 'mysql', host: 'localhost' });


