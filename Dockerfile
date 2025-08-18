# Usa una imagen oficial de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia package.json y package-lock.json para instalar dependencias primero (cache-friendly)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el resto del proyecto
COPY . .

# Compila TypeScript a JavaScript
RUN npm run build

# Expone el puerto que usará NestJS
EXPOSE 3000

# Comando por defecto para ejecutar la app
CMD ["node", "dist/main.js"]
