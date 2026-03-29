# Node MySQL Scaffolding

A boilerplate for building Node.js REST APIs with MySQL. Express server with user registration (bcrypt password hashing), JWT authentication, environment-based config, and auto-seeding of the database schema on startup.

Built this as a reusable starter for backend projects that need MySQL instead of MongoDB.

## What it does

- **User registration** — Create employee records with hashed passwords (bcrypt)
- **User lookup** — Fetch employee details by ID (password stripped from response)
- **JWT auth** — Token-based authentication middleware
- **Auto-seed** — Creates the database tables on first run

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/user/register` | Public | Register new employee |
| GET | `/api/user/:id` | JWT | Get employee details by ID |
| POST | `/auth/local` | Public | Login, returns JWT token |

## Tech Stack

- **Express** — HTTP server
- **MySQL** — Database (raw queries via `mysql` package)
- **bcryptjs** — Password hashing
- **jsonwebtoken** — JWT auth
- **Babel** — ES module imports (`import/export`)
- **dotenv** — Environment config
- **CORS** — Cross-origin support

## Project Structure

```
server/
├── app.js                    # Express setup, MySQL connection, routes
├── routes.js                 # Route registration
├── api/user/
│   ├── controller.js         # Register + get user logic
│   ├── model.js              # User model
│   └── index.js              # Route definitions
├── auth/
│   ├── auth.service.js       # JWT verification middleware
│   ├── index.js              # Auth routes
│   └── local/index.js        # Local login strategy
└── config/
    ├── environment/          # Dev + prod MySQL/JWT config
    └── seed.js               # Auto-create tables on startup
```

## Running it

```bash
npm install
npm start              # Runs on configured port (default 3000)
```

Requires MySQL running locally with credentials matching `server/config/environment/development.js`.

## Note

Built in 2020 as a scaffolding template. Uses raw SQL queries (no ORM) — straightforward but be aware of SQL injection risks in production. Consider using parameterized queries or an ORM like Sequelize/Knex for anything beyond prototyping.
