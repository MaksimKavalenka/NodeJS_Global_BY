import mongoose from 'mongoose';
import Sequelize from 'sequelize';
import config from '../config/index';

const postgresClient = new Sequelize('nodejs', config.postgres_login, config.postgres_password, {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: Sequelize.Op,
  pool: {
    min: 0,
    max: 5,
    idle: 10000,
  },
});

const connectors = {
  MONGO: {
    connect: () => {},
    disconnect: () => {},
  },
  POSTGRES: {
    client: postgresClient,
    connect: () => postgresClient.authenticate(),
    disconnect: () => postgresClient.close(),
  },
};

connectors.MONGO.connect = async () => {
  mongoose.Promise = global.Promise;
  connectors.MONGO.client = await mongoose.connect('mongodb://localhost:27017/nodejs', { useMongoClient: true });
};
connectors.MONGO.disconnect = async () => {
  connectors.MONGO.client.disconnect();
};

module.exports = connectors;
