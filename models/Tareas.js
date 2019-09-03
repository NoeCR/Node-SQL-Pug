const Sequelize = require('sequelize');
const database = require('../config/database');
const Proyectos = require('./Proyectos');
const Tareas = database.define('tareas', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tarea: Sequelize.STRING(100),
    estado: Sequelize.INTEGER(1)
});
Tareas.belongsTo(Proyectos);
// Otra forma en proyectos
// Proyectos.hasMany(Tareas);
module.exports = Tareas;