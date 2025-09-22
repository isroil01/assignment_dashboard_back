# Carbon Emissions Backend

This is the **backend** for the Carbon Emissions Dashboard assignment. It provides REST APIs for managing companies, emissions, and posts, as well as authentication for users. The backend is built using **NestJS** and implements JWT-based authentication with cookies for secure and stateless sessions.

---

## 📝 Project Overview

The backend includes:

- **Authentication**
  - Sign Up
  - Sign In
  - Refresh Token
  - JWT + Cookies for session management
  - Implemented with **Passport.js** (local & JWT strategies)
- **Companies API**
  - Returns list of companies and their emissions
- **Dashboard API**
  - Returns overview stats
- **Posts API**
  - Create and fetch posts linked to companies and months
- **Simulated latency and failures**
  - Delay and jitter helpers for testing frontend loading/error states

> All data is stored in-memory (no database) as this assignment focuses on frontend integration. Seed data is included.

---

## ⚙️ Tech Stack & Libraries

- **NestJS**: Structured and scalable backend framework for Node.js.
- **TypeScript**: Ensures type safety and better code maintainability.
- **Passport.js**: Authentication middleware for NestJS, easy integration with JWT.
- **JWT (JSON Web Tokens)**: Secure and stateless authentication mechanism.
- **Cookies**: Tokens are sent via HTTP-only cookies for security.
- **dotenv**: Environment variables for configuration and easy testing.
  
**Why these were chosen:**

- NestJS provides **modularity, decorators, and dependency injection**, making backend code clean and maintainable.
- JWT + cookies allow **stateless authentication** without storing sessions server-side.
- Passport.js integrates seamlessly with NestJS and supports multiple strategies.
- dotenv allows **easy configuration and testing** without exposing sensitive credentials.

---

## 🗂 Project Structure

src/
├─ auth/ # Authentication controllers, services, and guards
├─ dashboard/ # Dashboard controllers and services
├─ companies/ # Companies API
├─ posts/ # Posts API
├─ main.ts # Application entry point
├─ utils/ # Delay, jitter, and failure simulation helpers
.env # Environment configuration (mock values)

yaml
Copy code

---

## 💾 How to Run Locally

1. **Clone the repository**
```bash
git clone https://github.com/isroil01/assignment_dashboard_backend.git
cd assignment_dashboard_backend
Install dependencies

bash
Copy code
npm install
Add .env file

bash
Copy code
cp .env.example .env
The .env file contains mock values and nothing sensitive. It’s included to make local testing easier.

Run the development server

bash
Copy code
npm run start:dev
The server runs at http://localhost:3005 by default.

🔑 Authentication Flow
Sign Up: User registers with email/password.

Sign In: Returns accessToken (short-lived) and refreshToken (long-lived) via HTTP-only cookies.

Refresh Token: Allows the frontend to get a new access token without re-login.

Protected Routes: Only accessible if valid JWT is present in cookie.

🧩 Features & Assumptions
Simulated latency (200–800ms) and failure (15%) to allow realistic frontend testing.

JWT + cookies ensure secure and stateless authentication.

All data is stored in-memory for simplicity; no database required.

.env exists for easy configuration during local testing.

⚖️ Trade-offs & Notes
No database included to keep focus on frontend integration and assignment requirements.

Passport.js + JWT simplifies auth logic and can be extended to real DB easily.

Delay and failure helpers allow frontend to handle loading, error, and retry logic naturally.

⏱ Time to Complete
Focused Time: ~1–2 hours

Tools Used: VSCode, Node.js, NestJS, Git, GitHub
