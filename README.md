Nombre: Lucio
Apellido: Carnevalle 

Link del repo: https://github.com/luciocarnevalle/Aplicaciones-Web-2-Carnevalle
# Aplicaciones-Web-2-Carnevalle

http://localhost:5000/

Datos para entrar al ecommerce
Mail: rafa.nadal@tenis.com
Contrasena: 1234


GET1: Ver todos los productos
http://localhost:5000/productos


GET2: Ver un producto especifico
http://localhost:5000/productos/6a1c0a78403b1ef358e2093a 


POST1: Crear un usuario
http://localhost:5000/usuarios

//Datos para crear un usuario
{
  "nombre": "Juan",
  "apellido": "Perez",
  "email": "juanperez@gmail.com",
  "contraseña": "password123",
  "edad": 20
}

{
  "nombre": "Lucio",
  "apellido": "Carnevalle",
  "email": "lucio@prueba.com",
  "contraseña": "123",
  "edad": 24
}




POST2: Comprobar que se creo el usuario
http://localhost:5000/usuarios/login

//Datos para comprobar que se creo y ver su informacion
{
  "email": "lucio@prueba.com",
  "contraseña": "123"
}


PUT: Cambiar el precio de algun producto
http://localhost:5000/productos/6a1c0a78403b1ef358e2093a 

//Precio nuevo para probar y cambiarlo (ahora sale 240000)
{
  "precio": "220000"
}


DELETE: Borrar un usuario poniendo atencion a la integridad de datos

http://localhost:5000/usuarios/6a2936e4874aaa430580696d (tiene ventas)

http://localhost:5000/usuarios/6a293c322ed3cc1cee47c5b1 (no tiene ventas)






