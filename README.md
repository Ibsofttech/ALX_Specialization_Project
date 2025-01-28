# Physioblog

A full-stack blog website built with **Node.js**, **Express**, **MongoDB**, and **EJS**. This application allows users to register, log in, create posts, view posts, and search for posts. It also includes authentication and authorization features using JSON Web Tokens (JWT).

***

## Features
### User Authentication:
- Register and log in with email and password.
- Password hashing using **bcryptjs**.
- JWT-based authentication for secure access.
### Blog Functionality:
- Create, read, and delete blog posts.
- View all posts on the blog page.
- Search for posts by title.
### Authorization:
- Only authenticated users can create or delete posts.
- Users can only delete their own posts.
### Responsive Design:
- Built with **EJS** templates for server-side rendering.
- Static files served using **Express**.

***

## Technologies Used
### Backend:
- Node.js
- Express.js
- MongoDB (with Mongoose for ODM)
- bcryptjs (for password hashing)
- jsonwebtoken (for authentication)

### Frontend:
- EJS (Embedded JavaScript templates)
- HTML/CSS
- Bootstrap (for styling)

### Other Tools:
- dotenv (for environment variables)
- cookie-parser (for handling cookies)
- nodemon

***

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org) (v16 or higher)

- [MongoDB](https://www.mongodb.com/) (running locally or a connection string for a remote database)

***

## Installation

1. **Clone the repository**

```
```bash
git clone https://github.com/Ibsofttech/ALX_Specialization_Project.git

cd ALX_Specialization_Project

```
2. **Install dependencies**

```
```bash
npm install
```

3. **Set up environment variables**
```
```env
PORT=3000
JWT_SECRET=your_jwt_secret_key
```

4. **Start the server**
```
```bash
npm start
```
5. **Access the application**
- Open your browser and navigate to **http://localhost:3000**.

---

## API Endpoints

| Method | Endpoint           | Description                        |
|--------|--------------------|------------------------------------|
| GET    | `/`                | Home page                          |
| GET    | `/login`           | Login page                         |
| GET    | `/register`        | Registration page                  |
| POST   | `/login`           | Authenticate user                  |
| POST   | `/register`        | Register a new user                |
| GET    | `/blog`            | View all blog posts                |
| GET    | `/create-post`     | Page to create a new post          |
| POST   | `/create-post`     | Create a new blog post             |
| GET    | `/posts/:id`       | View a single blog post            |
| POST   | `/posts/:id/delete`| Delete a blog post                 |
| GET    | `/search`          | Search for posts by title          |
| POST   | `/logout`          | Log out the user                   |                       |

---

## Contributing
Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.

2. Create a new branch for your feature or bugfix.

3. Commit your changes.

4. Push your branch and submit a pull request.

## Contact
For questions or feedback, please reach out:

- Your Name: **MUIBI IBRAHIM KAYODE**

Email: ibrahimthesofttech@gmail.com.com

GitHub: **Ibthesofttech**