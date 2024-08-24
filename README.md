# Project Name

This project is a Node.js application designed to manage courses and users, with functionalities such as user authentication and course management. Below is a detailed overview of the libraries used and the database setup.

## Libraries Used

This application utilizes the following Node.js libraries:

- **bcrypt** (`^5.1.1`): For hashing passwords securely.
- **cookie-parser** (`^1.4.6`): To parse cookies attached to the client request object.
- **dotenv** (`^16.4.5`): To manage environment variables.
- **express** (`^4.19.2`): A web application framework for building RESTful APIs.
- **joi** (`^17.13.3`): For data validation.
- **jsonwebtoken** (`^9.0.2`): To handle JSON Web Tokens (JWT) for authentication.
- **lodash** (`^4.17.21`): A utility library for working with arrays, numbers, objects, strings, etc.
- **mysql2** (`^3.11.0`): A MySQL client for Node.js, supporting modern MySQL features.
- **nodemon** (`^3.1.4`): A tool for automatically restarting the Node.js server on code changes during development.
- **winston** (`^3.14.2`): A logging library for capturing errors and other logs.

## Database Setup

This application requires a MySQL database with two tables: `courses` and `users`.

### `courses` Table

- **id**: INTEGER, Primary Key, Auto-increment
- **title**: VARCHAR, Title of the course (e.g., "Introduction to Node.js")
- **date**: TIMESTAMP, The date when the course was created, with a default value of `CURRENT_TIMESTAMP`

### `users` Table

- **id**: VARCHAR(50), Primary Key, generated using `uuid()`
- **name**: VARCHAR, The name of the user (e.g., "John Doe")
- **email**: VARCHAR, The email address of the user, unique for each user
- **password**: VARCHAR, The hashed password of the user (hashed using `bcrypt`)

## Database Schema Setup

To set up the database schema, use the following SQL statements:

```sql
CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
