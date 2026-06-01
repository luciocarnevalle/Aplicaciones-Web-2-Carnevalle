import 'dotenv/config';
import mongoose from 'mongoose';
import { readFile } from 'fs/promises';
import Usuario from '../models/usuarios.model.js';
import Producto from '../models/productos.model.js';
import Venta from '../models/ventas.model.js';

const migrarTodo = async () => {
    try {
        console.log("🔄 Conectando a MongoDB...");
        await mongoose.connect(process.env.MONGODB_URI);
        
        //MIGRAR USUARIOS
        console.log("Migrando usuarios...");
        await Usuario.deleteMany({});
        try { await Usuario.collection.dropIndexes(); } catch (e) {}
        
        const usuariosRaw = await readFile('./data/usuarios.json', 'utf-8');
        const usuariosJson = JSON.parse(usuariosRaw);
        
       
        const usuariosInsertados = await Usuario.insertMany(usuariosJson);
        console.log(`✅ ${usuariosInsertados.length} usuarios migrados.`);

    
        //MIGRAR PRODUCTOS
        console.log("Migrando productos...");
        await Producto.deleteMany({});
        try { Producto.collection.dropIndexes(); } catch (e) {}
        
        const productosRaw = await readFile('./data/productos.json', 'utf-8');
        const productosJson = JSON.parse(productosRaw);
        
        const productosInsertados = await Producto.insertMany(productosJson);
        console.log(`✅ ${productosInsertados.length} productos migrados.`);


        //MIGRAR VENTAS
        console.log("Procesando y migrando ventas...");
        await Venta.deleteMany({});
        try { Venta.collection.dropIndexes(); } catch (e) {}
        
        const ventasRaw = await readFile('./data/ventas.json', 'utf-8');
        const ventasJson = JSON.parse(ventasRaw);


        const ventasListas = ventasJson.map((venta, index) => {
            // Asigno un usuario real de los que se acaban de insertar.
            // Para que no tengan todos el mismo, uso el índice o el primero disponible
            const usuarioReal = usuariosInsertados[index % usuariosInsertados.length];

            const productosTransformados = venta.productos.map((p, pIndex) => {
                // Asigno un producto real de los que se acaban de insertar
                const productoReal = productosInsertados[pIndex % productosInsertados.length];
                
                return {
                    id_producto: productoReal._id,
                    cantidad: p.cantidad,
                    precio_unitario: Number(p.precio_unitario)
                };
            });

            const fechaValida = new Date(); 

            return {
                id_usuario: usuarioReal._id,
                fecha: fechaValida,
                total: Number(venta.total),
                entregado: venta.entregado || false,
                productos: productosTransformados
            };
        });

        await Venta.insertMany(ventasListas);
        console.log(`✅ ${ventasListas.length} ventas migradas con éxito.`);
        
        console.log("\n ¡MIGRACIÓN TOTAL COMPLETADA CON ÉXITO! 🚀");
        process.exit(0);

    } catch (error) {
        console.error(" Hubo un error durante la migración:", error);
        process.exit(1);
    }
};
migrarTodo();