import {obtenerProductos, obtenerProductoPorId, actualizarPrecioProducto} from '../controllers/productos.controller.js';
import express from 'express';
import { readFile, writeFile } from 'fs/promises';

const router = express.Router();

// GET productos generales 
router.get('/', obtenerProductos);
router.get('/:id', obtenerProductoPorId);
router.put('/:id', actualizarPrecioProducto);

export default router;

