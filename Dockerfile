# Usa una imagen oficial de Node.js como base
FROM node:18.18.2-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json al contenedor
COPY package.json yarn.lock ./

# Copia el directorio prisma, donde se encuentra schema.prisma
COPY ./prisma prisma

# Instala las dependencias
RUN yarn install

# Copia el resto de los archivos de la aplicación al contenedor
COPY . .

# Copia el archivo .env al contenedor
COPY .env .env

# Genera los archivos Prisma
RUN npx prisma generate --schema=./prisma/schema.prisma

# Compila la aplicación Next.js
RUN npm run build

# Expone el puerto 3000 para que Docker lo haga accesible fuera del contenedor
EXPOSE 3000

# Ejecuta Prisma generate antes de iniciar la aplicación
#CMD ["sh", "-c", "npx prisma generate && npm run start"]
CMD ["npm", "start"]