import { pool } from '../db.js';

export class CategoriaModel {
    static async getAll() {
        const { rows } = await pool.query("SELECT id, nombre, descripcion, encode(imagenCategoria,'base64') as imagen,Usuario_id FROM Categoria");
        return rows;
    }

    static async getById({ id }) {
        const { rows } = await pool.query('SELECT id, nombre, descripcion, encode(imagenCategoria, \'base64\') as imagen FROM Categoria WHERE id = $1;', [id]);
        const [categoria] = rows;
        return categoria;
    }

    static async create({ nombre, descripcion, imagen, Usuario_id }) {
        const { rows } = await pool.query(
            'INSERT INTO Categoria (nombre, descripcion, imagenCategoria, Usuario_id) VALUES ($1, $2, decode($3, \'base64\'), $4) RETURNING id, nombre, descripcion, encode(imagenCategoria, \'base64\') as imagen, Usuario_id;',
            [nombre, descripcion, imagen, Usuario_id]
        );
        const [nuevaCategoria] = rows;
        return nuevaCategoria;
    }
    static async update({ id, nombre, descripcion, imagen, Usuario_id }) {
        const { rows } = await pool.query(
            'UPDATE Categoria SET nombre = $1, descripcion = $2, imagenCategoria = decode($3, \'base64\'), Usuario_id = $5 WHERE id = $4 RETURNING id, nombre, descripcion, encode(imagenCategoria, \'base64\') as imagen, Usuario_id;',
            [nombre, descripcion, imagen, id, Usuario_id]
        );
        const [categoriaActualizada] = rows;
        return categoriaActualizada;
    }

    static async delete({ id }) {
        const { rowCount } = await pool.query('DELETE FROM Categoria WHERE id = $1;', [id]);
        return rowCount > 0;
    }
}
