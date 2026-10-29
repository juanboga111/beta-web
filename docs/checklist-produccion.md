# Checklist antes de dar una web por terminada

Marcá cada punto solo si lo comprobaste. Un chequeo que no se corrió se anota como pendiente, no como hecho.

## Diseño y experiencia
- [ ] Idea propia del cliente escrita (no del rubro) y aplicada en todas las secciones
- [ ] Capturas revisadas a 390, 768 y 1440 px, sin scroll horizontal
- [ ] Inspector de Taste sin FAIL (`node .claude/skills/design-taste-frontend/scripts/inspect.mjs <url>`)
- [ ] `/impeccable audit` sin hallazgos sin explicar
- [ ] Revisión de `web-design-guidelines` sin errores
- [ ] Estados completos: hover, foco visible, cargando, error, vacío
- [ ] `prefers-reduced-motion` respetado
- [ ] Contraste AA en todos los estados

## Contenido
- [ ] Sin datos de ejemplo ni prueba social inventada
- [ ] Imágenes propias o con licencia y crédito
- [ ] Datos legales y de contacto confirmados por el cliente

## Técnico
- [ ] Formularios probados en producción (llega la notificación)
- [ ] HTTPS activo y redirección de www
- [ ] Headers de seguridad (securityheaders.com nota A o superior)
- [ ] Sin secretos en el repo; variables de entorno configuradas
- [ ] Rendimiento revisado (Lighthouse / PageSpeed en celular)

## SEO y presencia
- [ ] Title, description, canonical, Open Graph con imagen que carga
- [ ] sitemap.xml y robots.txt correctos
- [ ] Search Console verificado y sitemap enviado
- [ ] Google Business Profile si hay presencia local

## Legal (Argentina)
- [ ] Política de privacidad y aviso al recolectar datos (Ley 25.326) con leyenda AAIP
- [ ] Consentimiento en formularios
- [ ] Data Fiscal (ARCA) si el sitio ofrece bienes o servicios
- [ ] Puntos marcados REQUIERE ABOGADO derivados

## Cuentas
- [ ] Dominio, hosting, GitHub, Google y correo a nombre de la empresa
- [ ] 2FA activo en todas
- [ ] Rollback probado o documentado
