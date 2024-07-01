import { CursoModel } from '../models/curso.js';

export class CursoController {
    static async getAll(req, res) {
        const cursos = await CursoModel.getAll();
        res.json(cursos);
    }

    static async getById(req, res) {
        const { id } = req.params;
        const curso = await CursoModel.getById({ id });
        if (!curso) {
            res.status(404).json({ error: 'Curso no encontrado' });
            return;
        }
        res.json(curso);
    }

    static async create(req, res) {
        const { nombreCurso, descripcion, imagenCurso, Categoria_id, Usuario_id } = req.body;
        const nuevoCurso = await CursoModel.create({ nombreCurso, descripcion, imagenCurso, Categoria_id, Usuario_id });
        res.status(201).json(nuevoCurso);
    }

    static async update(req, res) {
        const { id } = req.params;
        const { nombreCurso, descripcion, imagenCurso, Categoria_id, Usuario_id } = req.body;
        const cursoActualizado = await CursoModel.update({ id, nombreCurso, descripcion, imagenCurso, Categoria_id, Usuario_id });
        if (!cursoActualizado) {
            res.status(404).json({ error: 'Curso no encontrado' });
            return;
        }
        res.json(cursoActualizado);
    }

    static async delete(req, res) {
        const { id } = req.params;
        const cursoEliminado = await CursoModel.delete({ id });
        if (!cursoEliminado) {
            res.status(404).json({ error: 'Curso no encontrado' });
            return;
        }
        res.status(204).send();
    }

    static async getByCategoriaId(req, res) {
        const { categoriaId } = req.params;
        console.log(`Fetching courses for category ID: ${categoriaId}`); // Mensaje de consola
        try {
            const cursos = await CursoModel.getByCategoriaId({ categoriaId });
            if (!cursos.length) {
                console.log('No courses found'); // Mensaje de consola
                return res.status(404).json({ error: 'No se encontraron cursos para esta categoría' });
            }
            console.log('Courses found:', cursos); // Mensaje de consola
            res.json(cursos);
        } catch (error) {
            console.error('Error fetching courses:', error); // Mensaje de consola
            res.status(500).json({ error: 'Error al obtener los cursos' });
        }
    }

    static async searchCursos(req, res) {
        const { term } = req.params;
        const cursos = await CursoModel.searchCursos({ term });
        res.json(cursos);
    }

    static async getCursoConCategoria(req, res) {
        const cursos = await CursoModel.getCursoConCategoria();
        res.json(cursos);
    }
    static async updateName(req, res) {
        const { id } = req.params;
        const { nombreCurso } = req.body;
        const cursoActualizado = await CursoModel.updateName({ id, nombreCurso });
        if (cursoActualizado) {
            res.status(200).json(cursoActualizado);
        } else {
            res.status(404).json({ error: 'Curso no encontrado' });
        }
    }
    static async updateImage(req, res) {
        const { id } = req.params;
        const { imagenCurso } = req.body;

        const cursoActualizado = await CursoModel.updateImage({ id, imagenCurso });
        res.status(200).json(cursoActualizado);
    }
    static async updateDescription(req, res) {
        const { id } = req.params;
        const { descripcion } = req.body;

        const cursoActualizado = await CursoModel.updateDescription({ id, descripcion });
        res.status(200).json(cursoActualizado);
    }

}
