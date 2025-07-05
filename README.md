# 🎁 Rewards API — NestJS + MongoDB

This is a backend application built with **NestJS** and **MongoDB** for managing user reward points, transactions, and redemptions.

---

## 🚀 Features

- 🎯 Track total reward points per user
- 💰 Earn points via transactions
- 🎟️ Redeem points for cashback, vouchers, etc.
- 📜 View redemption and transaction history
- 🔐 User validation (mocked, no auth)
- ✅ Input validation with `class-validator`
- 📘 Swagger API documentation

---

## 🛠 Tech Stack

| Layer      | Tech                                                 |
| ---------- | ---------------------------------------------------- |
| Backend    | [NestJS](https://nestjs.com)                         |
| Database   | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) |
| ODM        | Mongoose                                             |
| Validation | `class-validator`                                    |
| Testing    | Jest                                                 |
| Docs       | Swagger / OpenAPI                                    |

---

## 📁 Project Structure

src/
├── app.module.ts
├── users/
├── rewards/
├── transactions/
├── redemptions/
└── main.ts

# Clone repository

git clone https://github.com/krush30/rewards-api-backend.git

# Navigate into project

cd rewards-api-backend

# Install dependencies

npm install

# Start development server

npm run start:dev

# Mock Data

This app uses static/mock users.

You must manually insert users and reward documents in your MongoDB cluster:

Sample User Document:

{
"\_id": ObjectId("66bfbfa6234d6811344be111"),
"name": "Krushna",
"email": "krushna@example.com"
}

Sample Reward Document:

{
"\_id": ObjectId("66bfcd01234d6811344be222"),
"userId": ObjectId("66bfbfa6234d6811344be111"),
"totalPoints": 150
}

# API Endpoints

All endpoints assume userId is passed manually in the query/body.

# Rewards

GET /rewards/points?userId=...
→ Get total points for a user

GET /rewards/options
→ List of redeemable reward types

POST /rewards/redeem
→ Redeem reward points

{
"userId": "66bfbfa6234d6811344be111",
"rewardType": "cashback",
"pointsToRedeem": 50
}

# Transactions

POST /transactions
→ Add a new reward-earning transaction

{
"userId": "66bfbfa6234d6811344be111",
"amount": 1000,
"category": "shopping",
"pointsEarned": 25
}

GET /transactions?userId=...&page=1&limit=5
→ Get latest transactions (paginated)

# Redemptions

GET /redemptions?userId=...
→ View redemption history for a user
