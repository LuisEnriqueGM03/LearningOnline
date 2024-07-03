import { ProgresionModel } from '../models/progresion.js';

export class ProgresionController {
    static async getAll(req, res) {
        const progresiones = await ProgresionModel.getAll();
        res.json(progresiones);
    }

    static async getById(req, res) {
        const { id } = req.params;
        const progresion = await ProgresionModel.getById({ id });
        if (!progresion) {
            res.status(404).json({ error: 'Progresión no encontrada' });
            return;
        }
        res.json(progresion);
    }

    static async create(req, res) {
        const { Usuario_id, Leccion_id, estado } = req.body;
        const nuevaProgresion = await ProgresionModel.create({ Usuario_id, Leccion_id, estado });
        res.status(201).json(nuevaProgresion);
    }

    static async update(req, res) {
        const { id } = req.params;
        const { Usuario_id, Leccion_id, estado } = req.body;
        const progresionActualizada = await ProgresionModel.update({ id, Usuario_id, Leccion_id, estado });
        if (!progresionActualizada) {
            res.status(404).json({ error: 'Progresión no encontrada' });
            return;
        }
        res.json(progresionActualizada);
    }

    static async delete(req, res) {
        const { id } = req.params;
        const progresionEliminada = await ProgresionModel.delete({ id });
        if (!progresionEliminada) {
            res.status(404).json({ error: 'Progresión no encontrada' });
            return;
        }
        res.status(204).send();
    }
}
