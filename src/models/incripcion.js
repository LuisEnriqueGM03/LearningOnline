import { pool } from '../db.js';

export class InscripcionModel {
    static async getAll() {
        const { rows } = await pool.query("SELECT id, Usuario_id, Curso_id FROM Inscripcion");
        return rows;
    }

    static async getById({ id }) {
        const { rows } = await pool.query('SELECT id, Usuario_id, Curso_id FROM Inscripcion WHERE id = $1;', [id]);
        const [inscripcion] = rows;
        return inscripcion;
    }

    static async create({ Usuario_id, Curso_id }) {
        const { rows } = await pool.query(
            'INSERT INTO Inscripcion (Usuario_id, Curso_id) VALUES ($1, $2) RETURNING id, Usuario_id, Curso_id;',
            [Usuario_id, Curso_id]
        );
        const [nuevaInscripcion] = rows;
        return nuevaInscripcion;
    }

    static async delete({ id }) {
        const { rowCount } = await pool.query('DELETE FROM Inscripcion WHERE id = $1;', [id]);
        return rowCount > 0;
    }

    static async getCursosByUsuarioId({ Usuario_id }) {
        const { rows } = await pool.query(`
            SELECT i.id ,c.id as idcurso, c.nombrecurso, c.descripcion, encode(c.imagencurso, 'base64') as imagencurso
            FROM Curso c
            JOIN Inscripcion i ON c.id = i.Curso_id
            WHERE i.Usuario_id = $1;
        `, [Usuario_id]);
        return rows;
    }
    static async deleteByUserIdAndCourseId({ Usuario_id, Curso_id }) {
        const { rowCount } = await pool.query('DELETE FROM Inscripcion WHERE Usuario_id = $1 AND Curso_id = $2;', [Usuario_id, Curso_id]);
        return rowCount > 0;
    }
    static async checkInscripcion({ Usuario_id, Curso_id }) {
        const { rows } = await pool.query(
            'SELECT id FROM Inscripcion WHERE Usuario_id = $1 AND Curso_id = $2;',
            [Usuario_id, Curso_id]
        );
        return rows.length > 0;
    }
    static async getUsuarioIdByCursoId({ Curso_id }) {
        const { rows } = await pool.query('SELECT Usuario_id FROM Inscripcion WHERE Curso_id = $1;', [Curso_id]);
        return rows;
    }




}
