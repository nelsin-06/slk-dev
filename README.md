# 🧪 Selaski API - Prueba Técnica Backend

API RESTful desarrollada con **NestJS**, **Prisma ORM** y **MySQL** para la gestión de usuarios y mensajes. Incluye validaciones robustas, manejo centralizado de errores y buenas prácticas de arquitectura.

---

## 🚀 **¿Qué hace esta API?**

- **Usuarios**: Crear, listar, actualizar, eliminar (soft delete) y consultar usuarios.
- **Mensajes**: Crear mensajes asociados a usuarios y listar mensajes de un usuario.
- **Validaciones**: 
  - Email único y con formato válido.
  - Campos obligatorios y tipos correctos.
  - No se pueden crear mensajes para usuarios inexistentes o inactivos.
  - No se pueden actualizar ni eliminar usuarios inexistentes.
- **Manejo de errores**: 
  - Respuestas estandarizadas para errores y éxitos.
  - Excepciones HTTP claras (404, 409, 400, 500).
- **Guards**: 
  - Validación previa de existencia de usuario en rutas protegidas.

---

## 📦 **Estructura de carpetas relevante**

```
src/
├── users/
│   ├── dto/
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── messages/
│   ├── dto/
│   ├── messages.controller.ts
│   ├── messages.service.ts
│   └── messages.module.ts
├── common/
│   ├── guards/
│   ├── filters/
│   └── interceptors/
├── database/
│   ├── database.module.ts
│   └── database.service.ts
└── main.ts
```

---

## 🛡️ **Validaciones y reglas de negocio**

- **Usuarios**
  - `name`: string, obligatorio.
  - `email`: string, obligatorio, formato válido, único.
  - `active`: boolean, opcional (por defecto `true`).
  - No se puede crear un usuario con email repetido.
  - No se puede actualizar/eliminar un usuario inexistente.
- **Mensajes**
  - `content`: string, obligatorio, no vacío.
  - `userId`: int, obligatorio, debe existir y estar activo.
  - No se puede crear un mensaje para un usuario inexistente.
- **Guards**
  - Rutas como `/users/:id`, `/users/:id/messages` y `/messages` validan que el usuario exista antes de ejecutar la lógica.
- **Errores**
  - 404: Usuario no encontrado.
  - 409: Email ya existe.
  - 400: Datos inválidos.
  - 500: Error interno.

---

## 📝 **Variables de entorno necesarias**

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/nombre_db"
```

Ejemplo para pruebas locales:
```
DATABASE_URL="mysql://root:12345678@localhost:3306/slk-db"
```

---

## ⚙️ **Pasos para ejecutar el proyecto**

1. **Clona el repositorio**
   ```bash
   git clone <url-del-repo>
   cd selaski-dev
   ```

2. **Instala dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**
   - Copia `.env.example` a `.env` y edita según tu entorno.

4. **Aplica las migraciones de la base de datos**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Genera el cliente Prisma**
   ```bash
   npx prisma generate
   ```

6. **Inicia la aplicación**
   ```bash
   npm run start:dev
   ```

7. **La API estará disponible en**:  
   [http://localhost:3000](http://localhost:3000)

---

## 📚 **Endpoints principales**

### Usuarios
- `POST /users` — Crear usuario
- `GET /users` — Listar usuarios
- `GET /users/:id` — Consultar usuario por ID
- `PATCH /users/:id` — Actualizar usuario
- `DELETE /users/:id` — Eliminar usuario (soft delete)
- `GET /users/:id/messages` — Listar mensajes de un usuario

### Mensajes
- `POST /messages` — Crear mensaje asociado a un usuario
- `GET /messages` — Listar todos los mensajes

---

## 🧑‍💻 **Autor**

Desarrollado por **Nelson Gallego**  
_Backend