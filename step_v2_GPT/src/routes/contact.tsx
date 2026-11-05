import { createFileRoute } from '@tanstack/react-router';
import { ContactPage } from '@/components/site/Pages';
export const Route = createFileRoute('/contact')({ component: ContactPage });
