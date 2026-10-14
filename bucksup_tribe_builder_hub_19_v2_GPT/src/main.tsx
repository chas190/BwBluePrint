
import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./index.css";

// Restore dynamic deep links redirected by the GitHub Pages fallback.
const route = new URLSearchParams(window.location.search).get('__route');
if (route && !route.startsWith('/') && !route.includes('://')) {
  window.history.replaceState(null, '', import.meta.env.BASE_URL + route);
}

// Existing Clerk publishable key from the source app.
const PUBLISHABLE_KEY = "pk_test_Y2F1c2FsLXNuYWlsLTI4LmNsZXJrLmFjY291bnRzLmRldiQ";

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        elements: {
          formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white"
        }
      }}
    >
      <App />
    </ClerkProvider>
  </React.StrictMode>
);

