import { LeccionModel } from '../models/leccion.js';

export class LeccionController {
    static async getAll(req, res) {
        try {
            const lecciones = await LeccionModel.getAll();
            res.status(200).json(lecciones);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const leccion = await LeccionModel.getById({ id });
            if (leccion) {
                res.status(200).json(leccion);
            } else {
                res.status(404).json({ message: 'Lección no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getByCursoId(req, res) {
        try {
            const { Curso_id } = req.params;
            const lecciones = await LeccionModel.getByCursoId({ Curso_id });
            res.status(200).json(lecciones);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async create(req, res) {
        try {
            const { nombre, descripcion, orden, tipoDeContenido, contenido, Curso_id } = req.body;
            const newLeccion = await LeccionModel.create({ nombre, descripcion, orden, tipoDeContenido, contenido, Curso_id });
            res.status(201).json(newLeccion);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { nombre, descripcion, orden, tipoDeContenido, contenido } = req.body;
            const updatedLeccion = await LeccionModel.update({ id, nombre, descripcion, orden, tipoDeContenido, contenido });
            if (updatedLeccion) {
                res.status(200).json(updatedLeccion);
            } else {
                res.status(404).json({ message: 'Lección no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const deletedLeccion = await LeccionModel.delete({ id });
            if (deletedLeccion) {
                res.status(200).json(deletedLeccion);
            } else {
                res.status(404).json({ message: 'Lección no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
