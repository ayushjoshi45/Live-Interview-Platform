# Live Interview Platform

A real-time collaborative interview platform that enables developers to conduct and participate in live coding sessions with video, chat, and screen sharing capabilities.

## 🎯 Project Overview

Live Interview is a full-stack application that allows users to:
- Create live coding interview sessions with specific problems and difficulty levels
- Join active sessions as participants
- Conduct real-time video calls and chats
- Share and collaborate on coding problems
- Track session history and past interviews

## 🏗️ Tech Stack

### Backend
- **Node.js & Express.js** - Server framework
- **MongoDB** - Database for storing sessions and user data
- **Stream.io** - Video calling and chat functionality
- **Clerk** - User authentication
- **Inngest** - Background job processing

### Frontend
- **React** - UI framework
- **Vite** - Build tool and dev server
- **CSS** - Styling

## 📁 Project Structure

```
Live-Interview/
├── Backend/
│   ├── .env                          # Backend environment variables
│   ├── package.json                  # Backend dependencies
│   └── src/
│       ├── server.js                 # Express server entry point
│       ├── controller/
│       │   ├── chatController.js     # Chat-related endpoints
│       │   └── sessionController.js  # Session management endpoints
│       ├── lib/
│       │   ├── db.js                 # MongoDB connection
│       │   ├── env.js                # Environment variable validation
│       │   ├── inngest.js            # Background job configuration
│       │   └── stream.js             # Stream.io client setup
│       ├── middleware/
│       │   └── protectRoute.js       # Authentication middleware
│       ├── models/
│       │   ├── Session.js            # Session database schema
│       │   └── User.js               # User database schema
│       └── routes/
│           ├── chatRoutes.js         # Chat API routes
│           └── sessionRoutes.js      # Session API routes
├── Frontend/
│   ├── .env                          # Frontend environment variables
│   ├── package.json                  # Frontend dependencies
│   ├── vite.config.js                # Vite configuration
│   ├── index.html                    # HTML entry point
│   └── src/
│       ├── main.jsx                  # React app entry point
│       ├── App.jsx                   # Main App component
│       ├── App.css                   # App styles
│       ├── index.css                 # Global styles
│       ├── assets/                   # Static assets
│       └── public/                   # Public files
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)
- **Stream.io account** (for video/chat)
- **Clerk account** (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Live-Interview
   ```

2. **Install Backend Dependencies**
   ```bash
   cd Backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd Frontend
   npm install
   ```

### Environment Configuration

#### Backend Setup

Create a `.env` file in the `Backend/` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/live-interview
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/live-interview

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx

# Stream.io
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

# Inngest (Optional - for background jobs)
INNGEST_EVENT_KEY=your_inngest_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
```

#### Frontend Setup

Create a `.env` file in the `Frontend/` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000

# Clerk
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx

# Stream.io
VITE_STREAM_API_KEY=your_stream_api_key
```

### Running the Application

#### Start Backend Server

```bash
cd Backend
npm run dev
# OR
npm start
```

The backend server will run on `http://localhost:5000` (or your configured PORT)

#### Start Frontend Development Server

```bash
cd Frontend
npm run dev
```

The frontend will run on `http://localhost:5173` (default Vite port)

## 📡 API Endpoints

### Session Management

- **POST** `/api/sessions/create` - Create a new interview session
  - Body: `{ problem: string, difficulty: string }`
  - Auth: Required

- **GET** `/api/sessions/active` - Get all active sessions
  - Auth: Required

- **GET** `/api/sessions/my-recent` - Get user's recent completed sessions
  - Auth: Required

- **GET** `/api/sessions/:id` - Get session details by ID
  - Auth: Required

- **POST** `/api/sessions/:id/join` - Join an existing session
  - Auth: Required

- **POST** `/api/sessions/:id/end` - End a session
  - Auth: Required

### Chat (via Stream.io)

Chat functionality is handled through Stream.io's SDK with real-time messaging capabilities.

## 🔑 Key Features Explained

### Session Creation
- Creates a MongoDB session record
- Initializes Stream.io video call
- Sets up dedicated chat channel
- Returns session details with call ID

### Active Sessions
- Fetches all sessions with "Active" status
- Populates host information
- Returns latest 20 sessions

### Session History
- Retrieves completed sessions where user was host or participant
- Sorted by most recent first

## 🔒 Authentication

The project uses Clerk for authentication. The `protectRoute` middleware ensures that only authenticated users can access protected endpoints.

## 📦 Database Models

### Session Model
- Stores interview session details
- Tracks problem, difficulty, host, participants
- Manages session status (Active/Completed)
- Links to Stream.io call ID

### User Model
- Stores user profile information
- Links to Clerk authentication

## 🛠️ Development

### Backend Structure

- **Controllers** - Handle business logic
- **Routes** - Define API endpoints
- **Models** - Define database schemas
- **Middleware** - Handle request processing
- **Lib** - Utility functions and configurations
  - `db.js` - Database connection
  - `stream.js` - Stream.io client setup
  - `env.js` - Environment validation
  - `inngest.js` - Background jobs

## 📝 Notes

- Make sure MongoDB is running before starting the backend
- Stream.io and Clerk credentials must be valid for the application to work
- The frontend expects the backend to be running on the configured API URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

[Add your license information here]

## 🐛 Known Issues

- Session join functionality is not yet implemented (returns placeholder response)
- End session functionality is not yet implemented (returns placeholder response)
- Session details endpoint is not yet implemented (returns placeholder response)

## 🚧 Future Enhancements

- Implement session participant management
- Add code editor integration
- Implement session recording
- Add real-time collaboration features
- Enhanced analytics and reporting

## 📧 Support

For any questions or issues, please open an issue in the repository.
