const contenedorTarjetas = document.getElementById("cart-container");
const cantidadElement = document.getElementById("cantidad");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesContainer = document.getElementById("totales");

function crearTarjetasProductosCarrito() {
  contenedorTarjetas.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem("helados")) || [];

  if (productos.length > 0) {
    productos.forEach((producto) => {
      const nuevoHelado = document.createElement("div");
      nuevoHelado.classList.add("tarjeta-producto");
      nuevoHelado.innerHTML = `
        <img src="${producto.img}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <span>$${producto.precio}</span>
        <div>
          <button>-</button>
          <span class="cantidad">${producto.cantidad}</span>
          <button>+</button>
        </div>
      `;
      contenedorTarjetas.appendChild(nuevoHelado);

      // Botón restar
      nuevoHelado.querySelectorAll("button")[0].addEventListener("click", () => {
        restarAlCarrito(producto);
        crearTarjetasProductosCarrito();
        actualizarTotales();
      });

      // Botón sumar
      nuevoHelado.querySelectorAll("button")[1].addEventListener("click", () => {
        agregarAlCarrito(producto);
        crearTarjetasProductosCarrito();
        actualizarTotales();
      });
    });
  }

  revisarMensajeVacio();
  actualizarTotales();
  actualizarNumeroCarrito();
}

/** Actualiza el total de precio y unidades */
function actualizarTotales() {
  const productos = JSON.parse(localStorage.getItem("helados")) || [];
  let cantidad = 0;
  let precio = 0;

  productos.forEach((producto) => {
    cantidad += producto.cantidad;
    precio += producto.precio * producto.cantidad;
  });

  cantidadElement.innerText = cantidad;
  precioElement.innerText = precio;

  const comprarBtn = document.getElementById("comprar");
  if (comprarBtn) comprarBtn.disabled = productos.length === 0;
}

/** Muestra u oculta mensaje vacío */
function revisarMensajeVacio() {
  const productos = JSON.parse(localStorage.getItem("helados")) || [];
  carritoVacioElement.classList.toggle("escondido", productos.length > 0);
  totalesContainer.classList.toggle("escondido", productos.length === 0);
}

// Reiniciar carrito
document.getElementById("reiniciar").addEventListener("click", () => {
  reiniciarCarrito();
  crearTarjetasProductosCarrito();
});

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  crearTarjetasProductosCarrito();
  actualizarTotales();
  actualizarNumeroCarrito();
});
