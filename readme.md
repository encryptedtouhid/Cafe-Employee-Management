# Cafe and Staff Management System

## Overview
This is a fullstack application for managing cafes and employees. The system consists of a PostgreSQL database, a Node.js/Express backend API, and a React frontend client application built with Vite.

## Project Structure
```
project/
├── backend/
│   ├── package.json
│   └── src/
│       ├── app.js
│       ├── controllers/
│       ├── middlewares/
│       ├── models/
│       ├── routes/
│       └── seeds/
│           └── seed.js
├── frontend/
│   ├── package.json
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── store/
│       ├── hooks/
│       └── App.jsx
└── postgresdb/
    └── docker-compose.yml
```

## Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or later required)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/) (usually comes with Docker Desktop)

## Getting Started

### Step 1: Set up the PostgreSQL Database
Navigate to the `postgresdb` directory and start the PostgreSQL container:

```bash
cd postgresdb
docker-compose up -d
```

This will start a PostgreSQL container with the following configuration:
- User: postgres
- Password: password
- Port: 5432

Create the database:

```bash
# Connect to the PostgreSQL container
docker exec -it postgresdb_db_1 bash

# Once inside the container, connect to PostgreSQL as the postgres user
psql -U postgres

# Create the database
CREATE DATABASE cafe_employee_db;

# Verify the database was created
\l

# Exit PostgreSQL
\q

# Exit the container
exit
```

### Step 2: Set up the Backend Server
Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Seed the database with initial data:

```bash
npm run seed
```

Start the backend server:

```bash
# For production
npm start

# For development with auto-reload
npm run dev
```

### Step 3: Set up the Frontend Application
Open a new terminal window, navigate to the frontend directory, and install dependencies:

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
```

The React application should now be running and accessible at http://localhost:5173 (Vite's default port).

To build for production:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## API Endpoints

The backend server provides endpoints for managing both cafes and employees. The application includes Swagger documentation which can be accessed at `/api-docs` when the server is running.

Example endpoints include:

- `GET /api/cafes` - Retrieve all cafes
- `GET /api/cafes/:id` - Retrieve a specific cafe
- `POST /api/cafes` - Create a new cafe
- `PUT /api/cafes/:id` - Update a cafe
- `DELETE /api/cafes/:id` - Delete a cafe

- `GET /api/employees` - Retrieve all employees
- `GET /api/employees/:id` - Retrieve a specific employee
- `POST /api/employees` - Create a new employee
- `PUT /api/employees/:id` - Update an employee
- `DELETE /api/employees/:id` - Delete an employee

## Environment Variables

### Backend
Create a `.env` file in the `backend` directory with the following variables:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cafe_employee_db
DB_USER=postgres
DB_PASSWORD=password
PORT=3000
NODE_ENV=development
```

The application uses the following packages for configuration and security:
- dotenv: For environment variable management
- helmet: For securing HTTP headers
- cors: For Cross-Origin Resource Sharing
- winston: For logging

### Frontend
Create a `.env` file in the `frontend` directory with the following variables:

```
VITE_API_URL=http://localhost:3000/api
```

The application is built with:
- React 18
- React Router for navigation
- Redux Toolkit for state management
- Ant Design for UI components
- AG Grid for data tables
- React Hook Form for form handling
- Axios for API requests
- Vite as the build tool

## Development

### Backend
- Run tests: `npm test`
- Run tests in watch mode: `npm run test:watch`
- Run in development mode with auto-reload: `npm run dev`
- Run linting: `npm run lint`

### Frontend
- Run tests: `npm test`
- Run tests with coverage: `npm run test:coverage`
- Build for production: `npm run build`
- Preview production build: `npm run preview`
- Run linting: `npm run lint`

## Troubleshooting

### Database Connection Issues
- Ensure the PostgreSQL container is running: `docker ps`
- Verify database credentials in the `.env` file match those in docker-compose.yml
- Check that the database has been created: `docker exec -it postgresdb_db_1 psql -U postgres -c '\l'`

### Backend Issues
- Check for syntax or code style issues: `npm run lint`
- Check test failures: `npm test`
- Verify all dependencies are installed: `npm install`
- Ensure Node.js version is 18.0.0 or later: `node --version`

### Frontend Issues
- Check for linting errors: `npm run lint`
- Run tests to see if there are failures: `npm test`
- Check Vite configuration in `vite.config.js`
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`


## Contact
For questions or support, please reach out to [me@tuhidulhossain.com](mailto:me@tuhidulhossain.com)