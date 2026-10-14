# IFEWA Foundation V2

React and Vite rebuild of the Green Nature WordPress IFEWA site, grouped with the other BwBluePrint V2 projects.

- Preserves original logo, hero photos, conservation imagery, merchandise photos, and dark green/green/yellow palette.
- Pages: Home, Mission, Service, Team, Contact, Shop, Act Now.
- Uses hash navigation so all pages work on GitHub Pages without server rewrites.
- Adds the founder's explanation of I (the individual) and Fire, Earth, Water, Air.
- Removes theme-demo URLs, placeholder biographies, unverified impact metrics, and filler copy.
- Contact forms prepare mailto drafts; they do not store or send messages. Shop supports inquiries only. No donation or payment processing is connected.
- Teri Reynolds's chairman listing and public contact email/phone are carried over from the supplied WordPress export; verify that they remain current before broader promotion.
- Original imagery downloaded from the IFEWA WordPress uploads directory. No database exports, WordPress configuration, credentials, or subscriber data are included.

## Development

```sh
npm ci
npm run dev
npm run check
npm run build
```

Default base path: `/BwBluePrint/ifewa_foundation_v2_GPT/`. Override `BASE_PATH` for another host.

## Deployment

The repository's shared `.github/workflows/applink-v2-pages.yml` installs and builds this app and preserves the existing AppLink and Uplift deployment directories.
