'use strict';
const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');


// Importaciónes de modelos
require('./models/Proyectos');
require('./models/Tareas');
//Helpers para algunas funciones
const helpers = require('./helpers');
// Crear app de express
const app = express();

// Crear conexión a base de datos
const db = require('./config/database');

db.sync()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
// Archivos estaticos
app.use(express.static('public'));
// habilitar template engine
app.set('view engine', 'pug');
// Añadir carpeta con las vistas
app.set('views', path.join(__dirname, './views'));
// Pasar varDump a la aplicación
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    next();
});
// Habilitar bodyparser para leer datos de formularios
app.use(bodyParser.urlencoded({ extended: true }))
    // Rutas
app.use('/', routes());

app.listen(3000);