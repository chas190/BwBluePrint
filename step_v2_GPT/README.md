# STEP Enterprise V2

Independent STEP website for the Strategic Technology Enterprise Platform.

- V2 source: https://github.com/chas190/BwBluePrint/tree/main/step_v2_GPT
- ChatGPT Sites: https://step-enterprise-v2.charliedreynolds.chatgpt.site
- Original source: https://github.com/chas190/pixel-perfect-replica-66

## Development

Node.js 22.12+ is recommended.

```sh
npm ci
npm run dev
npm test
npm run typecheck
npm run build
```

The static build is written to `dist/`. The host must serve `index.html` for application routes such as `/services` and `/assessment`.

The assessment uses the source's transparent scoring rules and runs in the browser. Contact and partner forms support review/download; delivery requires a build-time `VITE_FORM_ENDPOINT` accepting HTTPS JSON POST requests. ASK STEP is an illustrative demo with curated answers.

See `MIGRATION.md` for migration details and `.openai/hosting.json` for the Sites project identity. ChatGPT Sites begins owner-private; publication does not automatically change its audience.
