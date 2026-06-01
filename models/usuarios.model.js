import {model, Schema} from "mongoose";

const usuarioSchema = new Schema({
    nombre:{type: String, required: true},
    apellido:{type: String, required: true},
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    contraseña: { type: String, required: true },
    edad: { type: Number, required: true },
    cuenta_validada: { type: Boolean, required: true, default: false}
}) 

const Usuario = model('usuario', usuarioSchema)
export default Usuario;