import { createFileRoute } from '@tanstack/react-router';
import { SystemsPage } from '@/components/site/Pages';
export const Route = createFileRoute('/systems')({ component: SystemsPage });
