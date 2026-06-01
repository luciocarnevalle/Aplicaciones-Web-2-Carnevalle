import {obtenerProductos, obtenerProductoPorId, actualizarPrecioProducto} from '../controllers/productos.controller.js';


import express from 'express';
import { readFile, writeFile } from 'fs/promises';

const router = express.Router();



// GET productos generales 
router.get('/', obtenerProductos);
router.get('/:id', obtenerProductoPorId);
router.put('/:id', actualizarPrecioProducto);

export default router;

//GET productos



/*

const leerProductos = async () => {
    try {
        const file = await readFile('data/productos.json', 'utf-8');
        return JSON.parse(file);
    } catch (error) {
        throw error;
    }
};

router.get('/', async (req,res) => {
    try{
        const resultado = await obtenerProductos();
        res.status(200).json(resultado)
    }catch{
        res.status(500).json({message: 'Error al obtener los productos'})
    }
})


// GET productos por ID 
router.get('/:id', async (req, res) => {
    try {
        const productoId = req.params.id;
        const productosData = await leerProductos(); 
        const productoEncontrado = productosData.find(p => p.id === (productoId));

        if (productoEncontrado) {
            res.status(200).json(productoEncontrado);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

//PUT
router.put('/:id',async (req,res) => {
    //Extraigo el ID del producto de los parámetros de la ruta 
    // y el nuevo precio del cuerpo de la solicitud
    const productoId = req.params.id
    const NuevoPrecio = req.body.precio

    try {
        const data = await readFile('./data/productos.json', 'utf-8');
        const productosData = JSON.parse(data);

        //Busco el índice del producto en el array de productos 
        const index = productosData.findIndex(p => p.id === productoId)

        if(index !== -1){
            //Si encuentro el producto, actualizo su precio en el array productosData
            productosData[index].precio = NuevoPrecio
            
            //el stringify sirve para convertir el objeto productosData a formato JSON
            await writeFile('./data/productos.json', JSON.stringify(productosData, null, 2));
            res.status(200).json({message: `Precio actualizado correctamente`})
        }else{
            res.status(400).json({message: `No se encontro el ID del producto`})
        }
        } catch (error) {
        res.status(500).json({message: `Error al actualizar el precio`, error})
    }
})
*/



