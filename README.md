
## Grass

## Correr en dev

1. Clonar el repositorio
2. Crear una copia del ```.env template ``` y renombrarlo a ```env```
3. Instalar dependencias ```yarn```
4. Levantar la base de datos ```docker compose up -d```
5. Correr la migracion de prisma ```npx prisma migrate dev```
6. Solo cuando se agregue una nueva tabla ```npx prisma migrate dev --name agregar-nueva-tabla```
7. Ejecutar para generar NEXTAUTH_SECRET ```openssl rand -base64 32```
8. Correr el proyecto ```yarn dev```
