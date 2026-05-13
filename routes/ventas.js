import express from 'express';
import fs from 'fs/promises';

const router = express.Router();
const pathVentas = './data/ventas.json';

router.post('/', async (req, res) => {
    try {
        const { id_usuario, productos, total, direccion } = req.body;

        // Armamos el objeto igual a tu imagen
        const nuevaVenta = {
            id: `vta-${Date.now()}`, // Genera un ID como vta-1715...
            id_usuario: id_usuario || "usr-002",
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

export default router;