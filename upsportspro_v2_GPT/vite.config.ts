import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [tsConfigPaths(), tanstackStart({ server: { entry: "server" } }), nitro({ preset: "node-server" }), viteReact(), tailwindcss()],
  resolve: { dedupe: ["react", "react-dom", "@tanstack/react-router"] },
  server: { host: "0.0.0.0", port: 3000 },
});
