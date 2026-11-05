import { createFileRoute } from '@tanstack/react-router';
import { ServicesPage } from '@/components/site/Pages';
export const Route = createFileRoute('/services')({ component: ServicesPage });
