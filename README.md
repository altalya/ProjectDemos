# Property Management - A Simple MERN Application

A full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js) that allows users to manage a list of properties. The application provides basic CRUD (Create, Read, Update, Delete) functionality for properties, along with user authentication.


## Features

- **User Authentication:**
  - User registration and login.
  - JWT-based authentication to secure routes.
- **Property Management:**
  - **Create:** Add new properties with details like name, address, and tenant information.
  - **Read:** View a list of all properties associated with the logged-in user.
  - **Update:** Edit the details of existing properties.
  - **Delete:** (Future feature) Remove properties from the list.

## Tech Stack

### Backend

- **Node.js:** JavaScript runtime environment.
- **Express.js:** Web framework for Node.js.
- **MongoDB:** NoSQL database for storing user and property data.
- **Mongoose:** Object Data Modeling (ODM) library for MongoDB.
- **JWT (JSON Web Tokens):** For secure user authentication.
- **`dotenv`:** For managing environment variables.

### Frontend

- **React:** JavaScript library for building user interfaces.
- **Vite:** Next-generation frontend tooling for fast development.
- **`js-cookie`:** For handling cookies in the browser.
- **CSS:** For styling the components.

## Project Structure

```
/Simple_MERN_App
|-- /backend
|   |-- models
|   |-- routes
|   |-- ...
|-- /frontend
|   |-- /react
|       |-- src
|           |-- components
|           |-- ...
|-- README.md
```

## Getting Started

To get a local copy up and running, please follow these steps.

### Prerequisites

- Node.js (v14 or later)
- npm (Node Package Manager)
- MongoDB (local installation or a cloud service like MongoDB Atlas)

### Setup and Installation

For detailed setup instructions, please refer to the README files in the respective directories:

- **[Backend Setup](./backend/README.md)**
- **[Frontend Setup](./frontend/react/README.md)**


## License

Distributed under the MIT License. See `LICENSE` for more information.
