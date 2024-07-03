import { pool } from '../db.js';

export class ProgresionModel {
    static async getAll() {
        const { rows } = await pool.query("SELECT id, Usuario_id, Leccion_id, estado FROM Progresion");
        return rows;
    }

    static async getById({ id }) {
        const { rows } = await pool.query('SELECT id, Usuario_id, Leccion_id, estado FROM Progresion WHERE id = $1;', [id]);
        const [progresion] = rows;
        return progresion;
    }

    static async create({ Usuario_id, Leccion_id, estado }) {
        const { rows } = await pool.query(
            'INSERT INTO Progresion (Usuario_id, Leccion_id, estado) VALUES ($1, $2, $3) RETURNING id, Usuario_id, Leccion_id, estado;',
            [Usuario_id, Leccion_id, estado]
        );
        const [nuevaProgresion] = rows;
        return nuevaProgresion;
    }

    static async update({ id, Usuario_id, Leccion_id, estado }) {
        const { rows } = await pool.query(
            'UPDATE Progresion SET Usuario_id = $1, Leccion_id = $2, estado = $3 WHERE id = $4 RETURNING id, Usuario_id, Leccion_id, estado;',
            [Usuario_id, Leccion_id, estado, id]
        );
        const [progresionActualizada] = rows;
        return progresionActualizada;
    }

    static async delete({ id }) {
        const { rowCount } = await pool.query('DELETE FROM Progresion WHERE id = $1;', [id]);
        return rowCount > 0;
    }
    static async getByUsuarioAndLeccion({ Usuario_id, Leccion_id }) {
        const { rows } = await pool.query('SELECT id, estado FROM Progresion WHERE Usuario_id = $1 AND Leccion_id = $2;', [Usuario_id, Leccion_id]);
        const [progresion] = rows;
        return progresion;
    }
    static async getByCursoAndUsuario({ userId, courseId }) {
        const { rows } = await pool.query(
            'SELECT id,Leccion_id, estado FROM Progresion WHERE Usuario_id = $1 AND Leccion_id IN (SELECT id FROM Leccion WHERE Curso_id = $2);',
            [userId, courseId]
        );
        return rows;
    }
}
