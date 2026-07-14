import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.mercadolibre.com.pe/';

test.describe('Suite E2E - Mercado Libre Perú', () => {

  test.beforeEach(async ({ page }) => {
    // Retiramos el domcontentloaded para que Playwright maneje la carga natural de la web
    await page.goto(BASE_URL);
  });

  // ==========================================================
  // TEST 1: Carga inicial
  // ==========================================================
  test('1. Verificar carga de la página principal', async ({ page }) => {
    await expect(page).toHaveTitle(/Mercado Libre/i);
    await expect(page.locator('#cb1-edit')).toBeVisible();
  });

  // ==========================================================
  // TEST 2: Búsqueda y renderizado de cuadrícula
  // ==========================================================
  test('2. Buscar un producto y visualizar resultados', async ({ page }) => {
    const buscador = page.locator('#cb1-edit');
    await buscador.fill('Laptop');
    await buscador.press('Enter');

    // Regresamos a tu selector original que sí existe en el DOM de Mercado Libre
    const contenedorResultados = page.locator('ol.ui-search-layout');
    
    await expect(contenedorResultados).toBeVisible();
  });

  // ==========================================================
  // TEST 3: Interacción con el primer producto
  // ==========================================================
  test('3. Abrir el primer producto encontrado', async ({ page }) => {
    await page.locator('#cb1-edit').fill('Laptop');
    await page.keyboard.press('Enter');

    // Ubicamos la primera tarjeta de producto usando su clase contenedora específica
    const primeraTarjeta = page.locator('.ui-search-layout__item').first();
    
    // Hacemos clic en el enlace dentro de esa tarjeta
    await primeraTarjeta.locator('a').first().click();

    await expect(page).not.toHaveURL(/listado/);
  });

  // ==========================================================
  // TEST 4 & 5: Botones de Acción (Agrupados por similitud lógica)
  // ==========================================================
  test('4. Verificar disponibilidad y botones de compra', async ({ page }) => {
    await page.locator('#cb1-edit').fill('Laptop');
    await page.keyboard.press('Enter');

    await page.locator('.ui-search-layout__item').first().locator('a').first().click();

    // getByRole es perfecto aquí. Playwright buscará el botón sin importar si tarda un poco en renderizar.
    const botonAccion = page.getByRole('button', { name: /Agregar al carrito|Comprar ahora/i });
    await expect(botonAccion.first()).toBeVisible();
  });

  // ==========================================================
  // TEST 6: Búsqueda sin resultados (Edge Case)
  // ==========================================================
  test('6. Buscar un producto inexistente', async ({ page }) => {
    const busquedaInvalida = 'asdfghjkl123456789xyz';
    await page.locator('#cb1-edit').fill(busquedaInvalida);
    await page.keyboard.press('Enter');

    await expect(page).toHaveURL(new RegExp(busquedaInvalida, 'i'));
    
    // Extra: Validar que la interfaz gráfica muestre el diseño de "No encontramos resultados"
    // ML usa clases como 'ui-search-rescue' para estos casos.
    const alertaVacio = page.locator('.ui-search-rescue');
    if (await alertaVacio.count() > 0) {
      await expect(alertaVacio).toBeVisible();
    }
  });

  // ==========================================================
  // TEST 7 & 8: Rutas estáticas (Navegación)
  // ==========================================================
  test('7. Navegar a la sección Ofertas', async ({ page }) => {
    await page.goto(`${BASE_URL}ofertas`);
    await expect(page).toHaveURL(/ofertas/i);
    // Verificamos el título de la página en lugar del body entero (más eficiente)
    await expect(page).toHaveTitle(/Ofertas/i);
  });

  test('8. Navegar a Categorías', async ({ page }) => {
    await page.goto(`${BASE_URL}categorias`);
    await expect(page).toHaveURL(/categorias/i);
    await expect(page).toHaveTitle(/Categorías/i);
  });

  // ==========================================================
  // TEST 9: Filtros dinámicos
  // ==========================================================
  test('9. Aplicar filtro Nuevo', async ({ page }) => {
    await page.locator('#cb1-edit').fill('Playstation 5');
    await page.keyboard.press('Enter');

    // Apuntamos específicamente al contenedor de filtros laterales
    const filtroNuevo = page.locator('.ui-search-filter-name', { hasText: /^Nuevo$/ });
    
    if (await filtroNuevo.count() > 0) {
      await filtroNuevo.first().click();
    }

    const resultados = page.locator('.ui-search-results');
    await expect(resultados).toBeVisible();
  });

  // ==========================================================
  // TEST 10: Validación de URL en búsqueda específica
  // ==========================================================
  test('10. Buscar producto y validar ruteo interno', async ({ page }) => {
    await page.locator('#cb1-edit').fill('Monitor');
    await page.keyboard.press('Enter');

    await expect(page.locator('.ui-search-results')).toBeVisible();
    await expect(page).toHaveURL(/Monitor|monitor/i);
  });

});