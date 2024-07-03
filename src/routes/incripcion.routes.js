import { Router } from 'express';
import { InscripcionController } from '../controllers/incripcion.controller.js';

export const incripcionRouter = Router();

incripcionRouter.get('/', InscripcionController.getAll);
incripcionRouter.get('/:id', InscripcionController.getById);
incripcionRouter.post('/', InscripcionController.create);
incripcionRouter.delete('/:id', InscripcionController.delete);
incripcionRouter.get('/usuario/:Usuario_id', InscripcionController.getCursosByUsuarioId);
incripcionRouter.delete('/usuario/:Usuario_id/curso/:Curso_id', InscripcionController.deleteByUserIdAndCourseId);
incripcionRouter.get('/usuario/:Usuario_id/curso/:Curso_id', InscripcionController.checkInscripcion);
incripcionRouter.get('/curso/:Curso_id/usuarios', InscripcionController.getUsuarioIdByCursoId);
