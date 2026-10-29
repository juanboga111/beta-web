# Verificación — 29/10/2026

Todo lo que figura como comprobado se corrió en Chromium 153 (headless, Playwright) contra el sitio servido en local **con la CSP de producción** de `netlify.toml`. Lo que no se corrió está en "Pendiente".

## Comprobado

| Prueba | Resultado |
| --- | --- |
| `npm test` (enlace de WhatsApp y resumen de consulta) | 6/6 OK |
| Errores de consola y violaciones de CSP a 1440, 768 y 390 px | Ninguno |
| Desplazamiento horizontal a 1440, 768 y 390 px | Ninguno |
| Secuencia de carga: llega separada y se arma sola a los 1,9 s | OK |
| Despiece al entrar el cursor, se arma al salir, botón "Ver por capas" fija | OK |
| Inclinación con resorte (solo puntero fino) | OK |
| Demo: cambia composición, paleta y textos por rubro | OK |
| Servicios: una vista previa activa por vez, textos correctos | OK |
| Proyectos: filtro por tipo | OK |
| Proceso: capas por etapa, "Online" en la etapa 4, "Siguiente" vuelve a la 1 | OK |
| Comparación genérica / estratégica | OK |
| Consulta: "Siguiente" deshabilitado sin respuesta, avance automático, paso 4 se puede saltar, resumen, "Cambiar" conserva respuestas | OK |
| Enlace de WhatsApp con el resumen codificado y "Copiar resumen" | OK |
| Header sólido con scroll, sección activa y barra de progreso | OK |
| Celular (390 px, táctil): menú abre, cierra con Escape y al tocar un enlace | OK |
| Sin JavaScript: todo el contenido legible y consulta reemplazada por enlace a WhatsApp | OK |
| Movimiento reducido: sin secuencia, sin animaciones, sin inclinación | OK |
| Contraste: se subieron dos colores del diseño que no llegaban a AA (ver abajo) | OK |

### Cambios respecto del diseño, por accesibilidad

| Token | Diseño | Implementado | Motivo |
| --- | --- | --- | --- |
| Texto inactivo (servicios, etapas) | #94A3B8 | #7C8BA1 | 2,56:1 sobre blanco; ahora 3,46:1 (texto grande) |
| Bajada sobre azul | #DBE6FF | #F1F5FF | 4,13:1; ahora 4,74:1 |
| Acento del concepto Kiosko Verde | #16A34A | #15803D | Botón "Comprar" a 3,3:1 |
| Número de etapa inactiva | #94A3B8 | #64748B | Texto chico: necesita 4,5:1 |
| Escena del hero en ≤ 640 px | 52 % | 44 % | Al 52 % se cortaba a los costados |

## Inspector de Taste (`design-taste-frontend/scripts/inspect.mjs`)

Resultado: 13 FAIL y 7 WARN antes de los ajustes. Según `CLAUDE.md`, la marca y el diseño aprobado mandan sobre las reglas de estilo; accesibilidad y rendimiento no se negocian. Así quedó cada punto:

| Hallazgo | Decisión |
| --- | --- |
| Contraste del botón "Comprar" | **Corregido** |
| Texto oculto con movimiento reducido (era el menú de celular, cerrado en escritorio) | **Corregido**: el menú no existe en escritorio |
| Titulares de más de dos líneas | Los de las maquetas son contenido de ejemplo. "Contanos tu proyecto en cuatro toques." y "Tu próximo proyecto merece una mejor web." respetan el ancho del diseño aprobado |
| "Eyebrows" sobre titulares | Falso positivo: son nombres de marca dentro de las maquetas de concepto |
| Numeración 01–04 | Es una secuencia real (proceso por etapas), aprobada en el diseño |
| Degradés y sombras | Aprobados: luz de la escena y planos que flotan en 3D |
| Bordes punteados | Son la capa "Estructura" (wireframe) del despiece |
| Pocas imágenes, sin video | Pendiente: no hay fotos ni capturas reales todavía. No se usaron imágenes de stock |
| Texto menor a 13 px | Etiquetas dentro de maquetas decorativas (ocultas a lectores de pantalla) |
| Tres familias (Georgia) y crema | Georgia y el crema son parte de los conceptos de rubro, para mostrar variedad |
| Texto cubierto a 768 px | La maqueta del proceso pasa por debajo del header fijo al hacer scroll |

## Pendiente

- Probar en Safari y Firefox reales (solo se probó Chromium).
- Probar en un teléfono real (táctil, rendimiento del 3D).
- Lighthouse / PageSpeed y securityheaders.com sobre la URL publicada.
- `/impeccable audit` y revisión completa de `web-design-guidelines` en una sesión de Claude Code.
- Lector de pantalla real (VoiceOver o NVDA).
