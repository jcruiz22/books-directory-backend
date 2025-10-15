# 📚 Books Directory Backend

A RESTful API backend for managing a book collection built with Node.js, Express.js, TypeScript, and MongoDB. This project was created as a practice exercise following basic CRUD operations while implementing additional features and modern development practices.

## 🎯 Project Overview

The Books Directory is a backend API that allows you to manage a collection of books with full CRUD (Create, Read, Update, Delete) functionality. Originally based on a beginner's guide to Node.js and Express.js development, this implementation has been enhanced with TypeScript, modern architecture patterns, and additional features.
Link to initiall instruction [Link](https://www.geeksforgeeks.org/node-js/top-7-nodejs-project-ideas-for-beginners/#:~:text=1.%20Books%20Directory,MongoDB%20(NoSQL%20database).)

## ✨ Features

- **📖 Complete Book Management**: Create, read, update, and delete books
- **🔍 Search Functionality**: Search books by title, author, or genre
- **📊 Database Management**: Full MongoDB integration with Mongoose ODM
- **🛡️ Error Handling**: Comprehensive error handling and validation
- **🚀 RESTful API**: Clean and intuitive API endpoints
- **📝 TypeScript Support**: Full type safety and modern JavaScript features
- **🔄 Auto-reload**: Development server with automatic restart using nodemon
- **🌐 CORS Support**: Cross-origin resource sharing enabled
- **📋 Request Validation**: JSON body parsing and validation

### Original Project Requirements Met:
- ✅ Management of database using POSTMAN
- ✅ Search functionality for books
- ✅ Proper API calls and route connections
- ✅ Implementation of GET, POST, PUT, DELETE methods

### Additional Enhancements:
- 🔧 TypeScript implementation for better code quality
- 🏗️ Modular architecture with separate controllers, models, and routes
- 🛠️ Environment variable configuration
- 🚨 Global error handling middleware
- 📅 Automatic timestamps for created/updated records
- 🔒 Input validation and sanitization

## 🛠️ Technologies Used

### Core Technologies:
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web framework for Node.js
- **TypeScript** - Typed superset of JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling for Node.js

### Development Tools:
- **ts-node** - TypeScript execution environment
- **nodemon** - Development server with auto-restart
- **dotenv** - Environment variable management

### Additional Libraries:
- **cors** - Cross-Origin Resource Sharing
- **body-parser** - HTTP request body parsing (via Express.json())

## 🏗️ Project Architecture

```
books-directory-backend/
├── src/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers and business logic
│   ├── middleware/      # Custom middleware functions
│   ├── models/          # MongoDB/Mongoose models
│   ├── routes/          # API route definitions
│   └── index.ts         # Application entry point
├── .env                 # Environment variables
├── .gitignore          # Git ignore rules
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── README.md           # Project documentation
```

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd books-directory-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_CONNECTION_STRING=mongodb://localhost:27017/books-directory
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

5. **Verify the installation:**
   Open your browser and navigate to `http://localhost:3000`

## 📡 API Endpoints

### Books Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | Get all books |
| GET | `/api/books/:id` | Get a specific book by ID |
| POST | `/api/books` | Create a new book |
| PUT | `/api/books/:id` | Update a book by ID |
| DELETE | `/api/books/:id` | Delete a book by ID |

### Example Request/Response

**POST `/api/books`**
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Classic Literature",
  "publishedYear": 1925
}
```

**Response:**
```json
{
  "status": 201,
  "message": "Book created successfully",
  "data": {
    "_id": "...",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Classic Literature",
    "publishedYear": 1925,
    "createdAt": "2025-10-15T...",
    "updatedAt": "2025-10-15T..."
  }
}
```

## 🧪 Testing with Postman

1. Import the API endpoints into Postman
2. Set the base URL to `http://localhost:3000`
3. Test each endpoint with appropriate request bodies
4. Verify responses and database changes

### Sample Test Data:
```json
[
  {
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "genre": "Fiction",
    "publishedYear": 1960
  },
  {
    "title": "1984",
    "author": "George Orwell",
    "genre": "Dystopian Fiction",
    "publishedYear": 1949
  }
]
```

## 📝 Scripts

- `npm start` - Start the development server with auto-reload
- `npm test` - Run tests (to be implemented)

## 🤝 Contributing

This is a practice project, but contributions and suggestions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📚 Learning Outcomes

This project helped practice and learn:
- RESTful API design principles
- TypeScript integration with Node.js
- MongoDB database operations with Mongoose
- Express.js middleware implementation
- Error handling and validation
- Project structure and organization
- Environment configuration management

## 🔮 Future Enhancements

- [ ] Authentication and authorization
- [ ] Pagination for book listings
- [ ] Advanced search filters
- [ ] Book cover image upload
- [ ] User reviews and ratings
- [ ] API documentation with Swagger
- [ ] Unit and integration tests
- [ ] Docker containerization

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created as a learning project following Node.js and Express.js best practices.

---

*Happy coding! 🚀*