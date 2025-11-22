const contenedorTarjetas = document.getElementById("productos-container");

function crearTarjetasProductosInicio(productos) {
  productos.forEach(producto => {
    const nuevoProducto = document.createElement("div");
    nuevoProducto.classList.add("tarjeta-producto");
    nuevoProducto.innerHTML = `
      <img src="${producto.img}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <button>Agregar al carrito</button>
    `;
    contenedorTarjetas.appendChild(nuevoProducto);

    // Evento para agregar al carrito
    nuevoProducto.querySelector("button").addEventListener("click", () => {
      agregarAlCarrito(producto);
    });
  });
}

// Renderizar catálogo
crearTarjetasProductosInicio(helados);
