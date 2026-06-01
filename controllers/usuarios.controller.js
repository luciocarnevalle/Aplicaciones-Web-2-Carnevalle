import { connectToDatabase } from "../config/connection.js";
import Usuario from "../models/usuarios.model.js";
import Venta from "../models/ventas.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//POST Registro de usuario
export const registrarUsuario = async (req,res) => {
    try{
        //Extraigo los datos del cuerpo de la solicitud
        const { nombre, apellido, email, contraseña, edad } = req.body

        //Verifico que no lleguen vacíos, nulos o solo espacios
        if (!nombre || !apellido || !email || !contraseña || !edad) {
            return res.status(400).json({ message: 'Error: Todos los campos son obligatorios' });
        }
        await connectToDatabase()

        //Verifico que el email no esté registrado
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ message: 'Error: El email ya está registrado' });
        }

        //Encripto la contrasena
        const saltRounds = 10;
        const contraseñaEncriptada = await bcrypt.hash(contraseña, saltRounds);

        //Creo un nuevo usuario con un ID único
        const nuevoUsuario = new Usuario({ 
            nombre, 
            apellido, 
            email, 
            contraseña: contraseñaEncriptada, 
            edad,
        });
        await nuevoUsuario.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error("ERROR EN REGISTRO:", error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


//POST Login de usuario
export const loginUsuario = async (req,res) => {
    try{    
        //Extraigo los datos del cuerpo de la solicitud
        const { email, contraseña } = req.body

        //Verifico que no lleguen vacíos, nulos o solo espacios
        if (!email || !contraseña || email.trim() === "" || contraseña.trim() === "") {
            return res.status(400).json({ message: 'Error: Email y contraseña son obligatorios' });
        }
        await connectToDatabase()

        //Busco el usuario por email
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ message: 'Error: Usuario no encontrado' });
        }

        //Comparo contrasena con Bycrypt
        const contraseñaCorrecta = await bcrypt.compare(contraseña, usuario.contraseña)
        if (!contraseñaCorrecta) {
            return res.status(400).json({ message: 'Error: Contraseña incorrecta' });
        }

        //Genero token JWT
        const token = jwt.sign({id: usuario._id}, process.env.JWT_SECRET, {expiresIn:'2h'})

        //Devuelvo el token al frontend
        res.status(200).json({ 
            message: 'Login exitoso',
            token: token, 
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email
            } 
        });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

//DELETE Eliminar un usuario por ID (solo si no tiene ventas asociadas)
export const eliminarUsuario = async (req, res) => {
    const usuarioId = req.params.id;
    try {
        await connectToDatabase();

        // Verifico si el usuario tiene ventas asociadas
        const ventasAsociadas = await Venta.find({ id_usuario: usuarioId });
        if (ventasAsociadas.length > 0) {
            return res.status(400).json({ message: 'Error: No se puede eliminar el usuario porque tiene ventas asociadas' });
        }

        // Elimino el usuario        
        const resultado = await Usuario.deleteOne({ _id: usuarioId });
        if (resultado.deletedCount === 0) {
            return res.status(404).json({ message: 'Error: Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}


