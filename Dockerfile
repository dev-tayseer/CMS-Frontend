# التطبيق بيتبني في بيئة Node.

# بعد كده بيتخدم (serve) باستخدام NGINX في صورة خفيفة وسريعة للإنتاج (production-ready).



# Step 1: Build the app
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps


COPY . .

# 👇 هنا نزود الميموري المسموح للبناء
# ✅ زيادة حجم الذاكرة إلى 6 جيجا
ENV NODE_OPTIONS="--max-old-space-size=3072"

RUN npm run build

# Step 2: Serve the app with nginx
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy build files from previous stage
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy custom nginx config (optional)
# COPY nginx.conf /etc/nginx/nginx.conf
# بنعلن إن الحاوية بتستخدم المنفذ 80 عشان نستقبل عليه الطلبات
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]




