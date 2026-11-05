import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBand({
  title = "What could your business do with the right team behind it?",
  body = "Start with the gaps that matter most. Build a practical plan for what comes next.",
}: { title?: string; body?: string }) {
  return (
    <section className="surface-feature">
      <div className="container-site py-20 text-center">
        <h2 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-on-dark-muted">{body}</p>
        <Button asChild variant="hero" size="lg" className="mt-8">
          <Link to="/assessment">Start Your STEP Assessment <ArrowRight /></Link>
        </Button>
      </div>
    </section>
  );
}
