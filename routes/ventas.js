import {crearVenta} from "../controllers/ventas.controller.js";

import express from 'express';
import fs from 'fs/promises';
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/', verificarToken, crearVenta );

export default router;

/*
const pathVentas = './data/ventas.json';

router.post('/', async (req, res) => {
    try {
        const { id_usuario, productos, total, direccion } = req.body;

        // Creo el objeto de la nueva venta con la estructura esperada por el backend
        const nuevaVenta = {
            id: `vta-${Date.now()}`, // Genera un ID como vta-1715...
            id_usuario: id_usuario,
            fecha: new Date().toLocaleDateString('es-ES'), // Formato 14/11/2025
            total: total,
            direccion: direccion || "Av Colon, Córdoba",
            entregado: false,
            productos: productos.map(p => ({
                id_producto: p.id,
                cantidad: p.cantidad,
                precio_unitario: p.precio
            }))
        };

        const data = await fs.readFile(pathVentas, 'utf-8');
        const ventas = JSON.parse(data);
        ventas.push(nuevaVenta);

        await fs.writeFile(pathVentas, JSON.stringify(ventas, null, 2));

        res.status(201).json({ mensaje: "Venta exitosa", ordenId: nuevaVenta.id });
    } catch (error) {
        console.error("Error en servidor:", error);
        res.status(500).json({ mensaje: "Error al procesar compra" });
    }
});
*/
