import { pool } from '../db.js';

export class CursoModel {
    static async getAll() {
        const { rows } = await pool.query("SELECT id, nombreCurso, descripcion, encode(imagenCurso, 'base64') as imagen, Categoria_id, Usuario_id FROM Curso");
        return rows;
    }

    static async getById({ id }) {
        const { rows } = await pool.query('SELECT id, nombreCurso, descripcion, encode(imagenCurso, \'base64\') as imagen, Categoria_id, Usuario_id FROM Curso WHERE id = $1;', [id]);
        const [curso] = rows;
        return curso;
    }

    static async create({ nombreCurso, descripcion, imagenCurso, Categoria_id, Usuario_id }) {
        const { rows } = await pool.query(
            'INSERT INTO Curso (nombreCurso, descripcion, imagenCurso, Categoria_id, Usuario_id) VALUES ($1, $2, decode($3, \'base64\'), $4, $5) RETURNING id, nombreCurso, descripcion, encode(imagenCurso, \'base64\') as imagen, Categoria_id, Usuario_id;',
            [nombreCurso, descripcion, imagenCurso, Categoria_id, Usuario_id]
        );
        const [nuevoCurso] = rows;
        return nuevoCurso;
    }

    static async update({ id, nombreCurso, descripcion, imagenCurso, Categoria_id, Usuario_id }) {
        const { rows } = await pool.query(
            'UPDATE Curso SET nombreCurso = $1, descripcion = $2, imagenCurso = decode($3, \'base64\'), Categoria_id = $4, Usuario_id = $5 WHERE id = $6 RETURNING id, nombreCurso, descripcion, encode(imagenCurso, \'base64\') as imagen, Categoria_id, Usuario_id;',
            [nombreCurso, descripcion, imagenCurso, Categoria_id, Usuario_id, id]
        );
        const [cursoActualizado] = rows;
        return cursoActualizado;
    }

    static async delete({ id }) {
        const { rowCount } = await pool.query('DELETE FROM Curso WHERE id = $1;', [id]);
        return rowCount > 0;
    }
    static async getByCategoriaId({ categoriaId }) {
        const { rows } = await pool.query(
            `SELECT 
            Curso.id, 
            Curso.nombreCurso, 
            Curso.descripcion, 
            encode(Curso.imagenCurso, 'base64') as imagenCurso,
            Categoria.id as categoriaId, 
            Categoria.nombre as nombreCategoria, 
            Categoria.descripcion as descripcionCategoria 
        FROM 
            Curso 
        INNER JOIN 
            Categoria 
        ON 
            Curso.Categoria_id = Categoria.id 
        WHERE 
            Categoria.id = $1;`,
            [categoriaId]
        );
        return rows;
    }
    static async searchCursos({ term }) {
        const { rows } = await pool.query(
            `SELECT id, nombreCurso, descripcion, encode(imagenCurso, 'base64') as imagenCurso
        FROM Curso
        WHERE nombreCurso ILIKE $1 OR descripcion ILIKE $1;`,
            [`%${term}%`]
        );
        return rows;
    }

    static async getCursoConCategoria() {
        const { rows } = await pool.query(
            `SELECT
        Curso.id,
        Curso.nombreCurso,
        Curso.descripcion,
        encode(Curso.imagenCurso, 'base64') as imagenCurso,
        Categoria.id as categoriaId,
        Categoria.nombre as nombreCategoria,
        Categoria.descripcion as descripcionCategoria
    FROM
        Curso
    INNER JOIN
        Categoria
    ON
        Curso.Categoria_id = Categoria.id;`
        );
        return rows;
    }
    static async updateName({ id, nombreCurso }) {
        const { rows } = await pool.query(
            'UPDATE Curso SET nombreCurso = $1 WHERE id = $2 RETURNING id, nombreCurso',
            [nombreCurso, id]
        );
        return rows[0];
    }

    static async updateImage({ id, imagenCurso }) {
        const { rows } = await pool.query(
            'UPDATE Curso SET imagenCurso = decode($1, \'base64\') WHERE id = $2 RETURNING id, encode(imagenCurso, \'base64\') as imagenCurso',
            [imagenCurso, id]
        );
        return rows[0];
    }
    static async updateDescription({ id, descripcion }) {
        const { rows } = await pool.query(
            'UPDATE Curso SET descripcion = $1 WHERE id = $2 RETURNING id, descripcion',
            [descripcion, id]
        );
        return rows[0];
    }
}
