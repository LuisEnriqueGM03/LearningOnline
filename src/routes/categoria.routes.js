import {Router} from 'express';

import {CategoriaController} from '../controllers/categoria.controller.js';

export const categoriaRouter = Router();

categoriaRouter.get('/', CategoriaController.getAll);
categoriaRouter.get('/:id', CategoriaController.getById);
categoriaRouter.post('/', CategoriaController.create); // Crear
categoriaRouter.put('/:id', CategoriaController.update); // Actualizar
categoriaRouter.delete('/:id', CategoriaController.delete); // Eliminar