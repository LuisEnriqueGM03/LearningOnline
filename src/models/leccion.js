import { pool } from '../db.js';

export class LeccionModel {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM Leccion');
        return rows;
    }

    static async getById({ id }) {
        const { rows } = await pool.query('SELECT * FROM Leccion WHERE id = $1', [id]);
        return rows[0];
    }

    static async getByCursoId({ Curso_id }) {
        const { rows } = await pool.query('SELECT * FROM Leccion WHERE Curso_id = $1', [Curso_id]);
        return rows;
    }

    static async create({ nombre, descripcion, orden, tipoDeContenido, contenido, Curso_id }) {
        const { rows } = await pool.query(
            'INSERT INTO Leccion (nombre, descripcion, orden, tipoDeContenido, contenido, Curso_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [nombre, descripcion, orden, tipoDeContenido, contenido, Curso_id]
        );
        return rows[0];
    }

    static async update({ id, nombre, descripcion, orden, tipoDeContenido, contenido }) {
        const { rows } = await pool.query(
            'UPDATE Leccion SET nombre = $1, descripcion = $2, orden = $3, tipoDeContenido = $4, contenido = $5 WHERE id = $6 RETURNING *',
            [nombre, descripcion, orden, tipoDeContenido, contenido, id]
        );
        return rows[0];
    }


    static async delete({ id }) {
        const { rows } = await pool.query('DELETE FROM Leccion WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    }
}
