import { CategoriaModel } from '../models/categoria.js';

export class CategoriaController {
    static async getAll(req, res) {
        const categorias = await CategoriaModel.getAll();
        res.json(categorias);
    }

    static async getById(req, res) {
        const { id } = req.params;
        const categoria = await CategoriaModel.getById({ id });
        if (!categoria) {
            res.status(404).json({ error: 'Categoria no encontrada' });
            return;
        }
        res.json(categoria);
    }

    static async create(req, res) {
        const { nombre, descripcion, imagen } = req.body;
        const nuevaCategoria = await CategoriaModel.create({ nombre, descripcion, imagen });
        res.status(201).json(nuevaCategoria);
    }

    static async update(req, res) {
        const { id } = req.params;
        const { nombre, descripcion, imagen } = req.body;
        const categoriaActualizada = await CategoriaModel.update({ id, nombre, descripcion, imagen });
        if (!categoriaActualizada) {
            res.status(404).json({ error: 'Categoria no encontrada' });
            return;
        }
        res.json(categoriaActualizada);
    }

    static async delete(req, res) {
        const { id } = req.params;
        try {
            const categoriaEliminada = await CategoriaModel.delete({ id });
            if (!categoriaEliminada) {
                res.status(404).json({ error: 'Categoría no encontrada' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            if (error.code === '23503') { // Foreign key violation error code
                res.status(409).json({ error: 'No se puede eliminar porque esta categoria tiene cursos.' });
            } else {
                res.status(500).json({ error: 'Error al eliminar la categoría' });
            }
        }
    }
}
