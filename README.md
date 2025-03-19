# 🚀 Proyecto de Procesamiento de Transacciones - Yape Challenge

Este proyecto fue desarrollado con **Node.js 20** y utiliza **Docker** y **Prisma** para la gestión de base de datos.

## 📌 Requisitos Previos

- Tener instalado **Docker** y **Docker Compose**. (Opcional **k6** con el comando ```choco install k6```)
- Contar con **Node.js 20** y **npm** en caso de querer hacer modificaciones locales.
- Disponer de **Prisma** para la gestión de la base de datos.
- crear archivo **.env** ambos servicios
    - para anti-fraud-service debe contener:
        ```sh
        KAFKA_BROKER=localhost:9092
        ```
    - para transaction-service debería contener:
        ```sh
        KAFKA_BROKER=localhost:9092
        DATABASE_URL="postgresql://yape:password@localhost:5432/transactions_db?schema=public"
        ```
---

## 🛠 Pasos para Ejecutar el Proyecto

### 1️⃣ Levantar los Contenedores con Docker
Ejecuta el siguiente comando en la raíz del proyecto para construir y ejecutar los contenedores:

```sh
docker compose up --build
```
### 2️⃣ Migrar la Base de Datos con Prisma
Una vez que los contenedores estén corriendo, dirígete a la carpeta del servicio de transacciones:
```sh
cd transaction-service
```
Ahora ejecuta el siguiente comando para aplicar las migraciones de la base de datos:
```sh
npx prisma migrate dev --name init
```
### 3️⃣ Regresar a la Carpeta Principal
Después de ejecutar la migración, vuelve al directorio raíz del proyecto con:
```sh
cd ..
```
### (Opcional) Realizar una Prueba de Carga con load_test.js
Si descargo **k6** puede ejecutar una pruebas con el comando ```k6 run load_test.js```