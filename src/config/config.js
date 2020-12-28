import {} from 'dotenv/config';

module.exports = {
  development: {
    username: process.env.ME,
    password: null,
    database: process.env.DB_USERS,
    host: '127.0.0.1',
    port: process.env.DB_PORT,
    dialect: process.env.DIALECT,
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};
