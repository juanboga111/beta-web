# Ficha del proyecto — web de beta

Lo que no se sabe figura como **pendiente**; no se inventó nada.

- **Nombre del proyecto:** beta-web
- **Empresa / marca:** beta (estudio de diseño y desarrollo web)
- **Tipo:** sitio corporativo de una página (landing) con módulos interactivos
- **Descripción:** sitio propio de beta que vende webs a medida mostrando, con su propio funcionamiento, cómo se construye una web (dirección creativa B, "Laboratorio").
- **Objetivo principal:** generar consultas comerciales calificadas.
- **Acción principal del visitante:** completar la consulta en cuatro pasos y seguir la conversación por WhatsApp.
- **Público objetivo:** empresas, comercios, emprendedores y marcas que quieren crecer.
- **Países y mercados:** Argentina (contenido en español rioplatense).
- **Modelo de negocio:** B2B / B2C, venta de proyectos web (leads).
- **Funciones necesarias:** las de `docs/handoff-beta.md` (secciones 2 y 3). Sin login, sin pagos, sin panel.
- **Contenido disponible:** textos del diseño aprobado. Fotos y portfolio reales: **pendientes**.
- **Imágenes que existen de verdad:** ninguna todavía. Todas las maquetas están dibujadas con código.
- **Identidad visual:** isotipo de dos piezas (negro y azul), #2563EB, #0F172A, #E5E7EB, #F8FAFC, Inter.
- **Integraciones:** WhatsApp por enlace `wa.me` (sin API) al 343 428-6906 (`5493434286906`); el 343 466-1332 figura en el footer.
- **Contacto:** betadesarrolloweb@gmail.com · Instagram https://www.instagram.com/bydesarrollo/ (el usuario va a cambiar al de la marca nueva).
- **Presupuesto o restricciones técnicas:** ninguno informado. Se eligió una arquitectura sin costos fijos.
- **Dominio y hosting actuales:** el diseño menciona `beta.ar`; **pendiente de confirmar** que esté registrado. Hosting propuesto: Netlify.
- **Nivel esperado:** producción real.

Fuente de verdad del diseño: `docs/handoff-beta.md` y `docs/referencia/direccion-b-laboratorio.dc.html`.

---

## Decisiones de arquitectura

### Stack: HTML + CSS + JavaScript sin framework ni build

| Opción | A favor | En contra | Decisión |
| --- | --- | --- | --- |
| HTML/CSS/JS estático (módulos ES nativos) | Cero dependencias, se lee sin JavaScript, igual que el sitio de producción de Bogado, carga mínima | Las secciones se mantienen en un solo HTML | **Elegida** |
| Astro | Componentes y datos tipados, cero JS por defecto | Agrega build, Node y dependencias para una sola página | Si el sitio crece (blog, varias páginas, CMS) |
| Next.js | Ecosistema grande | Desproporcionado: no hay backend, login ni datos dinámicos | No |

La página tiene que funcionar sin JavaScript (requisito del handoff). Con HTML estático el contenido viene completo en el documento, y cada interacción se suma como módulo independiente (`site/assets/js/`).

### Recorrido de una visita

```
Visitante → beta.ar (dominio) → DNS → Netlify (CDN + HTTPS + headers)
         → archivos estáticos de /site
         → botón "Continuar por WhatsApp" → wa.me (fuera del sitio)
```

- **Backend / base de datos / storage:** no hay. La consulta se arma en el navegador y no se guarda en ningún lado.
- **Servicio externo:** WhatsApp, solo por enlace. Si no está disponible, el visitante igual ve el resumen y puede copiarlo.
- **Observabilidad:** logs de Netlify. La analítica (GA4) queda fuera de esta etapa; si se suma, necesita banner de consentimiento y actualizar la política de privacidad.

### Datos

| Dato | Quién lo genera | Dónde se almacena | Tiempo | Quién accede | ¿Sensible? |
| --- | --- | --- | --- | --- | --- |
| Respuestas de la consulta | Visitante | Solo en la memoria del navegador mientras está la página abierta | Hasta cerrar la pestaña | Nadie más; el visitante decide si lo manda por WhatsApp | No |
| IP y user agent | Navegador | Logs de Netlify | Según Netlify | Netlify | Dato personal técnico |

No hay cookies propias ni formularios que envíen datos al servidor.

### Seguridad (threat model resumido)

| Amenaza | Impacto | Probabilidad | Mitigación | Cómo probar |
| --- | --- | --- | --- | --- |
| XSS | Alto | Baja | Sin HTML dinámico desde datos externos (`textContent`), CSP `script-src 'self'` sin inline | Consola sin violaciones de CSP |
| Clickjacking | Medio | Baja | `frame-ancestors 'none'` + `X-Frame-Options: DENY` | securityheaders.com |
| Enlace a WhatsApp manipulado | Bajo | Baja | El número sale de `config.js` del propio sitio; el texto se codifica con `encodeURIComponent` | Pruebas de `buildWhatsAppUrl` |
| Secuestro de cuentas (GitHub, Netlify, dominio) | Alto | Media | 2FA en todas, a nombre de la empresa | Revisión manual |
| Dependencias vulnerables | — | — | No hay dependencias | — |

### Legal (Argentina) — sin asesoramiento legal, validar con abogado

| Punto | Estado |
| --- | --- |
| Aviso de privacidad al recolectar datos (Ley 25.326) | **DEPENDE DEL CASO**: hoy el sitio no recolecta ni guarda datos. Si se agrega formulario o analítica, pasa a **OBLIGATORIO** |
| Data Fiscal (ARCA) | **OBLIGATORIO** para sitios que ofrecen servicios: pendiente de generar en ARCA y agregar al footer. Confirmar con el contador |
| Botón de arrepentimiento | **No aplica**: no se contrata ni se paga en el sitio |
| Conceptos ficticios en "Proyectos" y "Demo" | **RECOMENDADO** mantener los rótulos "Concepto" para no inducir a error (publicidad) |
| Fuente Inter (OFL 1.1) | Licencia incluida en `licenses/` |

### Costos

| Servicio | Para qué | Gratis | Costo probable | ¿Imprescindible? |
| --- | --- | --- | --- | --- |
| Dominio .ar (NIC Argentina) | Dirección del sitio | No | Renovación anual: verificar arancel vigente en nic.ar | Sí |
| Netlify | Hosting, CDN, HTTPS | Plan gratuito | El plan gratuito alcanza para este tráfico; verificar límites en netlify.com/pricing | Sí |
| WhatsApp Business | Canal de consultas | Sí | — | Sí |

### Ambientes y versionado

- `main` = producción (Netlify publica cada push). Cambios en ramas con pull request; Netlify genera una vista previa por PR.
- Rollback: en Netlify → Deploys → publicar un deploy anterior.
- Pruebas: `npm test` (sin dependencias, usa `node --test`).
