import { useState } from "react";
import { ChevronUp, Moon, Plus } from "lucide-react";

export default function FloatingDock() {
  const [open, setOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {open && (
        <div className="mb-4 flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          <button
            onClick={scrollToTop}
            className="rounded-full bg-black/80 backdrop-blur-md p-3 text-white shadow-lg transition hover:scale-110"
          >
            <ChevronUp size={20} />
          </button>

          <a
            href="https://github.com/Ayushh-Sharmaa/NexaSphere"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-black/80 backdrop-blur-md p-3 text-white shadow-lg transition hover:scale-110"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
          </a>

          <button
            className="rounded-full bg-black/80 backdrop-blur-md p-3 text-white shadow-lg transition hover:scale-110"
          >
            <Moon size={20} />
          </button>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className={`rounded-full p-4 text-white shadow-2xl transition-all duration-300 ${
          open
            ? "rotate-45 bg-red-500"
            : "bg-gradient-to-r from-red-500 to-pink-500"
        }`}
      >
        <Plus size={24} />
      </button>
    </div>
  );
}