'use strict';

const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');



exports.homeController = async(req, res) => {

    const proyectos = await Proyectos.findAll();

    res.render('index', {
        tituloPagina: 'Proyectos',
        proyectos
    });
}

exports.formularioProyecto = async(req, res) => {

    const proyectos = await Proyectos.findAll();

    res.render('nuevo-proyecto', {
        tituloPagina: 'Nuevo Proyecto',
        proyectos
    });
}

exports.nuevoProyecto = async(req, res) => {

    const proyectos = await Proyectos.findAll();
    const { nombre } = req.body;

    let errores = [];

    if (!nombre)
        errores.push({ 'texto': 'Agrega un nombre al proyecto' })

    if (errores.length > 0) {
        res.render('nuevo-proyecto', {
            tituloPagina: 'Nuevo Proyecto',
            errores,
            proyectos
        })
    } else {

        await Proyectos.create({ nombre });

        res.redirect('/');
    }
}

exports.proyectoPorUrl = async(req, res, next) => {

    const proyectosPormise = Proyectos.findAll();

    const proyectoPromise = Proyectos.findOne({
        where: {
            url: req.params.url
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPormise, proyectoPromise]);

    if (!proyecto) return next();

    // Consultar tareas del proyecto actual
    const tareas = await Tareas.findAll({
        where: {
            proyectoId: proyecto.id
        },
        include: [
            { model: Proyectos }
        ]
    });


    res.render('tareas', {
        tituloPagina: 'Tareas del proyecto',
        proyectos,
        proyecto,
        tareas
    })
}

exports.proyectoEditar = async(req, res, next) => {
    const proyectosPormise = Proyectos.findAll();

    const proyectoPromise = Proyectos.findOne({
        where: {
            id: req.params.id
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPormise, proyectoPromise]);

    res.render('nuevo-proyecto', {
        tituloPagina: 'Editar Proyecto',
        proyectos,
        proyecto
    })
}

exports.actualizarProyecto = async(req, res) => {

    const proyectos = await Proyectos.findAll();
    const { nombre } = req.body;

    let errores = [];

    if (!nombre)
        errores.push({ 'texto': 'Agrega un nombre al proyecto' })

    if (errores.length > 0) {
        res.render('nuevo-proyecto', {
            tituloPagina: 'Nuevo Proyecto',
            errores,
            proyectos
        })
    } else {

        await Proyectos.update({ nombre }, { where: { id: req.params.id } });

        res.redirect('/');
    }
}

exports.eliminarProyecto = async(req, res, next) => {

    const { urlProyecto } = req.query;

    const resultado = await Proyectos.destroy({ where: { url: urlProyecto } });

    if (!resultado) {
        return next();
    }
    res.status(200).send('Poryecto eliminado correctamente!')
}