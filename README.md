This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, spin up a MySQL database.
Then, change the `.env.example` file to `.env` and adjust the environmental variables defined in it, escpecially the `DATABASE_URL`.
You will also have to setup NextAuth and Google OAuth and specify their settings in `.env`.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
