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

### Bootstrap Rule
- The **first registered user** is automatically created as `admin`.
- All later self-registrations are created as `viewer`.

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

## Auth Endpoints
### Register
- `POST /api/v1/auth/register`
- Body:
```json
{
  "name": "Admin User",
  "email": "admin@demo.com",
  "password": "password123"
}
```

### Login
- `POST /api/v1/auth/login`
- Body:
```json
{
  "email": "admin@demo.com",
  "password": "password123"
}
```

Use token in header:
`Authorization: Bearer <token>`

## User Management (Admin only)
### Create user
- `POST /api/v1/users`

### List users
- `GET /api/v1/users?page=1&limit=10&role=viewer&status=active`

### Get user by id
- `GET /api/v1/users/:id`

### Update user
- `PATCH /api/v1/users/:id`

### Update user role
- `PATCH /api/v1/users/:id/role`

### Update user status (active/inactive)
- `PATCH /api/v1/users/:id/status`

### Delete user
- `DELETE /api/v1/users/:id`

## Financial Records
### Create record (Admin)
- `POST /api/v1/records`
- Body:
```json
{
  "amount": 4500,
  "type": "income",
  "category": "Salary",
  "date": "2026-04-01",
  "notes": "April payout"
}
```

### List records (Viewer/Analyst/Admin)
- `GET /api/v1/records?type=expense&category=Food&startDate=2026-04-01&endDate=2026-04-30&page=1&limit=10&sortBy=date&sortOrder=desc&search=lunch`

### Get record by id (Viewer/Analyst/Admin)
- `GET /api/v1/records/:id`

### Update record (Admin)
- `PATCH /api/v1/records/:id`

### Delete record (Admin)
- `DELETE /api/v1/records/:id`

## Dashboard Summary
### Get summary (Viewer/Analyst/Admin)
- `GET /api/v1/dashboard/summary`

Returns:
- total income
- total expenses
- net balance
- category-wise totals
- recent activity (top 5)
- monthly trends (last 6 months)

## Validation and Error Handling
- All key routes validate request params/query/body.
- Centralized error middleware returns consistent error JSON.
- Proper HTTP status codes used (400, 401, 403, 404, 409, 500).

## Example Health Check
- `GET /api/v1/health`

## Notes / Tradeoffs
- Hard delete is used for user and record delete actions.
- No refresh-token flow included (single access token for simplicity).
- If needed, soft delete and audit logs can be added as next improvements.
