import { connectToDatabase } from "../config/connection.js";
import Producto from "../models/productos.model.js";


//GET productos generales
export const obtenerProductos = async (req, res) => {
    try {
        await connectToDatabase();
        const productos = await Producto.find();
        res.status(200).json(productos);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ message: "Error al obtener productos" });
    }
};


//GET productos por ID
export const obtenerProductoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        await connectToDatabase();
        const producto = await Producto.findById(id);
        if (producto) {
            res.status(200).json(producto);
        } else {
            res.status(404).json({ message: "Producto no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener producto:", error);
        res.status(500).json({ message: "Error al obtener producto" });
    }
};

//PUT productos por ID
export const actualizarPrecioProducto = async (req, res) => {
    const { id } = req.params;
    const { precio } = req.body;
    try {
        await connectToDatabase();
        const producto = await Producto.findOneAndUpdate({ _id: id }, { precio }, { new: true });
        if (producto) {
            res.status(200).json(producto);
        } else {
            res.status(404).json({ message: "Producto no encontrado" });
        }
    } catch (error) {
        console.error("Error al actualizar precio del producto:", error);
        res.status(500).json({ message: "Error al actualizar precio del producto" });
    }
};
