# Etapa de construcción
FROM node:18-bullseye AS builder
WORKDIR /app

# Instala las dependencias de producción
COPY package*.json ./
RUN npm install --omit=dev

# Copia el código fuente y compila
COPY . .
RUN npm run build

# Etapa de producción
FROM node:18-bullseye-slim AS production
WORKDIR /app

# Copia los archivos necesarios desde la etapa anterior
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Expone el puerto 3000
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/main.js"]
