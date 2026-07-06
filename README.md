# CertiMentor

Plataforma web de mentorías académicas y profesionales que conecta estudiantes con mentores certificados. Los estudiantes pueden buscar mentores, agendar sesiones y realizar pagos, mientras que los mentores gestionan sus ofertas, horarios y sesiones. La plataforma incluye notificaciones automáticas por correo y Telegram, un panel de administración y un sistema de reseñas.

## Arquitectura

El proyecto está construido con una arquitectura de **microservicios**, compuesta por un frontend en React y 6 microservicios independientes en Spring Boot, cada uno con su propia base de datos MySQL.

```
CertiMentor/
├── MentoriasG4/            # Frontend (React + Vite + TypeScript)
└── microservicios/
    ├── user-service/           # Autenticación, usuarios y solicitudes (Puerto 8081)
    ├── mentorship-service/     # Ofertas de mentoría (Puerto 8082)
    ├── scheduling-service/     # Sesiones y recordatorios (Puerto 8083)
    ├── feedback-service/       # Reseñas y calificaciones (Puerto 8084)
    ├── notification-service/   # Correos y notificaciones Telegram (Puerto 8085)
    └── payment-service/        # Integración con Mercado Pago (Puerto 8086)
```

## Stack Tecnológico

**Frontend:**
- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router

**Backend:**
- Java 21
- Spring Boot 4
- Spring Security + JWT
- Spring Data JPA / Hibernate
- MySQL 9

**Servicios externos:**
- Mercado Pago (pasarela de pagos, Checkout Pro)
- Mailjet (envío de correos vía API HTTP)
- Telegram Bot API (notificaciones y recordatorios)

**Despliegue:**
- Backend + BD: Railway
- Frontend: Vercel

## Características principales

- Registro e inicio de sesión con JWT y roles (Estudiante, Mentor, Administrador)
- Solicitud y aprobación de rol Mentor con validación de certificaciones
- Búsqueda de mentorías con filtros por habilidades
- Agendamiento de sesiones con gestión de disponibilidad
- Pagos con Mercado Pago (Checkout Pro)
- Sistema de reseñas y calificaciones
- Notificaciones automáticas por correo (bienvenida, agendamiento, cancelación)
- Recordatorios vía Telegram
- Panel de administración para gestión de usuarios y solicitudes

## Setup local

### Requisitos previos

