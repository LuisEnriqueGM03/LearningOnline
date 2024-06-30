import { Router } from 'express';
import { LeccionController } from '../controllers/leccion.controller.js';

export const LeccionRouter = Router();

LeccionRouter.get('/', LeccionController.getAll);
LeccionRouter.get('/:id', LeccionController.getById);
LeccionRouter.get('/curso/:Curso_id', LeccionController.getByCursoId); // Nueva ruta para filtrar por curso
LeccionRouter.post('/', LeccionController.create);
LeccionRouter.put('/:id', LeccionController.update);
LeccionRouter.delete('/:id', LeccionController.delete);
