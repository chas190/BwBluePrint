import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, Link, createRootRouteWithContext, HeadContent } from '@tanstack/react-router';
import { Header } from '@/components/site/Header';
import { Footer, MobileActionBar } from '@/components/site/Footer';
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({ meta: [{ title: 'STEP — The Enterprise Behind Your Vision' }] }),
  component: Root,
  notFoundComponent: () => <div className="container-site py-24"><h1 className="text-4xl font-bold">Page not found</h1><Link to="/" className="mt-6 inline-block text-primary">Return to STEP →</Link></div>,
});
function Root() {
  const { queryClient } = Route.useRouteContext();
  return <QueryClientProvider client={queryClient}><HeadContent/><Header/><main id="main"><Outlet/></main><Footer/><MobileActionBar/></QueryClientProvider>;
}
