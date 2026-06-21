This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## CV email (Download CV button)

The **Download CV** dialog sends your PDF via [Resend](https://resend.com).

1. Copy `.env.example` to `.env.local` and fill in the values.
2. Create a [Resend API key](https://resend.com/api-keys).
3. Upload your CV to Google Docs, set sharing to **Anyone with the link can view**, and paste the URL as `CV_GDOCS_URL`.
4. For production, [verify your domain](https://resend.com/domains) in Resend and set `CV_FROM_EMAIL` to an address on that domain (e.g. `cv@arsyadam.id`).
5. Restart the dev server after changing env vars.

On Vercel, add the same variables under **Project → Settings → Environment Variables**.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
