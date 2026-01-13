# Zoom Clone

This project was built as a hands-on learning initiative to deeply understand full-stack development, real-time communication, WebRTC, and production deployment workflows.

A modern Zoom-like video conferencing platform that enables users to connect through high-quality video/audio, real-time interactions, and a premium dark glassmorphism UI.

##  Live Demo

###  Frontend (Vercel)

👉 [https://zoom-idqf-hf6digmrn-khushi-roys-projects-81ea4e18.vercel.app/](https://zoom-idqf-hf6digmrn-khushi-roys-projects-81ea4e18.vercel.app/)

### ⚙️ Backend (Render)

👉 [https://zoom-2-bnqp.onrender.com](https://zoom-2-bnqp.onrender.com)

_(Backend may take a few seconds to wake up on first request due to free-tier hosting)_

##  Preview

![App Preview](./landing_preview.png)

##  Tech Stack

###  Frontend

- **React.js** – Component-based UI architecture
- **Material UI (MUI)** – Accessible, responsive, and customizable UI components
- **CSS Modules** – Scoped styling for a clean Dark Glassmorphism aesthetic

###  Backend

- **Node.js & Express.js** – RESTful API and server logic
- **Socket.io** – Real-time bi-directional communication

###  Database

- **MongoDB (Atlas)** – NoSQL database for flexible user & meeting data

###  Core Technology

- **WebRTC** – Peer-to-peer video & audio streaming

##  Key Features

-  **HD Video & Audio Calls**
-  **Real-Time Peer-to-Peer Communication**
-  **Raise Hand & Emoji Reactions**
-  **Screen Sharing**
-  **Secure Authentication**
-  **Premium Dark UI with Glassmorphism**
-  **Fully Responsive Design**

##  Challenges Faced & Solutions

### 1️⃣ Mesh Network Implementation

**Challenge:**
Managing multiple peer-to-peer connections without overloading the client.

**Solution:**
Built a Socket.io-based signaling server to efficiently exchange SDP offers/answers and ICE candidates.

### 2️⃣ Real-Time State Synchronization

**Challenge:**
Instantly syncing actions like mute, raise hand, and reactions across all users.

**Solution:**
Designed a custom socket event system (`meeting-interaction`) that broadcasts only state deltas for low-latency updates.

### 3️⃣ Modern UI/UX Design

**Challenge:**
Avoiding generic UI frameworks while building a premium-looking interface.

**Solution:**
Deep customization of Material UI themes combined with CSS effects like blur, gradients, and floating control docks.

### 4️⃣ Media Device Resource Management

**Challenge:**
Camera/microphone locking issues due to multiple access requests.

**Solution:**
Centralized media stream handling to ensure unified and conflict-free device access.

##  Run Locally

### Prerequisites

- Node.js v14+
- MongoDB (Local or Atlas)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Khushi-Roy-123/Zoom.git
cd Zoom
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
MONGO_URL=your_mongodb_connection_string
PORT=8000
```

Start the backend:

```bash
npm run dev
```

Backend runs at: `http://localhost:8000`

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs at: `http://localhost:3000`

##  Deployment

- Frontend deployed on **Vercel**
- Backend deployed on **Render**
- Environment variables used to support production-ready configuration
- No hardcoded localhost usage in production

## 📌 What I Learned

- Real-time communication using WebRTC & Socket.io
- Full-stack project structuring
- Environment-based deployments
- Debugging production issues (CORS, env vars, hosting limits)
- Building scalable, clean UI systems

## ❤️ Acknowledgements

Built with passion, curiosity, and countless debugging sessions ☕
This project represents my growth as a Full-Stack Developer.

## 👩‍💻 Author

**Khushi Roy**
CSE (AI & ML) | Web Developer | AI Enthusiast
