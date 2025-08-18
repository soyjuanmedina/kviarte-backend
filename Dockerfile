# -----------------------
# Stage 1: Build
# -----------------------
FROM node:18-bullseye AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo package.json y package-lock.json primero
COPY package*.json ./

# Instala todas las dependencias (incluidas dev)
RUN npm install

# Copia todo el resto del proyecto
COPY . .

# Compila el proyecto NestJS
RUN npm run build

# -----------------------
# Stage 2: Production
# -----------------------
FROM node:18-alpine AS production

WORKDIR /app

# Copia los archivos necesarios desde el build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Expone el puerto que usa NestJS
EXPOSE 3000

# Comando para iniciar la app
CMD ["node", "dist/main.js"]
