# UNIVERSIDAD NACIONAL SAN CRISTÓBAL DE HUAMANGA

## Facultad de Ingeniería de Minas, Geología y Civil

### Escuela Profesional de Ingeniería de Sistemas

<br>

<p align="center">
  <img src="logo.webp" alt="Logo UNSCH" width="200"/>
</p>

---

# INVESTIGACIÓN COMPLEMENTARIA - LABORATORIO N.° 07

## El Rol del QA Profesional: Generación de Evidencia y Reportes en Playwright

---

## Datos Generales

| Dato | Información |
|------|-------------|
| **Asignatura** | IS-489 Pruebas y Aseguramiento de Calidad de Software |
| **Docente** | Ing. Lizbeth Jaico Quispe |
| **Estudiante** | Jhon Eymer Velarde Yllisca |
| **Código** | 27222126 |
| **Fecha** | 29 de junio de 2026 |

---

## 1. Introducción: Más allá de ejecutar pruebas

En la ingeniería de calidad de software, el trabajo de un QA (Quality Assurance) Engineer no termina cuando un script de prueba pasa en su máquina local. En un entorno profesional y metodologías ágiles (Scrum), un test automatizado carece de valor si no está respaldado por **evidencia**. 

La evidencia es fundamental para:
1. **Trazabilidad:** Demostrar que un requerimiento o historia de usuario se cumple a cabalidad.
2. **Depuración:** Proporcionar a los desarrolladores el contexto exacto (estado del DOM, red, consola) del momento en que ocurrió un fallo.
3. **Integración Continua:** Permitir que los sistemas automáticos decidan si una versión del software es segura para ser desplegada en producción.

Para cubrir estas necesidades, **Playwright** integra un sistema de *Reporters* (generadores de reportes) altamente flexible, diseñado para satisfacer a distintas audiencias dentro del ciclo de vida del desarrollo de software (SDLC).

---

## 2. Tipos de Reportes en Playwright y sus Audiencias

A continuación, se detallan los formatos de reporte más utilizados en la industria, clasificados según su consumidor final.

### 2.1. El Terminal (List / Line / Dot Reporter)
**Audiencia principal:** El QA Engineer y el Desarrollador local.

Este es el reporte por defecto que se emite en la interfaz de línea de comandos (CLI) del IDE (como Visual Studio Code). Está diseñado para el consumo en tiempo real durante la fase de creación y mantenimiento de los *scripts* de prueba.

* **Evidencia que entrega:**
  * Indicadores visuales de estado (Checkmarks verdes para éxito, cruces rojas para fallos).
  * Tiempos de ejecución exactos en milisegundos de cada paso.
  * Impresión inmediata del *Stack Trace* (la traza de la pila) apuntando a la línea exacta del código TypeScript donde falló la aserción (`expect`).
* **Implementación técnica:**
  ```bash
  # Ejecución mostrando una lista detallada paso a paso
  npx playwright test --reporter=list