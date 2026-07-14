import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // 1. CORRECCIÓN: Apuntar a la carpeta correcta
  testDir: './tests', 
  
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    // 2. CORRECCIÓN SEGÚN LA GUÍA: Ver el navegador y evitar detección de bots
    headless: false, // false = verás el navegador abrirse en pantalla [cite: 156]
    launchOptions: {
      args: ['--disable-blink-features=AutomationControlled'] // esto evita que algunos sitios detecten que es un bot [cite: 158, 161]
    },
    trace: 'on-first-retry', // [cite: 163]
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});