/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('duties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.STRING,
      },
      complete: {
        type: Sequelize.BOOLEAN,
      },
      createdat: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedat: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      dutyid: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
          as: 'dutyid',
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('duties');
  },
};
