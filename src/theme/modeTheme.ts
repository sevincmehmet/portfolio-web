import type { ViewMode } from "../context/viewContextBase";

/**
 * Üç görünüm modunun tasarım dili tek yerde.
 *
 * Vizyon  — sinematik: cam yüzeyler (white/2 + ince çizgi), büyük radius
 *           (2rem), amber→cyan degrade vurgular, parıltılı gölge, yarı kalın
 *           sıkı başlıklar, akan hareket (yumuşak kayma, nefes alan ışıklar).
 * Bento   — sistematik: opak koyu kutular (#111), orta radius (1.25–1.75rem),
 *           net 1px çerçeve, kalın başlık, her bilgi kendi kutusunda; hareket
 *           kısa ve ölçek odaklı.
 * Zen     — sessiz: yüzey yok, yalnızca ince üst çizgiler, radius yok,
 *           ince (extralight) büyük tipografi, geniş harf aralıklı etiketler,
 *           düşük kontrastlı ama okunur metin; hareket yalnızca opaklık.
 *
 * Bileşenler sınıfları buradan alır; yeni bir yüzey eklerken önce buraya bakın.
 */
export interface ModeTheme {
  /** Ana kart / yüzey */
  card: string;
  /** Kart içindeki ikincil kutu (liste maddesi, alt kart) */
  subCard: string;
  /** Kart iç boşluğu */
  pad: string;
  /** Büyük başlık (h1/h2) */
  title: string;
  /** Küçük üst etiket (bölüm adı, alan adı) */
  label: string;
  /** Vurgu rengi (rol, alt başlık) */
  accentText: string;
  /** Birincil buton */
  btnPrimary: string;
  /** İkincil buton */
  btnSecondary: string;
  /** Teknoloji / bilgi etiketi */
  chip: string;
  /** Madde işareti */
  bullet: string;
  /** Rozet şekli */
  badgeShape: string;
}

export const modeTheme: Record<ViewMode, ModeTheme> = {
  vizyon: {
    card: "bg-white/[0.02] border border-white/10 rounded-[2rem] shadow-lg md:shadow-2xl",
    subCard: "rounded-2xl bg-white/[0.025] border border-white/[0.08]",
    pad: "p-5 md:p-8",
    title: "font-semibold tracking-tighter text-[#F8F9FA]",
    label:
      "text-amber-400 font-bold tracking-[0.22em] text-[0.68rem] uppercase",
    accentText: "text-amber-400",
    btnPrimary:
      "px-5 py-3 rounded-full bg-amber-500 text-black font-semibold hover:bg-amber-400 shadow-[0_0_24px_rgba(245,158,11,0.25)]",
    btnSecondary:
      "px-5 py-3 rounded-full border border-white/15 text-white/85 font-semibold hover:border-amber-500/50",
    chip: "rounded-full bg-amber-500/5 border border-amber-500/20 text-amber-400",
    bullet: "rounded-full bg-amber-500",
    badgeShape: "rounded-full",
  },
  bento: {
    card: "bg-[#111] md:bg-white/[0.02] border border-white/[0.07] rounded-[1.5rem]",
    subCard: "rounded-xl bg-white/[0.03] border border-white/[0.06]",
    pad: "p-5 md:p-8",
    title: "font-bold tracking-tighter text-[#F8F9FA]",
    label: "text-amber-500 font-black tracking-widest text-[0.65rem] uppercase",
    accentText: "text-amber-500",
    btnPrimary:
      "px-5 py-3 rounded-xl bg-white text-black font-bold hover:bg-amber-500",
    btnSecondary:
      "px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white/85 font-bold hover:border-amber-500/50",
    chip: "rounded-md bg-white/5 border border-white/10 text-white/80",
    bullet: "rounded-sm bg-amber-500",
    badgeShape: "rounded-lg",
  },
  zen: {
    card: "border-t border-white/10 rounded-none",
    subCard: "border-t border-white/5 rounded-none",
    pad: "pt-8",
    title: "font-extralight tracking-[-0.03em] text-white/90",
    label:
      "text-white/55 font-medium tracking-[0.5em] text-[0.65rem] uppercase",
    accentText: "text-white/70",
    btnPrimary:
      "py-2 border-b border-amber-400/60 text-white hover:text-amber-400 rounded-none",
    btnSecondary: "py-2 text-white/65 hover:text-white rounded-none",
    chip: "text-white/65",
    bullet: "rounded-full bg-white/40",
    badgeShape: "rounded-full",
  },
};

export const themeOf = (mode: ViewMode) => modeTheme[mode];
