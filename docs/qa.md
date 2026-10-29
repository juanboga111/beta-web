# Verificación — 29/10/2026 (tercera pasada: portfolio real y presupuesto)

## Última ejecución registrada

| Suite | Resultado |
| --- | --- |
| `npm test` (unitarias + HTML sincronizado con config.js) | **16/16 OK** |
| `npm run test:browser` (Chromium headless, headers de producción) | **22/22 OK** |

La segunda pasada había registrado 14 unitarias y 18 de navegador. Se agregaron 2 unitarias (rangos de presupuesto) y 4 de navegador (portfolio real a 1440, 768 y 390 px, y paso de presupuesto).

### Cambios de esta pasada

| Cambio | Verificación |
| --- | --- |
| **Bogado Servicios Integrales** pasa al portfolio como trabajo real publicado: rótulo "Trabajo real · Sitio institucional · Publicado" y botón "Ver sitio" a https://bogadoservicios.com.ar (`target="_blank"`, `rel="noopener noreferrer"`, aviso de pestaña nueva para lectores de pantalla) | Prueba de navegador: rótulo, `href`, `target`, `rel`, foco visible con Tab |
| **Cimbra Constructora** pasa al portfolio como trabajo real **en desarrollo**: rótulo "Trabajo real · Sitio · En desarrollo", sin enlace y sin decir que está publicado | Prueba de navegador: sin enlaces, sin "Sitio publicado" ni "Ver sitio" |
| Las dos tarjetas reales reemplazan en el portfolio a los conceptos de su mismo rubro (Obra Sur → Cimbra, Estudio Norte → Bogado). Obra Sur y Estudio Norte siguen en la demo de rubros, rotulados como conceptos. Fermento, Nodo y Kiosko Verde siguen como conceptos. Se conserva la grilla 7+5 / 5+7 / 12 y los filtros (Sitios 2, Tiendas 2, Landings 1) | Prueba de filtros y rótulos |
| Sin captura de los sitios reales, la maqueta no inventa su diseño: Bogado muestra el dominio y "Sitio publicado"; Cimbra, la capa "Estructura" del despiece y "En desarrollo" | Capturas a 1440, 768 y 390 px; sin cortes ni superposiciones (prueba de navegador) |
| Paso de presupuesto: los botones «[RANGO 1]», «[RANGO 2]» y «[RANGO 3]» se mostraban al visitante. Ahora salen de `BUDGET_RANGES` en `site/assets/js/data.js` (vacío): el paso ofrece "Prefiero hablarlo" o "Saltar" | Unitaria y de navegador; resumen y WhatsApp sin cambios |
| Regresión corregida: los títulos de las maquetas de proyectos (pasados de `h4` a `p` en la pasada anterior) heredaban el gris de `.pc p` | Captura del portfolio |
| Correo `betadesarrolloweb@gmail.com` verificado en `config.js`, footer (`mailto:`) y datos estructurados | Unitaria de sincronización y de JSON-LD |

### No se pudo verificar

- **bogadoservicios.com.ar no se pudo abrir desde este entorno**: la política de red de la sesión bloquea el dominio (403 en el proxy; WebFetch tampoco resuelve). No se inspeccionó el sitio publicado ni se generó captura. Por eso la descripción de la tarjeta solo dice lo confirmado por beta (sitio institucional de servicios empresariales, desarrollado y publicado por beta).
- **Cimbra**: no hay URL de previsualización ni material visual en el repositorio.

---

# Segunda pasada — 29/10/2026

Todo lo que figura como comprobado se corrió en esta sesión en **Chromium 1243 headless (Playwright)**, contra el sitio servido con los headers de producción de `netlify.toml` (`npm run serve`, incluida la CSP). Lo que no se pudo correr está en "Pendiente". Los resultados de la primera pasada (6 unitarias y 23 de interacción) se tomaron como antecedente y se volvieron a probar.

## Cómo repetirlo

```
npm test               # unitarias + HTML sincronizado con config.js (sin dependencias)
npm run test:browser   # 18 pruebas en Chromium (necesita Playwright; SHOTS=carpeta guarda capturas)
npm run serve          # http://localhost:4321 con los headers de producción
```

## Comprobado

