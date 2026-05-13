document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('carrito-productos-container');
    const vacio = document.getElementById('carrito-vacio');
    const footerCarrito = document.getElementById('carrito-footer');
    const totalMonto = document.getElementById('carrito-total-monto');
    const btnVaciar = document.getElementById('btn-vaciar-carrito');

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function renderizarCarrito() {
        contenedor.innerHTML = '';

        if (carrito.length === 0) {
            vacio.style.display = 'block';
            footerCarrito.style.display = 'none';
        } else {
            vacio.style.display = 'none';
            footerCarrito.style.display = 'block';

            let totalAcumulado = 0;

            carrito.forEach(producto => {
                // Si el precio viene como string "140.000", lo limpiamos. 
                // Si ya es un número, lo usamos directo.
                const precioLimpio = typeof producto.precio === 'string' 
                    ? parseFloat(producto.precio.replace(/\./g, '')) 
                    : producto.precio;

                const subtotal = precioLimpio * producto.cantidad;
                totalAcumulado += subtotal;

                const divProducto = document.createElement('div');
                divProducto.className = 'card mb-3 shadow-sm border-0 p-3';
                divProducto.innerHTML = `
                    <div class="row align-items-center text-center text-md-start">
                        <div class="col-md-7">
                            <h5 class="fw-bold mb-1">${producto.titulo}</h5>
                            <p class="text-muted small mb-0">Marca: ${producto.marca}</p>
                        </div>
                        <div class="col-md-3 text-center">
                            <p class="mb-0">Cant: ${producto.cantidad}</p>
                            <p class="fw-bold mb-0">$${precioLimpio.toLocaleString('es-AR')}</p>
                        </div>
                        <div class="col-md-2 text-md-end text-center mt-2 mt-md-0">
                            <button class="btn btn-sm btn-outline-danger rounded-pill btn-eliminar-item" data-id="${producto.id}">
                                Eliminar
                            </button>
                        </div>
                    </div>
                `;
                contenedor.appendChild(divProducto);
            });

            totalMonto.textContent = `$${totalAcumulado.toLocaleString('es-AR')}`;
        }
    }

    btnVaciar.addEventListener('click', () => {
        if (confirm('¿Vaciar todo el carrito?')) {
            carrito = [];
            localStorage.removeItem('carrito');
            renderizarCarrito();
        }
    });

    contenedor.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-eliminar-item')) {
            const id = e.target.dataset.id;
            carrito = carrito.filter(p => p.id !== id);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderizarCarrito();
        }
    });

    renderizarCarrito();


    // GENERAR ORDEN DE COMPRA
    const btnComprar = document.getElementById('btn-comprar');

    btnComprar.addEventListener('click', async () => {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    // Calculamos el total (limpiando puntos si es necesario como hicimos antes)
    const total = carrito.reduce((acc, p) => {
        const precio = typeof p.precio === 'string' ? parseFloat(p.precio.replace(/\./g, '')) : p.precio;
        return acc + (precio * p.cantidad);
    }, 0);

    // Armamos el objeto de la orden
    const orden = {
        email: "rafa.nadal@tenis.com", // Aquí podrías sacar el mail de quien se logueó
        productos: carrito,
        total: total,
        fecha: new Date().toISOString()
    };

    try {
        const response = await fetch('/ventas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orden)
        });

        if (response.ok) {
            const data = await response.json();
            alert(`¡Gracias por tu compra! Tu orden es la #${data.ordenId}`);
            
            // Limpiamos todo
            localStorage.removeItem('carrito');
            window.location.href = 'productos.html';
        } else {
            alert("Error al procesar la compra en el servidor");
        }
    } catch (error) {
        console.error("Error de red:", error);
        alert("No se pudo conectar con el servidor para finalizar la compra");
    }
    });
});