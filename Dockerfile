# Usa Node 18 como base
FROM node:18

# Directorio de trabajo
WORKDIR /app

# Copia todos los archivos al contenedor primero
COPY . .

# Instala todas las dependencias (dev incluidas)
RUN npm install

# Compila el proyecto TypeScript
RUN npm run build

# Expon el puerto que usa Nest
EXPOSE 3000

# Ejecuta la app
CMD ["node", "dist/main.js"]
