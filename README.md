# 🚀 My React + Vite Project

This is a modern frontend project built using **React.js** with the lightning-fast **Vite** build tool.

---

## 🧰 Tech Stack

- ⚛️ React.js
- ⚡ Vite
- 🔄 Axios (for HTTP requests)
- 📦 NPM / Yarn

---

## 📦 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/ahmed-ismail-tay/cms-front
cd cd your-repo

npm install
# or
yarn install


npm run start
# or
yarn start


# 🚀 Vite React App with Docker & Nginx

This project demonstrates how to containerize a React app (built with Vite) using Docker and serve it with Nginx in production using Docker Compose.

---


## 🐳 Run with Docker Compose

### 🔧 Prerequisites

- Docker
- Docker Compose


---
## 🐳  Dockerfile

# Step 1: Build the app
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# زيادة الذاكرة للبناء
ENV NODE_OPTIONS="--max-old-space-size=6144"

RUN npm run build

# Step 2: Serve the app with nginx
FROM nginx:alpine

# امسح ملفات nginx الافتراضية
RUN rm -rf /usr/share/nginx/html/*

# انسخ الملفات المبنية من المرحلة الأولى
COPY --from=build /app/dist /usr/share/nginx/html

# انسخ إعدادات nginx الخاصة
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


---

## 🐳  docker-compose.yml

version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: cms_frontend
    ports:
      - "3000:80"
    restart: always



---
### 🚀 Build & Run the App

```bash
docker-compose up --build


Then open http://localhost:3000 in your browser 🎉