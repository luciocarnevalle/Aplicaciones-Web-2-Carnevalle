import express from 'express';
import { readFile, writeFile } from 'fs/promises';

const router = express.Router();

//POST Registro de usuario
router.post(`/`, async (req,res) => {
    try{
        //Extraigo los datos del cuerpo de la solicitud
        const { nombre, apellido, email, contraseña, edad } = req.body

        if (!nombre || !apellido || !email || !contraseña || !edad) {
            return res.status(400).json({ message: 'Error: Todos los campos son obligatorios' });
        }

        //Leo el archivo de usuarios para obtener los datos actuales
        const data = await readFile('./data/usuarios.json', 'utf-8');
        const usuariosData = JSON.parse(data);


        const ultimoUsuario = usuariosData[usuariosData.length - 1];
        const ultimoNumero = ultimoUsuario ? parseInt(ultimoUsuario.id.split('-')[1]) : 0;
        const nuevoNumero = ultimoNumero + 1;

        //Creo un nuevo usuario con un ID único
        const nuevoUsuario = { 
            id: `usr-00${nuevoNumero}`, 
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
router.post(`/login`, async (req,res) => {
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
                    id: usuarioEncontrado.id,
                    nombre: usuarioEncontrado.nombre,
                    apellido: usuarioEncontrado.apellido,
                    email: usuarioEncontrado.email,
                    direccion: usuarioEncontrado.direccion || "Av Colon, Córdoba"
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


//DELETE
router.delete(`/usuarios/:id`, async (req, res) => {
    const usuarioId = req.params.id;

    try {
        //Leo los archivos de usuarios y ventas 
        const dataUsuarios = await readFile('./data/usuarios.json', 'utf-8');
        const dataVentas = await readFile('./data/ventas.json', 'utf-8');

        //Parseo los datos de usuarios y ventas
        const usuarios = JSON.parse(dataUsuarios);
        const ventas = JSON.parse(dataVentas);

        //Verifico si el usuario tiene ventas asociadas antes de eliminarlo
        const tieneVentas = ventas.some(v => v.id_usuario === usuarioId);

        if (!tieneVentas) {
            return res.status(403).json({ 
                message: "No se puede eliminar el usuario porque tiene ventas asociadas." 
            });
        }

        console.log(typeof usuarioId, typeof usuarios[0].id);
        
        
        const usuariosRestantes = usuarios.filter(u => u.id !== usuarioId);

        if (usuariosRestantes.length < usuarios.length) {
            await writeFile('./data/usuarios.json', JSON.stringify(usuariosRestantes, null, 2));
            return res.status(200).json({ message: "Usuario eliminado correctamente" });
        } else {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar el usuario" });
    }
});

export default router;
