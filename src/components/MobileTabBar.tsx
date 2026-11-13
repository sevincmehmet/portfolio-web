import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useView } from "../context/useView";

// Mobilde (<768px) uygulama gibi alt sekme çubuğu. Aktif sekme, ekranın
// ortasındaki bölüme göre işaretlenir. Masaüstünde gizli.

const Icon = ({ children }: { children: ReactNode }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    {children}
  </svg>
);

const tabs = [
  {
    id: "projeler",
    label: "Projeler",
    icon: (
      <Icon>
        <rect width="7" height="7" x="3" y="3" rx="1.5" />
        <rect width="7" height="7" x="14" y="3" rx="1.5" />
        <rect width="7" height="7" x="14" y="14" rx="1.5" />
        <rect width="7" height="7" x="3" y="14" rx="1.5" />
      </Icon>
    ),
  },
  {
    id: "canli",
    label: "Canlı",
    icon: (
      <Icon>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18" />
      </Icon>
    ),
  },
  {
    id: "kariyer",
    label: "Kariyer",
    icon: (
      <Icon>
        <rect width="18" height="13" x="3" y="7" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M3 13h18" />
      </Icon>
    ),
  },
  {
    id: "ai-projeler",
    label: "AI",
    icon: (
      <Icon>
        <path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.13-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.13a.5.5 0 0 1 .96 0l1.58 6.13a2 2 0 0 0 1.44 1.44l6.13 1.58a.5.5 0 0 1 0 .96l-6.13 1.58a2 2 0 0 0-1.44 1.44l-1.58 6.13a.5.5 0 0 1-.96 0z" />
      </Icon>
    ),
  },
  {
    id: "iletisim",
    label: "İletişim",
    icon: (
      <Icon>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </Icon>
    ),
  },
] as const;

const tabIds = tabs.map((t) => t.id);

// Ekranın ortasından geçen bölümü bulur
const useActiveSection = (ids: readonly string[], enabled: boolean) => {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const onScroll = () => {
      const mid = window.innerHeight * 0.45;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids, enabled]);
  return active;
};

export const MobileTabBar = ({ profileId }: { profileId: string }) => {
  const { viewMode } = useView();
  const { pathname } = useLocation();
  const isHome = pathname === `/${profileId}`;
  const active = useActiveSection(tabIds, isHome);

  // Her mod kendi dilinde: Vizyon cam + parıltı, Bento yüzen ada,
  // Zen ince çizgi ve sadece ikon. Kabuk mod değişince yumuşakça dönüşür;
  // aktif gösterge sekmeler (ve modlar) arasında layoutId ile kayar.
  const zen = viewMode === "zen";
  const bento = viewMode === "bento";
  const shell = {
    vizyon: {
      backgroundColor: "rgba(10,10,15,0.82)",
      borderColor: "rgba(255,255,255,0.10)",
      borderRadius: "22px 22px 0px 0px",
      boxShadow: "0 -10px 40px rgba(245,158,11,0.10)",
    },
    bento: {
      backgroundColor: "rgba(17,17,17,0.97)",
      borderColor: "rgba(255,255,255,0.12)",
      borderRadius: "24px 24px 24px 24px",
      boxShadow: "0 18px 40px rgba(0,0,0,0.55)",
    },
    zen: {
      backgroundColor: "rgba(10,10,15,0.96)",
      borderColor: "rgba(255,255,255,0.06)",
      borderRadius: "0px 0px 0px 0px",
      boxShadow: "0 0 0 rgba(0,0,0,0)",
    },
  }[viewMode];

  return (
    <nav
      aria-label="Bölümler"
      className={`md:hidden fixed inset-x-0 bottom-0 z-[998] transition-[padding] duration-500 ${bento ? "px-3" : "px-0"}`}
      style={{
        paddingBottom: bento
          ? "calc(env(safe-area-inset-bottom) + 10px)"
          : "env(safe-area-inset-bottom)",
      }}
    >
      <motion.div
        initial={false}
        animate={shell}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`border ${zen ? "border-x-0 border-b-0" : bento ? "" : "border-x-0 border-b-0"} ${viewMode === "vizyon" ? "backdrop-blur-md" : ""}`}
      >
        <ul className={`grid grid-cols-5 ${bento ? "p-1.5 gap-1" : ""}`}>
          {tabs.map((tab) => {
            const isActive = active === tab.id;
            const cls = `relative flex flex-col items-center justify-center gap-1 ${zen ? "min-h-[58px]" : "min-h-[56px]"} px-1 text-[0.68rem] font-semibold tracking-wide transition-colors active:scale-95 ${
              isActive
                ? zen
                  ? "text-white"
                  : "text-amber-400"
                : zen
                  ? "text-white/55"
                  : "text-white/60"
            }`;
            const content = (
              <>
                {isActive && (
                  <motion.span
                    layoutId="tab-indicator"
                    aria-hidden
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className={
                      zen
                        ? "absolute bottom-2 left-1/2 -ml-[3px] w-1.5 h-1.5 rounded-full bg-amber-400"
                        : bento
                          ? "absolute inset-0 rounded-[18px] bg-white/[0.07] border border-white/10"
                          : "absolute top-1.5 left-1/2 -ml-[22px] w-11 h-7 rounded-full bg-amber-500/15 shadow-[0_0_18px_rgba(245,158,11,0.35)]"
                    }
                  />
                )}
                <span className="relative z-10 flex items-center justify-center w-11 h-7">
                  {tab.icon}
                </span>
                <span className={`relative z-10 ${zen ? "sr-only" : ""}`}>
                  {tab.label}
                </span>
              </>
            );
            return (
              <li key={tab.id}>
                {isHome ? (
                  <a
                    href={`#${tab.id}`}
                    aria-current={isActive ? "location" : undefined}
                    aria-label={tab.label}
                    className={cls}
                  >
                    {content}
                  </a>
                ) : (
                  <Link
                    to={`/${profileId}#${tab.id}`}
                    aria-label={tab.label}
                    className={cls}
                  >
                    {content}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </motion.div>
    </nav>
  );
};