| Prueba | Resultado |
| --- | --- |
| `npm test`: WhatsApp (formato `wa.me/NÚMERO?text=…`, número inválido → sin enlace), resumen, preguntas, sincronización de contacto y datos estructurados | 14/14 OK |
| `npm run test:browser` | 18/18 OK |
| Sin errores de consola ni violaciones de CSP a 1440, 1280, 768 y 390 px | OK |
| Sin desplazamiento horizontal a 1440, 1280, 768 y 390 px | OK |
| Despiece: llega separado, se arma solo a los 1,9 s, cursor separa y salir arma, entradas/salidas rápidas, botón fija con teclado (Enter/Espacio) | OK |
| Las cuatro capas y sus etiquetas quedan **dentro del escenario** al separarse (medido con `getBoundingClientRect`) a 1440, 1280 y 768; a 390 se ve la leyenda plana | OK |
| Inclinación con resorte en contenedor propio (separada de la rotación isométrica) y luz de la grilla siguiendo el cursor | OK |
| Header: cambio con scroll, barra de progreso y sección activa | OK |
| Demo: los seis rubros cambian marca, composición (una sola clase de layout), paleta y panel; un solo chip activo | OK |
| Servicios: los seis muestran una sola vista previa y sus textos | OK |
| Proyectos: filtros Todos/Sitios/Tiendas/Landings (5/2/2/1), rótulo "Concepto · …" en las cinco tarjetas | OK |
| Proceso: capas visibles por etapa, "Online" solo en la 4, "Etapa N de 4", "Volver al inicio" | OK |
| Comparación genérica / estratégica, con `aria-hidden` en el estado oculto | OK |
| Consulta: Siguiente desactivado sin respuesta, avance automático, Atrás conserva, Saltar en el paso 4, resumen dinámico, Cambiar vuelve al paso, "Copiado" durante 1,6 s y el portapapeles contiene el texto exacto | OK |
| Consulta: si el portapapeles falla se avisa en `role="status"` y se muestra el texto para copiar a mano | OK |
| WhatsApp con el número de beta: el enlace es `https://wa.me/5493434286906?text=<resumen codificado>` con `rel="noopener noreferrer"` | OK |
| WhatsApp sin número (config de prueba vacía): no se genera ningún enlace; "Copiar resumen" pasa a ser el botón principal | OK |
| WhatsApp con un número de prueba controlado (`5491100000000`, solo en la prueba): arma el enlace correcto | OK |
| Teléfono (390 px, táctil): menú abre, foco al panel, cierra con Escape (foco vuelve al botón), tocando afuera y al tocar un enlace; texto "tocá «Ver por capas»" en lugar de "pasá el cursor" | OK |
| Sin JavaScript: contenido completo, escena separada (estado del handoff), consulta reemplazada por enlace directo a WhatsApp, sin enlaces sin destinatario | OK |
| Movimiento reducido: escena separada y fijada, etiquetas visibles, sin inclinación ni animaciones; "Armar de nuevo" funciona | OK |
| Enlaces internos (todas las anclas existen), 404 con estado 404, robots, sitemap, manifest, íconos y OG responden 200 | OK |
| Medición local (sin red real, sin throttling): LCP 264 ms, CLS 0, 17 pedidos, 204 KB transferidos | Indicativo, no son Core Web Vitals |

## Defectos corregidos en esta pasada

