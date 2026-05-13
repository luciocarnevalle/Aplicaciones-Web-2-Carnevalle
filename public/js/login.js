document.getElementById('loginForm').onsubmit = async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const contraseña = document.getElementById('pass').value;

            // Simulamos la validación contra tu endpoint POST /usuarios/login
            const res = await fetch('/usuarios/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, contraseña })
            });

            if (res.ok) {
                window.location.href = '/pages/productos.html'; // Si es correcto, vas a la productos
            } else {
                document.getElementById('error').innerText = "Credenciales incorrectas";
            }
        };