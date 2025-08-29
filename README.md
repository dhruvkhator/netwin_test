# Netwin Task Manager

A full-stack task management web app built with React (frontend) and Node.js/Express/MongoDB (backend).

## Features
- User authentication (signup/login)
- JWT-based protected routes
- Task CRUD (create, read, update, delete)
- Status filtering and updating
- Responsive, modern UI

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm (comes with Node.js)
- MongoDB (local or Atlas)

### Setup

#### 1. Clone the repository
```sh
git clone https://github.com/dhruvkhator/netwin_test.git
cd netwin_test
```

#### 2. Backend Setup
```sh
cd backend
npm install
```
- Create a `.env` file in `backend/` with:
  ```env
  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  ```
- Start the backend:
```sh
npm run dev
```

#### 3. Frontend Setup
```sh
cd ../frontend
npm install
npm run dev
```

#### 4. Access the App
- Open your browser and go to: [http://localhost:5173](http://localhost:5173)

## Notes
- Make sure MongoDB is running and accessible.
- The backend runs on `http://localhost:5000` by default.
- The frontend runs on `http://localhost:5173` by default.

## Contributing
Pull requests are welcome!

## License
MIT
