/**
 * Single backend submission adapter for every STEP form.
 * Configure VITE_FORM_ENDPOINT (an HTTPS URL accepting JSON POST) to enable real delivery.
 * Without it, forms run in preview mode and never claim a request was sent.
 */
export type FormKind = "contact" | "partner" | "assessment";

export type SubmitResult =
  | { status: "preview" }
  | { status: "sent" }
  | { status: "error"; message: string };

export function getFormEndpoint(): string | undefined {
  const v = import.meta.env["VITE_FORM_ENDPOINT"] as string | undefined;
  return v && v.trim() ? v.trim() : undefined;
}

export async function submitForm(kind: FormKind, payload: Record<string, unknown>): Promise<SubmitResult> {
  const endpoint = getFormEndpoint();
  if (!endpoint) return { status: "preview" };
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, submittedAt: new Date().toISOString(), ...payload }),
    });
    if (!res.ok) return { status: "error", message: `The server responded with ${res.status}.` };
    return { status: "sent" };
  } catch {
    return { status: "error", message: "We couldn't reach the server. Check your connection and try again." };
  }
}

export function downloadText(filename: string, text: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