- **Java 21** ([descargar](https://adoptium.net/))
- **Maven 3.9+**
- **Node.js 20+** y **npm**
- **MySQL 8+** corriendo localmente en el puerto 3306
- **Git**

### 1. Clonar el repositorio

```bash
git clone https://github.com/German-MoralesR/CertiMentor.git
cd CertiMentor
```

### 2. Configurar la base de datos

Cada microservicio necesita su propia base de datos. Conéctate a MySQL y ejecuta:

```sql
CREATE DATABASE db_user_service;
CREATE DATABASE db_mentorship_service;
CREATE DATABASE db_scheduling_service;
CREATE DATABASE db_feedback_service;
CREATE DATABASE db_notification_service;
CREATE DATABASE db_payment_service;
```

Los microservicios usan `root` sin contraseña por defecto. Si tu MySQL local usa otra configuración, edita el `application.properties` de cada microservicio.

### 3. Configurar variables de entorno

Crea un archivo `.env` en `MentoriasG4/` (la carpeta del frontend):

```env
VITE_USER_SERVICE_URL=http://localhost:8081
VITE_MENTORSHIP_SERVICE_URL=http://localhost:8082
VITE_SCHEDULING_SERVICE_URL=http://localhost:8083
VITE_FEEDBACK_SERVICE_URL=http://localhost:8084
VITE_NOTIFICATION_SERVICE_URL=http://localhost:8085
VITE_PAYMENT_SERVICE_URL=http://localhost:8086
```

Para el **payment-service**, configura tu token de prueba de Mercado Pago en su `application.properties`:

```properties
mercadopago.access.token=TU_ACCESS_TOKEN_DE_PRUEBA
```

Para el **notification-service**, si quieres probar envío de correos, configura Mailjet:

```properties
mailjet.api.key=TU_API_KEY
mailjet.secret.key=TU_SECRET_KEY
```

### 4. Levantar los microservicios

En terminales separadas, para cada microservicio:

```bash
cd microservicios/user-service
./mvnw spring-boot:run
```

Repite el proceso para los otros 5 microservicios. Puedes verificar que estén activos accediendo a:
- http://localhost:8081/api/users (user-service)
- http://localhost:8082/api/mentorship-offers (mentorship-service)
- etc.

### 5. Levantar el frontend

```bash
cd MentoriasG4
npm install --legacy-peer-deps
npm run dev
```

El frontend queda disponible en http://localhost:5173

## Despliegue en producción

El proyecto está desplegado usando:

- **Railway** para los 6 microservicios y la instancia de MySQL compartida
- **Vercel** para el frontend

### Variables de entorno en Railway

Cada microservicio necesita configurarse con:

```
SPRING_DATASOURCE_URL=jdbc:mysql://mysql.railway.internal:3306/db_<nombre>
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=<password_de_mysql>
SPRING_JPA_HIBERNATE_DDL_AUTO=update
```

Y variables específicas según el microservicio:

- **user-service:** `APP_FRONTEND_URL`, `NOTIFICATION_SERVICE_URL`
- **scheduling-service:** `NOTIFICATION_SERVICE_URL`, `USER_SERVICE_BASE_URL`
- **feedback-service:** `USER_SERVICE_BASE_URL`
- **notification-service:** `MAILJET_API_KEY`, `MAILJET_SECRET_KEY`, `TELEGRAM_BOT_TOKEN`
- **payment-service:** `MERCADOPAGO_ACCESS_TOKEN`, `APP_FRONTEND_URL`

### Variables de entorno en Vercel

```
VITE_USER_SERVICE_URL=https://user-service-production-xxxx.up.railway.app
VITE_MENTORSHIP_SERVICE_URL=https://mentorship-service-production-xxxx.up.railway.app
VITE_SCHEDULING_SERVICE_URL=https://scheduling-service-production-xxxx.up.railway.app
VITE_FEEDBACK_SERVICE_URL=https://feedback-service-production-xxxx.up.railway.app
VITE_NOTIFICATION_SERVICE_URL=https://notification-service-production-xxxx.up.railway.app
VITE_PAYMENT_SERVICE_URL=https://payment-service-production-xxxx.up.railway.app
```

### Configuración adicional en Vercel

El `Install Command` debe estar configurado como:

```
npm install --legacy-peer-deps
```

Y el archivo `vercel.json` en la raíz del frontend maneja el routing SPA:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## Testing de pagos

El payment-service usa el sandbox de Mercado Pago. Para probar el flujo completo:

1. Crear usuarios de prueba desde el [panel de developers de Mercado Pago](https://www.mercadopago.cl/developers/panel/test-users).
2. Configurar el Access Token de la aplicación creada dentro de la cuenta del vendedor de prueba.
3. Para pagar, iniciar sesión (en ventana incógnita) con las credenciales del usuario comprador de prueba.
4. Usar tarjetas de prueba de Mercado Pago:
   - **Mastercard:** `5416 7526 0258 2580` (CVV 123, cualquier fecha futura)
   - **Nombre del titular:** `APRO` (pago aprobado)

## Autores

- **Emilio Morales** — [@German-MoralesR](https://github.com/German-MoralesR)
- **Brayan Gallardo** — [@BrayanGallardo19](https://github.com/BrayanGallardo19)
- **Nicolás Parra** — [@ni-parrav](https://github.com/ni-parrav)

## Licencia

Proyecto académico desarrollado como parte del curso de la carrera. Uso educativo únicamente.
