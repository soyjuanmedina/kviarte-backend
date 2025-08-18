# Usa Node 18 como base
FROM node:18

# Directorio de trabajo
WORKDIR /app

# Copia package.json y package-lock.json primero (para aprovechar cache)
COPY package*.json ./

# Instala TODAS las dependencias (incluyendo dev) necesarias para compilar NestJS
RUN npm install

# Copia el resto del proyecto
COPY . .

# Asegura que tsconfig.json esté en la raíz
RUN ls -la

# Compila el proyecto
RUN npm run build

# Expone el puerto que usa NestJS
EXPOSE 3000

# Comando para iniciar la app
CMD ["node", "dist/main.js"]
