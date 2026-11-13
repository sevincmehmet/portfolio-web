import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

export const TechMarquee = () => {
  const { profileId } = useParams();
  const masTech = [
    "REACT",
    "NEXT.JS",
    "TYPESCRIPT",
    "CLAUDE CODE",
    "ELECTRON",
    "SIGNALR",
    ".NET",
    "GOOGLE ADK",
  ];
  const dasTech = [
    "REACT",
    "NEXT.JS",
    ".NET CORE",
    "TYPESCRIPT",
    "TAILWIND",
    "FRAMER MOTION",
    "SQL SERVER",
  ];
  const tech = profileId === "das" ? dasTech : masTech;

  return (
    <div
      aria-hidden
      className="py-10 bg-[#0A0A0F] border-y border-white/[0.03] overflow-hidden whitespace-nowrap flex"
    >
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        // KRİTİK: Sonsuz animasyonlar için donanım hızlandırma şart
        className="flex gap-20 items-center px-10 transform-gpu"
      >
        {[...tech, ...tech].map((item, i) => (
          <span
            key={i}
            className="text-4xl md:text-6xl font-black text-white/[0.02] hover:text-amber-500/10 transition-colors cursor-default select-none tracking-tighter"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};
