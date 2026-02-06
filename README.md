# Personal Expense Tracker – Backend

A backend service built with **Node.js, Express.js, MongoDB Atlas, and Mongoose** to track users’ monthly expenses and budgets.

This project was developed as part of a Backend Screening Task to demonstrate:

* MongoDB schema design
* Mongoose relationships & middleware
* Aggregations
* Clean API development

---

## 🚀 Features

* Create users with a monthly budget
* Add expenses linked to a specific user
* Fetch all expenses for a user
* Monthly expense summary:

  * Total expenses
  * Remaining budget
  * Number of expenses
* Pagination & category filtering
* Proper validations & error handling

---

## 🛠 Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* ES Modules (`import/export`)
* dotenv

> ❌ Local MongoDB is *not* used

---

## 📂 Project Structure

```
src/
 ├── config/        # Database connection
 ├── models/        # Mongoose schemas
 ├── controllers/   # Business logic
 ├── routes/        # API routes
 ├── utils/         # Helpers & error handling
 ├── app.js
 └── server.js
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone <your-github-repo-url>
cd expense-tracker-backend
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<db-name>
```

> Use MongoDB Atlas credentials.

---

### 4️⃣ Start the server

```bash
npm run dev
```

Server will run on:

```
http://localhost:5000
```

---

## 📌 API Endpoints

### 👤 User APIs

#### Create User

**POST** `/users`

```json
{
  "name": "Aditya Rai",
  "email": "aditya@example.com",
  "monthlyBudget": 20000
}
```

---

#### Get User Details

**GET** `/users/:userId`

---

#### Monthly Expense Summary

**GET** `/users/:userId/summary`

**Response**

```json
{
  "totalExpenses": 12000,
  "remainingBudget": 8000,
  "expenseCount": 14
}
```

---

### 💸 Expense APIs

#### Add Expense

**POST** `/expenses`

```json
{
  "title": "Groceries",
  "amount": 1500,
  "category": "Food",
  "date": "2026-02-01",
  "userId": "USER_OBJECT_ID"
}
```

---

#### Get User Expenses

**GET** `/expenses/users/:userId/expenses`

**Optional Query Params**

* `page`
* `limit`
* `category`

Example:

```
/expenses/users/:id/expenses?page=1&limit=5&category=food
```

---

## 🧠 Data Modeling

* Separate `User` and `Expense` collections
* Expenses reference users using `ObjectId.`
* Prevents unbounded document growth
* Enables efficient aggregations

---

## 🔁 Mongoose Middleware

* `pre('save')` hook on **Expense**
* Ensures expense is always linked to an existing user
* Prevents orphan expense records at the database level

---

## ❗ Validations & Error Handling

* Email must be unique
* Monthly budget > 0
* Expense amount > 0
* Expense cannot be created for non-existent users
* Proper HTTP status codes and messages

---

## 🧪 Assumptions

* No authentication required
* Single timezone usage
* Monthly summary considers **current month only**
* Backend-only project

---

## 📦 Bonus Features

* Environment variable configuration
* Pagination & filtering
* Clean utilities
* ES Module architecture


## 👨‍💻 Author

**Aditya Rai**
Backend Developer

* GitHub: [https://github.com/itsRaiAadi](https://github.com/itsRaiAadi)
* LinkedIn: [https://www.linkedin.com/in/aditya-rai-795bb8371/](https://www.linkedin.com/in/aditya-rai-795bb8371/)


