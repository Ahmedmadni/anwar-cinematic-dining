import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { CartProvider } from "@/lib/cart";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { FloatingContacts } from "@/components/site/FloatingContacts";
import { PreferencesProvider } from "@/lib/preferences";
import { Assistant } from "@/components/site/Assistant";
import { Toaster } from "@/components/ui/sonner";
import { ScrollProgress } from "@/components/site/ScrollProgress";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "أنوار المدينة" },
      { name: "description", content: "تجربة طعام مصرية فاخرة في مغاغة، المنيا." },
      { name: "author", content: "شركة المدني العالمية للاستثمار" },
      { property: "og:title", content: "أنوار المدينة" },
      { property: "og:description", content: "تجربة طعام مصرية فاخرة في مغاغة، المنيا." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "أنوار المدينة" },
      { name: "twitter:description", content: "تجربة طعام مصرية فاخرة في مغاغة، المنيا." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/76b43a37-aa9e-43fc-8aa4-689ef3d3fcae/id-preview-05e47370--355d0cc7-59a7-4e24-b198-bcc3ea0a1c9c.lovable.app-1779938182868.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/76b43a37-aa9e-43fc-8aa4-689ef3d3fcae/id-preview-05e47370--355d0cc7-59a7-4e24-b198-bcc3ea0a1c9c.lovable.app-1779938182868.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Tajawal:wght@300;400;500;700;800;900&family=Alexandria:wght@300;400;500;600;700;800;900&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var l=localStorage.getItem('aam.lang');var t=localStorage.getItem('aam.theme');var h=document.documentElement;if(l==='ar'||l==='en'){h.lang=l;h.dir=l==='ar'?'rtl':'ltr';}if(t==='dark'||t==='light'){h.dataset.theme=t;}else{h.dataset.theme='dark';}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <PreferencesProvider>
        <CartProvider>
          <div className="relative min-h-screen bg-background text-foreground">
            <Nav />
            <Outlet />
            <Footer />
            <FloatingContacts />
            <Assistant />
            <Toaster />
          </div>
        </CartProvider>
      </PreferencesProvider>
    </QueryClientProvider>
  );
}
