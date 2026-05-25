import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Menu } from "@/components/site/Menu";
import { Story } from "@/components/site/Story";
import { Branches } from "@/components/site/Branches";
import { Reservation } from "@/components/site/Reservation";
import { FloatingContacts } from "@/components/site/FloatingContacts";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "أنوار المدينة | تجربة طعام مصرية فاخرة — مغاغة، المنيا" },
      {
        name: "description",
        content:
          "أنوار المدينة — مطعم مصري فاخر في مغاغة، المنيا. مشويات على الفحم، طواجن بلدي، كشري أصلي، حلويات مصرية. اطلب الآن أو احجز طاولتك.",
      },
      { property: "og:title", content: "أنوار المدينة | الطعم المصري بصياغة فاخرة" },
      { property: "og:description", content: "تجربة طعام سينمائية تجمع بين الأصالة المصرية والفخامة العصرية." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Menu />
      <Story />
      <Branches />
      <Reservation />
      <Footer />
      <FloatingContacts />
    </main>
  );
}
