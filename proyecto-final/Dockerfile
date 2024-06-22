# Dockerfile

# Usamos una imagen base de Node.js
FROM node:14

# Establecemos el directorio de trabajo en el contenedor
WORKDIR /

# Copiamos el package.json y el package-lock.json
COPY package*.json ./

# Instalamos las dependencias del proyecto
RUN npm install

# Copiamos el resto de los archivos del proyecto al directorio de trabajo
COPY . .

# Eliminamos la carpeta 'api' si está presente
RUN rm -rf ./api

# Exponemos el puerto que el servidor de desarrollo de React utiliza (normalmente 3000)
EXPOSE 3000

# Arrancamos la aplicación en modo desarrollo
CMD ["npm", "run", "dev"]
