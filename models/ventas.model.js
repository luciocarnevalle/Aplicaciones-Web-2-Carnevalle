import {model, Schema} from "mongoose";

const ventaSchema = new Schema({
    id_usuario:{type: Schema.Types.ObjectId, ref: 'usuario', required: true},
    fecha:{type: Date, required: true},
    total:{type: Number, required: true},
    entregado:{type: Boolean, required: true, default: false},
    productos: [
        {
            id_producto: { type: Schema.Types.ObjectId, ref: 'producto', required: true },
            cantidad: { type: Number, required: true },
            precio_unitario: { type: Number, required: true }
        }
    ]
})

const Venta = model('venta', ventaSchema)
export default Venta;