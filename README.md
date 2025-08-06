
# 🧪 slk API - Structured Logic Kernel API

RESTful API built with **NestJS**, **Prisma ORM**, and **MySQL** for managing users and messages. It includes robust validations, centralized error handling, and best architectural practices.

---

## 🚀 Try the API in Postman

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-equinox-132990/workspace/slk-dev/collection/22972674-116db138-a561-409c-b653-4d5de3f243d1?action=share&creator=22972674&active-environment=22972674-862c63a9-fb4c-4179-af5b-cf840c5f4730)

---

## 🚀 **What does this API do?**

- **Users**: Create, list, update, delete (soft delete), and retrieve users.
- **Messages**: Create messages associated with users and list a user's messages.
- **Validations**:
  - Email must be unique and valid.
  - Required fields and correct data types.
  - Cannot create messages for non-existent or inactive users.
  - Cannot update or delete non-existent users.
- **Error Handling**:
  - Standardized responses for errors and success.
  - Clear HTTP exceptions (404, 409, 400, 500).
- **Guards**:
  - Pre-validation for user existence on protected routes.

---

## 📦 **Relevant Folder Structure**

```plaintext
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

## 🛡️ **Validations & Business Rules**

- **Users**
  - `name`: string, required.
  - `email`: string, required, valid format, unique.
  - `active`: boolean, optional (default `true`).
  - Cannot create a user with an existing email.
  - Cannot update/delete a non-existent user.
- **Messages**
  - `content`: string, required, not empty.
  - `userId`: int, required, must exist and be active.
  - Cannot create messages for non-existent users.
- **Guards**
  - Routes like `/users/:id`, `/users/:id/messages`, and `/messages` validate user existence beforehand.
- **Errors**
  - 404: User not found.
  - 409: Email already exists.
  - 400: Invalid data.
  - 500: Internal server error.

---

## 📝 **Required Environment Variables**

Create a `.env` file at the project root with the following content:

```env
DATABASE_URL="mysql://user:password@localhost:3306/db_name"
```

Example for local testing (adjust to your setup):
```env
DATABASE_URL="mysql://root:12345678@localhost:3306/slk-db" 
```

---

## ⚙️ **Steps to Run the Project**

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd slk-dev
   ```

2. **Set up environment variables**
   - Copy `.env.example` to `.env` and edit accordingly.

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the project (runs migrations, generates Prisma client, and launches the server)**
   ```bash
   npm run start:slk
   ```

   > **Note:** The `start:slk` command runs all necessary steps automatically.

5. **The API will be available at:**  
   [http://localhost:3000](http://localhost:3000)

---

## 🐳 **Run with Docker Compose (Recommended)**

To avoid dependency issues and ensure a consistent environment, Docker Compose is recommended:

1. **Ensure Docker and Docker Compose are installed.**

2. **Run:**
   ```bash
   docker-compose up --build
   ```

3. **The API will be available at:**  
   [http://localhost:3000](http://localhost:3000)

> **Tip:** Docker Compose is the easiest and most reliable way to spin up the environment, especially to avoid connection errors or OS-specific issues.

---

## 🧪 **Testing with Vitest**

This project uses **Vitest** as its testing framework for its speed, simplicity, and excellent TypeScript integration.

### **Run tests:**

```bash
# Run all tests once
npm run test:vitest

# Run tests in watch mode (auto-runs on changes)
npm run test:vitest:watch
```

### **Test coverage includes:**
- ✅ **UsersService**: Full CRUD, validations, and soft delete
- ✅ **MessagesService**: Creation, queries, and user validation
- ✅ **Error handling**: Specific Prisma exceptions
- ✅ **Mocks**: DatabaseService and injected dependencies

### **Test structure:**
```plaintext
test/
├── services/
│   ├── users.service.spec.ts     # Tests for UsersService
│   └── messages.service.spec.ts  # Tests for MessagesService
```

---

## ⚠️ **Database Permissions Warning**

Ensure your database user has **sufficient permissions** to create tables, perform migrations, and modify data.  
Without the proper privileges, Prisma may fail to apply migrations or generate the schema.

---

## 📚 **Main Endpoints**

### Users
- `POST /users` — Create a user  
- `GET /users` — List users  
- `GET /users/:id` — Get user by ID  
- `PATCH /users/:id` — Update user  
- `DELETE /users/:id` — Soft delete user  
- `GET /users/:id/messages` — List messages by user

### Messages
- `POST /messages` — Create a message linked to a user  
- `GET /messages` — List all messages

---

## 🤝 Author

**Nelson Gallego**  
[GitHub](https://github.com/nelsin-06)  
[LinkedIn](https://www.linkedin.com/in/nelson-gallego-tec-dev)

---
