# Zoom Clone

A full-stack video conferencing web application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.io for real-time communication.

## Features

- **Authentication**: User registration and login system with secure password hashing.
- **Real-time Video**: High-quality video and audio streaming using WebRTC.
- **Meeting Rooms**: Create and join meetings with unique codes.
- **Chat**: In-meeting chat functionality for participants.
- **Screen Sharing**: Ability to share your screen with other participants.
- **Control**: Toggle video and audio on/off during meetings.
- **Responsive UI**: Clean and intuitive interface built with Material UI.

## Tech Stack

- **Frontend**: React.js, Material UI, CSS Modules
- **Backend**: Node.js, Express.js, Socket.io
- **Database**: MongoDB
- **Real-time**: Socket.io, WebRTC (peer-to-peer)

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- MongoDB connection string (update in `backend/src/app.js` if needed).

### Installation

1.  **Clone the repository**:

    ```bash
    git clone <repository_url>
    cd Zoom
    ```

2.  **Install Backend Dependencies**:

    ```bash
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies**:
    ```bash
    cd ../frontend
    npm install
    ```

### Running the Application

1.  **Start the Backend Server**:
    Open a terminal and run:

    ```bash
    cd backend
    npm run dev
    ```

    The server will start on port `8000`.

2.  **Start the Frontend Application**:
    Open a new terminal and run:
    ```bash
    cd frontend
    npm start
    ```
    The application will open in your browser at `http://localhost:3000`.

## Usage

1.  **Register/Login**: Create a new account or log in with existing credentials.
2.  **Dashboard**: After logging in, you will be redirected to the home dashboard.
3.  **Join Meeting**: Enter a meeting code (e.g., `meeting123`) and click "Join".
4.  **Meeting Room**: Allow permissions for camera and microphone. You can now communicate with others in the room.

## Contributing

Feel free to open issues or submit pull requests for improvements.
