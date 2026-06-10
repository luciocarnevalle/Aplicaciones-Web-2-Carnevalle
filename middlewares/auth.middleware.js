import jwt from "jsonwebtoken";

// Middleware para verificar el token JWT
export const verificarToken = (req, res, next) => {
    //busco el token
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Error: Acceso denegado. Se requiere un token de autenticación.' });
    }

    try {
            //Verifico si es valido
            const verificado = jwt.verify(token, process.env.JWT_SECRET)
            req.usuarioId = verificado.id
            next();
    } catch (error) {
        return res.status(403).json({message: "Token invalido o vencido"})
    }
}