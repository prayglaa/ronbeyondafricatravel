import { useEffect, useState } from "react";
import { X, MapPin, CalendarDays, Hotel, Music4, Users, ArrowRight, Sunrise, Plane, Sparkles } from "lucide-react";
import { buildItinerary, type DestinationDetail } from "@/data/destinations";
import { cn } from "@/lib/utils";

export type DestinationModalProps = {
  open: boolean;
  image?: string;
  detail: DestinationDetail | null;
  onClose: () => void;
  onPlan: (payload: { destination: string; days: number; itinerary: string[] }) => void;
};

export function DestinationModal({ open, image, detail, onClose, onPlan }: DestinationModalProps) {
  const [days, setDays] = useState<number>(detail?.suggestedDays ?? 4);

  useEffect(() => {
    if (open && detail) setDays(detail.suggestedDays);
  }, [open, detail]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open || !detail) return null;

  const itinerary = buildItinerary(detail, days);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${detail.name} guide`}
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 p-0 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative my-0 w-full max-w-4xl overflow-hidden rounded-none bg-background shadow-luxe sm:my-4 sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close destination guide"
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70"
        >
          <X className="h-5 w-5" />
        </button>

        {image && (
          <div className="relative h-56 w-full overflow-hidden sm:h-72">
            <img src={image} alt={detail.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-gold-soft">
                <MapPin className="h-3.5 w-3.5" />
                Tanzania
              </div>
              <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{detail.name}</h2>
              <p className="mt-1 text-sm text-white/80">{detail.tagline}</p>
            </div>
          </div>
        )}

        <div className="space-y-8 p-6 sm:p-8">
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{detail.welcome}</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard icon={Sunrise} title="Best time to visit" body={detail.bestTime} />
            <InfoCard icon={Plane} title="Getting there" body={detail.gettingThere} />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Stage title="Before you arrive" items={detail.before} />
            <Stage title="While you are there" items={detail.during} />
            <Stage title="After the destination" items={detail.after} />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Heading icon={Hotel}>Where you can stay</Heading>
              <ul className="mt-3 space-y-2.5">
                {detail.hotels.map((h) => (
                  <li key={h.name} className="rounded-2xl border border-border bg-sand/60 px-4 py-3">
                    <div className="text-sm font-semibold text-foreground">{h.name}</div>
                    <div className="text-xs text-muted-foreground">{h.note}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <div>
                <Heading icon={Music4}>Entertainment &amp; activities</Heading>
                <BulletList items={detail.entertainment} />
              </div>
              <div>
                <Heading icon={Users}>Culture &amp; people</Heading>
                <BulletList items={detail.culture} />
              </div>
            </div>
          </div>

          {/* Days planner */}
          <div className="rounded-3xl border border-emerald/20 bg-emerald/5 p-6">
            <Heading icon={CalendarDays}>How many days do you want here?</Heading>
            <p className="mt-2 text-sm text-muted-foreground">
              Write your days and we will arrange the journey for {detail.name} instantly. We recommend at
              least {detail.minDays} {detail.minDays === 1 ? "day" : "days"}.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <input
                type="number"
                min={1}
                max={21}
                value={days}
                onChange={(e) => setDays(Math.max(1, Math.min(21, Number(e.target.value) || 1)))}
                aria-label="Number of days"
                className="w-28 rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/20"
              />
              <div className="flex flex-wrap gap-2">
                {[detail.minDays, detail.suggestedDays, detail.suggestedDays + 2].map((d, i) => (
                  <button
                    key={`${d}-${i}`}
                    type="button"
                    onClick={() => setDays(d)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-xs font-semibold transition",
                      days === d
                        ? "border-emerald bg-emerald text-white"
                        : "border-border bg-background text-muted-foreground hover:border-emerald/50",
                    )}
                  >
                    {d} days
                  </button>
                ))}
              </div>
              {days < detail.minDays && (
                <span className="text-xs font-medium text-sunset">
                  {detail.minDays}+ days recommended for a proper experience.
                </span>
              )}
            </div>

            <div className="mt-6">
              <Heading icon={Sparkles}>Your {days}-day arrangement</Heading>
              <ol className="mt-3 space-y-2">
                {itinerary.map((line, i) => (
                  <li key={i} className="flex gap-3 rounded-2xl bg-background/80 px-4 py-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-safari text-[11px] font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="text-sm text-foreground">{line}</span>
                  </li>
                ))}
              </ol>
            </div>

            <button
              type="button"
              onClick={() => onPlan({ destination: detail.bookingValue, days, itinerary })}
              className="group mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-safari px-8 py-4 text-sm font-semibold text-white shadow-emerald transition hover:-translate-y-0.5 hover:brightness-110"
            >
              Continue with this {days}-day plan
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Heading({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
      <Icon className="h-4.5 w-4.5 text-emerald" />
      {children}
    </h3>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
      {items.map((it) => (
        <li key={it} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
          {it}
        </li>
      ))}
    </ul>
  );
}

function Stage({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{title}</div>
      <BulletList items={items} />
    </div>
  );
}

function InfoCard({ icon: Icon, title, body }: { icon: React.ElementType; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border bg-sand/60 p-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-emerald" />
        {title}
      </div>
      <p className="mt-1.5 text-sm text-foreground">{body}</p>
    </div>
  );
}
