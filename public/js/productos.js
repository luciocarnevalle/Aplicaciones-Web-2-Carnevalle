let todosLosProductos = [];

        async function cargar() {
            const res = await fetch('/productos');
            todosLosProductos = await res.json();
            mostrarProductos(todosLosProductos);
        }

        function mostrarProductos(lista) {
            const contenedor = document.getElementById('lista');
            contenedor.innerHTML = '';
            lista.forEach(p => {
                contenedor.innerHTML += `
                    <div class="col">
                        <div class="card h-100 shadow-sm p-3">
                            <div class="card-body">
                                <span class="badge badge-marca">${p.marca}</span>
                                <h5 class="card-title fw-bold">${p.titulo}</h5>
                                <p class="small text-secondary">${p.descripcion}</p>
                                <div class="d-flex justify-content-between align-items-center mt-auto">
                                    <span class="precio-tag">$${p.precio.toLocaleString('es-AR')}</span>
                                    <button 
                                        class="btn btn-dark btn-sm rounded-pill px-3" 
                                        onclick="agregarAlCarrito('${p.id}')">
                                        Comprar
                                    </button>
                            </div>
                        </div>
                    </div>`;
            });
        }

        function filtrar(categoria) {
            if (categoria === 'todos') {
                mostrarProductos(todosLosProductos);
            } else {
                const filtrados = todosLosProductos.filter(p => p.categoria === categoria);
                mostrarProductos(filtrados);
            }
        }

        window.onload = cargar;




function agregarAlCarrito(id) {
    const producto = todosLosProductos.find(p => p.id === id);
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Checkear si ya está
    const existe = carrito.find(p => p.id === id);
    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert('¡Producto añadido!');
}