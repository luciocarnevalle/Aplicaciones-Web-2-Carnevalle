document.getElementById('loginForm').onsubmit = async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const contraseña = document.getElementById('pass').value;

            // Envío la solicitud al backend con los datos del formulario
            const res = await fetch('/usuarios/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, contraseña })
            });

         
            if (res.ok) {
                const usuarioData = await res.json(); 
                
                // Guardo el ID del usuario y su dirección en sessionStorage para usarlo en otras páginas
                sessionStorage.setItem('usuarioId', usuarioData.usuario.id); 
                sessionStorage.setItem('usuarioDireccion', usuarioData.usuario.direccion);

                window.location.href = '/pages/productos.html';
            }
        };