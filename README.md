Nombre: Lucio
Apellido: Carnevalle 

# Aplicaciones-Web-2-Carnevalle

http://localhost:5000/

GET1: Ver todos los productos
http://localhost:5000/productos


GET2: Ver un producto especifico
http://localhost:5000/productos/wils-03 o http://localhost:5000/productos/babo-02


POST1: Crear un usuario
http://localhost:5000/usuarios

//Datos para crear un usuario
{
  "nombre": "Rafael",
  "apellido": "Nadal",
  "email": "rafa.nadal@tenis.com",
  "contraseña": "VamosRafa2024",
  "edad": 37
}


POST2: Comprobar que se creo el usuario
http://localhost:5000/usuarios/login

//Datos para comprobar que se creo y ver su informacion
{
  "email": "rafa.nadal@tenis.com",
  "contraseña": "VamosRafa2024"
}


PUT: Cambiar el precio de algun producto
http://localhost:5000/productos/lux-01

//Precio nuevo para probar y cambiarlo (ahora sale 135000)
{
  "precio": 140000
}


DELETE: Borrar un usuario poniendo atencion a la integridad de datos

http://localhost:5000/usuarios/usr-001 (No se va a poder borrar porque tiene ventas asociadas)

http://localhost:5000/usuarios/usr-007 (Este si se va a borrar)


