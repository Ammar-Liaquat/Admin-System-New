## Features

* Admin Authentication using JWT (Access Token & Refresh Token)
* Secure password hashing using bcrypt
* Role-based authorization (Admin / User)
* CRUD operations for user management
* File upload using Multer
* Input validation using Joi
* Pagination for better data handling
* Middleware-based architecture
* Environment configuration using dotenv
* Secure headers using Helmet
* CORS enabled API

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (JSON Web Token)
* bcrypt
* Joi Validation
* Multer
* Helmet
* dotenv

## Project Structure

```
Admin-System-New
│
├── controllers
├── middleware
├── models
├── routes
├── services
├── repository
├── utils
├── config
├── uploads
│
├── app.js
├── server.js
└── package.json
```

## Installation

Clone the repository

```
git clone https://github.com/Ammar-Liaquat/Admin-System-New.git
```

Install dependencies

```
npm install
```

Create `.env` file

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run the server

```
npm start
```

For development

```
npm run dev
```

## API Features

* Admin login
* Create user
* Update user
* Delete user
* Get all users with pagination
* Block / Unblock users
* Upload files

## Security

* Password hashing using bcrypt
* JWT authentication
* Middleware protected routes
* Input validation using Joi

## Future Improvements

* Email verification
* Forgot password system
* Rate limiting
* Docker support
* CI/CD pipeline

## Author

Ammar Liaquat
Backend Developer (Node.js)

GitHub: https://github.com/Ammar-Liaquat
