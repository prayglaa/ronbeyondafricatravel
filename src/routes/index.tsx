import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { notifyBookingWhatsApp } from "@/lib/notify-booking.functions";
import {
  Compass,
  Sparkles,
  MapPin,
  Users,
  Headphones,
  Star,
  ChevronDown,
  Play,
  ArrowRight,
  Check,
  Mail,
  Phone,
  MessageCircle,
  MapPinned,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Plus,
  Minus,
  Camera,
  Mountain,
  Waves,
  Binoculars,
  Bird,
  Footprints,
  Sunrise,
  Palmtree,
} from "lucide-react";

import heroSafari from "@/assets/hero-safari.jpg";
import destSerengeti from "@/assets/dest-serengeti.jpg";
import destNgorongoro from "@/assets/dest-ngorongoro.jpg";
import destKilimanjaro from "@/assets/dest-kilimanjaro.jpg";
import destZanzibar from "@/assets/dest-zanzibar.jpg";
import destTarangire from "@/assets/dest-tarangire.jpg";
import destManyara from "@/assets/dest-manyara.jpg";
import galLion from "@/assets/gallery-lion.jpg";
import galElephants from "@/assets/gallery-elephants.jpg";
import galGiraffe from "@/assets/gallery-giraffe.jpg";
import galZebras from "@/assets/gallery-zebras.jpg";
import galLodge from "@/assets/gallery-lodge.jpg";
import galBalloon from "@/assets/gallery-balloon.jpg";
import aboutTanzania from "@/assets/about-tanzania.jpg";
import logoAsset from "@/assets/ronbeyond-logo.jpeg.asset.json";
import userZebra from "@/assets/user-zebra.jpeg.asset.json";
import userHippo from "@/assets/user-hippo.jpeg.asset.json";
import userLionPortrait from "@/assets/user-lion-portrait.jpeg.asset.json";
import userTourists from "@/assets/user-tourists.jpeg.asset.json";
import userGuide1 from "@/assets/user-guide-1.jpeg.asset.json";
import userGuide2 from "@/assets/user-guide-2.jpeg.asset.json";
import userWaterbuck from "@/assets/user-waterbuck.jpeg.asset.json";
import userBird from "@/assets/user-bird.jpeg.asset.json";
import userOstriches from "@/assets/user-ostriches.jpeg.asset.json";
import userLionsRoar from "@/assets/user-lions-roar.jpeg.asset.json";

import { SiteNav } from "@/components/site-nav";
import { Lightbox, type LightboxImage } from "@/components/lightbox";
import { useReveal, useCountUp } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/a5b29081-ee67-41b8-a03f-bb22eb89c369" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/a5b29081-ee67-41b8-a03f-bb22eb89c369" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: LandingPage,
});

/* ---------- Data ---------- */

const HERO_STATS = [
  { icon: "⭐", label: "Years Experience", value: "15+" },
  { icon: "🌍", label: "Happy Travelers", value: "5,000+" },
  { icon: "🦁", label: "Safari Tours", value: "50+" },
  { icon: "🏖️", label: "Zanzibar Specialists", value: "Local" },
];

const WHY = [
  {
    icon: Compass,
    title: "Expert Local Guides",
    body: "Certified naturalists born on the land, with decades tracking wildlife across the Serengeti ecosystem.",
  },
  {
    icon: Sparkles,
    title: "Luxury Accommodation",
    body: "Hand-picked tented camps and boutique lodges — private plunge pools, star-beds, chef-led dining.",
  },
  {
    icon: MapPin,
    title: "Custom Travel Plans",
    body: "Every itinerary is designed one-to-one around your pace, interests, seasonality and dream sightings.",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    body: "A dedicated concierge on WhatsApp before, during and after your journey — anywhere in Tanzania.",
  },
];

