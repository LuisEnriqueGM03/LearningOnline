import { Router } from 'express';
import { UsuarioController } from '../controllers/usuario.controller.js';

export const userRouter = Router();

userRouter.get('/', UsuarioController.getAll);
userRouter.get('/:id', UsuarioController.getById);
userRouter.post('/create', UsuarioController.create);
userRouter.put('/:id', UsuarioController.update);
userRouter.delete('/:id', UsuarioController.delete);
userRouter.post('/login', UsuarioController.login);