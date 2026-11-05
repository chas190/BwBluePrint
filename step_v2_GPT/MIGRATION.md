# STEP V2 migration

Source: `https://github.com/chas190/pixel-perfect-replica-66`

Independent V2 location: `chas190/BwBluePrint/step_v2_GPT/`.

The recovered source contained a placeholder homepage and two coming-soon routes. This V2 completes the homepage and linked pages using the source brand, hero image, service catalog, components, and assessment scoring rules. Original source repository is unchanged.

The deployment uses a Vite static React build with TanStack Router. The Lovable-specific server wrapper, project identity, and Bun configuration were removed from this independent copy. Existing reusable components and data were retained. `npm ci`, `npm test`, and `npm run build` are the local workflow. Static output is `dist/`.

Forms remain in preview mode unless `VITE_FORM_ENDPOINT` is set at build time. Assessment answers stay in page memory and can be downloaded. ASK STEP is a curated concept demonstration, not a live AI integration. Partner descriptions retain their proposed status.

ChatGPT Sites project identity is tracked in `.openai/hosting.json`. Deployments use the dedicated Sites source repository and the exact pushed source commit. The GitHub V2 folder mirrors the application source; update both when changing the application.
