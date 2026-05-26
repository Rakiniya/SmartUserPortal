# SECURE PORTAL SPA APPLICATION

## Angular 12+ | Node.js | MongoDB

---

## 1. Project Overview

Secure Portal is a modern Single Page Application (SPA) developed using Angular 12+, Node.js, Express.js, and MongoDB.
The application provides secure login functionality with role-based access control for:

* Admin
* General User

The system demonstrates:

* Authentication
* User Management
* API Integration
* Asynchronous Processing
* Modular Angular Architecture
* Responsive UI Design

---

# 2. Technologies Used

## Frontend

* Angular 12+
* TypeScript
* HTML5
* CSS3

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Authentication

* JWT (JSON Web Token)
* bcryptjs

---

# 3. Features Implemented

## 3.1 Login System

The application includes a secure login page with:

* User ID
* Password
* Role Selection

Roles available:

* Admin
* General User

JWT token authentication is implemented for secure API access.

---

## 3.2 Role-Based Access

### Admin

Admin users can:

* Access Admin Dashboard
* Add Users
* Delete Users
* View User List
* View Records

### General User

General users can:

* Login
* View Dashboard
* View Access Records

---

## 3.3 Dashboard

After login, the dashboard displays:

* Logged-in user details
* User role
* Access records
* Dynamic records table

---

## 3.4 Async API Processing

API delay simulation is implemented using query parameters.

Example:

```bash
?delay=3000
```

This demonstrates:

* Asynchronous API handling
* Loading indicators
* Real-time waiting state management

---

## 3.5 User Management

Admin dashboard includes:

* Add new users
* Delete existing users
* Display all users from MongoDB

---

## 3.6 Security Features

Implemented security features:

* JWT Authentication
* Protected APIs
* Middleware Authorization
* Password Hashing using bcryptjs

---

# 4. Project Architecture

## Frontend Structure

```bash
src/
│
├── app/
│   ├── core/
│   │   └── services/
│   │
│   ├── modules/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   └── admin/
```

---

## Backend Structure

```bash
backend/
│
├── middleware/
├── server.js
├── .env
```

---

# 5. API Endpoints

## Login API

```bash
POST /login
```

Used for:

* User authentication
* JWT token generation

---

## Get Users

```bash
GET /users
```

Returns all users from MongoDB.

---

## Add User

```bash
POST /users
```

Adds a new user into the database.

---

## Delete User

```bash
DELETE /users/:userId
```

Deletes user from database.

---

## Get Records

```bash
GET /records/:role
```

Returns role-based dummy records.

---

# 6. Database

MongoDB is used to store:

* User ID
* Password
* Role

Passwords are securely hashed before storage.

---

# 7. UI Design

The application includes:

* Modern Login UI
* Sidebar Navigation
* Dashboard Cards
* Styled Tables
* Responsive Layout
* Clean User Experience

Light theme design is used for better readability and professional appearance.

---

# 8. Installation Steps

## Step 1: Frontend Setup

```bash
cd frontend
npm install
ng serve
```

Frontend URL:

```bash
http://localhost:4200
```

---

## Step 2: Backend Setup

```bash
cd backend
npm install
node server.js
```

Backend URL:

```bash
http://localhost:3000
```

---

## Step 3: MongoDB Setup

Create `.env` file inside backend folder:

```env
MONGO_URI=mongodb://127.0.0.1:27017/secureportal
PORT=3000
JWT_SECRET=mysecretkey
```

---

# 9. Demo Credentials

## Admin

```txt
User ID : admin
Password : admin123
Role : Admin
```

---

## General User

```txt
User ID : john
Password : john123
Role : General User
```

---

# 10. Evaluation Criteria Covered

## Angular Framework Usage

* Components
* Services
* Routing
* Modular Architecture
* HTTP Client

## API & Backend Knowledge

* REST APIs
* MongoDB Integration
* JWT Authentication
* Middleware Security

## UI/UX Design

* Modern UI
* Responsive Layout
* Professional Dashboard
* User-Friendly Design

---

# 11. Conclusion

The Secure Portal SPA Application successfully demonstrates:

* Angular SPA development
* Backend API integration
* Role-based authentication
* MongoDB database operations
* Asynchronous processing
* Modern UI implementation

The project follows clean code architecture and modular development practices.
