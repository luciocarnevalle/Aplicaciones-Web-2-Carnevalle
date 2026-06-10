document.addEventListener("DOMContentLoaded", () => {
    //Creo el elemento footer
    const footer = document.createElement("footer");
    footer.className = "bg-dark text-white text-center py-4 mt-5 border-top border-secondary";

    footer.innerHTML = `
        <div class="container">
            <p class="mb-3 fw-bold tracking-wide text-uppercase small" style="letter-spacing: 2px;">TENIS PRO — Conéctate con nosotros</p>
            <div class="d-flex justify-content-center gap-4 mb-3">
                <a href="https://wa.me/543518131564" target="_blank" class="social-link" title="Escríbenos por WhatsApp">
                    <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" width="35" height="35">
                </a>
                <a href="https://instagram.com/luciocarnevalle" target="_blank" class="social-link" title="Síguenos en Instagram">
                    <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" width="35" height="35">
                </a>
                <a href="https://maps.app.goo.gl/77zwCEueSK1kBBzS8?g_st=ic" target="_blank" class="social-link" title="Encuéntranos en Google Maps">
                    <img src="https://cdn-icons-png.flaticon.com/512/854/854878.png" alt="Google Maps" width="35" height="35">
                </a>
            </div>
            <p class="text-muted small mb-0">© 2026 Tenis Pro. Todos los derechos reservados.</p>
        </div>
    `;

    document.body.appendChild(footer);
});