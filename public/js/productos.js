/*
let todosLosProductos = [];

        async function cargar() {
            const res = await fetch('/productos');
            todosLosProductos = await res.json();
            mostrarProductos(todosLosProductos);
        }

        // Función para mostrar los productos en el HTML
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

        // Función para filtrar productos por categoría
        function filtrar(categoria) {
            if (categoria === 'todos') {
                mostrarProductos(todosLosProductos);
            } else {
                const filtrados = todosLosProductos.filter(p => p.categoria === categoria);
                mostrarProductos(filtrados);
            }
        }

        window.onload = cargar;



        // Función para agregar un producto al carrito
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

        */

let todosLosProductos = [];

// Carga inicial de productos desde tu servidor backend
async function cargar() {
    const res = await fetch('/productos');
    todosLosProductos = await res.json();
    mostrarProductos(todosLosProductos);
}

// Renderiza las tarjetas usando el diseño dinámico de tus antiguos archivos (card1, card2...)
function mostrarProductos(lista) {
    const contenedor = document.getElementById('lista');
    contenedor.innerHTML = '';
    
    lista.forEach((p, index) => {
        const cardClass = `card${index + 1}`; 
        
        contenedor.innerHTML += `
            <div class="col">
                <div class="${cardClass} h-100 shadow-sm p-3 d-flex flex-column justify-content-between">
                    <div>
                        <span class="badge bg-secondary mb-2">${p.marca}</span>
                        <h3 class="h5 fw-bold">${p.titulo}</h3>
                        <img src="${p.img}" alt="${p.titulo}" class="img-fluid my-2 rounded" style="max-height: 150px; object-fit: contain; width: 100%;">
                        <p class="small text-secondary">${p.descripcion}</p>
                    </div>

                    <div>
                        <div class="card-footer bg-transparent border-0 d-flex justify-content-between align-items-center px-0 mb-2">
                            <p class="precio m-0 fw-bold text-dark">$${p.precio.toLocaleString('es-AR')}</p> 

                            <div class="cantidad-selector" style="display: flex; align-items: center;">
                                <button class="cantidad-selector__btn btn btn-sm btn-outline-secondary" data-accion="restar" aria-label="Restar uno" style="padding: 2px 8px;">-</button>
                                <input type="number" class="cantidad-selector__numero" value="1" min="1" aria-label="Cantidad" style="width: 35px; text-align: center; border: none; margin: 0 5px;" readonly>
                                <button class="cantidad-selector__btn btn btn-sm btn-outline-secondary" data-accion="sumar" aria-label="Sumar uno" style="padding: 2px 8px;">+</button>
                            </div>
                        </div>
                        <button class="btn btn-dark btn-sm rounded-pill w-100 boton-card" data-id-producto="${p.id}">
                            Añadir al carrito
                        </button>
                    </div>
                </div>
            </div>`;
    });
}

// Filtrado por categorías compatible con los botones de tu productos.html
function filtrar(categoria) {
    if (categoria === 'todos') {
        mostrarProductos(todosLosProductos);
    } else {
        const filtrados = todosLosProductos.filter(p => p.categoria === categoria);
        mostrarProductos(filtrados);
    }
}

window.onload = cargar;

// Escuchador global para controlar dinámicamente las cantidades y la acción de compra
document.body.addEventListener("click", (e) => {
    
    // 1. Lógica para los botones "+" y "-" de las tarjetas
    const botonCantidad = e.target.closest(".cantidad-selector__btn");
    if (botonCantidad) {
        e.preventDefault(); 
        const accion = botonCantidad.dataset.accion;
        const input = botonCantidad.parentElement.querySelector(".cantidad-selector__numero");
        let valor = parseInt(input.value);

        if (accion === "sumar") {
            valor++;
        } else if (accion === "restar" && valor > 1) {
            valor--;
        }
        input.value = valor;
    }

    // 2. Lógica para añadir al carrito respetando la cantidad elegida
    const botonCarrito = e.target.closest(".boton-card");
    if (botonCarrito) {
        e.preventDefault(); 

        // Encontramos la tarjeta contenedora para extraer su input de cantidad
        const card = botonCarrito.closest('div[class^="card"]'); 
        const inputCantidad = card.querySelector('.cantidad-selector__numero');
        
        const idProducto = botonCarrito.dataset.idProducto;
        const cantidad = parseInt(inputCantidad.value);
        
        const productoParaAgregar = todosLosProductos.find(p => p.id === idProducto);

        if (!productoParaAgregar) {
            console.error("No se encontró el producto");
            return;
        }

        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const productoEnCarrito = carrito.find(p => p.id === idProducto);

        if (productoEnCarrito) {
            // Sumamos la cantidad nueva acumulada a la que ya existía
            productoEnCarrito.cantidad += cantidad;
        } else {
            // Agregamos el producto nuevo con su propiedad 'cantidad'
            carrito.push({
                ...productoParaAgregar, 
                cantidad: cantidad
            });
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert(`¡Agregaste ${cantidad} unidad(es) de "${productoParaAgregar.titulo}" al carrito!`);
        
        // Reiniciamos el selector de la tarjeta a 1
        inputCantidad.value = 1;
    }
});