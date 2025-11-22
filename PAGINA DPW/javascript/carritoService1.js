const cuentaCarritoElement = document.getElementById("cuenta-carrito");

/** Agregar producto al carrito */
function agregarAlCarrito(producto) {
  let memoria = JSON.parse(localStorage.getItem("helados"));
  let cantidadProductoFinal;

  if (!memoria || memoria.length === 0) {
    const nuevoProducto = getNuevoProductoParaMemoria(producto);
    localStorage.setItem("helados", JSON.stringify([nuevoProducto]));
    actualizarNumeroCarrito();
    cantidadProductoFinal = 1;
  } else {
    const indiceProducto = memoria.findIndex(helado => helado.id === producto.id);
    const nuevaMemoria = memoria;

    if (indiceProducto === -1) {
      const nuevoProducto = getNuevoProductoParaMemoria(producto);
      nuevaMemoria.push(nuevoProducto);
      cantidadProductoFinal = 1;
    } else {
      nuevaMemoria[indiceProducto].cantidad++;
      cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
    }

    localStorage.setItem("helados", JSON.stringify(nuevaMemoria));
    actualizarNumeroCarrito();
    return cantidadProductoFinal;
  }
}

/** Restar producto del carrito */
function restarAlCarrito(producto) {
  let memoria = JSON.parse(localStorage.getItem("helados"));
  let cantidadProductoFinal = 0;
  const indiceProducto = memoria.findIndex(helado => helado.id === producto.id);
  let nuevaMemoria = memoria;

  nuevaMemoria[indiceProducto].cantidad--;
  cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;

  if (cantidadProductoFinal === 0) {
    nuevaMemoria.splice(indiceProducto, 1);
  }

  localStorage.setItem("helados", JSON.stringify(nuevaMemoria));
  actualizarNumeroCarrito();
  return cantidadProductoFinal;
}

/** Crear nuevo producto con cantidad */
function getNuevoProductoParaMemoria(producto) {
  const nuevoProducto = { ...producto };
  nuevoProducto.cantidad = 1;
  return nuevoProducto;
}

/** Actualizar número del carrito en el header */
function actualizarNumeroCarrito() {
  let cuenta = 0;
  const memoria = JSON.parse(localStorage.getItem("helados"));
  if (memoria && memoria.length > 0) {
    cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
    cuentaCarritoElement.innerText = cuenta;
    return cuenta;
  }
  cuentaCarritoElement.innerText = 0;
  return 0;
}

/** Reiniciar carrito */
function reiniciarCarrito() {
  localStorage.removeItem("helados");
  actualizarNumeroCarrito();
}
