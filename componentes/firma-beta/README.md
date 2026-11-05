# Firma de beta (v1)

Sello de autoría para el footer de los sitios que diseña y desarrolla beta: «Diseñado y desarrollado por» seguido del isotipo y el logotipo de beta. Toda la firma es un único enlace al Instagram de beta, que se abre en una pestaña nueva.


## Archivos

| Archivo | Para qué |
| --- | --- |
| `firma-beta.html` | El fragmento a pegar en el footer. Ya trae el enlace a Instagram |
| `firma-beta.css` | Los estilos. Todo vive bajo `.firma-beta` |
| `demo.html` + `demo-cliente.css` | Página de prueba con cinco footers de clientes ficticios (claro, oscuro, de color, centrado, barra mínima) |
| `exploracion.html` + `exploracion.css` | Las tres alternativas que se compararon (A, B, C) |

## Cómo se incorpora a un proyecto

1. Copiar `firma-beta.css` a los estilos del proyecto (por ejemplo `assets/css/firma-beta.css`) y enlazarlo:
   ```html
   <link rel="stylesheet" href="/assets/css/firma-beta.css">
   ```
   También se puede pegar su contenido al final de la hoja principal.
2. Pegar el contenido de `firma-beta.html` donde va la firma, normalmente en la última fila del footer.
3. Si el footer no es neutro, elegir el tema (ver abajo).

No necesita JavaScript, fuentes ni imágenes externas, y funciona con CSP estrictas (`style-src 'self'`, sin estilos en línea). En React, Astro, Vue u otro framework se pega el mismo marcado como componente; en JSX, `class` pasa a `className` y `focusable` se mantiene como atributo.

**El destino ya está configurado:** `https://www.instagram.com/bydesarrollo/`. No hay que cargarlo en cada proyecto. Es el perfil sin los parámetros de rastreo del enlace compartido (`utm_source`, `rpxt`), que no cambian el destino. Cuando cambie el usuario de Instagram por el de la marca nueva, actualizar `href` en `firma-beta.html` (y en `site/assets/js/config.js`); `npm test` verifica que coincidan.

## Variantes

Se eligen con atributos en el `<a>`:

| Atributo | Valores | Uso |
| --- | --- | --- |
| *(ninguno)* | — | Hereda el color del texto del footer. La pieza azul queda en #2563EB. Para footers claros u oscuros neutros |
| `data-tema` | `claro` | Fuerza la tinta de beta (#0F172A) sobre fondos claros |
| | `oscuro` | Fuerza #F8FAFC sobre fondos oscuros |
| | `mono` | Todo en el color del footer, la pieza oscura al 50 % y la leyenda al 100 %. **Para fondos de color del cliente**, donde el azul no contrasta |
| `data-tamano` | `chico` · `grande` | Logotipo de 11 px o 16 px. Normal: 13 px. La leyenda nunca baja de 12 px |
| `data-alinear` | `inicio` · `centro` · `fin` | Ocupa su propia línea con esa alineación. Sin el atributo queda en línea con lo que la rodea |

Ajuste fino con variables CSS sobre `.firma-beta`: `--firma-beta-alto` (alto del logotipo), `--firma-beta-tinta` (color) y `--firma-beta-tenue` (opacidad de la leyenda, `.72`).

**Contraste:** la leyenda va al 72 % del color del footer. Eso alcanza AA cuando el texto del footer tiene al menos 8:1 de contraste con su fondo (los footers neutros habituales). Si es menor, usar `data-tema="mono"` o `--firma-beta-tenue: 1`.

## Decisiones de diseño

- **Identidad:** usa los recursos existentes de beta: el isotipo de dos piezas (viewBox 270 × 170), el logotipo «beta» en minúscula (vector de Inter Display, el mismo del header) y el azul #2563EB. No se agregó ningún elemento nuevo. Cuando exista el vector oficial, reemplazar los dos `<svg>` del fragmento.
- **Personalidad:** en hover, y solo con mouse, las dos piezas del isotipo se separan 1,5 px y la leyenda gana contraste, en 200 ms con *ease-out*. Es el mismo gesto del sitio de beta, donde la web se separa en capas. Con movimiento reducido no hay desplazamiento.
- **Aislamiento:** reinicia color, subrayado, mayúsculas, espaciado y fondo también en `:hover`, `:focus`, `:visited` y `:active`, así que no hereda reglas típicas como `footer a:hover { … }`. Una regla del cliente con id (`#footer a`) sí le ganaría: en ese caso, bajarle la especificidad o envolver la firma fuera de ese selector.
- **Accesibilidad:** el nombre accesible es «Diseñado y desarrollado por beta. Instagram de beta, se abre en una pestaña nueva.», que incluye el texto visible. Tiene foco visible (contorno de 2 px en el color de la firma) y un área táctil de 44 px de alto que no cambia el tamaño del footer. En modo de alto contraste de Windows, todo pasa al color del sistema.
- **Inglés:** para un sitio en inglés, cambiar la leyenda por «Designed & developed by» y el texto de `.firma-beta__sr` por «Designed and developed by beta. beta on Instagram, opens in a new tab.».

### Alternativas evaluadas (`exploracion.html`)

| Alternativa | Resultado |
| --- | --- |
| A — Tipográfica («Diseño y desarrollo» + logotipo) | La más sobria, pero sin el símbolo, «beta» puede leerse como «versión beta». Pierde reconocimiento |
| **B — Con isotipo** («Diseñado y desarrollado por» + isotipo + logotipo) | **Elegida.** Una sola línea, el mismo conjunto del header de beta, reconocible a 13 px y legible en claro, oscuro y color |
| C — Editorial (dos líneas, separador y bajada) | Más pesada para un footer, y la bajada («Estudio digital») no existe en la identidad de beta |

## Verificación

`npm test` comprueba el enlace, `target`, `rel`, que no haya estilos en línea ni scripts, y que las copias de la demo sean idénticas al fragmento. `npm run test:browser` incluye `tests/browser/firma.browser.mjs`. Sirve la demo con una CSP estricta y verifica:

- Sin errores ni desbordes, y sin superponerse con el resto del footer, a 1440, 1024, 768, 390 y 320 px.
- Proporciones del isotipo y del logotipo.
- El clic en la leyenda, el isotipo y el logotipo abre Instagram en una pestaña nueva y sin `opener`.
- Teclado y foco visible.
- El hover no toma los estilos del cliente.
- Movimiento reducido.
- Contraste AA de la leyenda y área táctil de 44 px en los cinco footers.
