# 🧪 Selaski API - Prueba Técnica Backend

API RESTful desarrollada con **NestJS**, **Prisma ORM** y **MySQL** para la gestión de usuarios y mensajes. Incluye validaciones robustas, manejo centralizado de errores y buenas prácticas de arquitectura.

---

## 🚀 Probar API en Postman

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-equinox-132990/workspace/slk-dev/collection/22972674-116db138-a561-409c-b653-4d5de3f243d1?action=share&creator=22972674&active-environment=22972674-862c63a9-fb4c-4179-af5b-cf840c5f4730)

Si lo prefiere, puede utilizar el archivo de colección adjunto para probar la API directamente desde su instancia de Postman.

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
test/
├── services/
│   ├── users.service.spec.ts
│   └── messages.service.spec.ts
└── ...
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

Ejemplo para pruebas locales: (cambiar según corresponda a su database)
```
DATABASE_URL="mysql://root:12345678@localhost:3306/slk-db" 
```

---

## ⚙️ **Pasos para ejecutar el proyecto**

1. **Clona el repositorio**
   ```bash
   git clone <url-del-repo>
   cd slk-dev
   ```

2. **Configura las variables de entorno**
   - Copia `.env.example` a `.env` y edita según tu entorno.

3. **Instala dependencias**
   ```bash
   npm install
   ```

4. **Ejecuta el proyecto (esto realiza migraciones, genera el cliente Prisma y levanta el servidor)**
   ```bash
   npm run start:slk
   ```

   > **Nota:** El comando `start:slk` ejecuta todos los pasos necesarios automáticamente.

5. **La API estará disponible en**:  
   [http://localhost:3000](http://localhost:3000)

---

## 🐳 **Ejecución con Docker Compose (Recomendado)**

Para evitar problemas de dependencias y asegurar un entorno consistente, se recomienda usar Docker Compose:

1. **Asegúrate de tener Docker y Docker Compose instalados.**

2. **Ejecuta:**
   ```bash
   docker-compose up --build
   ```
3. **La API estará disponible en:**  
   [http://localhost:3000](http://localhost:3000)

> **Sugerencia:** Usar Docker Compose es la forma más sencilla y confiable de levantar el entorno, especialmente para evitar errores de conexión o diferencias entre sistemas operativos.

---

## 🧪 **Testing con Vitest**

Este proyecto utiliza **Vitest** como framework de testing por su velocidad, simplicidad y excelente integración con TypeScript.

### **Ejecutar tests:**

```bash
# Ejecutar todos los tests una vez
npm run test:vitest

# Ejecutar tests en modo watch (detecta cambios)
npm run test:vitest:watch
```

### **Cobertura de tests:**
Los tests cubren:
- ✅ **UsersService**: CRUD completo, validaciones y soft delete
- ✅ **MessagesService**: Creación, consultas y validación de usuarios
- ✅ **Manejo de errores**: Excepciones específicas de Prisma
- ✅ **Mocks**: DatabaseService y dependencias inyectadas

### **Estructura de tests:**
```
test/
├── services/
│   ├── users.service.spec.ts     # Tests para UsersService
│   └── messages.service.spec.ts  # Tests para MessagesService
```

---

## ⚠️ **Advertencia sobre permisos de la base de datos**

Asegúrate de que el usuario de la base de datos tenga los **permisos necesarios** para crear tablas, migrar y modificar datos.  
Si los permisos son insuficientes, Prisma puede fallar al aplicar migraciones o generar el esquema.

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

## 🤝 Author

**Nelson Gallego**  
[GitHub](https://github.com/nelsin-06)  
[LinkedIn](https://www.linkedin.com/in/nelson-gallego-tec-dev)
