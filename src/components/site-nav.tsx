import { useEffect, useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import logoAsset from "@/assets/ronbeyond-logo.jpeg.asset.json";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Destinations", href: "#destinations" },
  { label: "Packages", href: "#packages" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500 sm:px-6",
          scrolled
            ? "glass-dark mx-4 shadow-luxe"
            : "mx-4 bg-transparent",
        )}
      >
        <a href="#home" className="group flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-cream shadow-gold ring-1 ring-white/20">
            <img src={logoAsset.url} alt="Ronbeyond Africa Travel logo" className="h-full w-full object-cover" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold tracking-tight text-white">
              Ronbeyond
            </span>
            <span className="text-[10px] uppercase tracking-[0.16em] text-white/70">
              Africa Travel
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#booking"
            className="hidden rounded-full btn-gold px-5 py-2.5 text-sm font-semibold md:inline-flex"
          >
            Book Now
          </a>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 top-0 z-40 origin-top bg-gradient-to-b from-charcoal to-emerald-deep transition-all duration-500 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        style={{ transform: open ? "translateY(0)" : "translateY(-8px)" }}
      >
        <div className="flex h-full flex-col justify-between px-8 pb-10 pt-28">
          <nav className="flex flex-col gap-2">
            {NAV.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between border-b border-white/10 py-4 text-2xl font-display font-medium text-white transition"
                style={{
                  transitionDelay: open ? `${i * 60}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(8px)",
                  transitionProperty: "opacity, transform",
                  transitionDuration: "500ms",
                }}
              >
                {item.label}
                <ChevronRight className="h-5 w-5 text-white/40 transition group-hover:translate-x-1 group-hover:text-gold" />
              </a>
            ))}
          </nav>
          <a
            href="#booking"
            onClick={() => setOpen(false)}
            className="block w-full rounded-full btn-gold px-6 py-4 text-center text-base font-semibold"
          >
            Book Your Safari
          </a>
        </div>
      </div>
    </header>
  );
}
