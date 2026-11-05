# beta — Handoff de la dirección B (Laboratorio)

Oct 29, 2026 · @juan cruz

## 1. Dirección aprobada y alcance

La dirección aprobada es **B — Laboratorio**: una ventana clara que flota sobre un fondo oscuro con piezas del isotipo, y dentro una escena 3D donde una página web se separa en cuatro capas (estructura, diseño, contenido e interacción). La web vende el servicio mostrando cómo se construye una web.

**Fuente de verdad.** El artboard *Dirección B · Laboratorio (recomendada, completa)* de la página "Web de beta" del lienzo de diseño (archivo `futuro/BetaLab.dc.html`, versión publicada 1793287699-a75d, del 29/10/2026). Todo lo que este documento llama **comprobado** está escrito así en ese archivo. Lo que dice **a decidir** no existe en el diseño y lo resuelve la implementación.

**Alcance.**

- Entrega visual: solo escritorio (artboard de 1440 px). El diseño ya trae reglas de adaptación por ancho de contenedor, documentadas en la sección 5, pero no hay una propuesta visual móvil aprobada.
- No se rediseña nada ni se agregan funciones. Las direcciones A y C y los modelos anteriores quedan como referencia descartada.
- Ninguna interacción se probó en un navegador real: el diseño se escribió en el lienzo sin capturas ni pruebas. Todas quedan **pendientes de implementación y prueba**.
- Contenido ficticio: los rubros de la demo y los proyectos (Obra Sur, Fermento, Estudio Norte, Nodo, Kiosko Verde) son **conceptos inventados** y deben seguir rotulados así hasta su reemplazo.

**Orden de la página:** header fijo · hero con escena · demo de rubros · servicios · proyectos · proceso · ¿por qué beta? · consulta · cierre con isotipo 3D · footer.

## 2. Especificación de secciones

Cada sección está en el orden en que se recorre la página. Los valores entre comillas o con unidades salen del archivo del diseño; las ids de ancla (`#demo`, etc.) también.

### 2.1 Header (`header`)

- **Estructura:** barra en forma de píldora (radio 999 px), alto 64 px, ancho máximo 1360 px, centrada, con 12 px de aire arriba. Fija arriba al hacer scroll (`position: sticky`).
- **Contenido, de izquierda a derecha:** isotipo + palabra "beta" (enlace a `#inicio`) · cinco enlaces (Demo, Servicios, Proyectos, Proceso, Consulta) · botón azul "Pedir una propuesta" (a `#consulta`) · botón de menú (solo en anchos angostos).
- **Estados:** sin scroll, fondo transparente y texto #F8FAFC sobre el fondo oscuro del hero. Con más de 24 px de scroll, fondo #F8FAFC, texto #0F172A y sombra.
- **Indicadores:** el enlace de la sección visible lleva debajo una marca azul con la forma del isotipo (14 × 6 px). Una línea azul de 2 px en el borde inferior de la barra crece de izquierda a derecha según el progreso de scroll de la página.
- **Menú angosto:** panel claro (radio 20 px) debajo de la barra, con los cinco enlaces a 24 px y el botón de propuesta. Se cierra al tocar un enlace.

### 2.2 Hero y escena (`#inicio`)

