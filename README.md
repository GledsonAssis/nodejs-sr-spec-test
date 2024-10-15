# Serasa Test Code

## Overview

This repository contains a Node.js application designed for testing purposes, particularly around user-related operations. The project structure includes use cases, domain entities, value objects (VOs), infrastructure components, and interfaces for controllers and presentations. The application uses **Express** for routing, **Mongoose** as the ODM for MongoDB, and **JWT** for authorization.

## Dockerfile Structure

The Dockerfile is multi-staged to ensure efficient builds, separating the build process from the production runtime. Here's an outline of the Docker stages:

1. **Builder Stage:**
   - Uses Node.js 18 as the base image.
   - Installs dependencies and runs the build process.

2. **Dependencies Stage:**
   - Cleans up the build environment and installs only production dependencies.

3. **Release Stage:**
   - Uses Node.js 18 as the final runtime.
   - Copies the build output and dependencies for production.

## Getting Started

### Prerequisites

- Docker
- Node.js (v18+)

### Project Setup

1. Run with docker-compose
   ```bash
   docker-compose up --build -d
   ```

2. Build and run the Docker container:

   ```bash
   docker build -t serasa-test-code .
   docker run -p 3000:3000 serasa-test-code
   ```

3. Once the server is up, you should see logs similar to:

   ```bash
   [INFO] - 2024-10-15T00:13:29.370Z - ✅ [Successfully] - Server Startup - port: 3000
   [INFO] - 2024-10-15T00:13:30.117Z - ✅ Registering route: get | /v1/users/:id
   [INFO] - 2024-10-15T00:13:30.119Z - ✅ Registering route: delete | /v1/users/:id
   [INFO] - 2024-10-15T00:13:30.120Z - ✅ Registering route: put | /v1/users/:id
   [INFO] - 2024-10-15T00:13:30.121Z - ✅ Registering route: post | /v1/users
   ```

### Running Locally (Without Docker)

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Run tests:

   ```bash
   npm run test
   ```

4. Build the project:

   ```bash
   npm run build
   ```

5. Start the production server:

   ```bash
   npm run start
   ```

## Test Example


#### POST /v1/users
```bash
curl --location 'localhost:3000/v1/users' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.WHDfHlX4MCE-koQFp8lDU4Ei45ZilvlfDfASW1j4qlM' \
--header 'Content-Type: application/json' \
--header 'Cookie: csrftoken=TfmyKEszBAxMu0FGxvYc08AnoL5jzVCz' \
--data-raw '{
    "name": "user test",
    "email": "teste@teste.com"
}'
```

#### GET /v1/users/:id
```bash
curl --location 'localhost:3000/v1/users/670da288d6b55493f5f3bdec' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.WHDfHlX4MCE-koQFp8lDU4Ei45ZilvlfDfASW1j4qlM' \
--header 'Cookie: csrftoken=TfmyKEszBAxMu0FGxvYc08AnoL5jzVCz'
```

#### POST /v1/users/:id
```bash
curl --location --request PUT 'localhost:3000/v1/users/670da288d6b55493f5f3bdec' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.WHDfHlX4MCE-koQFp8lDU4Ei45ZilvlfDfASW1j4qlM' \
--header 'Content-Type: application/json' \
--header 'Cookie: csrftoken=TfmyKEszBAxMu0FGxvYc08AnoL5jzVCz' \
--data-raw '{
    "name": "teste teste",
    "email": "teste@teste.com"
}'
```

#### DELETE /v1/users/:id
```bash
curl --location --request DELETE 'localhost:3000/v1/users/670da288d6b55493f5f3bdec' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.WHDfHlX4MCE-koQFp8lDU4Ei45ZilvlfDfASW1j4qlM' \
--header 'Cookie: csrftoken=TfmyKEszBAxMu0FGxvYc08AnoL5jzVCz'
```

## Test Coverage

The application has high test coverage as shown below:
File                        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Lines
----------------------------|---------|----------|---------|---------|-------------------
All files                   |   91.82 |    74.15 |    87.5 |   91.63 | 
 application/usecases       |     100 |      100 |     100 |     100 | 
  create-user.ts            |     100 |      100 |     100 |     100 | 
  delete-user.ts            |     100 |      100 |     100 |     100 | 
  get-user.ts               |     100 |      100 |     100 |     100 | 
  put-user.ts               |     100 |      100 |     100 |     100 | 
 domain/entity              |     100 |    93.33 |     100 |     100 | 
  error.ts                  |     100 |      100 |     100 |     100 | 
  user.ts                   |     100 |       50 |     100 |     100 | 31
 domain/vo                  |     100 |      100 |     100 |     100 | 
  email.ts                  |     100 |      100 |     100 |     100 | 
  name.ts                   |     100 |      100 |     100 |     100 | 
 infra/authorization        |     100 |      100 |     100 |     100 | 
  validate-jwt.ts           |     100 |      100 |     100 |     100 | 
 infra/database             |     100 |      100 |     100 |     100 | 
  mongoose-adapter.ts       |     100 |      100 |     100 |     100 | 
 infra/di                   |     100 |      100 |     100 |     100 | 
  di.ts                     |     100 |      100 |     100 |     100 | 
 infra/http                 |   86.66 |      100 |   85.71 |   86.66 | 
  express-adapter.ts        |   86.66 |      100 |   85.71 |   86.66 | 43-44
 infra/input-validator/ajv  |   89.47 |      100 |   66.66 |   89.47 | 
  compile.ts                |   89.47 |      100 |   66.66 |   89.47 | 15-16
 infra/odm                  |   55.55 |       50 |      60 |   55.55 | 
  odm.ts                    |   55.55 |       50 |      60 |   55.55 | 30-47
 infra/repository           |      60 |      100 |      40 |      60 | 
  user-repository.ts        |      60 |      100 |      40 |      60 | 34-45
 interfaces/controllers     |      92 |    54.54 |     100 |      92 | 
  create-user-controller.ts |      92 |    54.54 |     100 |      92 | 37-38
  delete-user-controller.ts |      92 |    54.54 |     100 |      92 | 37-38
  get-user-controller.ts    |      92 |    54.54 |     100 |      92 | 37-38
  put-user-controller.ts    |      92 |    54.54 |     100 |      92 | 40-41
 interfaces/presentations   |     100 |      100 |     100 |     100 | 
  http.ts                   |     100 |      100 |     100 |     100 | 
----------------------------|---------|----------|---------|---------|-------------------

- **Test Suites:** 18 passed, 18 total
- **Tests:** 137 passed, 137 total

## Environment Variables

To run the project, you may need to set up the following environment variables:

```bash
JWT_SECRET=<your-secret-key>
MONGODB_URI=<your-mongodb-uri>
```

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Maintainer

- **Gledson Assis**

---

Feel free to modify the project to fit your needs. Contributions are welcome!