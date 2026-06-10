import { connectToDatabase } from "../config/connection.js";
import Usuario from "../models/usuarios.model.js";
import Venta from "../models/ventas.model.js";

//POST Crear una nueva venta
export const crearVenta = async (req, res) => {
    try {
        const id_usuario = req.usuarioId;
        const { productos, total } = req.body;
        if (!productos || !total) {
            return res.status(400).json({ message: "Error: productos y total son obligatorios" });
        }
        await connectToDatabase();

        //Verifico que el usuario exista
        const usuarioExistente = await Usuario.findById(id_usuario);
        if (!usuarioExistente) {
            return res.status(400).json({ message: "Error: Usuario no encontrado" });
        }

        //Creo la nueva venta
        const nuevaVenta = new Venta({
            id_usuario,
            fecha: new Date(),
            total,
            productos: productos.map(p => ({
                id_producto: p.id_producto,
                cantidad: p.cantidad,
                precio_unitario: p.precio_unitario
            }))
        });
        await nuevaVenta.save();

        // Envio la respuesta 
        return res.status(201).json({ 
            message: "Venta creada exitosamente", 
            ordenId: nuevaVenta._id,
        });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
};