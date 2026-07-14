// tests/unit/mercadolibre-helpers.test.js
const {
  formatearUrlBusqueda,
  calcularTotalCarrito,
  aplicarDescuento,
  verificarDisponibilidad,
  calcularCostoEnvio
} = require('../../src/utils/mercadolibre-helpers');

describe('Suite de Pruebas Unitarias - Lógica de Negocio de Mercado Libre', () => {

  // --- GRUPO 1: BÚSQUEDAS (3 tests) ---
  test('1. Devolver la URL principal si la búsqueda está vacía', () => {
    expect(formatearUrlBusqueda('')).toBe('https://www.mercadolibre.com.pe/');
  });

  test('2. Formatear correctamente una búsqueda simple (Laptop)', () => {
    expect(formatearUrlBusqueda('Laptop')).toBe('https://listado.mercadolibre.com.pe/laptop');
  });

  test('3. Formatear correctamente una búsqueda con espacios', () => {
    expect(formatearUrlBusqueda('Playstation 5')).toBe('https://listado.mercadolibre.com.pe/playstation-5');
  });

  // --- GRUPO 2: CARRITO DE COMPRAS (2 tests) ---
  test('4. Calcular el total exacto del carrito con múltiples productos', () => {
    const carrito = [
      { nombre: 'Mouse Logitech', precio: 50, cantidad: 2 }, // 100
      { nombre: 'Teclado Mecánico', precio: 150, cantidad: 1 } // 150
    ];
    expect(calcularTotalCarrito(carrito)).toBe(250); // Total: 250
  });

  test('5. Retornar 0 si el carrito está vacío', () => {
    expect(calcularTotalCarrito([])).toBe(0);
  });

  // --- GRUPO 3: DESCUENTOS Y PROMOCIONES (2 tests) ---
  test('6. Aplicar un descuento del 20% correctamente a un producto', () => {
    // Si un producto cuesta 1000 y tiene 20% de descuento, debe costar 800
    expect(aplicarDescuento(1000, 20)).toBe(800);
  });

  test('7. No alterar el precio final si el descuento es 0%', () => {
    expect(aplicarDescuento(500, 0)).toBe(500);
  });

  // --- GRUPO 4: DISPONIBILIDAD DE STOCK (2 tests) ---
  test('8. Aprobar la compra si hay suficiente stock disponible', () => {
    // Hay 10 en stock, el cliente pide 2 -> TRUE
    expect(verificarDisponibilidad(10, 2)).toBe(true);
  });

  test('9. Rechazar la compra si el cliente pide más de lo que hay en stock', () => {
    // Hay 5 en stock, el cliente pide 10 -> FALSE
    expect(verificarDisponibilidad(5, 10)).toBe(false);
  });

  // --- GRUPO 5: LOGÍSTICA Y ENVÍOS (1 test) ---
  test('10. Otorgar envío gratis (costo 0) a usuarios suscritos a Meli+', () => {
    // Compra de 50 soles (no supera el mínimo), pero ES usuario Meli+ (Premium)
    const costoEnvio = calcularCostoEnvio(50, true);
    expect(costoEnvio).toBe(0); 
  });

});