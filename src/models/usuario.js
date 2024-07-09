import { pool } from '../db.js';
import bcrypt from 'bcrypt'; // Asegúrate de instalar bcrypt: npm install bcrypt

export class UsuarioModel {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM Usuario');
        return rows;
    }

    static async getById({ id }) {
        const { rows } = await pool.query('SELECT * FROM Usuario WHERE id = $1', [id]);
        return rows[0];
    }

    static async create({ nombre, apellido, correo, username, contraseña, tipoUsuario }) {
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        try {
            const { rows } = await pool.query(
                'INSERT INTO Usuario (nombre, apellido, correo, username, contraseña, tipoUsuario) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [nombre, apellido, correo, username, hashedPassword, tipoUsuario]
            );
            return rows[0];
        } catch (error) {
            throw error;
        }
    }


    static async update({ id, nombre, apellido, correo, username, contraseña, tipoUsuario }) {
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const { rows } = await pool.query(
            'UPDATE Usuario SET nombre = $1, apellido = $2, correo = $3, username = $4, contraseña = $5, tipoUsuario = $6 WHERE id = $7 RETURNING *',
            [nombre, apellido, correo, username, hashedPassword, tipoUsuario, id]
        );
        return rows[0];
    }

    static async delete({ id }) {
        const { rows } = await pool.query('DELETE FROM Usuario WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    }

    static async findByUsername(username) {
        const { rows } = await pool.query('SELECT * FROM Usuario WHERE username = $1', [username]);
        return rows[0];
    }
}
