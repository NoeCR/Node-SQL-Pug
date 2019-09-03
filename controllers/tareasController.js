'use strict';
const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');


exports.agregarTarea = async(req, res) => {
    const proyecto = await Proyectos.findOne({ where: { url: req.params.url } });
    const { tarea } = req.body;

    const estado = 0;
    const proyectoId = proyecto.id;

    // Insertar y redireccionar
    const result = await Tareas.create({ tarea, estado, proyectoId });

    if (!result) {
        return next();
    }
    // Redirección
    res.redirect(`/proyectos/${req.params.url}`);
}