const DESTINATIONS = [
  {
    img: destSerengeti,
    name: "Serengeti National Park",
    location: "Northern Tanzania",
    body: "Endless golden plains and the theatre of the Great Migration — 1.5 million wildebeest on the move.",
  },
  {
    img: destNgorongoro,
    name: "Ngorongoro Crater",
    location: "Arusha Region",
    body: "A collapsed volcanic caldera cradling the densest concentration of big cats on Earth.",
  },
  {
    img: destKilimanjaro,
    name: "Mount Kilimanjaro",
    location: "Kilimanjaro Region",
    body: "The rooftop of Africa — snow-capped, 5,895 metres, and yours to summit with expert mountain teams.",
  },
  {
    img: destZanzibar,
    name: "Zanzibar Island",
    location: "Indian Ocean",
    body: "Turquoise water, historic Stone Town, dhow sailing at sunset and barefoot luxury on white sand.",
  },
  {
    img: destTarangire,
    name: "Tarangire National Park",
    location: "Manyara Region",
    body: "Giant baobabs, huge elephant herds and one of Tanzania's most photogenic dry-season parks.",
  },
  {
    img: destManyara,
    name: "Lake Manyara",
    location: "Great Rift Valley",
    body: "Flamingo-pink shorelines, tree-climbing lions and lush groundwater forests beneath the escarpment.",
  },
];

const PACKAGES = [
  {
    name: "Classic Safari",
    tagline: "The essential Northern Circuit",
    duration: "6 Days · 5 Nights",
    price: 2890,
    destinations: ["Tarangire", "Ngorongoro", "Serengeti"],
    features: [
      "Comfort tented camps",
      "Full-board meals",
      "4×4 pop-top vehicle",
      "Airport transfers",
      "Park fees included",
    ],
    featured: false,
  },
  {
    name: "Luxury Safari",
    tagline: "Our signature journey",
    duration: "9 Days · 8 Nights",
    price: 5490,
    destinations: ["Tarangire", "Manyara", "Ngorongoro", "Serengeti"],
    features: [
      "Boutique luxury lodges",
      "Private guide & vehicle",
      "Sunset bush dinners",
      "Hot-air balloon safari",
      "Domestic flight leg",
      "Sundowners each evening",
    ],
    featured: true,
  },
  {
    name: "Ultimate Tanzania",
    tagline: "Safari, summit & sea",
    duration: "14 Days · 13 Nights",
    price: 9850,
    destinations: ["Serengeti", "Kilimanjaro", "Zanzibar"],
    features: [
      "Five-star tented suites",
      "Kilimanjaro trek support",
      "Private beach villa in Zanzibar",
      "All internal flights",
      "Private chef experience",
      "Dedicated concierge",
    ],
    featured: false,
  },
];

const EXPERIENCES = [
  { icon: Binoculars, name: "Game Drives" },
  { icon: Sunrise, name: "Hot Air Balloon Safari" },
  { icon: Compass, name: "Great Migration" },
  { icon: Users, name: "Cultural Tours" },
  { icon: Waves, name: "Beach Holidays" },
  { icon: Mountain, name: "Mountain Climbing" },
  { icon: Camera, name: "Photography Tours" },
  { icon: Footprints, name: "Walking Safaris" },
];

const GALLERY: (LightboxImage & { span: string })[] = [
  { src: userLionPortrait.url, alt: "Young male lion resting in the grass", span: "row-span-2" },
  { src: userZebra.url, alt: "Zebra in golden sunset light", span: "" },
  { src: userHippo.url, alt: "Hippo close-up in the water", span: "" },
  { src: userLionsRoar.url, alt: "Two lions, one roaring", span: "row-span-2" },
  { src: userWaterbuck.url, alt: "Waterbuck walking through green grass", span: "" },
  { src: userOstriches.url, alt: "Ostriches crossing the savanna path", span: "" },
  { src: userGuide1.url, alt: "Our guide in the Serengeti plains", span: "row-span-2" },
  { src: userBird.url, alt: "Wide-eyed bird resting by the water", span: "" },
  { src: userTourists.url, alt: "Travelers on a safari game drive", span: "" },
  { src: userGuide2.url, alt: "Smiling safari guide on location", span: "" },
];

