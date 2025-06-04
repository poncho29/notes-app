# WIN SPORTS - NOTES APP

Este proyecto es un monorepo que contiene tanto el frontend como el backend de la aplicación, gestionados con `pnpm` y organizados bajo una estructura `apps/`.

---

## 📦 Requisitos

- [Node.js](https://nodejs.org/) v22 o superior
- [pnpm](https://pnpm.io/) v10 o superior `npm install -g pnpm`
- [Docker](https://www.docker.com/) 28.1.1 o superior
- [Docker Compose](https://docs.docker.com/compose/) v2.35.1-desktop.1 o superior

---

## 🚀 Ejecución de proyectos

1. Clonar el repositorio desde
2. Instalar dependencias compartidas, en la raiz de proyecto ejecutar `pnpm i`
3. Instalar dependencias del backend, ir a `/apps/backend` y ejecutar `pnpm i`
4. Instalar dependencias del frontend, ir a `/apps/frontend` y ejecutar `pnpm i`
5. Levantar la base de datos en un contenedor local, ir a `/apps/backend` y ejecutar `docker-compose up -d database`
6. Levantar el backend, ir a `/apps/backend` y ejecutar `pnpm dev`
7. Lenvatar el fronted, ir a `/apps/frontend` y ejecutar `pnpm dev`

### Construir image del backend

1. Tener levantado el contenedor de la base de datos ir a `/apps/backend` y ejecutar `docker-compose up -d database`
2. ir a la raiz del proyecto `/` y ejecutar `pnpm run docker:build:backend` para construir la imagen
3. luego ejecutar `pnpm run docker:run:backend` para levantar el contenedor

---

## 🔨 Stack Utilizado

###  Frontend
- TypeScript
- React.js
- Vite
- TailwindCSS
- Axios
- React Router Dom
- React Hook Form
- Zod

### Backend
- TypeScript
- Node.js
- Express
- MySQL
- Sequelize
- JWT
- Docker / Docker Compose