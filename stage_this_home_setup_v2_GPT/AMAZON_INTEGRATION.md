# Amazon catalog connection

## What the React app does now

- Retains the 60 sample products from the attached Stage This home setup app.
- Shows the supplied price evidence and Amazon search links.
- Allows an editor to add an ASIN, image URL, or upload an image for each product.
- Accepts Excel and CSV product lists with columns such as `Item`, `Qty`, `Price`, `Brand`, `ASIN`, `Amazon Link`, `Image URL`, and `Price Source`.
- Adds the `bwtown1900-20` Associates tag to generated Amazon search links.

## Live Amazon images and prices

There is no safe direct connection from a public React browser app to Amazon's Product Advertising API. API credentials must remain on a server. Before live catalog lookup, obtain the appropriate Amazon Associates/API eligibility and use Amazon's current approved API terms and response requirements.

Recommended shape:

1. Add a server route such as `GET /api/amazon/products?asin=...`.
2. Keep access keys and secret keys in server environment variables only.
3. Have the server make the approved Amazon API request and return only the fields permitted by the current agreement, for example product title, ASIN, image URL, offer price, currency, timestamp, and affiliate URL.
4. Have React call the server route. Add caching and refresh rules that follow Amazon's current display and retention policies.
5. Label prices with the retrieval timestamp and handle missing or expired offers.

The UI currently operates in manual catalog mode and does not pretend its planning estimates are live Amazon offers. It can be wired to a backend response later without exposing Amazon secrets in the browser. No Amazon API keys are included in this project.

## ChatGPT connection

This is a React web app, not yet a ChatGPT-connected app or GPT Action. To let ChatGPT retrieve product data, expose the same secured backend through an authenticated API and define a ChatGPT Action or an MCP server around that API. The API should return approved catalog fields and must not expose Amazon credentials. That requires deployment and the applicable ChatGPT app/action configuration.
