import { InscripcionModel } from '../models/incripcion.js';

export class InscripcionController {
    static async getAll(req, res) {
        try {
            const inscripciones = await InscripcionModel.getAll();
            res.status(200).json(inscripciones);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener las inscripciones' });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const inscripcion = await InscripcionModel.getById({ id });
            if (!inscripcion) {
                res.status(404).json({ error: 'Inscripción no encontrada' });
            } else {
                res.status(200).json(inscripcion);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener la inscripción' });
        }
    }

    static async create(req, res) {
        try {
            const { Usuario_id, Curso_id } = req.body;
            const nuevaInscripcion = await InscripcionModel.create({ Usuario_id, Curso_id });
            res.status(201).json(nuevaInscripcion);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear la inscripción' });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await InscripcionModel.delete({ id });
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Inscripción no encontrada' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar la inscripción' });
        }
    }
    static async getCursosByUsuarioId(req, res) {
        try {
            const { Usuario_id } = req.params;
            const cursos = await InscripcionModel.getCursosByUsuarioId({ Usuario_id });
            res.status(200).json(cursos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener los cursos para el usuario' });
        }
    }
    static async deleteByUserIdAndCourseId(req, res) {
        try {
            const { Usuario_id, Curso_id } = req.params;
            const deleted = await InscripcionModel.deleteByUserIdAndCourseId({ Usuario_id, Curso_id });
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Inscripción no encontrada' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar la inscripción' });
        }
    }
    static async checkInscripcion(req, res) {
        try {
            const { Usuario_id, Curso_id } = req.params;
            const inscripcion = await InscripcionModel.checkInscripcion({ Usuario_id, Curso_id });
            res.status(200).json({ inscrito: inscripcion });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al verificar la inscripción' });
        }
    }
    static async getUsuarioIdByCursoId(req, res) {
        try {
            const { Curso_id } = req.params;
            const usuarios = await InscripcionModel.getUsuarioIdByCursoId({ Curso_id });
            res.status(200).json(usuarios);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener los usuarios para el curso' });
        }
    }



}
