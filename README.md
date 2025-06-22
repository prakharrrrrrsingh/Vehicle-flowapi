# 🚗 VehicleFlow API

[![Node.js](https://img.shields.io/badge/Node.js-Backend-green)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/React-Frontend-blue)](https://reactjs.org/)

**VehicleFlow API** is a full-stack custom project built using **Node.js**, **Express**, and **MongoDB**, with an optional **React.js frontend**. It provides RESTful APIs to manage vehicles with full CRUD (Create, Read, Update, Delete) support. The frontend allows users to interact visually with these APIs via a simple dashboard.

---

## 📁 Project Structure


---

## 🔧 Features

- ✅ 4+ Custom REST API endpoints
- ✅ MongoDB integration using Mongoose
- ✅ Optional React frontend to interact with backend
- ✅ MVC structure for maintainability
- ✅ Environment variables managed securely

---

## 🔌 API Endpoints

| Method | Endpoint             | Description            |
|--------|----------------------|------------------------|
| GET    | `/api/vehicles`      | Get all vehicles       |
| POST   | `/api/vehicles`      | Add a new vehicle      |
| PUT    | `/api/vehicles/:id`  | Update vehicle info    |
| DELETE | `/api/vehicles/:id`  | Delete a vehicle       |

### 📥 Sample POST Body

```json
{
  "number": "BR01AB1234",
  "name": "Activa 6G",
  "brand": "Honda",
  "year": 2022,
  "status": "Available"
}
🚀 Getting Started
🔧 Run Backend
cd vehicle-api-server
npm install
# Create a .env file with:
# MONGO_URI=mongodb://localhost:27017/vehicleDB
# PORT=5000
node app.js

🌐 Run Frontend
cd vehicle-client
npm install
npm start
