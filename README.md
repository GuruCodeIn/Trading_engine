# 🚀 High-Performance Trading Engine

A high-performance, multi-threaded trading engine built in **C++**, featuring a **REST API**, **real-time WebSocket updates**, **PostgreSQL persistence**, and a modern **React + TypeScript dashboard** for visualizing live market data.

This project is designed to simulate the core components of a modern electronic exchange, including order matching, live market depth, order management, and real-time client updates.

---

# 📌 Project Status

**Current Stage:** Phase 8 — Order Management & Live Dashboard

### Completed Features

- ✅ High-performance C++ Matching Engine
- ✅ Limit Order Book
- ✅ Price-Time Priority Matching
- ✅ Multi-threaded Order Processing
- ✅ REST API (Drogon Framework)
- ✅ PostgreSQL Integration
- ✅ React + TypeScript Dashboard
- ✅ Live Order Book
- ✅ Live Dashboard Statistics
- ✅ Live Trade History
- ✅ WebSocket Real-time Updates
- ✅ Order Search
- ✅ Order Cancellation (End-to-End)
- ✅ Automatic UI Synchronization using WebSockets

---

# 🎯 Project Goals

Build a production-style trading platform capable of:

- Processing thousands of orders efficiently
- Maintaining a live order book
- Broadcasting market events instantly
- Persisting orders in PostgreSQL
- Providing a modern web dashboard
- Demonstrating exchange architecture used in financial systems

---

# 🏗 Project Architecture

```
                    React Dashboard
                           │
                   REST API / WebSocket
                           │
                    Drogon C++ Backend
                           │
                  Trading Service Layer
                           │
                   Trading Engine Core
                           │
        ┌──────────────────┴──────────────────┐
        │                                     │
   Buy Order Tree                      Sell Order Tree
        │                                     │
      Limit Orders                    Limit Orders
        │                                     │
      Linked List                      Linked List
```

---

# ⚙️ Technology Stack

## Backend

- C++17
- Drogon Framework
- PostgreSQL
- CMake
- STL
- JSONCPP
- Multi-threading

---

## Frontend

- React
- TypeScript
- Vite
- CSS
- Fetch API
- WebSocket API
- Lucide Icons

---

## Database

- PostgreSQL

---

## Development Tools

- Git
- GitHub
- VS Code
- CMake
- Homebrew
- Docker (Upcoming)

---

# 📂 Current Features

## Trading Engine

- Limit Order Matching
- Buy/Sell Order Trees
- Price-Time Priority
- Linked List Order Queue
- Order Lookup Table
- Multi-threaded Simulation

---

## Backend APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/order` | Submit Order |
| GET | `/orders` | Fetch Trade History |
| GET | `/orderbook/{symbol}` | Fetch Order Book |
| DELETE | `/order/{symbol}/{id}` | Cancel Order |

---

## Real-Time Features

- Live Dashboard
- Live Order Book
- Live Trade History
- Live Order Creation
- Live Order Cancellation
- WebSocket Broadcasting
- Automatic UI Refresh

---

# 📊 Frontend Pages

- Dashboard
- Order Book
- Place Order
- Trade History

---

# 🧠 Core Data Structures

- Red-Black Tree (`std::map`)
- Hash Maps
- Linked Lists
- Shared Pointers
- Order Lookup Table
- Price Level Aggregation

---

# ⚡ Performance

Current Engine Performance

- 100,000 Orders Tested
- Multi-threaded Engine
- ~23,000 Orders/sec
- O(log n) Price Level Operations
- O(1) Order Lookup (Cancellation)

---

# 📁 Project Structure

```
Trading-Engine
│
├── backend
│   ├── controllers
│   ├── services
│   ├── repositories
│   ├── models
│   └── main.cc
│
├── include
│   └── TradingEngine
│
├── src
│
├── frontend
│   ├── components
│   ├── pages
│   ├── services
│   └── assets
│
├── build
│
└── CMakeLists.txt
```

---

# ✅ Completed Milestones

### Phase 1

- Trading Engine
- Order Book
- Matching Logic

---

### Phase 2

- REST Backend
- PostgreSQL
- Order Repository

---

### Phase 3

- React Dashboard

---

### Phase 4

- Live Order Book

---

### Phase 5

- Dashboard Statistics

---

### Phase 6

- WebSocket Integration

---

### Phase 7

- Trade History
- Search
- Live Updates

---

### Phase 8

- Order Cancellation
- O(1) Order Lookup
- DELETE API
- WebSocket Cancel Events
- Live UI Synchronization

---

# 🚧 Upcoming Features

## Phase 9

- Executed Trades (Trade Tape)
- Trade Execution History
- Live Trade Feed

---

## Phase 10

- Market Orders

---

## Phase 11

- Modify Existing Orders

---

## Phase 12

- User Authentication
- Multiple Trading Accounts

---

## Phase 13

- Portfolio Management

---

## Phase 14

- Interactive Charts
- Price History
- Analytics Dashboard

---

## Phase 15

- Docker
- Docker Compose
- Production Deployment

---

## Phase 16

- CI/CD Pipeline
- GitHub Actions

---

## Phase 17

- Monitoring
- Logging
- Metrics
- Performance Dashboard

---

# 🎯 Learning Outcomes

This project demonstrates practical knowledge of:

- Data Structures
- Algorithms
- Object-Oriented Programming
- Concurrent Programming
- REST API Development
- WebSockets
- Database Integration
- Frontend Development
- System Design
- Trading Systems
- Full-Stack Development

---

# 👨‍💻 Author

**Guruprasad H M**

GitHub: https://github.com/gurucodein

---

# ⭐ Project Vision

The goal of this project is to evolve from a high-performance matching engine into a production-style electronic trading platform with live market data, real-time execution, analytics, deployment infrastructure, and scalable backend architecture.