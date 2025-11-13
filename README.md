# 📚 Quiz Builder Frontend

A frontend application for creating and viewing quizzes.  
Built with **React**, **TypeScript**, and **Redux Toolkit**, communicating with a **RESTful API**.

---

## 🔧 Tech Stack

- ⚛️ **React.js + TypeScript** (with Vite)
- 🧠 **Redux Toolkit** (with `createAsyncThunk`) for global state management
- 📝 **Formik + Yup** for robust form validation
- 🌐 **React Router DOM** (with `React.lazy`) for navigation and lazy loading
- 📱 **CSS Modules (Mobile First)** for responsive design

## ✨ Features

- ✅ **Quiz Creation:** Dynamically add questions with support for four types:
  - **Single Choice** – one correct answer
  - **Multiple Choice** – multiple correct answers
  - **True / False** – boolean type
  - **Open Input** – free text answer
- 📋 **Quiz List:** View all created quizzes with options to open details or delete them
- 🔍 **Quiz Details Page:** View full quiz structure with highlighted correct answers (read-only mode)
- 🛡️ **Strict Validation:** Complete form validation with **Yup** before submitting to the backend

## 🚀 Local Setup

Before starting, make sure your backend is running and available at  
`http://localhost:3000`.

### 1. Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd <project-folder>

# Install dependencies
npm install
```
### 2. Environment Configuration

Create a `.env` file in the root folder of the project and specify the URL of your local or remote API:
```bash
# .env
# Use localhost:3000/api for local development
VITE_API_URL=http://localhost:3000/api
```
### 3. Run the Application
```bash
Start the development server (Vite)
npm run dev
```
The app will be available at `http://localhost:5173` (or another Vite port).

## ☁️ Deployment

The app is configured to work with external environment variables,
which makes deployment on Vercel or Netlify simple and flexible.
