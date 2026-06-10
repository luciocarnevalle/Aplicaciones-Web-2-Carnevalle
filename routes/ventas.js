import {crearVenta} from "../controllers/ventas.controller.js";
import express from 'express';
import fs from 'fs/promises';
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/', verificarToken, crearVenta );

export default router;

