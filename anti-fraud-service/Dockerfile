FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

# Copia el código fuente
COPY . .

# Compila el código TypeScript
RUN npm run build

EXPOSE 3001

CMD ["node", "dist/main"]
