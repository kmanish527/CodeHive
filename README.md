# 🐝 CodeHive

A brief one-sentence description of what CodeHive does. For example: "A realtime collaborative platform for developers to share and discover code snippets."

## ✨ Live Demo

[Check out the live application here!](https://codeehive.netlify.app/)

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [📸 Screenshots](#-screenshots)
- [🚀 Tech Stack](#-tech-stack)
- [📂 Folder Structure](#-folder-structure)
- [🛠️ Getting Started](#️-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [🏃 Running the Project](#-running-the-project)
- [🌐 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)

---

## 📖 About The Project

[Provide a more detailed description of your project here. Explain the problem it solves, the features it has, and your motivation for building it. Talk about the user journey and what makes your project stand out.]

### Features

-   **Feature 1:** [e.g., User Authentication with JWT]
-   **Feature 2:** [e.g., Create, Read, Update, and Delete code snippets]
-   **Feature 3:** [e.g., Syntax highlighting for multiple languages]
-   **Feature 4:** [e.g., Real-time collaboration features]

---

## 📸 Screenshots

![CodeHive Homepage]
<img width="1917" height="911" alt="image" src="https://github.com/user-attachments/assets/0d17335a-b878-4118-a5e8-289bd0dd8f4f" />

![CodeHive Editorpage]
<img width="1919" height="897" alt="image" src="https://github.com/user-attachments/assets/3fe0949c-ddcc-4528-abf8-9d40c3227ea8" />

![CodeHive Realtime Code Sharing]
<img width="1919" height="910" alt="image" src="https://github.com/user-attachments/assets/1a32516a-f903-4583-95a6-8f6089d8407d" />

---

## 🚀 Tech Stack

This project is a monorepo built with the following technologies:

| Category      | Technology                                                                                                                              |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend** | ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)  |
| **Deployment**| ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)                                     |

---

## 📂 Folder Structure

The project uses a monorepo structure to manage the frontend and backend code in the same repository.

CODEHIVE/
├── codehive-backend/      # Express.js REST API
├── codehive-frontend/     # Vite + React Frontend
├── netlify/
│   └── functions/
│       └── api.js         # Serverless function handler for Express
├── .gitignore
├── netlify.toml           # Netlify deployment configuration
└── README.md


---

## 🛠️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [Git](https://git-scm.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/kmanish527/CodeHive.git](https://github.com/kmanish527/CodeHive.git)
    cd codehive
    ```

2.  **Install backend dependencies:**
    ```bash
    npm install --prefix codehive-backend
    ```

3.  **Install frontend dependencies:**
    ```bash
    npm install --prefix codehive-frontend
    ```

### Environment Variables

You will need to create `.env` files for both the frontend and backend.

1.  **Backend Environment:**
    Create a `.env` file in the `codehive-backend` directory.
    ```
    # codehive-backend/.env
    PORT=5000
    CORS_ORIGIN=http://localhost:5173
    ```

2.  **Frontend Environment:**
    Create a `.env.local` file in the `codehive-frontend` directory. The Vite proxy will handle API requests in development.
    ```
    # codehive-frontend/.env.local
    VITE_BACKEND_URL=http://localhost:5000
    ```
---

## 🏃 Running the Project

To run both the frontend and backend servers concurrently in development mode, use the following command from the **root directory**:

```bash
cd .\codehive-frontend\
npm run dev
The frontend development server will start on http://localhost:5173.

cd .\codehive-backend\
npm start
The backend server will start on http://localhost:5000 (or your specified PORT).


🌐 Deployment
This application is deployed on Netlify.

The frontend is served as a static site from the codehive-frontend/dist directory.

The Express.js backend is deployed as a Netlify Serverless Function.

The netlify.toml file contains all the necessary build and redirect configurations. Any request to /api is automatically routed to the serverless backend.

🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📝 License
Distributed under the MIT License. See LICENSE file for more information.
