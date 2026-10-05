# UpSports v2 GPT

Independent UpSports website in the BwBluePrint project collection. Includes the homepage and Hometown Economy page.

## Development

Requires Node.js 22.12+ (Node.js 24 recommended).

```sh
cd upsportspro_v2_GPT
npm ci
npm run dev
```

## Production

```sh
npm run build
npm start
```

Built with TanStack Start, React, TypeScript, Tailwind CSS, Vite and Nitro. Production output is `.output`; the server listens on `PORT` (default 3000).

Image slots and future navigation links are configured in `src/lib/site-config.ts`. Keep approved photos in `src/assets` or `public`.