const TESTIMONIALS = [
  {
    name: "Emma & James Whitmore",
    country: "London, United Kingdom",
    text: "The most spellbinding two weeks of our lives. Our guide Baraka spotted a leopard within 20 minutes of leaving camp. Every detail — from the sundowners on the crater rim to the plunge pool overlooking the Serengeti — was flawless.",
    initials: "EW",
    color: "bg-gradient-gold",
  },
  {
    name: "Michael Anderson",
    country: "New York, USA",
    text: "I've travelled to 60 countries and this Tanzania trip topped every list. Balloon over the migration at dawn, followed by a private villa in Zanzibar. Ronbeyond Africa Travel thought of things I didn't know to ask for.",
    initials: "MA",
    color: "bg-gradient-safari",
  },
  {
    name: "Sofia Bianchi",
    country: "Milan, Italy",
    text: "As a photographer, access is everything — and this team delivered. Private vehicle, patient guide, and a route timed perfectly with the light. I came home with the portfolio of a career.",
    initials: "SB",
    color: "bg-gradient-sunset",
  },
  {
    name: "The Nakamura Family",
    country: "Tokyo, Japan",
    text: "Travelling with two children felt effortless. The lodges were magical, the food incredible, and the Maasai cultural visit will stay with our kids forever. Asante sana!",
    initials: "NF",
    color: "bg-gradient-gold",
  },
];

const COUNTERS = [
  { value: 120, suffix: "+", label: "National Attractions" },
  { value: 22, suffix: "", label: "National Parks" },
  { value: 4, suffix: "", label: "UNESCO Sites" },
  { value: 500, suffix: "+", label: "Wildlife Species" },
];

const FAQ = [
  {
    q: "Do I need a visa to travel to Tanzania?",
    a: "Most nationalities require a visa. Single-entry tourist visas are available online via the eVisa portal or on arrival at major airports for US $50–100. We assist with the paperwork as part of every booking.",
  },
  {
    q: "When is the best time to visit for a safari?",
    a: "June–October is the classic dry season with peak game viewing. January–February is exceptional for the wildebeest calving in the southern Serengeti. We tailor the route to your travel window.",
  },
  {
    q: "Are safaris in Tanzania safe?",
    a: "Yes. Tanzania is one of Africa's most stable safari destinations. Every guide is licensed, vehicles are radio-connected, and we maintain 24/7 concierge support and comprehensive contingency plans.",
  },
  {
    q: "What payment methods and terms do you accept?",
    a: "We accept international wire transfer, all major credit cards and Wise. A 25% deposit secures your dates; the balance is due 45 days before departure.",
  },
  {
    q: "Should I get travel insurance?",
    a: "Absolutely. We require comprehensive travel and medical insurance covering emergency evacuation. We can recommend trusted providers for Africa travel.",
  },
  {
    q: "What accommodation options are available?",
    a: "From luxurious mobile tented camps that follow the migration, to permanent five-star lodges with private plunge pools and beachfront villas in Zanzibar — we curate every stay to your taste.",
  },
];

/* ---------- Page ---------- */

function LandingPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <main id="home" className="min-h-screen bg-background text-foreground">
      <Toaster richColors position="top-center" />
      <SiteNav />

      <Hero />
      <MarqueeStrip />
      <WhyUs />
      <Destinations />
      <Packages />
      <Experiences />
      <Gallery onOpen={(i) => setLightbox(i)} />
      <Testimonials />
      <AboutTanzania />
      <Booking />
      <Faq />
      <Contact />
      <Footer />

      <Lightbox
        images={GALLERY}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onNav={setLightbox}
      />
    </main>
  );
}

/* ---------- Sections ---------- */

