# NestJS Todo API

A RESTful API for a simple todo list manager, built with NestJS, TypeScript, and Prisma. This project serves as a demonstration of modern backend development practices, including JWT authentication, robust validation, and a clean, modular architecture.

![Alt Text](nest.png)

---

## Features

-   **JWT-based Authentication**: Secure user registration and login endpoints.
-   **Protected Routes**: All todo-related endpoints require a valid access token.
-   **Full CRUD Functionality**: Create, Read, Update, and Delete operations for user-specific todos.
-   **Validation**: DTO-based validation for all incoming request bodies using `class-validator`.
-   **API Documentation**: Auto-generated and detailed API documentation with Swagger.

---

## Tech Stack

-   **Framework**: [NestJS](https://nestjs.com/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **ORM**: [Prisma](https://www.prisma.io/)
-   **Database**: [MongoDB](https://www.mongodb.com/)
-   **Authentication**: [JWT](https://jwt.io/) with [Passport.js](http://www.passportjs.org/)
-   **Validation**: [class-validator](https://github.com/typestack/class-validator) & [class-transformer](https://github.com/typestack/class-transformer)

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/en/) (v18 or later recommended)
-   [npm](https://www.npmjs.com/)
-   A running [MongoDB](https://www.mongodb.com/try/download/community) instance (must be running as a replica set for Prisma transactions).

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/mohammadhasanii/NestTodo-API.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd NestTodo-API
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Configure environment variables:**
    Create a `.env` file in the root of the project by copying the example file:
    ```bash
    cp .env.example .env
    ```
    Then, update the `.env` file with your specific configuration.

    ```env
    # The connection string for your MongoDB instance.
    # Note: ?replicaSet=rs0 is required if your MongoDB is running as a replica set.
    DATABASE_URL="mongodb://localhost:27017/db?replicaSet=rs0"

    # A strong, secret key for signing JWTs
    JWT_SECRET="YOUR_SUPER_SECRET_KEY"
    JWT_EXPIRES_IN="1h"
    ```

### Running the Application

To run the application in development mode with hot-reloading:

```bash
npm run start:dev