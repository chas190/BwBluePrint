# Stage This V2 GPT

Independent web copy of `chas190/Stage-This/artifacts/stage-this`, source tree `70f9b6297e41615798467278f0b3d7f0dac796ac`.

## Development

Use Node 24. Run `npm ci`, then `npm run dev` for the web app. Run `npm run typecheck` and `npm run build` before publishing.

The shared `.github/workflows/applink-v2-pages.yml` publishes `dist/` to https://chas190.github.io/BwBluePrint/stage_this_v2_GPT/ whenever changes reach main.

## Pages adaptation

This copy keeps the Expo Router screens, images, colors, and local data context. It uses a standalone npm lockfile rather than Replit workspace dependencies. Expo's base URL is `/BwBluePrint/stage_this_v2_GPT` and web output is a single client application. The postbuild script creates common route entry points; the shared Pages 404 restores dynamic property URLs after reload.

## Current scope

Properties, room completion, and task checklists persist in this browser using AsyncStorage. There is no shared backend, authentication, or cross-device sync. Sample properties ship with the app. The original photo feature increments a photo count; it does not upload images. Some original controls remain placeholders.