function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Parallax bg */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroSafari}
          alt="Tanzania safari at sunset with elephants and acacia trees"
          className="h-full w-full scale-110 object-cover animate-[float_18s_ease-in-out_infinite]"
          width={1920}
          height={1280}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pb-24 pt-40 sm:px-8">
        <div className="max-w-3xl animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium uppercase tracking-[0.28em] text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Tailored Tanzania Expeditions
          </span>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            Discover the{" "}
            <span className="italic text-gradient-gold">Magic</span>
            <br /> of Tanzania
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            Experience unforgettable safaris, the majestic Mount Kilimanjaro,
            pristine Zanzibar beaches and authentic African adventures —
            crafted one journey at a time.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#packages"
              className="group inline-flex items-center gap-2 rounded-full btn-gold px-7 py-4 text-sm font-semibold"
            >
              Explore Packages
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <button
              type="button"
              onClick={() => toast("Video coming soon — reach out for our showreel.")}
              className="group inline-flex items-center gap-3 rounded-full glass px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-emerald-deep">
                <Play className="h-4 w-4 fill-current" />
              </span>
              Watch Video
            </button>
          </div>
        </div>

        {/* Floating stat cards */}
        <div className="mt-16 grid grid-cols-2 gap-3 sm:mt-20 sm:gap-4 md:grid-cols-4">
          {HERO_STATS.map((s, i) => (
            <div
              key={s.label}
              className="glass rounded-2xl p-4 text-white sm:p-5"
              style={{
                animation: `float ${5 + i * 0.6}s ease-in-out ${i * 0.3}s infinite, fade-up 0.9s ${0.2 + i * 0.1}s both`,
              }}
            >
              <div className="text-2xl">{s.icon}</div>
              <div className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
                {s.value}
              </div>
              <div className="text-xs uppercase tracking-widest text-white/70">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#why"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 transition hover:text-white"
        aria-label="Scroll down"
      >
        <span className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em]">
          Scroll
          <ChevronDown className="h-5 w-5 animate-[scroll-hint_2s_ease-in-out_infinite]" />
        </span>
      </a>
    </section>
  );
}