- **Fondo:** #0B1020. Detrás de la ventana, dos piezas grandes con la forma del isotipo, con degradé de brillo: una azul (#3B82F6 → #1D4ED8 → #1E3A8A, 520 px de ancho, sale por la izquierda arriba) y una pizarra (#334155 → #0F172A, 640 px, sale por la derecha más abajo). Ambas tienen una franja de reflejo blanca semitransparente.
- **Ventana:** caja #EEF1F6, radio 20 px, ancho máximo 1360 px, padding entre 20 y 40 px.
- **Fila superior** (dos columnas, 1,35 : 1, alineadas abajo): a la izquierda el H1 "Sacamos tu marca de beta." (Inter 600, entre 44 y 100 px, interlineado 0,94, tracking −0,05 em, #0F172A). A la derecha, el texto de apoyo (17–20 px, #334155, máx. 44 caracteres por línea): "Diseñamos y desarrollamos webs a medida para empresas, comercios y marcas que quieren crecer: rápidas, claras y hechas para que te contacten." Debajo, dos botones grandes: "Pedir una propuesta" (azul, a `#consulta`) y "Ver proyectos" (contorno, a `#proyectos`).
- **Escena:** panel #070B16, radio 14 px, alto entre 440 y 620 px. Contiene una grilla técnica azul de 44 px que solo se ve en un círculo de luz de 380 px alrededor del cursor, un resplandor azul radial bajo la web, y la web en 3D descripta en 2.3.
- **Pie de la ventana:** marcas "+" en los extremos, el texto "Así está hecha una web: pasá el cursor por la escena." y el botón oscuro "Ver por capas" / "Armar de nuevo".

### 2.3 La web en cuatro capas (escena del hero)

Una página web de 600 × 380 px vista en perspectiva isométrica (rotación X 55°, Z −36°, perspectiva 1700 px). Son cuatro planos apilados, de abajo hacia arriba:

| Capa | Qué muestra | Etiqueta |
| --- | --- | --- |
| 0 · Estructura | Contorno azul y cajas punteadas: barra, bloque de texto, imagen, botón y tres bloques inferiores | Estructura |
| 1 · Diseño | Fondo #F8FAFC con sombra, barra blanca, bloque de imagen azul, tres bloques grises | Diseño |
| 2 · Contenido | "Tu marca", enlaces (Servicios, Trabajos, Contacto), titular "Lo que hacés, dicho claro.", dos líneas de texto, dos paralelogramos dentro de la imagen | Contenido |
| 3 · Interacción | Botón "Escribinos" con halo azul, cursor, aviso "Nueva consulta" con punto verde | Interacción |

Armada, se ve una web terminada. Separada, cada capa flota 80 px sobre la anterior, las capas 2 y 3 se vuelven láminas translúcidas y aparece su etiqueta al costado (texto #C7D7FE con una marca azul del isotipo).

### 2.4 Demo de rubros (`#demo`)

- **Encabezado:** H2 "Una idea. Infinitas posibilidades." a la izquierda; a la derecha: "Elegí un rubro y mirá cómo cambia la misma estructura. Son conceptos de demostración, no clientes reales."
- **Selector:** seis botones tipo píldora: Empresa y servicios, E-commerce, Marca personal, Startup tecnológica, Gastronomía y comercios, Industria y construcción. El activo es oscuro.
- **Navegador simulado** (columna ancha): barra gris con la dirección "concepto.beta/…" y el rótulo azul "Concepto de demostración". Debajo, una web de proporción 16:9,4 que cambia según el rubro.
- **Panel lateral** (320 px, blanco, radio 14 px): Composición, Paleta (cuatro muestras), Tono y Acción principal del rubro activo, más el botón "Quiero algo así" (a `#consulta`).

| Rubro | Marca ficticia | Composición | Paleta (fondo / texto / acento) | Tono |
| --- | --- | --- | --- | --- |
| Empresa y servicios | Estudio Norte | Dividida: texto e imagen | #FFFFFF / #0F172A / #2563EB | Sobrio y confiable |
| E-commerce | Kiosko Verde | Catálogo en grilla | #FFF7ED / #1C1917 / #EA580C | Cercano y directo |
| Marca personal | Sofía R. | Centrada, la imagen manda | #18181B / #FAFAFA / #F43F5E | Personal y cálido |
| Startup tecnológica | Nodo | Producto al centro | #0B1020 / #E2E8F0 / #22D3EE | Preciso y técnico |
| Gastronomía y comercios | Fermento | Carta en grilla | #FBF3E6 / #3B2416 / #B45309 | Artesanal y amable |
| Industria y construcción | Obra Sur | Imagen primero, texto al lado | #E7E5E4 / #1C1917 / #F59E0B | Firme y técnico |

Titulares, botones y productos de cada rubro están en el archivo del diseño (arreglo `cats`); los precios de ejemplo figuran como \[PRECIO\] y el período de prueba de Nodo como \[PERÍODO\].

### 2.5 Servicios (`#servicios`)

- **Fondo:** blanco. H2 "Lo que hacemos" y bajada "Elegí un servicio para ver qué resuelve y qué te deja."
- **Dos columnas (1 : 1,05):** a la izquierda una lista de seis botones de texto grande (22–30 px, 600). Los inactivos van en gris #94A3B8; el activo en #0F172A, con la marca azul del isotipo a su izquierda.
- **Panel derecho:** oscuro (#0F172A, radio 20 px), fijo a 96 px del borde superior mientras se lee la lista. Arriba, una vista previa 16:10 sobre #070B16. Abajo, dos columnas: "Qué resuelve" y "Qué te deja" (etiquetas #93B4FF, texto #E2E8F0, 17 px).

| Servicio | Vista previa | Qué resuelve | Qué te deja |
| --- | --- | --- | --- |
| Diseño y desarrollo a medida | Web con un plano azul del isotipo | Una web que no representa lo que hacés ni cómo lo hacés. | Un sitio único, pensado desde tu negocio y fácil de mantener. |
| Sitios responsive y optimizados | Navegador más teléfono superpuesto | Visitas que se van porque la página tarda o se ve mal en el celular. | Carga rápida y lectura cómoda en cualquier pantalla. |
| Tiendas online | Grilla de 6 productos y carrito | Vender solo por mensajes, con stock y precios a mano. | Catálogo, carrito y cobro con proveedores de pago especializados. |
| Landing pages | Página angosta con un botón azul resaltado | Campañas que llevan gente a una página que no convierte. | Una página, una acción clara y medible. |
| Rediseño y modernización | Antes gris / después con marca | Una web vieja que ya no te representa. | Conservamos lo que funciona y renovamos lo demás. |
| Consultoría y estrategia digital | Tres planos que suben: Hoy, Próximo, Después | No saber por dónde empezar ni qué herramientas hacen falta. | Un plan claro de qué hacer primero y qué no. |

La consultoría está **sujeta a confirmación** (sección 7).

### 2.6 Proyectos (`#proyectos`)

- **Fondo:** #0F172A, texto claro. H2 "Proyectos" y bajada: "Conceptos visuales de beta que muestran cómo pensamos cada rubro. Los trabajos reales se suman acá cuando estén publicados."
- **Filtros:** Todos, Sitios, Tiendas, Landings (píldoras; la activa es clara).
- **Grilla de 12 columnas,** 40 px entre filas y 24 px entre columnas. Con "Todos", los anchos alternan: 7 + 5, 5 + 7 y una fila completa. Con un filtro, cada tarjeta ocupa 6 columnas.
- **Tarjeta:** una maqueta 16:10 (21:8 en la de ancho completo) sobre #1E293B con un navegador y un teléfono superpuestos, ambos con la paleta del concepto. Debajo, el nombre (24 px), el rótulo "Concepto · Sitio / Tienda / Landing" (#93B4FF) y una línea de descripción. Toda la tarjeta es un enlace a `#consulta`.

| Concepto (ficticio) | Tipo | Ancho en "Todos" | Descripción |
| --- | --- | --- | --- |
| Obra Sur | Sitio | 7 col. | Constructora: obras como protagonistas y cotización en dos pasos. |
| Fermento | Tienda | 5 col. | Panadería: carta con precios y pedidos por WhatsApp. |
| Estudio Norte | Sitio | 5 col. | Estudio contable: servicios claros y turnos online. |
| Nodo | Landing | 7 col. | App de facturación: una página, una acción, registro directo. |
| Kiosko Verde | Tienda | 12 col. | Vivero online: catálogo filtrable y checkout simple. |

### 2.7 Proceso (`#proceso`)

- **Fondo:** #F8FAFC. H2 "Cómo trabajamos" y bajada "Cuatro etapas. En cada una, la idea suma una capa hasta estar online."
- **Columna izquierda:** cuatro botones de etapa (número + título). La activa se pone en #0F172A con el número azul y despliega su texto. Debajo, los botones "Siguiente etapa" ("Volver al inicio" en la última) y "Empezar por la etapa 01" (a `#consulta`).
- **Columna derecha:** panel oscuro (#070B16, radio 20 px, alto entre 380 y 520 px) con la misma web de cuatro capas del hero, al 78 % y sin seguir al cursor. Abajo a la derecha: "Etapa N de 4". En la etapa 4 aparece arriba a la izquierda la píldora "Online · tumarca.com.ar" con punto verde.

| Etapa | Título | Texto | Capas visibles |
| --- | --- | --- | --- |
| 01 | Descubrimiento y estrategia | Entendemos el negocio, el público y la acción que la web tiene que lograr. Definimos estructura y contenidos. | Estructura |
| 02 | Diseño y prototipado | Diseñamos la propuesta completa en celular y computadora, y la revisás antes de programar. | + Diseño |
| 03 | Desarrollo e implementación | Construimos el sitio con código rápido y seguro, cargamos el contenido y conectamos formularios y WhatsApp. | + Contenido |
| 04 | Lanzamiento y evolución | Publicamos con tu dominio y HTTPS, y definimos juntos cómo sigue después. | + Interacción y "Online" |

### 2.8 ¿Por qué beta? (`#porque`)

- **Fondo:** blanco. H2 "¿Por qué beta?" y bajada "La diferencia entre una web que existe y una web que trabaja para tu negocio."
- **Columna izquierda:** dos píldoras, "Plantilla genérica" y "Diseñada con estrategia" (inicial: la segunda). Debajo, una maqueta 16:11 con dos estados:
  - **Genérica:** gris, centrada, con "Bienvenidos a nuestro sitio web", "Somos una empresa líder comprometida con la excelencia." y tres cajas iguales.
  - **Estratégica:** el concepto Fermento, con "Pan de masa madre, cada mañana.", el botón "Pedir por WhatsApp", "Abierto hoy hasta \[HORA\] · \[DIRECCIÓN\]" y una foto marcada como pendiente. Lleva tres notas azules: "Qué hacés, en una línea", "Una acción clara" y "Lo que el cliente busca primero".
- **Pie de la maqueta:** "Ejemplo conceptual para comparar enfoques."
- **Columna derecha:** seis beneficios en dos columnas (título 19 px + una línea) y el botón "Hablemos de tu web".
  - Diseño a medida: Partimos de tu negocio, no de una plantilla.
  - Responsive de verdad: Cada pantalla se diseña también para el celular.
  - Proceso claro: Sabés en qué etapa está tu web y qué viene después.
  - Comunicación directa: Hablás con quienes diseñan y programan tu sitio. **(sujeto a confirmación)**
  - Foco en tus objetivos: Cada sección existe para que te contacten o te compren.
  - Implementación cuidada: Código rápido, seguro y fácil de mantener.

### 2.9 Consulta en cuatro pasos (`#consulta`)

- **Fondo:** campo azul #2563EB, texto blanco. A la izquierda, el H2 "Contanos tu proyecto en cuatro toques." y la bajada "Sin formularios largos. Al final ves el resumen y lo mandás por WhatsApp, cuando quieras." (#DBE6FF).
- **Tarjeta derecha:** #F8FAFC, radio 20 px, alto mínimo 520 px. Arriba, cuatro segmentos de progreso con la forma del isotipo (se ponen azules al completarse) y el texto "Paso N de 4" o "Resumen".
- **Cada paso:** la pregunta (24–32 px, 600) y las opciones en una grilla de 2 columnas. Cada opción es un botón blanco de 64 px de alto con borde #E2E8F0; la elegida lleva borde azul de 2 px, fondo #EFF4FF y la marca del isotipo a la derecha. Abajo van "Atrás" (desactivado en el paso 1) y "Siguiente" (desactivado hasta elegir; "Saltar" en el paso opcional).

| Paso | Pregunta | Opciones | Obligatorio |
| --- | --- | --- | --- |
| 1 | ¿Qué necesitás? | Sitio institucional · Tienda online · Landing page · Todavía no sé | Sí |
| 2 | ¿Partís de cero o ya tenés web? | Empiezo de cero · Quiero renovar mi web | Sí |
| 3 | ¿Qué tiene que lograr? | Más consultas · Vender online · Mejorar mi imagen · Ordenar mi presencia digital | Sí |
| 4 | ¿Tenés un presupuesto pensado? | Prefiero hablarlo · \[RANGO 1\] · \[RANGO 2\] · \[RANGO 3\] | No |

### 2.10 Resumen y apertura de WhatsApp

- **Pantalla final de la tarjeta:** el título "Tu consulta, lista." y cuatro filas (Proyecto, Punto de partida, Objetivo, Presupuesto), cada una con la respuesta o "Sin indicar" y un botón "Cambiar" que vuelve a ese paso.
- **Texto de honestidad:** "Todavía no se envió nada: el resumen se abre en WhatsApp para que lo mandes vos."
- **Botones:** "Continuar por WhatsApp" (azul, abre en pestaña nueva) y "Copiar resumen", que cambia a "Copiado" durante 1,6 s.
- **Mensaje generado:** `Hola beta, quiero hacer una consulta. Proyecto: … . Punto de partida: … . Objetivo: … . Presupuesto: … .` En el diseño se abre `https://wa.me/?text=<mensaje codificado>` **sin número**. Falta el número de beta para armar `https://wa.me/<número>?text=…`.

### 2.11 Cierre (`#contacto`)

- **Fondo:** #0B1020, texto claro. Dos columnas (1,3 : 1).
- **Izquierda:** H2 "Tu próximo proyecto merece una mejor web." (44–96 px) y dos botones grandes: "Pedir una propuesta" (azul) y "Escribinos por WhatsApp" (claro). Los dos apuntan hoy a `#consulta`.
- **Derecha:** el isotipo en 3D sobre un resplandor azul. Son cuatro copias del isotipo apiladas en profundidad (−24, −16, −8 y 0 px), de oscuras a claras, que dan sensación de volumen. El frente es #F8FAFC + #2563EB, con una franja de reflejo blanca.

### 2.12 Footer

Está dentro del cierre, sobre el mismo fondo y con texto #A9B6D3 de 15 px, en cuatro grupos separados:

- Isotipo + "beta" y "Ideas que funcionan en el mundo real."
- Enlaces: Demo, Servicios, Proyectos, Proceso.
- Contacto: \[EMAIL\], \[WHATSAPP\], beta.ar.
- "© 2026 beta".

No lleva redes sociales.

## 3. Interacciones y animaciones

Cinco interacciones son esenciales para la identidad de beta; el resto acompaña. Todas están escritas en el diseño pero **ninguna se probó en un navegador**: cada una queda pendiente de implementación y prueba. Las curvas y duraciones son las del archivo del diseño.

### 3.1 Despiece de la web en cuatro capas — esencial

- **Estado inicial:** al cargar, las capas aparecen **ya separadas** (80 px entre capas, etiquetas visibles). No hay una entrada animada previa.
- **Secuencia de carga:** a los 1,9 s se arman solas (3 px entre capas), salvo que el cursor esté sobre la escena o el despiece esté fijado.
- **Disparadores:** entrar con el cursor a la escena las separa; salir las arma, salvo que esté fijado. El botón "Ver por capas" fija el despiece y "Armar de nuevo" lo libera.
- **Movimiento:** cada capa se desplaza en profundidad (`translateZ(índice × separación)`) en **950 ms con `cubic-bezier(.77, 0, .175, 1)`**. Las capas 2 y 3 toman un fondo translúcido y un borde en 400 ms. Cada etiqueta entra con opacidad y 10 px de desplazamiento en 300 ms, con un retraso de índice × 80 ms + 350 ms.
- **Al repetir:** es una transición CSS, así que si el cursor entra y sale rápido la animación se invierte desde donde esté.
- **Durante el scroll:** no cambia.
- **Alternativas:** en pantallas táctiles no hay hover, solo el botón. Con movimiento reducido los cambios son instantáneos y no hay inclinación. Sin JavaScript queda separada (el estado inicial) y el botón no hace nada.

### 3.2 Inclinación de la escena — esencial

- **Estado inicial:** una oscilación lenta en reposo, de ±4° en Y y ±3° en X.
- **Disparador:** mover el cursor sobre la escena. La inclinación objetivo es de ±9° en Y según la posición horizontal y de ±6° en X según la vertical (rango total 18° y 12°).
- **Movimiento:** un resorte calculado en cada cuadro: `v = (v + (objetivo − actual) × 0,06) × 0,8`. Se aplica como `rotateX/rotateY` sobre un contenedor propio, separado de la rotación isométrica.
- **Al salir:** vuelve a la oscilación de reposo con el mismo resorte.
- **Alternativas:** se ignora el tacto. Con movimiento reducido no corre. En el diseño el ciclo de cuadros corre siempre, incluso fuera de pantalla; en producción tiene que pausarse (sección 9).
- **Luz de la grilla:** el cursor también mueve el centro de un círculo de 380 px que deja ver la grilla técnica. En reposo está en 50 % / 55 %.

### 3.3 Header, navegación y progreso — esencial

- **Cambio de barra:** con más de 24 px de scroll pasa de transparente a clara. Transición de 300 ms en fondo, color y sombra. Se revierte al volver arriba.
- **Progreso:** la línea inferior escala de 0 a 1 según `scrollY / (alto del documento − alto de ventana)`, sin transición.
- **Sección activa:** un IntersectionObserver con margen −45 % arriba / −50 % abajo marca demo, servicios, proyectos, proceso o consulta. La marca azul entra en 200 ms. Las secciones "¿Por qué beta?" y cierre no se marcan.
- **Menú angosto:** se revela con `clip-path` de arriba hacia abajo en 280 ms, `cubic-bezier(.23, 1, .32, 1)`, más opacidad en 200 ms. Se cierra al tocar un enlace. **Falta:** cerrar con Escape o tocando afuera, y llevar el foco al panel.

### 3.4 Selector de rubros — esencial

- **Disparador:** tocar otro rubro. Tocar el activo no hace nada.
- **Secuencia:** el contenido de la maqueta se desenfoca (6 px), baja a opacidad 0,25 y escala a 0,985 en 220 ms. A los 170 ms cambia el rubro: textos, composición y paleta, con transiciones de color de 350 ms. Después vuelve a enfocarse en 220 ms.
- **Panel lateral:** cambia al mismo tiempo, con los colores en 350 ms.
- **Alternativas:** con movimiento reducido el cambio es inmediato. Hay `aria-live` en la maqueta.

### 3.5 Consulta en cuatro pasos — esencial

- **Disparador:** elegir una opción la guarda y **avanza sola a los 260 ms**. Los botones Atrás, Siguiente o Saltar y "Cambiar" (desde el resumen) mueven entre pasos.
- **Entrada de cada paso:** opacidad, 14 px horizontales y desenfoque de 4 px en 280 ms, `cubic-bezier(.23, 1, .32, 1)`.
- **Progreso:** los segmentos se ponen azules en 300 ms.
- **Copiar resumen:** el texto cambia a "Copiado" durante 1,6 s. Si el portapapeles falla, no hay mensaje (pendiente).
- **Alternativas:** con movimiento reducido el avance es inmediato. Sin JavaScript no funciona: la producción necesita un respaldo, por ejemplo un enlace directo a WhatsApp.

### 3.6 Secundarias

| Interacción | Disparador | Movimiento | Con movimiento reducido |
| --- | --- | --- | --- |
| Isotipo del header | Carga de la página | Pieza negra desde −40 px en X y pieza azul desde (40, 40), 800 ms, `cubic-bezier(.23, 1, .32, 1)`, la azul 160 ms después | Sin animación |
| Titular del hero | Carga | Cada palabra sube desde 105 % dentro de una máscara, 900 ms, retrasos de 120 a 400 ms cada 70 ms. La bajada aparece a los 500 ms y los botones a los 620 ms (700 ms) | Sin animación, visible |
| Piezas de fondo | Scroll | Azul: `translateY(scroll × 0,18)`. Pizarra: `translateY(scroll × −0,1)` | Quietas |
| Vista previa de servicios | Elegir un servicio | Fundido de 260 ms, más 12 px y escala 0,98 → 1 en 300 ms | Inmediato |
| Tarjetas de proyectos | Hover (solo puntero fino) | Navegador sube 10 px y teléfono 22 px, 400 ms | Sin cambio |
| Filtros de proyectos | Elegir filtro | La grilla se rearma sin animación | — |
| Capas del proceso | Elegir una etapa | Las capas ocultas esperan 160 px más arriba con opacidad 0 y bajan a su lugar en 700 ms (`.77, 0, .175, 1`). La etiqueta de la capa nueva aparece a los 300 ms y "Online" a los 600 ms | Inmediato |
| Texto de etapa | Elegir una etapa | Se despliega (`max-height`, 300 ms) | Inmediato |
| Comparación | Elegir enfoque | Fundido con desenfoque de 6 px y escala 0,985, 300 ms | Inmediato |
| Isotipo 3D del cierre | Cursor sobre la sección | Resorte (0,05 / 0,8) hacia ±25° en Y y ±15° en X. En reposo oscila alrededor de (−18°, 14°) | Quieto |
| Botones | Presionar | Escala 0,97, 160 ms. El primario suma un halo azul en hover | Sin escala |

**Qué preservar sí o sí:** el despiece y su inclinación, la grilla iluminada por el cursor, el selector de rubros con desenfoque y la consulta con avance automático. Las piezas de fondo, la entrada del titular y el isotipo 3D del cierre suman carácter, pero pueden simplificarse si comprometen rendimiento.

## 4. Sistema de diseño

Los valores marcados como comprobados están escritos en el archivo del diseño. El diseño no tiene un archivo de tokens propio: hay que extraerlos a variables al implementar.

### 4.1 Color

| Rol | Valor | Dónde se usa | Estado |
| --- | --- | --- | --- |
| Fondo profundo | #0B1020 | Hero, cierre, footer | Comprobado |
| Escena | #070B16 | Paneles 3D del hero, del proceso y vistas previas | Comprobado |
| Tinta / superficie oscura | #0F172A | Texto principal, sección Proyectos, panel de servicios, botón oscuro | Comprobado |
| Superficie oscura 2 | #1E293B | Maquetas de proyectos, chips sobre oscuro | Comprobado |
| Ventana | #EEF1F6 | Caja clara del hero | Comprobado |
| Claro | #F8FAFC | Demo, proceso, tarjeta de consulta, header con scroll | Comprobado |
| Blanco | #FFFFFF | Servicios, ¿Por qué beta? | Comprobado |
| Acento | #2563EB | Acción principal, marcas, campo de consulta, progreso | Comprobado |
| Acento oscuro | #1D4ED8 | Rótulo "Concepto de demostración", enlace "Cambiar" | Comprobado |
| Gris de soporte | #E5E7EB · #E2E8F0 | Chips, bloques, bordes de opciones | Comprobado |
| Texto secundario | #475569 · #334155 · #64748B | Bajadas, texto de apoyo, etiquetas chicas | Comprobado |
| Texto inactivo | #94A3B8 | Servicios y etapas no elegidos | Comprobado; verificar contraste (4.4) |
| Texto sobre oscuro | #A9B6D3 · #C7D7FE · #93B4FF | Bajadas, etiquetas de capas, rótulos | Comprobado |
| Texto sobre azul | #DBE6FF | Bajada de consulta | Comprobado |
| Opción elegida | #EFF4FF | Fondo de opción de consulta | Comprobado |
| Online | #16A34A · #22C55E | Punto de estado | Comprobado |
| Degradés de fondo | #3B82F6 → #1D4ED8 → #1E3A8A; #334155 → #0F172A | Solo piezas del isotipo detrás de la ventana | Comprobado |
| Paletas de rubros y proyectos | Ver 2.4 y archivo | Solo dentro de maquetas | Comprobado |

### 4.2 Tipografía

- **Familias:** Inter (Google Fonts, ejes `opsz` 14–32 y `wght` 400–700) para todo el sitio. Sora 700 **solo** para la palabra "beta" del logotipo: es una **aproximación** hasta tener el logotipo en vector, y el vector oficial la reemplaza.
- **Pesos usados:** 400, 500 y 600. El 700 solo aparece dentro de las maquetas.

| Rol | Tamaño | Peso / interlineado / tracking |
| --- | --- | --- |
| H1 hero | clamp(44 px, 6,6vw, 100 px) | 600 / 0,94 / −0,05 em |
| H2 de sección | clamp(36 px, 4,6vw, 68 px) | 600 / 1 / −0,045 em |
| H2 de cierre | clamp(44 px, 6,4vw, 96 px) | 600 / 1 / −0,045 em |
| Pregunta de consulta | clamp(24 px, 2,3vw, 32 px) | 600 / 1,1 / −0,03 em |
| Lista de servicios | clamp(22 px, 2,2vw, 30 px) | 600 / — / −0,03 em |
| Título de etapa | clamp(20 px, 1,9vw, 26 px) | 600 / — / −0,025 em |
| Título de proyecto | 24 px | 600 / — / −0,02 em |
| Bajada | clamp(17 px, 1,35vw, 19 px) | 400 / 1,55 |
| Texto | 16–18 px | 400 / 1,5–1,55 |
| Navegación y botones | 15 px (17 px en botones grandes) | 500 / 600 |
| Etiquetas | 14–15 px | 600 |

**A decidir:** cargar la fuente desde el propio sitio o desde Google Fonts, y la fuente de respaldo con métricas compatibles.

### 4.3 Espaciado, grilla y superficies

- **Contenedor:** ancho máximo 1360 px; margen lateral clamp(16 px, 3vw, 40 px).
- **Secciones:** padding vertical clamp(96 px, 11vw, 168 px).
- **Columnas:** las secciones de dos columnas usan entre 32 y 80 px de separación (`clamp(32px, 5vw, 80px)`). Proyectos usa una grilla de 12 columnas.
- **Separaciones usadas:** 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64 y 72 px. **A decidir:** normalizarlas a una escala de base 4 u 8.
- **Radios:** 20 px en la ventana del hero, el panel de servicios, la tarjeta de consulta, el escenario del proceso y el menú. 14 px en el escenario del hero, el navegador de la demo, las tarjetas de proyecto y las opciones de consulta. 10–12 px en vistas previas. Píldora (999 px) en el header, los botones y los chips.
- **Sombras:** solo en lo que flota: el header con scroll, el menú, el navegador de la demo y la capa de diseño del despiece.
- **Imágenes:** no hay fotos reales. Todas las maquetas están dibujadas con CSS, y las fotos pendientes figuran rotuladas ("Foto real del producto", "Foto del equipo").

### 4.4 Isotipo

- **Geometría (recreada a partir de la imagen de marca):** `viewBox="0 0 270 170"`. Pieza oscura `95,0 195,0 100,130 0,130`, pieza azul `180,40 270,40 175,170 80,170`.
- **Marca derivada:** paralelogramo con `clip-path: polygon(36% 0, 100% 0, 64% 100%, 0 100%)`. Se usa en el indicador de navegación, los ítems activos, los segmentos de progreso y las etiquetas de capas.
- **Sobre oscuro:** pieza oscura en #F8FAFC o currentColor y pieza azul #2563EB.
- **Pendiente:** reemplazar la geometría recreada por el vector oficial.

### 4.5 Botones, enlaces y formularios

| Componente | Medidas | Variantes | Estados |
| --- | --- | --- | --- |
| Botón píldora | Alto 48 px (56 px grande), padding 22 / 28 px | Azul, oscuro, claro, contorno | Hover: halo azul en el primario y aclarado en los demás · Active: escala 0,97 · Focus: contorno #2563EB de 3 px a 3 px · Disabled: opacidad 0,4 |
| Chip de filtro | Alto 44 px | Claro / sobre oscuro | Activo invertido · Hover solo con puntero fino |
| Opción de consulta | Alto mínimo 64 px, radio 14 px | — | Elegida: borde azul de 2 px y fondo #EFF4FF |
| Enlace de navegación | Padding 12 × 14 px | — | Hover: fondo gris 18 % · Activo: marca del isotipo |

Todos los controles son `button` o `a` reales, con `aria-pressed` en los que se pueden alternar.

### 4.6 Movimiento

| Uso | Curva | Duración |
| --- | --- | --- |
| Entradas y respuestas de interfaz | `cubic-bezier(.23, 1, .32, 1)` | 160–300 ms |
| Movimiento 3D en pantalla | `cubic-bezier(.77, 0, .175, 1)` | 700–950 ms |
| Cambios de color | `ease` | 180–400 ms |
| Entradas de carga | `cubic-bezier(.23, 1, .32, 1)` | 700–900 ms |
| Resortes (inclinaciones) | Cálculo propio por cuadro | Sin duración fija |

Con `prefers-reduced-motion: reduce` el diseño anula todas las animaciones y transiciones y no arranca los resortes ni el parallax.

## 5. Arquitectura sugerida

La página es estática con islas interactivas: no necesita backend, base de datos ni librería 3D. El framework se elige después de inspeccionar el repositorio en Claude Code; esta propuesta sirve para cualquiera basado en componentes.

&#91;embedded content: arquitectura sugerida · datos, secciones y piezas compartidas\]

Hero y Proceso comparten el mismo motor de capas (en azul). La consulta es la única que sale del sitio: abre WhatsApp con el resumen.

### 5.1 Capas

- **Tokens:** un archivo de variables CSS con los valores de la sección 4 (color, tipografía, radios, curvas, duraciones). Ningún componente escribe colores ni tamaños sueltos.
- **Contenido como datos:** un archivo por colección, separado de los componentes, para cambiar textos sin tocar la interfaz:
  - `site` con contacto, número de WhatsApp y correo.
  - `rubros` (6), `servicios` (6), `proyectos` (5, cada uno con `conceptual: true`), `etapas` (4) y `preguntas` (4).
- **Componentes de interfaz compartidos:** Botón (4 variantes y 2 tamaños), Grupo de opciones con `aria-pressed`, Isotipo (variantes clara, oscura y marca chica) y Marca de isotipo.
- **Motor de capas:** un solo componente `LayerScene` que reciben el hero y el proceso. Recibe el modo (`interactivo` o `por etapa`), la separación, la etapa y si la inclinación está activa.
- **Funciones puras con pruebas:** `buildConsultSummary(respuestas)` y `buildWhatsAppUrl(número, texto)`.

### 5.2 Componentes por sección

| Sección | Componentes | Estado propio |
| --- | --- | --- |
| Header | `SiteHeader`, `NavLinks`, `ScrollProgress`, `MobileMenu`, `useActiveSection` | Con scroll, menú abierto, sección activa |
| Hero | `HeroWindow`, `BackgroundPieces`, `LayerScene` (interactivo), `GridSpotlight`, `useSpringTilt` | Separado, fijado, inclinación |
| Demo | `CategoryPicker`, `SiteMock` (variantes split, rev, grid, center), `DemoSidePanel` | Rubro, cambio en curso |
| Servicios | `ServiceList`, `ServicePreview` (6 dibujos SVG/CSS) | Servicio activo |
| Proyectos | `FilterBar`, `ProjectCard`, `DeviceMock` | Filtro |
| Proceso | `StepList`, `LayerScene` (por etapa) | Etapa |
| ¿Por qué beta? | `CompareToggle`, `CompareMock`, `BenefitList` | Enfoque |
| Consulta | `ConsultWizard`, `ConsultStep`, `ConsultSummary`, `CopyButton` | Paso, respuestas, copiado |
| Cierre y footer | `FinalCTA`, `Isotipo3D`, `SiteFooter` | Inclinación |

### 5.3 3D, CSS y librerías

- **CSS 3D y SVG alcanzan para todo lo aprobado.** El despiece, la escena del proceso y el isotipo del cierre son planos con `transform-style: preserve-3d`. Las formas son SVG o `clip-path`.
- **Resortes:** el diseño usa un cálculo de unas diez líneas por cuadro. Una librería de animación solo se justifica si el proyecto ya la usa o si se suman gestos de arrastre.
- **WebGL o Three.js:** no hace falta para la dirección aprobada. Se evaluaría solo si se decide pasar las piezas de fondo a objetos 3D con material brillante, como en la referencia de Lusion. Eso no está aprobado.
- **Rendimiento:** los ciclos de cuadros se pausan fuera de pantalla y con la pestaña oculta. Solo se anima `transform`, `opacity`, `filter` y `clip-path`.

### 5.4 WhatsApp

- El enlace se arma como `https://wa.me/<número en formato internacional sin + ni espacios>?text=<resumen codificado>` y abre en pestaña nueva con `rel="noopener noreferrer"`.
- El número no es un secreto: vive en la configuración del sitio, no en una variable privada.
- No hay envío propio. La página nunca dice que algo se envió.
- Todos los botones "Escribinos por WhatsApp" del sitio usan la misma función. Hoy en el diseño apuntan a `#consulta`.

### 5.5 Imágenes y recursos

- Capturas reales de proyectos en AVIF o WebP, con proporción fija (16:10 escritorio, 9:18 teléfono) y carga diferida debajo del primer pantallazo.
- El isotipo y los íconos en SVG en línea.
- Las fuentes solo con los pesos usados y `font-display: swap`.

### 5.6 Requisitos responsive para producción

El diseño trae estas reglas por ancho del contenedor de la página, sin una propuesta visual móvil aprobada. Hay que implementarlas y revisarlas a 390, 768 y 1440 px.

| Ancho | Qué cambia |
| --- | --- |
| ≤ 1080 px | La escena del hero se reduce al 80 %. Demo en una columna, con el panel lateral en fila |
| ≤ 960 px | Los enlaces y el botón del header se reemplazan por el menú. Todas las secciones de dos columnas pasan a una. El panel de servicios deja de quedar fijo. Proyectos a ancho completo |
| ≤ 640 px | Escena del hero al 52 % y del proceso al 50 %. Opciones de consulta, beneficios y texto de servicios en una columna. Se ocultan los enlaces dentro de las maquetas |

- **Táctil:** el despiece se activa solo con el botón. La inclinación y los efectos de hover se desactivan.
- **A decidir:** el alto de la escena en teléfono y si las etiquetas de las capas siguen siendo legibles al 52 %.

## 6. Inventario de assets

Casi todo lo visual se dibuja con código. Lo único que hace falta conseguir es la marca en vector y, más adelante, material real de proyectos.

| Asset | Formato | Dónde se usa | Estado |
| --- | --- | --- | --- |
| Isotipo oficial | SVG | Header, cierre, footer, favicon, marcas derivadas | **Falta**: hoy es una recreación |
| Logotipo "beta" oficial | SVG (o nombre y licencia de la fuente) | Header y footer | **Falta**: hoy es Sora 700 como aproximación |
| Inter | Google Fonts o archivos locales, pesos 400–600 | Todo el sitio | Disponible |
| Piezas del isotipo de fondo | SVG con degradé | Hero | Dibujadas en código |
| Maquetas (escena, rubros, servicios, proyectos, comparación) | HTML/CSS/SVG | Varias secciones | Dibujadas en código |
| Capturas de proyectos reales | AVIF/WebP, escritorio 16:10 y teléfono 9:18 | Proyectos | **Falta**: hasta entonces, conceptos rotulados |
| Foto de producto para la comparación | AVIF/WebP | ¿Por qué beta? | Marcada como pendiente en el diseño |
| Favicon, ícono para iOS y manifiesto | ICO/PNG/SVG | Navegador | **Falta**: sale del isotipo oficial |
| Imagen para compartir (OG) 1200 × 630 | PNG/JPG | Vista previa en WhatsApp y redes | **Falta** |

## 7. Datos pendientes de confirmación

Ninguno de estos datos se inventó: en el diseño figuran como marcadores entre corchetes o como texto a confirmar.

- [x] Número de WhatsApp de beta: 343 428-6906 (`5493434286906`, recibe la consulta) y 343 466-1332. Cargados en `site/assets/js/config.js`.
- [x] Correo electrónico comercial: betadesarrolloweb@gmail.com.
- [ ] Rangos reales de presupuesto para el paso 4 de la consulta (\[RANGO 1\], \[RANGO 2\], \[RANGO 3\]), o decidir quitar ese paso.
- [x] Perfiles sociales: Instagram (https://www.instagram.com/betadesarrollo/), en el footer como "Instagram" (usuario @betadesarrollo, antes @bydesarrollo).
- [ ] Confirmar que el cliente habla directamente con quienes diseñan y programan (beneficio "Comunicación directa").
- [ ] Confirmar que beta ofrece consultoría y estrategia digital (sexto servicio).
- [ ] Portfolio real y futuros casos de éxito, con autorización de cada cliente. En curso: Bogado Servicios Integrales (publicado) y Cimbra Constructora (en desarrollo) ya están en el portfolio; faltan sus capturas.
- [ ] Isotipo y logotipo oficiales en vector.
- [ ] Dominio definitivo. El diseño menciona beta.ar.

**Contenido ficticio que debe seguir rotulado:** Obra Sur, Fermento, Estudio Norte, Nodo y Kiosko Verde son conceptos inventados, igual que Sofía R. en la demo de rubros. Se muestran con los rótulos "Concepto", "Concepto de demostración" y "Ejemplo conceptual" hasta reemplazarlos. Los marcadores \[PRECIO\], \[PERÍODO\], \[HORA\] y \[DIRECCIÓN\] de las maquetas son parte del ejemplo y no se completan con datos inventados.

**No se incluyen** clientes, métricas, testimonios, plazos ni precios.

## 8. Plan de implementación por etapas

Cada etapa termina con la página publicable y se revisa contra el diseño antes de pasar a la siguiente.

1. **Inspección.** Revisar el repositorio, el stack y las skills disponibles en Claude Code. Elegir el framework y decidir si se reutiliza el sitio existente o se empieza en un proyecto nuevo.
2. **Base.** Tokens, fuentes, componentes compartidos (Botón, Grupo de opciones, Isotipo) y datos de contenido en archivos propios.
3. **Estructura estática.** Todas las secciones con su contenido y su maquetación de escritorio, sin animación. La página tiene que leerse completa sin JavaScript.
4. **Navegación.** Header con cambio al hacer scroll, sección activa, barra de progreso y menú angosto accesible: Escape, foco y cierre al tocar afuera.
5. **Despiece.** `LayerScene` con separación, etiquetas, secuencia de carga, inclinación con resorte y luz de la grilla. Después, el mismo motor en modo por etapa para Proceso.
6. **Interacciones de contenido.** Selector de rubros, vista previa de servicios, filtros y hover de proyectos, y comparación.
7. **Consulta.** Pasos, avance automático, resumen, copiar y enlace de WhatsApp, más un respaldo sin JavaScript. Necesita el número confirmado (sección 7).
8. **Detalles.** Piezas de fondo con parallax, entrada del titular y del isotipo del header, isotipo 3D del cierre.
9. **Responsive.** Reglas de la sección 5.6 y revisión a 390, 768 y 1440 px.
10. **Calidad y publicación.** Checklist de la sección 9, metadatos y SEO (title, description, OG, datos estructurados) y deploy.

La etapa 7 y la publicación dependen de los datos pendientes. Las demás pueden avanzar con los marcadores.

## 9. Checklist de pruebas

Capturas a 1440, 1280, 768 y 390 px en Chrome, Safari y Firefox de escritorio, comparadas con el artboard de la dirección B.

**Fidelidad visual**

- [ ] Colores, tipografía, radios y separaciones coinciden con la sección 4.
- [ ] El hero muestra la ventana clara sobre el fondo oscuro con las dos piezas del isotipo.
- [ ] La web en capas se ve terminada al estar armada y con sus cuatro etiquetas al separarse.
- [ ] No hay elementos superpuestos ni texto cortado en ningún ancho, incluidos los titulares grandes y las etiquetas de capas.
- [ ] No hay desplazamiento horizontal en ningún ancho.

**Funcionamiento**

- [ ] El despiece se separa al entrar el cursor, se arma al salir y queda fijado con el botón. El botón funciona con teclado y en pantallas táctiles.
- [ ] La secuencia de carga se arma sola a los 1,9 s.
- [ ] Los seis rubros cambian composición, paleta y textos. Tocar el activo no hace nada.
- [ ] Cada servicio muestra su vista previa y sus textos.
- [ ] Los filtros de proyectos muestran solo el tipo elegido. Cada tarjeta mantiene su rótulo de concepto.
- [ ] Las cuatro etapas del proceso muestran las capas correctas y "Online" solo en la etapa 4.
- [ ] La consulta avanza sola, "Atrás" y "Cambiar" conservan las respuestas, el paso 4 se puede saltar y el resumen muestra "Sin indicar" donde corresponde.
- [ ] "Continuar por WhatsApp" abre WhatsApp con el número de beta y el resumen completo. "Copiar resumen" copia el mismo texto o avisa si falla.
- [ ] Todos los enlaces de ancla llevan a su sección y el header no tapa los títulos (margen de scroll).

**Accesibilidad**

- [ ] Todo se puede usar con teclado, en orden lógico y con el foco visible (contorno azul de 3 px).
- [ ] Los botones alternables anuncian su estado (`aria-pressed`) y el menú anuncia si está abierto (`aria-expanded`).
- [ ] Contraste AA en todos los textos. Revisar especialmente #94A3B8 sobre blanco, #64748B en etiquetas chicas y #DBE6FF sobre azul.
- [ ] La escena tiene una descripción alternativa, y las maquetas decorativas están ocultas para lectores de pantalla.
- [ ] Con movimiento reducido no hay desplazamientos, resortes ni parallax, y todo el contenido queda visible.

**Rendimiento**

- [ ] Los ciclos de animación se pausan fuera de pantalla y con la pestaña oculta.
- [ ] Solo se animan transform, opacity, filter y clip-path, a 60 cuadros por segundo en una notebook común durante el despiece y el scroll.
- [ ] Core Web Vitals en verde: LCP en el titular del hero, sin saltos de diseño al cargar las fuentes.
- [ ] Imágenes de proyectos en formato moderno, con medidas fijas y carga diferida.
- [ ] El JavaScript interactivo carga sin bloquear la primera pintura.
