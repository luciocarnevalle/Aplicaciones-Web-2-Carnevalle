document.getElementById('loginForm').onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const contraseña = document.getElementById('pass').value;

    try {
    // Envío la solicitud al backend con los datos del formulario
    const res = await fetch('/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, contraseña })
    });

    // Espero la respuesta y la convierto a JSON
    const data = await res.json();

    if (res.ok) {
        //Guardo el token en sessionStorage para futuras solicitudes autenticadas
        sessionStorage.setItem('token', data.token);

        //Guardo datos del usuario
        sessionStorage.setItem('usuarioId', data.usuario.id);
        sessionStorage.setItem('usuarioNombre', data.usuario.nombre);

        window.location.href = '/pages/productos.html';
        alert(`¡Bienvenido, ${data.usuario.nombre}!`);
    } else {
        document.getElementById('error').textContent = data.message || "Error al iniciar sesión";
    }
    } catch (error) {
        document.getElementById('error').textContent = "Error al conectar con el servidor";
    }
};