function MarqueeStrip() {
  const items = ["Serengeti", "Ngorongoro", "Kilimanjaro", "Zanzibar", "Tarangire", "Lake Manyara", "Selous", "Ruaha"];
  return (
    <div className="border-y border-border bg-charcoal py-5 text-white/70">
      <div className="flex overflow-hidden">
        <div className="flex shrink-0 animate-[marquee_35s_linear_infinite] gap-14 pr-14">
          {[...items, ...items].map((t, i) => (
            <span key={i} className="flex items-center gap-4 font-display text-lg italic">
              {t}
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  body,
  align = "center",
  invert = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  body?: string;
  align?: "left" | "center";
  invert?: boolean;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn(
        "reveal max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.28em]",
          invert
            ? "bg-white/10 text-gold-soft"
            : "bg-emerald/10 text-emerald",
        )}
      >
        <span className="h-1 w-1 rounded-full bg-current" />
        {eyebrow}
      </span>
      <h2
        className={cn(
          "mt-5 font-display text-4xl font-semibold leading-tight sm:text-5xl md:text-[3.5rem]",
          invert ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {body && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            invert ? "text-white/70" : "text-muted-foreground",
          )}
        >
          {body}
        </p>
      )}
    </div>
  );
}

function WhyUs() {
  return (
    <section id="why" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Why Ronbeyond Africa Travel"
          title={
            <>
              The difference is in the <span className="italic text-gradient-sunset">details</span>
            </>
          }
          body="We're a boutique outfitter built by Tanzanian guides and international travel designers — obsessed with getting every mile right."
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((c, i) => {
            const Ref = useReveal<HTMLDivElement>();
            return (
              <div
                key={c.title}
                ref={Ref}
                className="reveal group relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-luxe"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-gold opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40" />
                <div className="relative">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-safari text-white shadow-emerald">
                    <c.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {c.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Destinations() {
  return (
    <section id="destinations" className="relative bg-sand py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Popular Destinations"
          title={
            <>
              Where legends <span className="italic text-gradient-gold">roam</span>
            </>
          }
          body="From the vast Serengeti to the turquoise reefs of Zanzibar, choose the corners of Tanzania that call you."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {DESTINATIONS.map((d, i) => {
            const Ref = useReveal<HTMLDivElement>();
            return (
              <article
                key={d.name}
                ref={Ref}
                className="reveal group relative overflow-hidden rounded-3xl bg-card shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-luxe"
                style={{ transitionDelay: `${(i % 3) * 90}ms` }}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={d.img}
                    alt={d.name}
                    loading="lazy"
                    width={1200}
                    height={900}
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-gold-soft">
                      <MapPin className="h-3.5 w-3.5" />
                      {d.location}
                    </div>
                    <h3 className="mt-2 font-display text-2xl font-semibold">
                      {d.name}
                    </h3>
                    <p className="mt-2 text-sm text-white/80">{d.body}</p>
                    <a
                      href="#booking"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-soft transition group-hover:gap-3"
                    >
                      Explore
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Packages() {
  return (
    <section id="packages" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Safari Packages"
          title={
            <>
              Choose your <span className="italic text-gradient-sunset">adventure</span>
            </>
          }
          body="Three signature journeys — or let us design one that's uniquely yours."
        />
        <div className="mt-16 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {PACKAGES.map((p, i) => {
            const Ref = useReveal<HTMLDivElement>();
            const featured = p.featured;
            return (
              <div
                key={p.name}
                ref={Ref}
                className={cn(
                  "reveal relative flex flex-col overflow-hidden rounded-3xl border p-8 transition-all duration-500",
                  featured
                    ? "border-transparent bg-gradient-safari text-white shadow-emerald lg:-my-4 lg:scale-[1.03]"
                    : "border-border bg-card shadow-soft hover:-translate-y-1 hover:shadow-luxe",
                )}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {featured && (
                  <span className="absolute right-6 top-6 rounded-full bg-gradient-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal shadow-gold">
                    Most Loved
                  </span>
                )}
                <h3
                  className={cn(
                    "font-display text-2xl font-semibold",
                    featured ? "text-white" : "text-foreground",
                  )}
                >
                  {p.name}
                </h3>
                <p
                  className={cn(
                    "mt-1 text-sm",
                    featured ? "text-white/70" : "text-muted-foreground",
                  )}
                >
                  {p.tagline}
                </p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className={cn("font-display text-5xl font-semibold", featured ? "text-gold-soft" : "text-emerald")}>
                    ${p.price.toLocaleString()}
                  </span>
                  <span className={cn("text-sm", featured ? "text-white/60" : "text-muted-foreground")}>/ person</span>
                </div>
                <div className={cn("mt-2 text-xs uppercase tracking-[0.2em]", featured ? "text-gold-soft" : "text-gold")}>
                  {p.duration}
                </div>

                <div className={cn("my-6 h-px w-full", featured ? "bg-white/15" : "bg-border")} />

                <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em]">
                  <span className={featured ? "text-white/60" : "text-muted-foreground"}>
                    Destinations
                  </span>
                </div>
                <div className="mb-6 flex flex-wrap gap-2">
                  {p.destinations.map((d) => (
                    <span
                      key={d}
                      className={cn(
                        "rounded-full px-3 py-1 text-xs",
                        featured
                          ? "bg-white/10 text-white"
                          : "bg-emerald/10 text-emerald",
                      )}
                    >
                      {d}
                    </span>
                  ))}
                </div>

                <ul className="mb-8 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span
                        className={cn(
                          "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full",
                          featured ? "bg-gold text-charcoal" : "bg-emerald/10 text-emerald",
                        )}
                      >
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className={featured ? "text-white/90" : "text-foreground/80"}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#booking"
                  className={cn(
                    "mt-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition",
                    featured
                      ? "bg-gradient-gold text-charcoal shadow-gold hover:brightness-110"
                      : "bg-emerald text-white hover:bg-emerald-deep",
                  )}
                >
                  Book Now
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Experiences() {
  return (
    <section id="experiences" className="relative overflow-hidden bg-charcoal py-24 text-white sm:py-32">
      <div
        className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-gradient-sunset opacity-20 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-gradient-safari opacity-30 blur-[120px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading
          invert
          eyebrow="Experiences"
          title={
            <>
              Beyond the <span className="italic text-gradient-gold">game drive</span>
            </>
          }
          body="Balloon at dawn, walk with Maasai warriors, dive coral reefs, or summit the roof of Africa."
        />
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {EXPERIENCES.map((e, i) => {
            const Ref = useReveal<HTMLDivElement>();
            return (
              <div
                key={e.name}
                ref={Ref}
                className="reveal group relative overflow-hidden rounded-2xl glass p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-white/15"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-gold text-charcoal shadow-gold transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <e.icon className="h-5 w-5" />
                </div>
                <div className="mt-5 font-display text-lg font-semibold">{e.name}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-white/50">
                  Discover
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Gallery({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Gallery"
          title={
            <>
              Postcards from the <span className="italic text-gradient-gold">wild</span>
            </>
          }
          body="A window into what awaits — captured by our guides and guests across Tanzania."
        />
        <div className="mt-14 grid auto-rows-[220px] grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {GALLERY.map((img, i) => {
            const Ref = useReveal<HTMLButtonElement>();
            return (
              <button
                key={img.src}
                ref={Ref}
                onClick={() => onOpen(i)}
                className={cn(
                  "reveal group relative overflow-hidden rounded-2xl shadow-soft transition-all duration-500 hover:shadow-luxe focus:outline-none focus:ring-2 focus:ring-gold",
                  img.span,
                )}
                style={{ transitionDelay: `${(i % 4) * 80}ms` }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-90" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-white">
                  <span className="font-display text-sm font-medium sm:text-base">{img.alt}</span>
                  <span className="grid h-9 w-9 place-items-center rounded-full glass opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <Plus className="h-4 w-4" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 6500);
    return () => clearInterval(t);
  }, []);
  const active = TESTIMONIALS[index];

  return (
    <section id="testimonials" className="relative overflow-hidden bg-gradient-safari py-24 text-white sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, oklch(0.72 0.135 78 / 0.4), transparent 40%), radial-gradient(circle at 80% 80%, oklch(0.7 0.19 55 / 0.35), transparent 45%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-5xl px-6 sm:px-8">
        <SectionHeading
          invert
          eyebrow="Traveller Stories"
          title={
            <>
              Trusted by explorers <span className="italic text-gradient-gold">worldwide</span>
            </>
          }
        />
        <div className="mt-14 rounded-3xl glass-dark p-8 sm:p-12">
          <div className="flex items-center gap-1 text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current" />
            ))}
          </div>
          <blockquote className="mt-6 font-display text-xl leading-relaxed sm:text-2xl md:text-3xl">
            <span className="text-gold-soft">"</span>
            {active.text}
            <span className="text-gold-soft">"</span>
          </blockquote>
          <div className="mt-8 flex items-center gap-4">
            <div className={cn("grid h-14 w-14 place-items-center rounded-full font-display text-lg font-semibold text-white", active.color)}>
              {active.initials}
            </div>
            <div>
              <div className="font-display text-lg font-semibold">{active.name}</div>
              <div className="text-sm text-white/60">{active.country}</div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-500",
                i === index ? "w-10 bg-gold" : "w-2 bg-white/30 hover:bg-white/60",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}



function AboutTanzania() {
  const imgRef = useReveal<HTMLDivElement>();
  const textRef = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div ref={imgRef} className="reveal relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-luxe">
            <img
              src={aboutTanzania}
              alt="Maasai warriors performing traditional jumping dance in Tanzania"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
          <div className="absolute -bottom-8 -right-6 hidden rounded-3xl bg-card p-6 shadow-luxe sm:block">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-gold text-charcoal shadow-gold">
                <Palmtree className="h-6 w-6" />
              </div>
              <div>
                <div className="font-display text-2xl font-semibold">Karibu</div>
                <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Welcome to Tanzania
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref={textRef} className="reveal">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.28em] text-emerald">
            About Tanzania
          </span>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            A country of <span className="italic text-gradient-sunset">wild wonders</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Tanzania is a land of superlatives — home to Africa's highest peak,
            its largest wildlife herds, and one of humanity's oldest cultures.
            Walk with the Maasai, watch two million wildebeest thunder across
            the Serengeti, stand on the roof of Africa at Kilimanjaro's summit,
            then finish barefoot on the white sands of Zanzibar.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {COUNTERS.map((c) => (
              <Counter key={c.label} target={c.value} suffix={c.suffix} label={c.label} />
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {["Wildlife", "National Parks", "Culture", "Kilimanjaro", "Zanzibar", "Great Migration"].map(
              (t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-background px-4 py-1.5 text-sm text-foreground/80"
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Counter({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const { ref, value } = useCountUp(target);
  return (
    <div>
      <div className="font-display text-4xl font-semibold text-emerald sm:text-5xl">
        <span ref={ref}>{value.toLocaleString()}</span>
        <span className="text-gold">{suffix}</span>
      </div>
      <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function Booking() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="booking" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 z-0 bg-gradient-safari" />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, oklch(0.72 0.135 78 / 0.45), transparent 45%), radial-gradient(circle at 85% 90%, oklch(0.82 0.11 232 / 0.35), transparent 45%)",
        }}
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8">
        <div ref={ref} className="reveal rounded-[2rem] bg-card p-8 shadow-luxe sm:p-12 md:p-14">
          <div className="grid gap-10 md:grid-cols-[1.1fr,1.5fr] md:items-start">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.28em] text-emerald">
                Book Your Adventure
              </span>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-tight sm:text-5xl">
                Design your <span className="italic text-gradient-sunset">safari</span>
              </h2>
              <p className="mt-5 text-muted-foreground">
                Tell us a little about your dream trip. A travel designer
                replies within 24 hours with a tailored proposal — no
                obligation, no templates.
              </p>
              <div className="mt-8 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald/10 text-emerald">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span>Free itinerary consultation with a Tanzanian expert.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald/10 text-emerald">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span>Flexible dates, private guides, luxury lodges.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald/10 text-emerald">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span>25% deposit secures your dates and lodges.</span>
                </div>
              </div>
            </div>
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function BookingForm() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      travel_date: String(fd.get("date") ?? ""),
      destination: String(fd.get("destination") ?? ""),
      package: String(fd.get("package") ?? ""),
      travelers: Number(fd.get("travelers") ?? 1),
      message: String(fd.get("message") ?? "").trim() || null,
    };

    if (!payload.name || !payload.email || !payload.phone || !payload.travel_date) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("bookings").insert(payload);
    setSubmitting(false);

    if (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again or contact us directly.");
      return;
    }

    toast.success("Thank you! Your booking has been received. Our team will be in touch within 24 hours.");
    form.reset();

    // Fire-and-forget WhatsApp notification to the owner.
    notifyBookingWhatsApp({ data: payload }).catch((err) =>
      console.error("WhatsApp notification failed", err),
    );
  };


  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <Field label="Full name" name="name" placeholder="Jane Doe" />
      <Field label="Email" name="email" type="email" placeholder="you@example.com" />
      <Field label="Phone" name="phone" type="tel" placeholder="+1 555 000 0000" />
      <Field label="Travel date" name="date" type="date" />
      <SelectField
        label="Destination"
        name="destination"
        options={["Serengeti", "Ngorongoro", "Kilimanjaro", "Zanzibar", "Tarangire", "Lake Manyara", "Not sure yet"]}
      />
      <SelectField
        label="Package"
        name="package"
        options={["Classic Safari", "Luxury Safari", "Ultimate Tanzania", "Custom"]}
      />
      <div className="sm:col-span-2">
        <Field label="Number of travelers" name="travelers" type="number" placeholder="2" min={1} />
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Tell us about your dream trip
        </label>
        <textarea
          name="message"
          rows={4}
          placeholder="Interests, celebrations, must-see wildlife..."
          className="w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/20"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="group sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-safari px-8 py-4 text-sm font-semibold text-white shadow-emerald transition hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Book Your Safari"}
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; name: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        {...rest}
        className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/20"
      />
    </div>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </label>
      <select
        id={name}
        name={name}
        required
        defaultValue=""
        className="w-full appearance-none rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/20"
      >
        <option value="" disabled>Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-sand py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Frequently Asked"
          title={
            <>
              Everything you need to <span className="italic text-gradient-gold">know</span>
            </>
          }
        />
        <div className="mt-14 space-y-3">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={cn(
                  "overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500",
                  isOpen && "shadow-luxe",
                )}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                >
                  <span className="font-display text-lg font-semibold">{f.q}</span>
                  <span
                    className={cn(
                      "grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-500",
                      isOpen ? "bg-emerald text-white rotate-180" : "bg-emerald/10 text-emerald",
                    )}
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-500 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const CONTACT_CARDS = [
  {
    icon: MapPinned,
    title: "Office",
    lines: ["Boma Road, Arusha", "Tanzania, East Africa"],
    href: "https://maps.google.com/?q=Arusha+Tanzania",
    cta: "Open in Maps",
  },
  {
    icon: Phone,
    title: "Phone",
    lines: ["+255 749 458 052", "Mon – Sun · 24/7"],
    href: "tel:+255749458052",
    cta: "Call us",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    lines: ["+255 749 458 052", "Instant reply guaranteed"],
    href: "https://wa.me/255749458052",
    cta: "Chat now",
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["ronbeyond@gmail.com", "24h response window"],
    href: "mailto:ronbeyond@gmail.com",
    cta: "Send email",
  },
];

function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Get in Touch"
          title={
            <>
              Let's start <span className="italic text-gradient-sunset">planning</span>
            </>
          }
          body="Reach out anytime — our travel designers are standing by across time zones."
        />
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {CONTACT_CARDS.map((c, i) => {
            const Ref = useReveal<HTMLAnchorElement>();
            return (
              <a
                key={c.title}
                ref={Ref}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="reveal group relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-luxe"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-gold text-charcoal shadow-gold">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{c.title}</h3>
                <div className="mt-2 space-y-0.5 text-sm text-muted-foreground">
                  {c.lines.map((l) => (
                    <div key={l}>{l}</div>
                  ))}
                </div>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald transition group-hover:gap-3">
                  {c.cta} <ArrowRight className="h-4 w-4" />
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl border border-border shadow-soft">
          <iframe
            title="Ronbeyond Africa Travel location"
            src="https://www.google.com/maps?q=Arusha+Tanzania&output=embed"
            className="h-[360px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-charcoal pt-20 pb-10 text-white/80">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[80%] -translate-x-1/2 rounded-full bg-gradient-gold opacity-10 blur-[120px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-background shadow-gold ring-1 ring-white/20">
                <img src={logoAsset.url} alt="Ronbeyond Africa Travel logo" className="h-full w-full object-cover" />
              </span>
              <div>
                <div className="font-display text-lg font-semibold text-white">Ronbeyond Africa Travel</div>
                <div className="text-[10px] uppercase tracking-[0.16em] text-white/60">Luxury Tanzania Travel</div>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              Boutique Tanzania travel designers crafting private safaris,
              summits and beach escapes since 2010.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://instagram.com/Ronbeyondafrica"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-white/70 transition hover:bg-gold hover:text-charcoal"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/255749458052"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-white/70 transition hover:bg-gold hover:text-charcoal"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="mailto:ronbeyond@gmail.com"
                aria-label="Email"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-white/70 transition hover:bg-gold hover:text-charcoal"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <FooterCol
            title="Quick Links"
            links={[
              ["Home", "#home"],
              ["Destinations", "#destinations"],
              ["About", "#about"],
              ["Gallery", "#gallery"],
              ["Contact", "#contact"],
            ]}
          />
          <FooterCol
            title="Safari Packages"
            links={[
              ["Classic Safari", "#packages"],
              ["Luxury Safari", "#packages"],
              ["Ultimate Tanzania", "#packages"],
              ["Kilimanjaro Trek", "#packages"],
              ["Zanzibar Escapes", "#packages"],
            ]}
          />

          <div>
            <h4 className="font-display text-lg font-semibold text-white">Newsletter</h4>
            <p className="mt-3 text-sm text-white/60">
              Stories from the bush, seasonal guides and private-client offers.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Subscribed. Karibu!");
                (e.currentTarget as HTMLFormElement).reset();
              }}
              className="mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1.5"
            >
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none"
              />
              <button className="rounded-full bg-gradient-gold px-4 py-2 text-xs font-bold uppercase tracking-widest text-charcoal shadow-gold">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <div>© {new Date().getFullYear()} Ronbeyond Africa Travel. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="font-display text-lg font-semibold text-white">{title}</h4>
      <ul className="mt-4 space-y-2.5 text-sm text-white/60">
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href} className="transition hover:text-gold">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Suppress unused warning for helper we're keeping around */
void Bird;

