const express = require('express');
const router = express.Router();
const { body } = require('express-validator/check');
const homeController = require('../controllers/homeController');
const tareasController = require('../controllers/tareasController');
module.exports = () => {

    // Leer listado de proyectos
    router.get('/', homeController.homeController);
    router.get('/nuevo-proyecto', homeController.formularioProyecto);

    // Crear proyecto
    router.post('/nuevo-proyecto',
        body('nombre').not().isEmpty().trim().escape(),
        homeController.nuevoProyecto);

    // Listar proyecto
    router.get('/proyectos/:url', homeController.proyectoPorUrl);

    // Editar proyecto
    router.get('/proyecto/editar/:id', homeController.proyectoEditar);

    // Actualizar proyectos
    router.post('/nuevo-proyecto/:id',
        body('nombre').not().isEmpty().trim().escape(),
        homeController.actualizarProyecto);


    // Eliminar proyectos
    router.delete('/proyectos/:url', homeController.eliminarProyecto);

    // Tareas
    router.post('/proyectos/:url', tareasController.agregarTarea)

    return router;
}