import {
    QueryInterface,
} from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize) => {
        return queryInterface.createTable('attendances', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },

            entryTime: {
                type: Sequelize.DATE,
            },

            exitTime: {
                type: Sequelize.DATE,
            },

            onLeave: {
                type: Sequelize.BOOLEAN,
            },

            empId:{
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
        return queryInterface.dropTable('attendances');
    },
};

