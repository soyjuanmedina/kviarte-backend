# Etapa de construcción
FROM node:18-bullseye AS builder
WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala todas las dependencias (incluyendo dev)
RUN npm install

# Copia todo el código fuente
COPY . .

# Compila el proyecto NestJS
RUN npm run build

# Etapa de producción
FROM node:18-bullseye-slim AS production
WORKDIR /app

# Copia los archivos necesarios desde la etapa de build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Expone el puerto 3000
EXPOSE 3000

# Comando para iniciar la app
CMD ["node", "dist/main.js"]
