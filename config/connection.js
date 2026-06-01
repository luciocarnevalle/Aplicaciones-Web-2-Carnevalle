import mongoose from 'mongoose'


const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Aplicaciones_Web_2_Proyecto_Carnevalle';
const cached = global.mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
    if (cached.conn) {
        return cached.conn;
    }
    if(!MONGODB_URI) {
        throw new Error('MONGODB_URI no está definido en las variables de entorno');
    }

    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
        dbName: 'Aplicaciones_Web_2_Proyecto_Carnevalle',
        bufferCommands: false,
    })

    cached.conn = await cached.promise;
    return cached.conn;
}
