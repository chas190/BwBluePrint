import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Download, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { downloadText, getFormEndpoint, submitForm, type FormKind } from "@/lib/submission";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "url" | "textarea" | "select";
  required?: boolean;
  options?: string[];
};

type Status = "idle" | "submitting" | "preview" | "sent" | "error";

export function PreviewForm({ kind, fields, initial = {}, submitLabel }: { kind: FormKind; fields: Field[]; initial?: Record<string, string>; submitLabel: string }) {
  const [values, setValues] = useState<Record<string, string>>(() => Object.fromEntries(fields.map((f) => [f.name, initial[f.name] ?? ""])));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState("");
  const configured = !!getFormEndpoint();

  const validate = () => {
    const e: Record<string, string> = {};
    for (const f of fields) {
      const v = values[f.name]?.trim() ?? "";
      if (f.required && !v) e[f.name] = `${f.label} is required.`;
      else if (v && f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) e[f.name] = "Enter a valid email address.";
      else if (v && f.type === "url" && !/^(https?:\/\/)?[^\s.]+\.[^\s]+$/.test(v)) e[f.name] = "Enter a valid website.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    const r = await submitForm(kind, values);
    if (r.status === "error") { setErrMsg(r.message); setStatus("error"); }
    else setStatus(r.status);
  };

  const summary = fields.map((f) => `${f.label}: ${values[f.name] || "—"}`).join("\n");

  if (status === "sent") {
    return (
      <div role="status" className="card-site p-6">
        <CheckCircle2 className="size-8 text-success" aria-hidden />
        <h3 className="mt-3 text-xl font-bold">Request received</h3>
        <p className="mt-2 text-muted-foreground">The server confirmed receipt of your request.</p>
      </div>
    );
  }

  if (status === "preview") {
    return (
      <div role="status" className="card-site p-6">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
          <div>
            <h3 className="text-lg font-bold">Preview form — not sent</h3>
            <p className="mt-1 text-sm text-muted-foreground">Form delivery isn't configured yet, so nothing was transmitted or stored. Review or download your request below.</p>
          </div>
        </div>
        <pre className="mt-4 whitespace-pre-wrap rounded-md bg-muted p-4 text-sm">{summary}</pre>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button type="button" variant="outline" onClick={() => downloadText(`step-${kind}-request.txt`, summary)}>
            <Download /> Download request
          </Button>
          <Button type="button" variant="ghost" onClick={() => setStatus("idle")}>Edit request</Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card-site grid gap-5 p-6 md:p-8">
      {!configured && (
        <p className="flex items-start gap-2 rounded-md bg-accent p-3 text-sm text-accent-foreground">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden /> Preview form: submissions aren't delivered yet. You can review and download what you enter.
        </p>
      )}
      {fields.map((f) => {
        const id = `${kind}-${f.name}`;
        const err = errors[f.name];
        const common = {
          id, name: f.name, value: values[f.name],
          "aria-invalid": !!err, "aria-describedby": err ? `${id}-err` : undefined,
          onChange: (e: { target: { value: string } }) => setValues((v) => ({ ...v, [f.name]: e.target.value })),
        };
        return (
          <div key={f.name} className="grid gap-2">
            <Label htmlFor={id}>{f.label}{f.required ? " *" : " (optional)"}</Label>
            {f.type === "textarea" ? (
              <Textarea rows={5} {...common} />
            ) : f.type === "select" ? (
              <select {...common} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="">Select…</option>
                {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : (
              <Input type={f.type ?? "text"} className="h-10" {...common} />
            )}
            {err && <p id={`${id}-err`} className="text-sm text-destructive">{err}</p>}
          </div>
        );
      })}
      {status === "error" && (
        <p role="alert" className="flex items-start gap-2 rounded-md border border-destructive/40 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden /> Not sent. {errMsg} Your entries are kept — try again.
        </p>
      )}
      <Button type="submit" variant="hero" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting…" : status === "error" ? "Try again" : submitLabel}
      </Button>
    </form>
  );
}
