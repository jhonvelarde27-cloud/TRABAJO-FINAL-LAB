// src/utils/mercadolibre-helpers.js

// 1. URLs
function formatearUrlBusqueda(palabraClave) {
  if (!palabraClave) return 'https://www.mercadolibre.com.pe/';
  const busquedaFormateada = palabraClave.trim().replace(/\s+/g, '-').toLowerCase();
  return `https://listado.mercadolibre.com.pe/${busquedaFormateada}`;
}

// 2. Carrito de Compras
function calcularTotalCarrito(productos) {
  if (!productos || productos.length === 0) return 0;
  return productos.reduce((total, prod) => total + (prod.precio * prod.cantidad), 0);
}

// 3. Descuentos de Productos
function aplicarDescuento(precioBase, porcentajeDescuento) {
  if (porcentajeDescuento <= 0) return precioBase;
  const descuento = precioBase * (porcentajeDescuento / 100);
  return precioBase - descuento;
}

// 4. Stock y Disponibilidad
function verificarDisponibilidad(stockDisponible, cantidadDeseada) {
  return stockDisponible >= cantidadDeseada && cantidadDeseada > 0;
}

// 5. Costo de Envío
function calcularCostoEnvio(precioTotal, esUsuarioMeliMas) {
  if (esUsuarioMeliMas || precioTotal >= 99) return 0; // Envío gratis en ML Perú
  return 15; // Costo estándar
}

module.exports = {
  formatearUrlBusqueda,
  calcularTotalCarrito,
  aplicarDescuento,
  verificarDisponibilidad,
  calcularCostoEnvio
};