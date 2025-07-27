
# 🛒 Shopping Platform – Fullstack Assignment

This is a fullstack shopping application, built as part of a technical assignment for a Fullstack Developer role.

It includes:
- A React + Redux client
- Two separate backend services:
  - .NET 8 API for categories/products (SQL Server)
  - Node.js (Express) API for order submission (MongoDB)
- DevOps architecture and deployment plan for AWS

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- Redux Toolkit
- TypeScript

### Backend
- API 1: .NET 8 + Entity Framework + SQL Server
- API 2: Express.js + MongoDB

### DevOps / Deployment
- Docker (containers for each service)
- AWS architecture plan (see below)

---

## 📁 Project Structure

```
shopping-app/
├── client/             # React + Redux
├── server-dotnet/      # .NET 8 + SQL Server
├── server-node/        # Express.js + MongoDB
├── docs/               # Architecture diagram, cloud planning
└── docker-compose.yml  # (planned)
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/LibbyGantz/shopping-app.git
cd shopping-app
```

---

### 2. Client Setup

```bash
cd client/shopping-client
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

### 3. .NET Backend Setup (Products API)

```bash
cd server-dotnet
dotnet restore
dotnet run
```

Runs on: `http://localhost:5166`

Links for Server Results:

Categories List:
`http://localhost:5166/api/categories`

Products List:
`http://localhost:5166/api/products`


> Make sure SQL Server is installed and connection string is set correctly.

---

### 4. Node.js Backend Setup (Order API)

```bash
cd server-node
npm install
npm run dev
```

Runs on: `http://localhost:4000`

> Requires MongoDB running locally or via Docker.

---

## 📦 Docker (optional)

Each component can be containerized using:
- `Dockerfile` per service
- `docker-compose.yml` for orchestration

> Not included in this version – see `/docs` for planning.

---

## ☁️ Cloud Architecture (AWS)

The deployment plan includes:
- EC2 instances for hosting services
- MongoDB via AWS DocumentDB or self-hosted container
- SQL Server via RDS
- S3 for static assets (if needed)
- IAM + VPC configuration (diagram included)

📁 See: [docs/AWS_Cloud_Architecture_Diagram.pdf](docs/AWS_Cloud_Architecture_Diagram.pdf)

---

## 🧪 Features

- Browse product categories and products
- Select quantity and add to cart
- Fill out order form (name, address, email)
- Submit and store order via Express + MongoDB
- Separated microservice-style backend

---

## 📬 Submission Notes

This repository includes:
- Full source code for all system components
- Clear installation and run instructions
- DevOps and cloud documentation

For questions or clarifications, please contact: **Libby Gantz**
