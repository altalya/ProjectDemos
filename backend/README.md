# Backend Setup

This document provides instructions for setting up and running the backend server.

## Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB

## Installation

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the `backend` directory.

2. Add the following environment variables to the `.env` file:
   ```
   PORT=5001
   MONGO_URI=<your_mongodb_connection_string>
   ```

   Replace `<your_mongodb_connection_string>` with your actual MongoDB connection string.

## Running the Server

To run the server in development mode with automatic restarts, use nodemon:

```bash
nodemon index.js
```

The server will start on the port specified in your `.env` file (e.g., 5001).
