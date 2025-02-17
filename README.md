# Farmac-App

Farmac-App es una prueba técnica que consiste en una aplicación full-stack dividida en dos directorios principales: **backend** y **frontend**. El backend está desarrollado con **Express** y utiliza **Prisma** para la comunicación con la base de datos, mientras que el frontend está desarrollado con **Next.js**. Este README proporciona una guía para instalar y ejecutar el proyecto localmente.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

```
FARMAC-APP
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── prisma
│   ├── routes
│   ├── services
│   ├── types
│   ├── utils
│   ├── .env
│   ├── app.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend
    ├── .env
    ├── public
    ├── src
    │   ├── components
    │   ├── pages
    │   ├── styles
    │   └── utils
    ├── next.config.ts
    ├── package.json
    ├── tsconfig.json
```

## Tecnologías Utilizadas

### Backend

- **Node.js**
- **Express**
- **Prisma** (ORM)
- **TypeScript**
- **dotenv**

### Frontend

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **SHADCN UI**

## Configuración e Instalación

### Requisitos Previos

- Tener instalado Node.js (versión 18 o superior).
- Tener instalado npm o yarn.
- Tener instalado XAMPP para la gestión de MySQL
- Tener configurada la base de datos MySQL

### Configuración de la Base de Datos

1. **Instalar y configurar XAMPP**:
2. **Crear la base de datos**:
   - Abre phpMyAdmin (http://localhost/phpmyadmin)
   - Crea una nueva base de datos llamada **farmacia** 
   - La base de datos debe estar creada antes de ejecutar las migraciones de Prisma

### Pasos

1. **Descargar y descomprimir el proyecto**:

   - Una vez recibas el archivo .zip, descomprímelo en el directorio deseado.

2. **Configurar las variables de entorno**:
   - En el directorio `backend`, encuentra el archivo `.env` y asegúrate de que contenga las siguientes variables:

```
DATABASE_URL="mysql://root:@localhost:3306/farmacia"
PORT=5600
```

- En el directorio `frontend`, encuentra el archivo `.env` y asegúrate de que contenga:

```
NEXT_PUBLIC_BACKEND_URL="http://localhost:5600/api"
```

3. **Instalar las dependencias**:
   - En el directorio `backend`:

```
cd backend
npm install
```

- En el directorio `frontend`:

```
cd frontend
npm install
```

4. **Ejecutar migraciones en la base de datos**:
   - Ve al directorio `backend` y ejecuta:

```
npx prisma migrate dev
```

5. **Iniciar los servidores**:
   - Backend:

```
npm run dev
```

- Frontend:

```
npm run dev
```

## Uso

- Accede a la aplicación en tu navegador en http://localhost:3000.
- El backend estará corriendo en http://localhost:5600.

## Scripts Disponibles

### Backend

- `npm run dev`: Inicia el servidor en modo desarrollo.
- `npx prisma studio`: Abre Prisma Studio para gestionar datos directamente.

### Frontend

- `npm run dev`: Inicia el servidor de desarrollo.

## Observaciones

- Asegúrate de configurar correctamente las variables de entorno antes de iniciar los servidores.

## Contacto

Si tienes alguna duda o consulta sobre este proyecto, no dudes en contactarme.