| Defecto comprobado | Corrección |
| --- | --- |
| Al separarse, la capa Interacción y su etiqueta quedaban fuera del escenario a 1440, 1280 y 768 px (medido: −58 px, −87 px, −75 px) | La escena baja 64 px (escalados) mientras está separada, con la misma curva y duración del despiece; escenario de 600–620 px en escritorio y 500–620 px en ≤ 1080 px (dentro del rango 440–620 del diseño) |
| Etiquetas tapadas por las capas superiores (ej.: "Estructura" debajo de la pieza oscura de Contenido) | Las etiquetas pasan junto a la esquina derecha de cada capa, que las capas de arriba no cubren |
| Texto de la capa Contenido invisible al separarse (tinta #0F172A sobre la escena oscura) | Al separarse, marca y titular toman #3B82F6, legible sobre claro y oscuro; vuelve a tinta al armarse (400 ms) |
| A 390 px las etiquetas en 3D medían ~9 px y se cortaban | Se ocultan y aparece una leyenda plana de 14 px arriba a la izquierda mientras la escena está separada |
| Sin JavaScript y con movimiento reducido la escena quedaba armada y sin etiquetas | El HTML trae la escena separada; con movimiento reducido queda fijada |
| WhatsApp sin número armaba `https://wa.me/?text=…` (sin destinatario) y lo presentaba como funcional | `buildWhatsAppUrl` devuelve `null` sin número válido; ningún botón ni enlace se genera sin destinatario |
| Contraste del texto inactivo de servicios y etapas: 3,5:1 | #64748B: 4,76:1 sobre blanco y 4,55:1 sobre #F8FAFC |
| Titulares de las maquetas de proyectos debajo del bloque de imagen a 390 px | `max-width: min(13ch, 46%)` |
| Comparación a 390 px: notas encima del texto y rótulo de la foto cortado | Maqueta 4:5 en una columna y notas reubicadas |
| Textos de 12 px en la demo (rótulo de foto, ítems) | 13 px |
| Correo largo podía salirse del footer en 390 px | `overflow-wrap: anywhere` |
| Encabezado `h4` dentro de maquetas decorativas saltaba niveles | Pasa a `<p>` (siguen ocultas a lectores de pantalla) |
| Datos de contacto en dos lugares (config.js y HTML) | `config.js` es el único lugar; `npm run contact` los copia al HTML y `npm test` falla si quedaron desincronizados |

### Cambios respecto del diseño, por accesibilidad (acumulado)

| Token | Diseño | Implementado | Motivo |
| --- | --- | --- | --- |
| Texto inactivo (servicios, etapas) | #94A3B8 | #64748B | 2,56:1 sobre blanco; ahora 4,76:1 |
| Bajada sobre azul | #DBE6FF | #F1F5FF | 4,13:1; ahora 4,74:1 |
| Acento del concepto Kiosko Verde | #16A34A | #15803D | Botón "Comprar" a 3,3:1 |
| Número de etapa inactiva | #94A3B8 | #64748B | Texto chico: necesita 4,5:1 |
| Escena del hero en ≤ 640 px | 52 % | 42 % | Al 52 % se cortaba a los costados |
| Contenido de la escena separada | #0F172A | #3B82F6 | La tinta no se ve sobre la escena oscura |

## Auditorías con las skills

**Inspector de Taste** (`design-taste-frontend/scripts/inspect.mjs`, 1440/1280/768/390; capturas en `.taste-skill/before` y `.taste-skill/after`, ignoradas por git). Antes: 14 FAIL y 7 WARN. Después: 13 FAIL y 7 WARN. Se corrigieron los dos hallazgos que eran defectos reales: **texto oculto con movimiento reducido** (etiquetas de capas) y **contraste** de servicios. El resto, según `CLAUDE.md` (la marca y el diseño aprobado mandan sobre las reglas de estilo):

| Hallazgo | Decisión |
| --- | --- |
| Titulares de más de dos líneas | Los de maquetas son contenido de ejemplo. "Contanos tu proyecto en cuatro toques." y "Tu próximo proyecto merece una mejor web." respetan el ancho del diseño aprobado |
| "Eyebrows" sobre titulares | Falso positivo: nombres de marca dentro de las maquetas de concepto |
| Numeración 01–04 | Secuencia real (proceso por etapas), aprobada |
| Degradés, sombras, halo del botón, cajas con contorno, bordes punteados | Aprobados: luz de la escena, planos que flotan en 3D y la capa "Estructura" (wireframe) |
| Pocas imágenes, sin video | Pendiente: no hay fotos ni capturas reales; no se usaron imágenes de stock |
| Texto menor a 13 px | Etiquetas dentro de maquetas decorativas ocultas a lectores de pantalla (`aria-hidden`) |
| Tres familias (Georgia), crema, 20 tamaños | Georgia, el crema y la variedad de tamaños son parte de los conceptos de rubro |
| Texto cubierto / vacío en el medio | El header fijo pasa por encima al hacer scroll y el estado oculto de la comparación; no es un defecto |

**Detector de Impeccable** (`impeccable detect`): los avisos de contraste son textos dentro de la escena decorativa (`role="img"`); "cramped padding" son falsos positivos (el padding está en el contenedor interno); Inter, la grilla técnica y el halo azul están en el diseño aprobado. Se corrigió el salto de encabezados. `impeccable context` informó que el proyecto no tiene `PRODUCT.md`/`DESIGN.md`; el handoff cumple ese rol, se puede generar con `/impeccable init` y `/impeccable document`.

**Web Interface Guidelines** (Vercel, reglas descargadas de GitHub, coinciden con `docs/web-interface-guidelines.md`): se agregó `touch-action: manipulation` y color de toque en enlaces y botones, y `translate="no"` en el logotipo. No aplican: formularios (no hay inputs), fechas y números (no hay), "Title Case" (excepción de `CLAUDE.md` para español). Queda sin hacer, por bajo impacto en una landing: reflejar filtros y rubro elegido en la URL.

## Pendiente

- **Safari y Firefox reales**: solo se probó Chromium. La escena usa `:has()` (Safari 15.4+, Firefox 121+).
- **Teléfono real**: táctil, rendimiento del 3D y legibilidad de la leyenda. Solo se emuló (390 px, táctil, Chromium).
- **60 FPS**: no comprobado. En Chromium headless sin GPU el despiece dio ~24 ms por cuadro; ese entorno no es representativo. Medir en una notebook común con DevTools → Performance.
- **Lighthouse / PageSpeed, Core Web Vitals reales y securityheaders.com** sobre la URL publicada.
- **Lector de pantalla real** (VoiceOver o NVDA).
- Confirmar en un teléfono que `wa.me/5493434286906` abre el chat correcto de beta (el enlace se armó con el formato de celular argentino 54 + 9 + característica + número).
- Capturas reales del portfolio (ver `docs/proyecto.md`, "Portfolio"): Bogado (escritorio 16:10 y teléfono 9:18, del sitio publicado) y Cimbra (cuando el cliente autorice mostrarlo).
- Rangos de presupuesto: definirlos y cargarlos en `BUDGET_RANGES`.
