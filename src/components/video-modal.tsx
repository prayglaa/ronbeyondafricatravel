import { useEffect, useRef, useState } from "react";
import { X, SkipForward } from "lucide-react";

export function VideoModal({
  videos,
  open,
  onClose,
}: {
  videos: { src: string; type?: string }[];
  open: boolean;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (open) setIndex(0);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [index, open]);

  if (!open || videos.length === 0) return null;

  const current = videos[index];
  const isLast = index >= videos.length - 1;

  const handleEnded = () => {
    if (!isLast) setIndex((i) => i + 1);
    else onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
      >
        <X className="h-5 w-5" />
      </button>

      <video
        ref={videoRef}
        key={current.src}
        src={current.src}
        controls
        autoPlay
        playsInline
        onEnded={handleEnded}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] max-w-[92vw] rounded-2xl shadow-2xl bg-black"
      />

      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 rounded-full bg-white/10 backdrop-blur px-4 py-2 text-xs font-medium tracking-wide text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <span>
          {index + 1} / {videos.length}
        </span>
        {!isLast && (
          <button
            onClick={() => setIndex((i) => i + 1)}
            className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 hover:bg-white/25 transition"
          >
            <SkipForward className="h-3 w-3" /> Next
          </button>
        )}
      </div>
    </div>
  );
}
