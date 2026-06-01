import {model, Schema} from "mongoose";

const productoSchema = new Schema({
    categoria:{type: String, required: true},
    marca:{type: String, required: true},
    titulo:{type: String, required: true},
    img: { type: String, required: true },
    descripcion: { type: String, required: true},
    precio: {type: String, required: true}
}) 

const Producto = model('producto', productoSchema)
export default Producto;