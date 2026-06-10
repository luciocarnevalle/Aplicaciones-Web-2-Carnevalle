import { registrarUsuario, loginUsuario, eliminarUsuario } from '../controllers/usuarios.controller.js';
import express from 'express';
import { readFile, writeFile } from 'fs/promises';

const router = express.Router();

router.post('/',registrarUsuario)
router.post('/login',loginUsuario)
router.delete('/:id', eliminarUsuario)

export default router;

