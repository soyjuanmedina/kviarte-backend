# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app

# Copia package.json y package-lock.json primero
COPY package*.json ./

# Instala todas las dependencias, incluidas dev
RUN npm install

# Copia todo el proyecto
COPY . .

# Build del proyecto
RUN npm run build

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app

# Copia solo lo necesario del builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Exponer puerto
EXPOSE 3000

# Ejecutar la app
CMD ["node", "dist/main.js"]
