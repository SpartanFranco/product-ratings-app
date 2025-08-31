# Next.js App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).  
It uses **Prisma + PostgreSQL**, authentication, and Cloudinary for media management.

---

## 🚀 Getting Started

First, install dependencies:

```bash
pnpm install
# or
npm install
# or
yarn install
# or
bun install
```

### Run the development server

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.  
You can start editing by modifying `app/page.tsx`. The page will auto-update on save.

---

## 🐳 Running PostgreSQL with Docker

This project ships with a `docker-compose.yml` with a persistent volume to avoid losing database data.

### docker-compose.yml

```yaml
version: '3.9'

services:
  product-ratings-db:
    image: postgres:16
    container_name: product-ratings-db
    ports:
      - '5432:5432'
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=dbname
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Start the container:

```bash
docker-compose up -d
```

Stop the container:

```bash
docker-compose down
```

Stop and remove volume (reset database):

```bash
docker-compose down -v
```

---

## 🛠 Environment Variables

Create a `.env` file in the root of the project and configure:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/dbname?schema=public"

# Authentication
AUTH_SECRET="your-auth-secret"

# Cloudinary (optional, required if admin account is created)
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
CLOUDINARY_CLOUD_NAME=""
```

---

## 🗄 Database with Prisma

Prisma is used as the ORM. Make sure you run migrations before starting:

```bash
pnpm exec prisma migrate dev
```

To seed the database with initial data, run:

```bash
pnpm exec prisma db seed
```

The seed script is located in the `/prisma/seed.ts` folder and will populate the database with starter data.

---

## ✨ Fonts

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically load and optimize [Geist](https://vercel.com/font).

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) – learn about Next.js features and API.
- [Prisma Docs](https://www.prisma.io/docs) – learn more about using Prisma ORM.
- [Cloudinary Docs](https://cloudinary.com/documentation) – learn how to configure Cloudinary for image storage.

---

## 🚀 Deployment

The easiest way to deploy your Next.js app is with [Vercel](https://vercel.com).  
Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
