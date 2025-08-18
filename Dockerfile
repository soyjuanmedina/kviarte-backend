# Etapa de construcción
FROM node:18-bullseye AS builder
WORKDIR /app

# Copia package.json y package-lock.json primero
COPY package*.json ./

# Copia todo el código fuente antes de npm install para que postinstall funcione
COPY . .

# Instala todas las dependencias (incluyendo dev) y construye
RUN npm install

# Etapa de producción
FROM node:18-bullseye-slim AS production
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "dist/main.js"]
