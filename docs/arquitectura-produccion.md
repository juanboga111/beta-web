# Arquitectura de una web en producción

Mapa de referencia: del usuario a los datos. Cada proyecto completa su propia versión en `docs/arquitectura.md`.

```
Usuario (celular / computadora / navegador)
  → Dominio (.ar / .com / .com.ar — registrador, renovación; NIC Argentina administra .ar)
  → DNS (A / AAAA / CNAME / MX / TXT — dirige el tráfico, verifica servicios y correo)
  → CDN / WAF / seguridad (velocidad, protección web, DDoS, rate limiting, HTTPS + TLS)
  → Frontend (Next.js / React u otro framework apropiado — responsive, UI/UX, assets)
  → Backend / API (lógica de negocio, validaciones, autenticación, autorización, webhooks, rate limits)
  → Base de datos (PostgreSQL / Supabase / Cloud SQL según arquitectura — backups; archivos grandes fuera de la base)
  → Servicios externos (pagos, WhatsApp, email, CRM, APIs de Google, IA, ARCA)
```

El dominio es la dirección; el hosting es donde se ejecutan y se alojan los componentes.

## Capas transversales

| Capa | Qué cubre |
|---|---|
| Google / medición / presencia | GA4 (medición), Tag Manager (etiquetas), Search Console (indexación), Business Profile (Maps), Ads, reCAPTCHA, Looker Studio. Solo las que el proyecto necesita. |
| Código y deployment | GitHub → CI/CD → Development → Staging → Tests → Production, con rollback. Nunca subir secretos al repositorio. |
| Observabilidad y recuperación | Logs, errores, uptime, métricas, alertas, backups automáticos, restauración, disaster recovery. |
| Legal / governance | Privacidad, cookies, términos, defensa del consumidor, protección de datos, propiedad intelectual, transparencia de IA. Depende de jurisdicción, usuarios, actividad y modelo de negocio. |
| Titularidad | La empresa debe ser titular y controlar: dominio, hosting/cloud, base de datos, Google, GitHub, pagos y correo corporativo. 2FA y métodos de recuperación en todas. |

## Reglas que no cambian

- No exponer secretos ni API keys en el frontend.
- Cada integración necesita credenciales seguras, límites, validación de webhooks y manejo de fallos.
- Archivos grandes en storage, separados de la base de datos.

## Proceso completo

Idea → requisitos → diseño → arquitectura → código → tests → deploy → dominio/HTTPS → SEO/analytics → monitoreo → backups.

Buena arquitectura + seguridad + datos + legal = una web que genera valor.
