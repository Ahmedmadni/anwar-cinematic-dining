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
        <h1 className="font-poster text-8xl text-gold">404</h1>
        <h2 className="mt-4 font-display text-2xl text-foreground">الصفحة غير موجودة</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          يبدو أن هذا الطبق ليس في قائمتنا — عد للرئيسية أو تصفح المنيو.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/" className="rounded-xl bg-gradient-gold px-6 py-3 text-sm font-bold text-[oklch(0.1_0.012_40)] shadow-gold">
            الرئيسية
          </Link>
          <Link to="/menu" className="glass rounded-xl px-6 py-3 text-sm font-bold">
            المنيو
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
        <h1 className="font-display text-2xl text-gold">تعذّر تحميل الصفحة</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          حدث خطأ غير متوقع. جرّب مرة أخرى أو عد للرئيسية.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-xl bg-gradient-gold px-6 py-3 text-sm font-bold text-[oklch(0.1_0.012_40)] shadow-gold"
          >
            حاول مجددًا
          </button>
          <a href="/" className="glass rounded-xl px-6 py-3 text-sm font-bold">
            الرئيسية
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
            __html: `(function(){try{var l=localStorage.getItem('aam.lang');var t=localStorage.getItem('aam.theme');var s=localStorage.getItem('aam.textSize');var c=localStorage.getItem('aam.highContrast');var h=document.documentElement;if(l==='ar'||l==='en'){h.lang=l;h.dir=l==='ar'?'rtl':'ltr';}h.dataset.theme=t==='light'?'light':'dark';h.dataset.textSize=s==='large'||s==='larger'?s:'normal';h.dataset.contrast=c==='true'?'high':'normal';}catch(e){}})();`,
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
            <ScrollProgress />

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
