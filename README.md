# 📺 VTube — Scalable YouTube Backend API

A **production-ready backend system** for a YouTube-like video platform built using **Node.js, Express, and MongoDB**.
This project demonstrates **real-world backend engineering practices** including authentication, caching, async processing, and DevOps deployment.

---

# 🚀 Overview

VTube backend replicates the core features of modern video platforms such as:

* Secure authentication & authorization
* Video upload & async processing
* Social features (likes, comments, subscriptions)
* Redis caching for performance
* Queue-based background processing
* Docker & Kubernetes deployment

---

# 🔥 Key Features

## 🔐 Authentication & Security

* JWT Authentication (Access + Refresh Tokens)
* Email Verification using OTP (Nodemailer)
* Forgot & Reset Password (OTP-based)
* Secure cookies (HTTPOnly, SameSite)
* Redis-backed Rate Limiting
* Helmet for HTTP security headers
* Protection against XSS & CSRF attacks

---

## 🎥 Video System

* Upload video & thumbnail (Cloudinary)
* Async video processing using **BullMQ**
* Publish, update, delete videos
* View count tracking
* Paginated video listing

---

## 💬 Social Features

* Comments (add, update, delete, pagination)
* Likes system (videos, comments, tweets)
* Subscriptions (follow/unfollow channels)
* Playlists (create, update, manage videos)
* Tweets (short-form posts)

---

## ⚡ Performance Optimization

* Redis caching middleware
* Smart cache invalidation strategy
* Optimized DB queries
* Reduced database load

---

## 📦 Developer Experience

* Swagger API Documentation (`/api-docs`)
* Centralized error handling (ApiError)
* Async handler pattern
* Logging using Morgan
* Clean MVC architecture

---

# 🛠️ Tech Stack

| Layer            | Technology                 |
| ---------------- | -------------------------- |
| Runtime          | Node.js                    |
| Framework        | Express.js                 |
| Database         | MongoDB + Mongoose         |
| Caching          | Redis (ioredis)            |
| Queue            | BullMQ                     |
| Media Storage    | Cloudinary                 |
| File Upload      | Multer                     |
| Email            | Nodemailer                 |
| Validation       | express-validator          |
| Rate Limiting    | express-rate-limit + Redis |
| API Docs         | Swagger                    |
| Security         | Helmet                     |
| Logging          | Morgan                     |
| Containerization | Docker                     |
| Orchestration    | Kubernetes                 |

---

# 📁 Project Architecture

```bash
src/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── utils/
├── validators/
├── queue/
├── worker/
├── db/
├── app.js
└── index.js
```

---

# ⚙️ Setup & Installation

```bash
git clone https://github.com/Solanki-Manan/vtube-backend.git
cd vtube-backend
npm install
npm run dev
```

---

# 🔐 Environment Variables

```env
PORT=8000
MONGODB_URI=

ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=10d

REDIS_URI=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

EMAIL_USER=
EMAIL_PASS=

CORS_ORIGIN=*
```

---

# 📡 API Documentation

👉 Swagger UI:

```
http://localhost:8000/api-docs
```

👉 Live:

```
https://VTube.onrender.com/api-docs
```

---

# 🔐 Authentication Flow

```txt
Register → OTP → Verify Email
→ Login → Access Token + Refresh Token
→ Access Protected Routes
→ Refresh Token when expired
```

---

# ⚡ Caching Strategy

* Video listings & single video → cached (5–10 min)
* Comments & likes → cached (5 min)
* Channel profile → cached
* Cache invalidation handled on updates

---

# 🚦 Rate Limiting

* Auth routes → 5 requests / 10 minutes
* General APIs → 100 requests / 15 minutes

---

# 📦 Video Upload Flow

```txt
Upload → Multer → Validation
→ Queue (BullMQ)
→ Worker uploads to Cloudinary
→ DB updated
```

---

# ☸️ Kubernetes Deployment

## 📦 Files

* `deployment.yaml` → Runs backend pods
* `service.yaml` → Exposes backend via NodePort

---

## 🚀 Deploy

```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl get pods
kubectl get svc
```

---

## ⚙️ Scaling

```bash
kubectl scale deployment backend-deployment --replicas=4
```

---

## 🔄 Update Deployment

```bash
kubectl set image deployment/backend-deployment backend=my-backend:v2
kubectl rollout status deployment/backend-deployment
```

---

# 🧠 Key Highlights

* Designed **scalable backend architecture**
* Implemented **queue-based async processing**
* Built **Redis caching system**
* Developed **secure authentication with OTP**
* Integrated **Cloudinary media handling**
* Deployed using **Docker & Kubernetes**

---

# 📈 Future Improvements

* Real-time notifications
* Video streaming optimization
* Frontend integration (React)
* Microservices architecture

---

# 💼 Use Cases

* Video streaming platforms
* Social media applications
* Content-sharing systems

---

# 🙌 Author

**Manan**

---

# ⭐ Support

If you like this project, give it a ⭐ on GitHub!
