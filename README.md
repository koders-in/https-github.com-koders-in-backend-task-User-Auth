# 🚀 Backend Intern Task: Authentication System for Trading Platform

## 📌 Task Title:
**Build Core Authentication System for a Trading Platform using Node.js, Express, and MongoDB**

---

## 🧠 Background:
You’re contributing to the backend development of a **proprietary trading evaluation platform**. This platform allows traders to register, complete simulated trading challenges, and qualify for funded trading accounts based on performance.

As a backend intern, your first assignment is to **build the core user authentication system** that will allow users to sign up, log in, reset their passwords, and securely access their accounts using JWT-based authentication.

---

## 📝 Task Description:
You are required to implement the **core user authentication system** using a secure and modular approach. The backend must support user registration, login, password reset, and route protection using JWT tokens.

The goal is to create a clean, scalable, and production-ready authentication flow using industry standards.

---

## ✅ Task Requirements:

### ⚙️ Backend Stack:
- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT (JSON Web Tokens)**
- **dotenv** (for environment variables)

### 🔐 Authentication Logic:
- JWT-based login and route protection
- Token generation and verification
- Expiry handling and error responses

### 🧩 User Model (MongoDB):
- `fullName`: String
- `email`: String (unique)
- `password`: String (store in plain text for this task only)
- `isEmailVerified`: Boolean

---

## 📁 Project Structure Guidelines:
```bash
backend/
├── controllers/
│   └── auth.controller.js
├── routes/
│   └── auth.routes.js
├── models/
│   └── user.model.js
├── middleware/
│   └── auth.middleware.js
├── utils/
├── config/
├── server.js
└── .env
```

---

## 🔍 Core Features to Implement:

### 🔐 Authentication Routes:
| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth/register` | POST | ❌ | Signup with email & password |
| `/api/auth/login` | POST | ❌ | Login with credentials |
| `/api/auth/reset-password` | POST | ❌ | Request password reset |
| `/api/auth/new-password` | POST | ❌ | Set new password |
| `/api/user/profile` | GET | ✅ | Get authenticated user profile |

---

## 🧪 Test Flow:
- Register → Login → Access Protected Route
- Reset password and login again
- Use Postman or ThunderClient to verify API working

---

## 💡 Notes:
- Password can be stored as plain text for this test (no hashing or email validation needed)
- Keep logic modular and follow separation of concerns
- Use clear naming and clean code

---

## 📦 Deliverables:
1. Create a **new branch** in this repository.
2. Push your code into the `backend/` directory.
3. **Create a Pull Request (PR)** to the `main` branch in this same repo with:
   - Your **Full Name**
   - Your **Role** (e.g., *Backend Intern*)
   - A short description of what you have implemented
   - Optional: A short Loom/video demo of the API testing

**Example PR Title:**  
`[Backend Intern] Auth System Setup - John Doe`

---

## 🕒 Timeline:
- ⏰ **3 Days**
- Focus on clean implementation, proper structure, and code readability

---

## 🚫 Common Mistakes to Avoid:
- Hardcoding config/secrets instead of using `.env`
- Not validating input (basic checks required)
- Skipping route protection for private APIs
- Merging everything into one file — **keep it modular**
