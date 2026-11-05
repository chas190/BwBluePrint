import { createFileRoute } from '@tanstack/react-router';
import { AssessmentPage } from '@/components/site/Assessment';
export const Route = createFileRoute('/assessment')({ component: AssessmentPage });
