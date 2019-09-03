'use strict';

const Sequelize = require('sequelize');
const slug = require('slug');
// Librería similar a uuid pero creando cadenas más pequeñas para usos eventuales
const suid = require('shortid');
const database = require('../config/database');

const Proyectos = database.define('proyectos', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING(100),
    url: Sequelize.STRING(100)
}, {
    hooks: {
        beforeCreate(proyecto) {
            const url = slug(proyecto.nombre).toLowerCase();


            proyecto.url = `${url}-${suid.generate()}`;
            console.log('previa inserción en la base de datos');
        }
    }
});

module.exports = Proyectos;