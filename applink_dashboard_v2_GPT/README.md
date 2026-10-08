# AppLink Dashboard V2 GPT
Independent React/TypeScript PWA copied from chas190/AppLink-Dashboard at commit 3892678fa6f70a8de168578bb86a126cd03da8aa. The original repository is unchanged.

## Development
Node 24; run `npm ci`, then `npm run dev`. No Replit variables or server are needed. Dashboard links, notes, favorites and sections remain device-local. Existing users can export their dashboard and import it on the new origin.

## Checks
`npm run typecheck`
`npm test`
`BASE_PATH=/BwBluePrint/applink_dashboard_v2_GPT/ npm run build`

## GitHub Pages
Workflow: .github/workflows/applink-v2-pages.yml at the repository root.
In BwBluePrint Settings > Pages select GitHub Actions. A private repository needs a GitHub plan supporting private-repository Pages. Do not make the shared repository public just to enable Pages.
Run the AppLink V2 GitHub Pages workflow after enabling Pages.
Expected URL, pending successful deployment:
https://chas190.github.io/BwBluePrint/applink_dashboard_v2_GPT/

This workflow publishes AppLink and an index at the repository Pages root. No previous Pages deployment existed when added. Extend the assembly step to include other apps before sharing this Pages site across projects. The existing UpSports ChatGPT Sites deployment is separate.

## Migration
Removed Replit build plugins and required PORT/BASE_PATH environment checks. Resolved catalog dependencies into a standalone package with an npm lockfile. Preserved React 19.1.0, application source, PWA assets, full-resolution original PNG images and existing tests. Fixed the HTML source entry for Vite subpath builds. The unused API server and mockup sandbox stay in the original repository.

Build validation: TypeScript and all 13 existing tests passed. Production subpath build completed. Tailwind is pinned to 4.1.14, stylesheet scanning is restricted to src, and Rollup tree shaking is disabled to avoid an observed optimizer stall. JavaScript is about 696 KB raw / 195 KB gzip; CSS about 96 KB raw / 18 KB gzip. A future optimizer/library fix can reduce the bundle.
