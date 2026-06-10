import express from 'express';
import dotenv from 'dotenv';
import fs, { readFile, writeFile } from 'fs/promises';
import productosRouter from './routes/productos.js';
import usuariosRouter from './routes/usuarios.js';
import ventasRouter from './routes/ventas.js';

//configuro dotenv
dotenv.config();

//creo instancia de app
const app = express();
//configuro el puerto
const port = process.env.PORT || 3000; 

//Middleware para que el servidor entienda JSON
app.use(express.json()); 

//Middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

app.use('/productos', productosRouter);
app.use('/usuarios', usuariosRouter);
app.use('/ventas', ventasRouter);

// Levanto el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});











