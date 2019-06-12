import {
    QueryInterface,
} from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize) => {
        return queryInterface.createTable('employees', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            slackId:{
                type:Sequelize.STRING
            },
            firstName: {
                type: Sequelize.STRING,
            },

            lastName: {
                type: Sequelize.STRING,
            },

            gender: {
                type: Sequelize.STRING,
            },

            age: {
                type: Sequelize.INTEGER,
            },

            email: {
                type: Sequelize.STRING,
            },

            phone: {
                type: Sequelize.STRING,
            },

            address: {
                type: Sequelize.STRING,
            },

            managerId: {
                type: Sequelize.INTEGER,
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },

            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },

    down: (queryInterface: QueryInterface, Sequelize) => {
        return queryInterface.dropTable('employees');
    },
};

