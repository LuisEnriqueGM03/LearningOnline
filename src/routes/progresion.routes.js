import { Router } from 'express';
import { ProgresionController } from '../controllers/progresion.controller.js';

export const progresionRouter = Router();

progresionRouter.get('/', ProgresionController.getAll);
progresionRouter.get('/:id', ProgresionController.getById);
progresionRouter.post('/', ProgresionController.create); // Crear
progresionRouter.put('/:id', ProgresionController.update); // Actualizar
progresionRouter.delete('/:id', ProgresionController.delete); // Eliminar
progresionRouter.get('/usuario/:Usuario_id/leccion/:Leccion_id', ProgresionController.getByUsuarioAndLeccion);
progresionRouter.get('/usuario/:Usuario_id/curso/:Curso_id', ProgresionController.getByCursoAndUsuario);