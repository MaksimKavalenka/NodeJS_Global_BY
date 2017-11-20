import mongodb from 'mongodb';
import Sequelize from 'sequelize';
import config from '../config/index';

const mongoClient = mongodb.MongoClient;

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
    disconnect: () => mongoClient.disconnect(),
  },
  POSTGRES: {
    client: postgresClient,
    connect: () => postgresClient.authenticate(),
    disconnect: () => postgresClient.close(),
  },
};

connectors.MONGO.connect = async () => {
  connectors.MONGO.client = await mongodb.MongoClient.connect('mongodb://localhost:27017/nodejs');
};

module.exports = connectors;
