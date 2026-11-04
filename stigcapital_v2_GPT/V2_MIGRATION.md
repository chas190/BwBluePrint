# STIG Capital V2

Independent copy of https://github.com/chas190/stigcapital.

Source snapshot: `4eef40a7c5d85f1c96595f344cf637742da74ad8`.

Live URL: https://chas190.github.io/BwBluePrint/stigcapital_v2_GPT/

## Development

```sh
npm ci
npm run dev
```

## Validation and deployment

```sh
npx tsc --noEmit -p tsconfig.app.json
npm run build
```

The shared `.github/workflows/applink-v2-pages.yml` builds this app and publishes `dist/` to its own GitHub Pages subdirectory on changes to `main`.

The original site's content and interactions are retained. Its contact form has no submission backend; existing placeholder links and buttons require future integration.
