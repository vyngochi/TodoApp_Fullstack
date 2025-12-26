# TodoApp Fullstack

## Overview

TodoApp Fullstack is a comprehensive full-stack application designed to manage tasks efficiently. It features a robust backend built with Node.js and Prisma, and a modern frontend developed using React, TypeScript, and Vite. The application supports user authentication, task management, and email notifications, making it a versatile solution for personal or team productivity.

## Features

- **User Authentication**: Secure login and registration with JWT and bcrypt.
- **Task Management**: Create, update, and manage tasks with due dates and completion status.
- **Email Notifications**: OTP-based email verification using Nodemailer.
- **Responsive Design**: A user-friendly interface optimized for various devices.
- **State Management**: Efficient state handling with React Query and Zustand.
- **Calendar Integration**: Visualize tasks with a calendar view.

## Technologies Used

### Backend

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for building RESTful APIs.
- **Prisma**: ORM for database management with SQL Server.
- **TypeScript**: Strongly typed JavaScript for better code quality.
- **Nodemailer**: Email handling for OTP.
- **Day.js**: Lightweight date manipulation library.

### Frontend

- **React**: Component-based UI library.
- **TypeScript**: Ensures type safety and scalability.
- **Vite**: Fast development server and build tool.
- **Chakra UI**: Modern and accessible component library.
- **Styled-Components**: CSS-in-JS for styling.
- **React Query (Tanstack Query)**: Data fetching and state management.
- **Ant Design**: UI components for enhanced user experience.
- **UIVerse**: Largest Library of Open-Source UI

### Database

- **SQL Server**: Relational database for structured data storage.

### Other tools
- **GEMINI**: Used for content generation, idea brainstorming, and feature suggestions during development.
- **ChatGPT**: Assisted in problem-solving, debugging, backend logic, and technical documentation.
- **Claude**: Contributed approximately 50% to frontend UI development, including layout structuring, component styling, and UI/UX improvements.

## Installation

### Prerequisites

- Node.js (v16+)
- SQL Server
- npm or yarn

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file based on `.env.example`.
   - Add database connection details and JWT secrets.
4. Run the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

### Backend
📦src
 ┣ 📂config
 ┣ 📂controllers
 ┣ 📂middlewares
 ┣ 📂routes
 ┣ 📂services
 ┣ 📂types
 ┣ 📂utils

### Frontend
📦src
 ┣ 📂api
 ┣ 📂components
 ┃ ┣ 📂auth
 ┃ ┣ 📂common
 ┃ ┣ 📂modals
 ┃ ┗ 📂ui
 ┣ 📂config
 ┣ 📂hooks
 ┣ 📂layouts
 ┣ 📂model
 ┣ 📂pages
 ┣ 📂router
 ┣ 📂store
 ┣ 📂utils
 ┃ ┣ 📂Effects
 ┃ ┣ 📂Messages
 ┃ ┣ 📂Validation
 
## Scripts

### Backend

- `npm run dev`: Start the backend in development mode.

### Frontend

- `npm run dev`: Start the frontend development server.
- `npm run build`: Build the frontend for production.
- `npm run lint`: Run ESLint for code quality checks.

## License

This project is licensed under the ISC License.
