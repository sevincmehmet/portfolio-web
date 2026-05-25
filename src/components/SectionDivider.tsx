import { motion } from "framer-motion";
import { useView } from "../context/ViewContext";

export const SectionDivider = () => {
  const { viewMode } = useView();

  return (
    <div className="w-full h-24 flex items-center justify-center relative overflow-hidden bg-[#0A0A0F]">
      {/* VİZYON: Akan Işık Çizgisi */}
      {viewMode === "vizyon" && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "100%", opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent relative"
        >
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
          />
        </motion.div>
      )}

      {/* BENTO: Teknik Koordinatlar ve Noktalar */}
      {viewMode === "bento" && (
        <div className="flex items-center gap-4 opacity-20">
          <div className="w-1 h-1 bg-white rounded-full" />
          <span className="text-[0.6rem] font-black tracking-[0.5em] text-white uppercase select-none">
            39.9° N // 37.0° E
          </span>
          <div className="w-1 h-1 bg-white rounded-full" />
        </div>
      )}

      {/* ZEN: Sadece bir tüy kadar hafif geçiş */}
      {viewMode === "zen" && (
        <div className="w-1 h-1 bg-white/5 rounded-full animate-pulse" />
      )}
    </div>
  );
};
