# 🚀 Momentum Workspace

A modern full-stack Task Management System with Role-Based Access Control (RBAC), Activity Tracking, Analytics Dashboard, and User Management.

Built using:

* React.js
* Chakra UI
* Node.js
* Express.js
* MongoDB
* JWT Authentication

---

## ✨ Features

### Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* Role-Based Access Control (Admin/User)
* Protected Routes
* Admin-Only Routes

### User Features

* Create Tasks
* View Own Tasks
* Update Own Tasks
* Delete Own Tasks
* Search Tasks
* Responsive Workspace UI

### Admin Features

* View All Users
* Activate/Deactivate Users
* Delete Users
* View All Tasks
* Delete Any Task
* Activity Monitoring
* Analytics Dashboard

### Activity Tracking

Tracks:

* User Login
* Task Creation
* Task Updates
* Task Deletion

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Chakra UI v3
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs

---

## 📁 Project Structure

```bash
frontend/
├── src
│   ├── components
│   ├── layouts
│   ├── pages
│   ├── routes
│   ├── context
│   └── api

backend/
├── controllers
├── models
├── middleware
├── routes
├── utils
└── config
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone <repository-url>
cd project-name
```

### Backend Setup

```bash
cd backend

npm install
```

Create `.env`

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run Backend

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## 🔐 API Documentation

Base URL

```bash
http://localhost:4000/api
```

---

# Authentication APIs

## Register User

```bash
curl --location 'http://localhost:4000/api/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name":"John Doe",
    "email":"john@example.com",
    "password":"Password@123",
    "role":"User",
    "status":"Active"
}'
```

---

## Login User

```bash
curl --location 'http://localhost:4000/api/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"john@example.com",
    "password":"Password@123"
}'
```

---

# Task APIs

## Create Task

```bash
curl --location 'http://localhost:4000/api/task' \
--header 'Authorization: Bearer <TOKEN>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title":"Build Dashboard",
    "description":"Create admin analytics page",
    "status":"Pending"
}'
```

---

## Get My Tasks

```bash
curl --location 'http://localhost:4000/api/task' \
--header 'Authorization: Bearer <TOKEN>'
```

---

## Get Task By ID

```bash
curl --location 'http://localhost:4000/api/task/<TASK_ID>' \
--header 'Authorization: Bearer <TOKEN>'
```

---

## Update Task

```bash
curl --location --request PATCH 'http://localhost:4000/api/task/<TASK_ID>' \
--header 'Authorization: Bearer <TOKEN>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title":"Updated Task"
}'
```

---

## Delete Task

```bash
curl --location --request DELETE 'http://localhost:4000/api/task/<TASK_ID>' \
--header 'Authorization: Bearer <TOKEN>'
```

---

# Admin APIs

## Get All Users

```bash
curl --location 'http://localhost:4000/api/admin/users' \
--header 'Authorization: Bearer <ADMIN_TOKEN>'
```

---

## Update User Status

```bash
curl --location --request PATCH 'http://localhost:4000/api/admin/users/<USER_ID>/status' \
--header 'Authorization: Bearer <ADMIN_TOKEN>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "status":"Active"
}'
```

---

## Delete Any Task

```bash
curl --location --request DELETE 'http://localhost:4000/api/admin/tasks/<TASK_ID>' \
--header 'Authorization: Bearer <ADMIN_TOKEN>'
```

---

## Activity Logs

```bash
curl --location 'http://localhost:4000/api/admin/activity-logs' \
--header 'Authorization: Bearer <ADMIN_TOKEN>'
```

---

## Analytics

```bash
curl --location 'http://localhost:4000/api/admin/analytics' \
--header 'Authorization: Bearer <ADMIN_TOKEN>'
```

---

## 🔑 Roles & Permissions

| Feature            | User | Admin |
| ------------------ | ---- | ----- |
| Register/Login     | ✅    | ✅     |
| Create Task        | ✅    | ✅     |
| View Own Tasks     | ✅    | ✅     |
| Update Own Tasks   | ✅    | ✅     |
| Delete Own Tasks   | ✅    | ✅     |
| View All Users     | ❌    | ✅     |
| Update User Status | ❌    | ✅     |
| View All Tasks     | ❌    | ✅     |
| Delete Any Task    | ❌    | ✅     |
| View Activity Logs | ❌    | ✅     |
| View Analytics     | ❌    | ✅     |

---

## 📊 Activity Tracking

The system automatically tracks:

* User Login
* Task Creation
* Task Update
* Task Deletion

These logs are accessible from the Admin Dashboard.

---

## 📬 Contact

### Trivendra Kumar

📧 Email
[strivendra002@gmail.com](mailto:strivendra002@gmail.com)

💼 LinkedIn
[https://www.linkedin.com/in/trivendra-kumar-b9302a226/](https://www.linkedin.com/in/trivendra-kumar-b9302a226/)

🌐 Portfolio
[https://portfolio-two-pi-ejaoseqvam.vercel.app/](https://portfolio-two-pi-ejaoseqvam.vercel.app/)

📄 Resume
[https://drive.google.com/file/d/11fDL5Bm8BNkKN1y4YQ1LZV4cdrG4jahF/view?usp=sharing](https://drive.google.com/file/d/11fDL5Bm8BNkKN1y4YQ1LZV4cdrG4jahF/view?usp=sharing)

---

## ⭐ Future Enhancements

* Task Priority Levels
* Due Dates
* Email Notifications
* Real-time Activity Feed using Socket.IO
* Team Workspaces
* Kanban Board View
* Dark/Light Theme Toggle

---

### Postman Collection

A Postman collection for testing all APIs is included in the repository. 


