# Sistema de Gastos

Sistema fullstack de gestión de gastos con autenticación JWT.

---

## 🎉 **System is Running!**

**→ [START HERE - Open the App!](START_HERE.md)** ←

The application is currently running:
- 🌐 **Frontend**: http://localhost:4200
- 🔧 **Backend**: http://localhost:3000/api
- 🗄️ **Database**: PostgreSQL (sistema_gastos)

See **[CURRENT_STATUS.md](CURRENT_STATUS.md)** for details.

---

## 📚 Documentation

### Quick Access
- **[START_HERE.md](START_HERE.md)** ⭐ - Start using the app right now!
- **[CURRENT_STATUS.md](CURRENT_STATUS.md)** - System status and access info
- **[TEST_RESULTS.md](TEST_RESULTS.md)** - Complete test results
- **[FIXES_APPLIED.md](FIXES_APPLIED.md)** - Issues fixed during setup

### Setup Guides
- **[QUICK_START.md](QUICK_START.md)** - Get running in 3 steps
- **[SETUP.md](SETUP.md)** - Detailed setup instructions
- **[TESTING.md](TESTING.md)** - Testing guide with checklist
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Full architecture overview

## Stack Tecnológico

### Backend
- Node.js + Express
- PostgreSQL + Sequelize ORM
- JWT (JSON Web Tokens)
- bcrypt para hash de contraseñas

### Frontend
- Angular (standalone components)
- Reactive Forms
- HttpClient con interceptores
- Guards para protección de rutas

## Estructura del Proyecto

```
SistemaGastos/
├── backend/          # API REST con Express
└── frontend/         # Aplicación Angular
```

## Requisitos Previos

- Node.js 18+
- PostgreSQL 15+
- Angular CLI 17+

## Configuración

### Backend

1. Navegar al directorio backend:
```bash
cd backend
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
# Editar .env con tus credenciales de PostgreSQL
```

4. Iniciar servidor de desarrollo:
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

### Frontend

1. Navegar al directorio frontend:
```bash
cd frontend
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar servidor de desarrollo:
```bash
ng serve
```

La aplicación estará disponible en `http://localhost:4200`

## Base de Datos

Crear la base de datos PostgreSQL:

```sql
CREATE DATABASE sistema_gastos;
```

O usando Docker:

```bash
docker run --name postgres-sistema-gastos \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=sistema_gastos \
  -p 5432:5432 \
  -d postgres:15
```

## API Endpoints

### Autenticación

- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/profile` - Obtener perfil (requiere autenticación)

## Características

- ✅ Autenticación JWT segura
- ✅ Hash de contraseñas con bcrypt
- ✅ Validación de formularios
- ✅ Protección de rutas
- ✅ Interceptores HTTP automáticos
- ✅ Manejo de errores centralizado

## Seguridad

- Las contraseñas se hashean con bcrypt (10 rounds)
- Tokens JWT con expiración configurable
- Validación de entrada en backend y frontend
- CORS configurado
- Variables sensibles en archivos .env (no versionados)

## Licencia

MIT
