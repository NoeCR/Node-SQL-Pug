const Sequelize = require('sequelize');

const database = new Sequelize('uptasknode', 'root', '20468585Cs', {
    host: 'localhost', //  DESKTOP-6BEF0H7
    dialect: 'mysql', // | 'mariadb' | 'postgres' | 'mssql'
    port: 3306,
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = database;