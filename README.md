# WalletX

A modern, full-stack digital wallet application built with React and Express.js for secure financial transactions and account management.

## 📋 Description

WalletX is a comprehensive wallet management system that provides users with a secure platform to manage their finances. The application features user authentication, transaction tracking, and wallet management capabilities with a responsive React frontend and robust Express.js backend.

## 🎯 Features

- **User Authentication**: Secure login and registration with JWT-based authentication
- **Wallet Management**: Create and manage multiple digital wallets
- **Transaction Tracking**: Monitor and record financial transactions
- **Secure Data**: Password encryption with bcryptjs
- **RESTful API**: Comprehensive backend API with MongoDB integration
- **Responsive UI**: Modern React interface with Tailwind CSS styling
- **Input Validation**: Zod schema validation for data integrity

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework

### Backend
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Zod** - Schema validation

## 📁 Project Structure

```
WalletX/
├── client/              # React frontend application
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── server/              # Express backend application
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── package.json
│   └── .env
├── postman/             # API documentation and collections
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/deepakydv641/WalletX.git
cd WalletX
```

2. **Install Backend Dependencies**
```bash
cd server
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../client
npm install
```

### Configuration

1. **Backend Setup** - Create a `.env` file in the `server` directory:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

2. **Frontend Setup** - Update API endpoints in the client as needed

### Running the Application

**Start Backend Server**
```bash
cd server
npm start
```

**Start Frontend Development Server**
```bash
cd client
npm run dev
```

The application will be available at `http://localhost:5173` (frontend) and `http://localhost:5000` (backend API).

## 📚 Available Scripts

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Server
- `npm start` - Start the server

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- CORS protection
- Input validation with Zod
- Secure environment variables

## 📖 API Documentation

API endpoints and examples are documented in the `/postman` directory. Import the Postman collection to explore all available endpoints.

## 🤝 Contributing

Contributions are welcome! Feel free to submit pull requests or open issues for bugs and feature requests.

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**deepakydv641**
- GitHub: [@deepakydv641](https://github.com/deepakydv641)

---

**Made with ❤️ for secure financial management**
