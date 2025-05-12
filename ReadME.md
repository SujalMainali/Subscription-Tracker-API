# Subscription Tracker API

---

## Overview
The **Subscription Tracker API** is a backend service designed to help users manage and track their subscriptions efficiently. It provides features such as user authentication, subscription management, and automated reminders for upcoming subscription renewals. Built with Node.js, Express, MongoDB, and Upstash Workflow, it leverages modern technologies for secure, scalable, and reliable operation.

---

## Features

### User Management
- **Registration & Login**  
  Secure user sign-up and sign-in with hashed passwords.
- **JWT Authentication**  
  JSON Web Tokens for stateless, secure API access.

### Subscription Management
- **CRUD Operations**  
  Create, read, update, and delete subscriptions.
- **Categorization**  
  Organize subscriptions by type (e.g., entertainment, utilities, health).
- **Automated Renewal Calculation**  
  Automatically compute next renewal dates based on subscription frequency.

### Automated Reminders
- **Configurable Intervals**  
  Reminders at 7, 5, 3, and 1 day before renewal.
- **Upstash Workflow Integration**  
  Durable scheduling, retries, and checkpointing for reminder delivery.

### Rate Limiting & Security
- **Arcjet Middleware**  
  Bot detection, DDoS protection, and scraping prevention.  
- **Rate Limiting**  
  Fair-use enforcement across all endpoints.

---

## Technologies Used
- **Node.js** — JavaScript runtime  
- **Express** — Web framework for RESTful APIs  
- **MongoDB** & **Mongoose** — NoSQL database and ODM  
- **Upstash Workflow** — Workflow orchestration & scheduling  
- **Arcjet** — Security & rate-limiting middleware  
- **JWT** — JSON Web Tokens for authentication  
- **dotenv** — Environment variable management
- **nodemailer** — Email Notification Sending

---

## Installation

### Prerequisites
- Node.js v16+  
- MongoDB (local or cloud)  
- Upstash Workflow (local or cloud setup)

### Steps

1. **Clone the repository**  
   ```bash
   gh repo clone SujalMainali/Subscription-Tracker-API
   cd Subscription-Tracker-API

2. **Install Dependencies** 
   ```bash
   npm install

3. **Configure Environmental Variables**
   - Save these configuration in file named .env.development.local

   - PORT=5500
   - SERVER_URL="http://localhost:5500"
   - NODE_ENV="development"
   - DB_URI="your_mongodb_connection_string"
   - JWT_SECRET="your_jwt_secret"
   - JWT_EXPIRES_IN="3d"
   - ARCJET_ENV="development"
   - ARCJET_KEY="your_arcjet_key"
   - QSTASH_URL="http://127.0.0.1:8080"
   - QSTASH_TOKEN="your_qstash_token"
   - EMAIL="emailOfOrganization"
   - EMAIL_PASSWORD= "PasswordFromAppPasswords"

4. **Start the Server**
   ```bash
   npm run dev

5. **Start the Workflow at Local**
   ```bash
   npx @upstash/qstash-cli dev

---

## API Endpoints

### Authentication
- **POST** `/api/auths/sign-up`  
  Register a new user.  
- **POST** `/api/auths/sign-in`  
  Log in and receive a JWT.  
- **POST** `/api/auths/sign-out`  
  Invalidate the user’s session.

### User Management
- **GET** `/api/users`  
  Fetch all users.  
- **GET** `/api/users/:id`  
  Fetch a specific user (requires valid JWT).

### Subscription Management
- **POST** `/api/subscriptions`  
  Create a new subscription (requires valid JWT).  
- **GET** `/api/subscriptions`  
  List all subscriptions.  
- **GET** `/api/subscriptions/:id`  
  Retrieve a subscription by its ID.  
- **PUT** `/api/subscriptions/:id`  
  Update an existing subscription (requires valid JWT).  
- **DELETE** `/api/subscriptions/:id`  
  Delete a subscription (requires valid JWT).

### Workflow
- **POST** `/api/workflows/subscription/remainder`  
  Endpoint for Upstash Workflow to deliver scheduled reminder tasks.

---

## How It Works

1. **User Authentication**  
   - Clients register or log in via `/api/auths`.  
   - Server hashes passwords and issues a JWT for subsequent requests.

2. **Subscription Management**  
   - Authenticated users call `/api/subscriptions` to create or modify subscriptions.  
   - Server calculates and stores next renewal dates based on provided frequency.

3. **Triggering Workflows**  
   - On subscription creation, the server calls `workflowClient.trigger()`.  
   - Upstash Workflow delivers the initial task to `/api/workflows/subscription/remainder`.

4. **Scheduled Reminders**  
   - The workflow handler calls `context.run('get subscription', …)` to load subscription data.  
   - It then uses `context.sleepUntil()` and `context.run()` in sequence to schedule reminders at 7, 5, 3, and 1 day before renewal.  
   - Upstash re-invokes the endpoint at each interval, where final logic sends notifications (e.g., emails).

5. **Security & Rate Limiting**  
   - Arcjet middleware filters out bots and abuse.  
   - Rate limiting ensures fair access and protects against DDoS.

---

## Future Enhancements
 
- **Subscription Analytics**  
  Dashboards for usage trends, upcoming renewals, and spending summaries.  
- **Recurring Payments**  
  Link with payment gateways (Stripe, PayPal) for automated billing.  
- **OAuth2 & Social Login**  
  Allow users to authenticate via Google, Facebook, etc.  
- **Multi-Tenant Support**  
  Enable organizations or teams to share subscription data securely.  





