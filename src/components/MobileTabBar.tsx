import { useEffect, useState, type ReactNode } from "react";
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

const allTabIds = tabs.map((t) => t.id);
// DAS'ta AI bölümü yok
const dasTabIds = allTabIds.filter((id) => id !== "ai-projeler");

// Ekranın ortasından geçen bölümü IntersectionObserver ile bulur: kaydırma
// dinleyicisi ve getBoundingClientRect yok, ana iş parçacığı boş kalır
const useActiveSection = (ids: readonly string[], enabled: boolean) => {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        // Ekranın %45'indeki ince şeridi kesen bölüm aktif
        setActive(ids.find((id) => visible.has(id)) ?? null);
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [ids, enabled]);
  return active;
};

type Mode = "vizyon" | "bento" | "zen";

// Her modun kabuğu ayrı bir katman; mod değişince yalnızca opaklıkla
// çapraz geçiş yapılır (radius / renk / gölge animasyonu yok, compositor'da kalır)
const shellLayer: Record<Mode, string> = {
  // Vizyon: koyu cam hissi; mobilde blur yerine yarı saydam düz renk + amber parıltı
  vizyon:
    "inset-0 rounded-t-[22px] bg-[#0b0b11]/95 border-t border-white/10 shadow-[0_-10px_40px_rgba(245,158,11,0.10)]",
  // Bento: yüzen ada
  bento:
    "inset-x-2 top-0 bottom-[calc(env(safe-area-inset-bottom)+4px)] rounded-[22px] bg-[#111] border border-white/[0.12] shadow-[0_18px_40px_rgba(0,0,0,0.55)]",
  // Zen: ince üst çizgi
  zen: "inset-0 bg-[#0A0A0F]/[0.97] border-t border-white/[0.06]",
};

// Aktif gösterge her modda farklı; hepsi aynı satırda, yalnızca transform ile kayar
const indicator: Record<Mode, string> = {
  vizyon:
    "after:absolute after:top-1.5 after:left-1/2 after:-ml-[22px] after:w-11 after:h-7 after:rounded-full after:bg-amber-500/15 after:shadow-[0_0_18px_rgba(245,158,11,0.35)]",
  bento:
    "after:absolute after:inset-1 after:rounded-[16px] after:bg-white/[0.07] after:border after:border-white/10",
  zen: "after:absolute after:bottom-1.5 after:left-1/2 after:-ml-[3px] after:w-1.5 after:h-1.5 after:rounded-full after:bg-amber-400",
};

const modes: Mode[] = ["vizyon", "bento", "zen"];

export const MobileTabBar = ({ profileId }: { profileId: string }) => {
  const { viewMode } = useView();
  const { pathname } = useLocation();
  const isHome = pathname === `/${profileId}`;
  const tabIds = profileId === "das" ? dasTabIds : allTabIds;
  const visibleTabs = tabs.filter((t) => tabIds.includes(t.id));
  const active = useActiveSection(tabIds, isHome);
  const activeIndex = tabIds.indexOf(active as (typeof tabIds)[number]);
  const zen = viewMode === "zen";

  return (
    <nav
      aria-label="Bölümler"
      className="md:hidden fixed inset-x-0 bottom-0 z-[998] px-2 pt-1"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 8px)" }}
    >
      {modes.map((m) => (
        <div
          key={m}
          aria-hidden
          className={`absolute pointer-events-none transition-opacity duration-300 ${shellLayer[m]} ${viewMode === m ? "opacity-100" : "opacity-0"}`}
        />
      ))}

      <div className="relative">
        {/* Aktif göstergeler: bir sekme genişliğinde, translateX ile kayar */}
        {modes.map((m) => (
          <span
            key={m}
            aria-hidden
            className={`absolute inset-y-0 left-0 ${visibleTabs.length === 4 ? "w-1/4" : "w-1/5"} pointer-events-none transition-[transform,opacity] duration-300 ease-out ${indicator[m]} ${viewMode === m && activeIndex >= 0 ? "opacity-100" : "opacity-0"}`}
            style={{
              transform: `translateX(${Math.max(activeIndex, 0) * 100}%)`,
            }}
          />
        ))}

        <ul
          className={`relative grid ${visibleTabs.length === 4 ? "grid-cols-4" : "grid-cols-5"}`}
        >
          {visibleTabs.map((tab) => {
            const isActive = active === tab.id;
            const cls = `relative flex flex-col items-center justify-center gap-1 min-h-[56px] px-1 text-[0.68rem] font-semibold tracking-wide transition-colors duration-300 active:scale-95 ${
              isActive
                ? zen
                  ? "text-white"
                  : "text-amber-400"
                : "text-white/60"
            }`;
            const content = (
              <>
                <span className="relative z-10 flex items-center justify-center w-11 h-7">
                  {tab.icon}
                </span>
                {/* Zen'de etiket görünmez (yer tutar, düzen kaymaz) */}
                <span
                  className={`relative z-10 transition-opacity duration-300 ${zen ? "opacity-0" : "opacity-100"}`}
                >
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
      </div>
    </nav>
  );
};
