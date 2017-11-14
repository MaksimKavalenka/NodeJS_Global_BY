import Sequelize from 'sequelize';
import config from '../config';

const op = Sequelize.Op;

export const client = new Sequelize('nodejs', config.postgres_login, config.postgres_password, {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: op,
  pool: {
    min: 0,
    max: 5,
    idle: 10000,
  },
});

export function connect() {
  client.authenticate();
}
