# 📚 Book & Reader Management System (Node.js + MongoDB CLI App)

This project is a **Node.js-based CLI application** with an **Express server** and a **MongoDB backend**, allowing you to manage readers and books through a simple command-line interface.

## 🚀 Features

* Add and remove readers
* Add and search books
* Search readers by name or ID
* Retrieve all readers or all books
* Fully RESTful backend using Express.js
* Data stored and managed using MongoDB via Mongoose

---

## 🗂️ Project Structure

```
📁 project-root
├── server.js         # Express server handling all API endpoints
├── cli.js            # CLI interface for interacting with the server
├── .env              # Environment variables (MongoDB URI & PORT)
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/book-reader-management.git
cd book-reader-management
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add your MongoDB URI:

```
PORT=8080
MONGO_URI=mongodb://localhost:27017/your-database-name
```

### 4. Run the Server

```bash
node server.js
```

You should see:

```
Server is running at http://localhost:8080
Connected to MongoDB
```

### 5. Run the CLI

In a new terminal:

```bash
node cli.js
```

You’ll get a menu like:

```
--- CLI Menu ---
1. Add Reader
2. Remove Reader
3. Search Reader
4. Get All Readers
5. Add Book
6. Search Book
7. Get All Books
8. Exit
```

---

## 🧠 Technologies Used

* **Node.js**
* **Express.js**
* **MongoDB + Mongoose**
* **Axios**
* **readline (for CLI)**
* **dotenv**
* **qs** (for form-urlencoded payloads)

---

## 📌 Notes

* All data input from the CLI is sent as `application/x-www-form-urlencoded`.
* Basic error handling and input validation is included.
* Future enhancements might include:

  * Better CLI experience (like inquirer.js)
  * Data validation with Joi or Zod
  * Docker support

