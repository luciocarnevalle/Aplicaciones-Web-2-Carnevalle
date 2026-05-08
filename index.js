import express from 'express';
import dotenv from 'dotenv';
import fs, { readFile, writeFile } from 'fs/promises';

//configuro dotenv
dotenv.config();

//creo instancia de app
const app = express();
//configuro el puerto
const port = process.env.PORT || 3000; 

//Middleware para que el servidor entienda JSON
app.use(express.json()); 

// Levanto el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

//Pruebo para  ver si el servidor funciona
app.get('/', (req, res) => {
    res.send('Servidor de E-commerce funcionando correctamente');
});


// Ruta para obtener todos los productos
const leerProductos = async () => {
    try {
        const file = await readFile('./data/productos.json', 'utf-8');
        return JSON.parse(file);
    } catch (error) {
        console.error("Error leyendo el archivo JSON:", error.message);
        return []; 
    }
}

//GET productos
app.get(`/productos`, async (req,res) => {
    try{
        const productos = await leerProductos()
        res.status(200).json(productos)
    }catch{
        res.status(500).json({message: 'Error al obtener los productos'})
    }
})


// GET productos por ID 
app.get('/productos/:id', async (req, res) => {
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


//POST
app.post(`/usuarios`, async (req,res) => {
    try{
        //Extraigo los datos del cuerpo de la solicitud
        const { nombre, apellido, email, contraseña, edad } = req.body

        //Leo el archivo de usuarios para obtener los datos actuales
        const data = await readFile('./data/usuarios.json', 'utf-8');
        const usuariosData = JSON.parse(data);

        //Creo un nuevo usuario con un ID único
        const nuevoUsuario = { 
            id: `usr-00${usuariosData.length + 1}`, 
            nombre, 
            apellido, 
            email, 
            contraseña, 
            edad,
            cuenta_validada: false 
        };

        //Agrego el nuevo usuario al array de usuarios y escribo el archivo actualizado
        usuariosData.push(nuevoUsuario);
        await writeFile('./data/usuarios.json', JSON.stringify(usuariosData, null, 2));

        res.status(201).json({
            message: 'Usuario creado correctamente',
            usuario: nuevoUsuario
        })
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
})


//POST2
app.post(`/usuarios/login`, async (req,res) => {
    try{    
        //Extraigo los datos del cuerpo de la solicitud
        const { email, contraseña } = req.body

        //Verifico que no lleguen vacíos, nulos o solo espacios
        if (!email || !contraseña || email.trim() === "" || contraseña.trim() === "") {
            return res.status(400).json({ 
                message: 'Faltan datos obligatorios: email y contraseña son requeridos.' 
            });
        }

        //Leo el archivo de usuarios para obtener los datos actuales
        const data = await readFile('./data/usuarios.json', 'utf-8');
        const usuariosData = JSON.parse(data);

        //Busco un usuario que coincida con el email y la contraseña proporcionados
        const usuarioEncontrado = usuariosData.find(e => e.email === email && e.contraseña === contraseña)

        if (usuarioEncontrado)
        {
            res.status(200).json({
                message: 'Inicio de sesión exitoso',
                usuario: {
                    nombre: usuarioEncontrado.nombre,
                    apellido: usuarioEncontrado.apellido,
                    email: usuarioEncontrado.email
                }
            }) 
        }else{
            return res.status(401).json({message: `email o contraseña inválida`})
        }
    }    catch (error) {
        console.error(error); 
        return res.status(500).json({ message: 'Error al iniciar sesión' });
    }
})  



//PUT
app.put(`/productos/:id`,async (req,res) => {
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


//DELETE
app.delete(`/usuarios/:id`, async (req,res) => {
    const usuarioId = req.params.id

    try{
        //leo los dos jsons
        const dataUsuarios = await readFile('./data/usuarios.json', 'utf-8');
        const dataVentas = await readFile('./data/ventas.json', 'utf-8');

        //parseo los datos de los jsons a objetos de JavaScript
        const usuarios = JSON.parse(dataUsuarios);
        const ventas = JSON.parse(dataVentas);

        //verifico si el usuario tiene ventas asociadas 
        const tieneVentas = ventas.some(v => v.id_usuario === usuarioId)

        if(tieneVentas)
        {
                //Si tiene ventas no lo dejo borrar
                res.status(403).json({ 
                message: "No se puede eliminar el usuario porque tiene ventas asociadas. Primero debe gestionar el historial de ventas." 
            });
        }

        //Uso filter en vez de splice porque filter me devuelve un nuevo array 
        // sin el usuario que quiero eliminar, mientras que splice modifica 
        // el array original y puede ser mas complicado de manejar en este caso.
        const usuarioEncontrado = usuarios.filter(u => u.id !== usuarioId)

        //Si el usuario encontrado es menor al array original, 
        // significa que se elimino correctamente
        if(usuarioEncontrado.length < usuarios.length){
            await writeFile('./data/usuarios.json', JSON.stringify(usuarioEncontrado, null, 2));
            res.status(200).json({message: `Usuario eliminado correctamente`})
        }
        else{
            res.status(404).json({message: `Usuario no encontrado`})
        }
    }catch(error){
        res.status(500).json({message: `Error al eliminar el usuario`})
    }
})
    