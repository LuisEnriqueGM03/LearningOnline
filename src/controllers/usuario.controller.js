import { UsuarioModel } from '../models/usuario.js';
import bcrypt from 'bcrypt'; // Asegúrate de instalar bcrypt: npm install bcrypt

export class UsuarioController {
    static async getAll(req, res) {
        try {
            const users = await UsuarioModel.getAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener usuarios' });
        }
    }

    static async getById(req, res) {
        const { id } = req.params;
        try {
            const user = await UsuarioModel.getById({ id });
            if (!user) {
                res.status(404).json({ error: 'Usuario no encontrado' });
                return;
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener usuario' });
        }
    }

    static async create(req, res) {
        const { nombre, apellido, correo, username, contraseña, tipoUsuario } = req.body;
        try {
            const newUser = await UsuarioModel.create({ nombre, apellido, correo, username, contraseña, tipoUsuario });
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear usuario' });
        }
    }

    static async update(req, res) {
        const { id } = req.params;
        const { nombre, apellido, correo, username, contraseña, tipoUsuario } = req.body;
        try {
            const updatedUser = await UsuarioModel.update({ id, nombre, apellido, correo, username, contraseña, tipoUsuario });
            if (!updatedUser) {
                res.status(404).json({ error: 'Usuario no encontrado' });
                return;
            }
            res.json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar usuario' });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;
        try {
            const deletedUser = await UsuarioModel.delete({ id });
            if (!deletedUser) {
                res.status(404).json({ error: 'Usuario no encontrado' });
                return;
            }
            res.json(deletedUser);
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar usuario' });
        }
    }

    static async login(req, res) {
    const { username, contraseña } = req.body;
    try {
        const user = await UsuarioModel.findByUsername(username);
        if (!user) {
            res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
            return;
        }

        const isMatch = await bcrypt.compare(contraseña, user.contraseña);
        if (!isMatch) {
            res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
            return;
        }

        res.json({
            id: user.id,
            username: user.username,
            tipoUsuario: user.tipousuario
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
}
}
