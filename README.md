# 🚀 Team Task Manager (Ethara Assignment)

A high-performance, minimalist Team Task Manager built with **Next.js 15**, **MongoDB**, and **Paper Design Shaders**. This application allows teams to manage projects, track tasks, and collaborate with role-based access control.

## ✨ Key Features

- **Authentication**: Secure Signup/Login with JWT and Bcrypt encryption.
- **Role-Based Access Control (RBAC)**:
  - **Admin**: Create projects, create and assign tasks, view team members.
  - **Member**: View assigned tasks and update task status.
- **Project Management**: Create and organize projects with descriptions and owners.
- **Task Tracking**:
  - Task creation with due dates and project assignment.
  - Real-time status updates (Pending, In Progress, Completed).
  - Visual tracking of overdue tasks.
- **Dashboard**: High-level overview of project stats and recent activities.
- **Team Management**: View all team members and their roles.
- **Aesthetics**: Brutalist "Paper Design" UI with interactive shaders for a premium feel.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Mongoose ODM)
- **Styling**: Vanilla CSS with [Paper Design Shaders](https://paper-design.com/)
- **Auth**: JWT (Jose) & BcryptJS
- **Deployment**: [Railway](https://railway.app/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Connection String

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/barelysomethin/task-manager.git
   cd task-manager
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_random_secret_key
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## 🌐 Deployment

This app is optimized for deployment on **Railway**. 

1. Connect your GitHub repository to Railway.
2. Add your environment variables in the Railway dashboard.
3. Deploy!

## 📦 Submission Details

- **Live URL**: [Pending Deployment]
- **GitHub Repo**: [barelysomethin/task-manager](https://github.com/barelysomethin/task-manager.git)
- **Demo Video**: [Link to 2-5 min demo]

---
Created for the Ethara Full-Stack Developer Assignment.
