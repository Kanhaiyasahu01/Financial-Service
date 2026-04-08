# Finance Dashboard Backend (Express + MongoDB)

A production-style Express backend for a finance dashboard with:
- Role-based access control (viewer, analyst, admin)
- JWT authentication
- User management
- Financial record CRUD + filtering
- Dashboard summary analytics
- Input validation + centralized error handling

## Tech Stack
- Express 5
- MongoDB + Mongoose
- JWT for auth
- express-validator for request validation
- helmet, cors, morgan for API hardening/logging

## Architecture
The project follows layered design and separation of concerns.

- `src/models`: Mongoose schemas
- `src/repositories`: Data access layer
- `src/services`: Business rules and orchestration
- `src/controllers`: HTTP request handlers
- `src/routes`: API route definitions
- `src/middlewares`: Auth, RBAC, validation, error handling
- `src/validators`: Input validation rules
- `src/config`: DB connection
- `src/utils`: Shared helpers and error classes

## Role Model
- `viewer`: read-only access to records and dashboard summaries
- `analyst`: same read access as viewer (records + summaries)
- `admin`: full access (manage users and records)


## Setup
1. Install dependencies:
```bash
npm install
```

2. Create env file:
```bash
cp .env.example .env
```

3. Fill required values in `.env`:
- `MONGODB_URI`
- `JWT_SECRET`
- `CORS_ORIGINS` (comma-separated frontend URLs)
- `PORT` (optional)

4. Run app:
```bash
npm run dev
```

For production style run:
```bash
npm start
```

## API Base URL
`/api/v1`

## API Documentation (Detailed)

### Response Format
Success responses follow:
```json
{
  "success": true,
  "message": "...",
  "data": {}
}
```

Error responses follow:
```json
{
  "success": false,
  "message": "...",
  "details": []
}
```

### Authentication
Use JWT in protected routes:
`Authorization: Bearer <token>`

### Health
#### GET `/api/v1/health`
Access: Public

cURL:
```bash
curl --location 'http://localhost:8080/api/v1/health'
```

Sample response:
```json
{
  "success": true,
  "message": "Finance dashboard API is healthy"
}
```

### Auth APIs
#### POST `/api/v1/auth/register`
Access: Public

Request body:
```json
{
  "name": "Admin One",
  "email": "admin1@test.com",
  "password": "password123"
}
```

cURL:
```bash
curl --location 'http://localhost:8080/api/v1/auth/register' \
  --header 'Content-Type: application/json' \
  --data-raw '{"name":"Admin One","email":"admin1@test.com","password":"password123"}'
```

Sample response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "USER_ID",
      "name": "Admin One",
      "email": "admin1@test.com",
      "role": "admin",
      "status": "active"
    },
    "token": "JWT_TOKEN"
  }
}
```

#### POST `/api/v1/auth/login`
Access: Public

Request body:
```json
{
  "email": "admin1@test.com",
  "password": "password123"
}
```

cURL:
```bash
curl --location 'http://localhost:8080/api/v1/auth/login' \
  --header 'Content-Type: application/json' \
  --data-raw '{"email":"admin1@test.com","password":"password123"}'
```

### User and Role Management APIs (Admin)
#### POST `/api/v1/users`
Create user

#### GET `/api/v1/users?page=1&limit=10&role=viewer&status=active`
List users with pagination/filter

#### GET `/api/v1/users/:id`
Get user by id

#### PATCH `/api/v1/users/:id`
Update user profile fields

Request body example:
```json
{
  "name": "Updated Name",
  "email": "updated@test.com"
}
```

#### PATCH `/api/v1/users/:id/role`
Update only role

Request body:
```json
{
  "role": "analyst"
}
```

cURL:
```bash
curl --location 'http://localhost:8080/api/v1/users/USER_ID/role' \
  --header 'Authorization: Bearer JWT_TOKEN' \
  --header 'Content-Type: application/json' \
  --data-raw '{"role":"analyst"}'
```

#### PATCH `/api/v1/users/:id/status`
Update active/inactive status

Request body:
```json
{
  "status": "inactive"
}
```

cURL:
```bash
curl --location 'http://localhost:8080/api/v1/users/USER_ID/status' \
  --header 'Authorization: Bearer JWT_TOKEN' \
  --header 'Content-Type: application/json' \
  --data-raw '{"status":"inactive"}'
```

#### DELETE `/api/v1/users/:id`
Delete user

### Financial Records CRUD APIs
#### POST `/api/v1/records`
Access: Admin

Request body:
```json
{
  "amount": 4500,
  "type": "income",
  "category": "Salary",
  "date": "2026-04-01",
  "notes": "April payout"
}
```

#### GET `/api/v1/records`
Access: Viewer, Analyst, Admin

Supported query params:
- `page`, `limit`
- `type` (`income` or `expense`)
- `category`
- `startDate`, `endDate`
- `search`
- `sortBy`, `sortOrder`

Example:
`/api/v1/records?type=expense&category=Food&startDate=2026-04-01&endDate=2026-04-30&page=1&limit=10&sortBy=date&sortOrder=desc&search=lunch`

#### GET `/api/v1/records/:id`
Access: Viewer, Analyst, Admin

#### PATCH `/api/v1/records/:id`
Access: Admin

Request body example:
```json
{
  "notes": "Updated note"
}
```

#### DELETE `/api/v1/records/:id`
Access: Admin

Sample create record cURL:
```bash
curl --location 'http://localhost:8080/api/v1/records' \
  --header 'Authorization: Bearer JWT_TOKEN' \
  --header 'Content-Type: application/json' \
  --data-raw '{"amount":4500,"type":"income","category":"Salary","date":"2026-04-01","notes":"April payout"}'
```

### Dashboard APIs
#### GET `/api/v1/dashboard/summary`
Access: Viewer, Analyst, Admin

Returns:
- total income
- total expenses
- net balance
- category-wise totals
- recent activity
- monthly trends

Sample cURL:
```bash
curl --location 'http://localhost:8080/api/v1/dashboard/summary' \
  --header 'Authorization: Bearer JWT_TOKEN'
```

### Validation and Reliability
- Input validation is applied to params, body, and query.
- Consistent error responses are returned on invalid input.
- Common status codes: `400`, `401`, `403`, `404`, `409`, `500`.

## Deploy Backend On Render
This project includes a Render blueprint file: `render.yaml`.

### Option A: One-click Blueprint Deploy (recommended)
1. Push this repo to GitHub.
2. In Render dashboard, click `New +` -> `Blueprint`.
3. Connect your GitHub repo and select branch.
4. Render reads `render.yaml` and prepares the service.
5. Set required secret env vars in Render:
  - `MONGODB_URI`
  - `JWT_SECRET`
6. Deploy.

### Option B: Manual Web Service Setup
1. In Render dashboard, click `New +` -> `Web Service`.
2. Connect your repo.
3. Configure:
  - Runtime: `Node`
  - Build Command: `npm install`
  - Start Command: `npm start`
4. Add env vars:
  - `NODE_ENV=production`
  - `MONGODB_URI=<your_mongodb_uri>`
  - `JWT_SECRET=<your_secret>`
  - `JWT_EXPIRES_IN=7d`
5. Deploy.

### Verify Deployment
1. Open: `https://<your-render-service>.onrender.com/api/v1/health`
2. Expected response: success `true`.
3. Update frontend API base URL/proxy target to this Render URL for production.

## Notes / Tradeoffs
- User delete uses soft delete (`isDeleted`, `deletedAt`); records use hard delete.
- No refresh-token flow included (single access token for simplicity).
- If needed, soft delete and audit logs can be added as next improvements.
