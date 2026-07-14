import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type LightboxImage = { src: string; alt: string };

export function Lightbox({
  images,
  index,
  onClose,
  onNav,
}: {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onNav: (next: number) => void;
}) {
  const open = index !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && index !== null)
        onNav((index + 1) % images.length);
      if (e.key === "ArrowLeft" && index !== null)
        onNav((index - 1 + images.length) % images.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, index, images.length, onClose, onNav]);

  if (!open || index === null) return null;
  const img = images[index];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
      >
        <X className="h-5 w-5" />
      </button>
      <button
        aria-label="Previous"
        onClick={(e) => {
          e.stopPropagation();
          onNav((index - 1 + images.length) % images.length);
        }}
        className="absolute left-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:left-8"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        aria-label="Next"
        onClick={(e) => {
          e.stopPropagation();
          onNav((index + 1) % images.length);
        }}
        className="absolute right-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:right-8"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      <img
        key={img.src}
        src={img.src}
        alt={img.alt}
        className={cn(
          "max-h-[85vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl",
          "animate-in fade-in zoom-in-95 duration-500",
        )}
        onClick={(e) => e.stopPropagation()}
      />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full glass-dark px-4 py-1.5 text-xs font-medium tracking-wide text-white">
        {index + 1} / {images.length} — {img.alt}
      </div>
    </div>
  );
}
