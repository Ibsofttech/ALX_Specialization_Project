# Blog Application

A full-stack blog application built with **Node.js**, **Express**, **MongoDB**, and **EJS**. This application allows users to register, log in, create posts, view posts, and search for posts. It also includes authentication and authorization features using JSON Web Tokens (JWT).

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

- Node.js (v16 or higher)

- MongoDB (running locally or a connection string for a remote database)

***

## Installation

```bash
git clone https://github.com/Ibsofttech/ALX_Specialization_Project.git

