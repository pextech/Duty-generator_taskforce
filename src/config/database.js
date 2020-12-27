import Sequelize from 'sequelize';

const db = new Sequelize(process.env.URI);

export default db;
