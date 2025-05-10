# 📝 Task Manager Application

A full-stack task management system where users can register, log in, create, view, update, and delete tasks. The app features authentication, session handling with JWT, and a responsive frontend.

---

## 📌 Overview

This project provides:

- User authentication (register/login/logout)
- Secure routes protected by JWT
- CRUD operations for tasks (Create, Read, Update, Delete)
- Task search and filtering
- Responsive UI with routing
- Profile and logout functionality
- Footer and Navbar for smooth navigation

---

## 🗃️ Database Design

### 🖼️ ER Diagram

```
User (1) ────────< Task (Many)
```

### 📖 Tables

#### `users`
| Field      | Type        | Description                |
|------------|-------------|----------------------------|
| id         | INTEGER PK  | Unique user ID             |
| username   | TEXT        | User's login name          |
| email      | TEXT        | User's email               |
| password   | TEXT        | Hashed password            |
| created_at | TIMESTAMP   | Account creation time      |

#### `tasks`
| Field       | Type        | Description                         |
|-------------|-------------|-------------------------------------|
| id          | INTEGER PK  | Unique task ID                      |
| title       | TEXT        | Title of the task                   |
| description | TEXT        | Description of the task             |
| status      | TEXT        | Task status (pending/completed)     |
| due_date    | DATE        | Task's due date                     |
| remarks     | TEXT        | Additional remarks                  |
| created_by  | INTEGER FK  | References `users.id`               |
| created_at  | TIMESTAMP   | Task creation timestamp             |

### 🔍 Indexes

- Primary index on `users.id` and `tasks.id`
- Foreign key index on `tasks.created_by` (referencing `users.id`)

---

## 🏗️ Project Structure

### 🔙 Backend (Node.js + Express + SQLite)

```
/backend
├── server.js
├── db.js
├── middleware/Auth.js
├── routes
│   ├── auth.js
│   └── task.js
└── controllers
    ├── userController.js
    └── taskController.js
```

- **Authentication**: JWT-based, stored in cookies
- **Database**: SQLite, managed with SQL queries and prepared statements
- **Routes**: Protected with custom `Auth` middleware

### 🌐 Frontend (ReactJS with Class and Functional Components)

```
/frontend
├── src
│   ├── components
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   └── ProtectedRoute.js
│   ├── pages
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Tasks.js
│   │   ├── AddTask.js
│   │   ├── EditTask.js
│   │   └── Profile.js
│   ├── App.js
│   └── index.js
└── public
    └── index.html
```

- **Routing**: Handled by `react-router-dom@5.2.0`
- **Protected Routes**: Using a `ProtectedRoute` wrapper
- **State Management**: `useState`, `useEffect` and controlled components

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js ≥ 14
- npm ≥ 6
- Git
- SQLite3

### Backend Setup

```bash
cd backend
npm install
node server.js
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

### Environment Variables

In `backend/.env` (if used):

```env
JWT_SECRET=your_jwt_secret_key
```

---

## ✅ Testing Instructions

### Manual Testing

1. Register a user via the frontend.
2. Log in with correct credentials and JWT token will be stored in cookies.
3. Add a task, then check task listing.
4. Edit the task via the edit route: `/editTask/:id`.
5. Delete the task and verify it is removed from UI and database.
6. Use the search box to filter tasks by title.
7. Visit `/profile` to log out.

### Automated Testing (Optional Enhancements)

- Add unit tests using Jest for backend controllers
- Add Cypress or React Testing Library for frontend flows

---

## 📦 Dependencies

### Backend

- `express`
- `jsonwebtoken`
- `bcryptjs`
- `sqlite3`
- `cors`
- `dotenv`

### Frontend

- `react`
- `react-router-dom@5.2.0`
- `js-cookie`
- `axios` (optional)

---

## 📄 License

MIT

---

## 🙋‍♂️ Author

**Daveed Gangi**  
Web Developer  
[LinkedIn](https://www.linkedin.com/in/g-daveed-365958190/) | [GitHub](https://github.com/DaveedGangi)