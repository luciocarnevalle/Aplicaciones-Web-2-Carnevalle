document.addEventListener("DOMContentLoaded", () => {
    //Obtengo datos de sesión
    const token = sessionStorage.getItem('token');
    const usuarioNombre = sessionStorage.getItem('usuarioNombre') || 'Usuario';

    //Creo el elemento navbar 
    const headerNav = document.createElement("nav");
    headerNav.className = "navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm border-bottom border-secondary";
    headerNav.style.fontFamily = "'Inter', sans-serif"; // <-- ESTO IGUALA LAS FUENTES

    //Estructura dinámica según el estado del Login
    let saludoUsuario = "";
    let botonSesion = "";

    if (token) {
        saludoUsuario = `
            <span class="navbar-text text-white fw-bold small me-3" style="font-size: 14px;">
                👤 Hola, ${usuarioNombre}
            </span>
        `;
        botonSesion = `
            <button id="btn-logout" class="btn btn-outline-light btn-sm rounded-pill px-3 ms-2 fw-semibold" style="font-size: 13px;">
                Cerrar Sesión
            </button>
        `;
    } else {
        botonSesion = `
            <a href="../index.html" class="btn btn-light btn-sm rounded-pill px-3 fw-bold ms-2" style="font-size: 13px;">
                Iniciar Sesión
            </a>
        `;
    }

    //HTML completo del Navbar 
    headerNav.innerHTML = `
        <div class="container-fluid">
            <a class="navbar-brand fw-bold tracking-wide" href="productos.html" style="letter-spacing: 1.5px; font-weight: 700 !important;">
                TENIS PRO
            </a>
            
            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarNav">
                <div class="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center">
                    ${saludoUsuario}
                </div>
                
                <div class="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center gap-2">
                    <a class="nav-link text-white-50 fw-bold px-3" href="carrito.html" style="font-size: 14px;">Mi Carrito</a>
                    ${botonSesion}
                </div>
            </div>
        </div>
    `;

    document.body.insertBefore(headerNav, document.body.firstChild);

    //Lógica para el botón de Cerrar Sesión con confirmación
    const btnLogout = document.getElementById("btn-logout");
    if (btnLogout) {
        btnLogout.addEventListener("click", () => {
            const confirmar = confirm("¿Estás seguro de que deseas cerrar sesión?");
            
            if (confirmar) {
                sessionStorage.clear();
                window.location.href = '../index.html';
            }
        });
    }
});