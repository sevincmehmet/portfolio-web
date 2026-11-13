import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useView } from "../context/useView";
import { themeOf } from "../theme/modeTheme";

// Bölüm başlıkları için ortak yapı: küçük üst etiket (numara + ad), başlık ve
// tek paragraflık giriş. Üç mod aynı hiyerarşiyi kendi tonunda gösterir;
// bilgi yoğun sayfada taramayı kolaylaştırmak için başlıklar ölçülü tutuldu.
export const SectionHeader = ({
  index,
  eyebrow,
  title,
  accent,
  intro,
  id,
}: {
  index: string;
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: ReactNode;
  id?: string;
}) => {
  const { viewMode } = useView();
  const zen = viewMode === "zen";
  const bento = viewMode === "bento";

  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-10 md:mb-14 transform-gpu"
    >
      <p className={`flex items-center gap-3 ${themeOf(viewMode).label}`}>
        <span className={zen ? "text-white/40" : "text-white/45"}>{index}</span>
        <span
          aria-hidden
          className={`h-px w-8 ${zen ? "bg-white/20" : "bg-amber-500/50"}`}
        />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-4 text-white leading-[1.05] ${
          zen
            ? "text-4xl md:text-6xl font-extralight tracking-[-0.03em]"
            : bento
              ? "text-3xl md:text-5xl font-bold tracking-tighter"
              : "text-4xl md:text-6xl font-semibold tracking-tighter"
        }`}
      >
        {title}
        {accent && (
          <>
            {" "}
            <span
              className={
                zen
                  ? "text-white/45"
                  : bento
                    ? "text-white/45"
                    : "text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-300 italic"
              }
            >
              {accent}
            </span>
          </>
        )}
      </h2>
      {intro && (
        <p
          className={`mt-5 max-w-2xl text-base md:text-lg font-light leading-relaxed ${zen ? "text-white/60" : "text-gray-400"}`}
        >
          {intro}
        </p>
      )}
    </motion.header>
  );
};
