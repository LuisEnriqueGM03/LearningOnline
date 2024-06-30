import { Router } from 'express';
import { CursoController } from '../controllers/curso.controller.js';

export const cursoRouter = Router();

cursoRouter.get('/', CursoController.getAll);
cursoRouter.post('/', CursoController.create); // Crear
cursoRouter.put('/:id', CursoController.update); // Actualizar
cursoRouter.delete('/:id', CursoController.delete); // Eliminar
cursoRouter.get('/curso-categoria/', CursoController.getCursoConCategoria);
cursoRouter.get('/categoria/:categoriaId', CursoController.getByCategoriaId); // Obtener cursos por categoría
cursoRouter.get('/search/:term', CursoController.searchCursos); // Buscar cursos por término
cursoRouter.get('/:id', CursoController.getById);
cursoRouter.put('/nombre/:id', CursoController.updateName);
cursoRouter.put('/imagen/:id', CursoController.updateImage);
cursoRouter.put('/descripcion/:id', CursoController.updateDescription);