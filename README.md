# The Vedas Institute - Frontend

A modern education platform built with React, Firebase, and Tailwind CSS.

## Features

- 🔐 **Authentication System** - Email/password and Google sign-in
- 📚 **Course Management** - Browse and purchase courses
- 🧠 **RAG System** - PDF analysis with intelligent insights
- 🎥 **Web Conferencing** - Live study sessions
- 💳 **Payment Integration** - Secure payment processing
- 📱 **Responsive Design** - Works on all devices

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Firebase Configuration
Create a `.env` file in the root directory with your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Firebase Project Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication
4. Add Email/Password and Google sign-in methods
5. Get your configuration from Project Settings

### 4. Run Development Server
```bash
npm run dev
```

## Project Structure

```
src/
├── components/          # Reusable components
│   └── ProtectedRoute.jsx
├── contexts/           # React contexts
│   └── AuthContext.jsx
├── pages/             # Page components
│   ├── Login.jsx
│   ├── Signup.jsx
│   └── Dashboard.jsx
├── config/            # Configuration files
│   └── firebase.js
└── App.jsx           # Main app component
```

## Authentication Flow

1. **Public Routes**: `/login`, `/signup` - Anyone can access
2. **Protected Routes**: `/dashboard` - Requires authentication
3. **Auto Redirect**: Unauthenticated users are redirected to login

## Next Steps

- [ ] Add course listing page
- [ ] Implement payment gateway
- [ ] Build RAG system interface
- [ ] Add web conferencing features
- [ ] Create user profile management

## Technologies Used

- **React 19** - Frontend framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Firebase** - Authentication & backend
- **React Router** - Navigation
- **Lucide React** - Icons
