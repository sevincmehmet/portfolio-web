import { motion, AnimatePresence } from "framer-motion";
import { useView } from "../context/ViewContext";
import { useLocation } from "react-router-dom";

export const Contact = () => {
  const { viewMode } = useView();
  const { pathname } = useLocation();
  const isMas = pathname === "/mas";

  const email = "sevincmehmetali716@gmail.com";
  const drMail = "sevincdursunali61@gmail.com";
  const tel = "0531 221 82 61";
  const drTel = "0535 329 67 13";

  // --- PREMİUM SVG İKONLAR ---
  const MailIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );

  const PhoneIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );

  const LinkedInIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );

  const GithubIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );

  return (
    <section
      id="iletisim"
      className="relative min-h-screen bg-[#0A0A0F] flex items-center justify-center px-6 py-32 overflow-hidden selection:bg-amber-500/30 transform-gpu"
    >
      <AnimatePresence mode="wait">
        {/* =========================================
             TASARIM 1: VİZYON 
             ========================================= */}
        {viewMode === "vizyon" && (
          <motion.div
            key="v-contact"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center gap-20 relative z-10 transform-gpu"
          >
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className="text-7xl md:text-8xl font-semibold tracking-tighter text-white leading-[0.9] mb-10">
                Fikirleri <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-200">
                  Gerçeğe
                </span>{" "}
                <br />
                Dönüştürelim.
              </h2>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-amber-500 hover:border-amber-500 transition-colors cursor-pointer">
                  <LinkedInIcon />
                </div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer">
                  <GithubIcon />
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 space-y-6">
              {[
                {
                  label: "E-posta Gönder",
                  val: isMas ? email : drMail,
                  icon: <MailIcon />,
                  href: `mailto:${isMas ? email : drMail}`,
                },
                {
                  label: "Doğrudan Ara",
                  val: isMas ? tel : drTel,
                  icon: <PhoneIcon />,
                  href: `tel:${isMas ? tel.replace(/\s/g, "") : drTel.replace(/\s/g, "")}`,
                },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  whileHover={{
                    x: 10,
                    backgroundColor: "rgba(255,255,255,0.04)",
                  }}
                  className="flex items-center gap-8 p-8 bg-[#111] md:bg-white/[0.02] backdrop-blur-xl md:backdrop-blur-3xl border border-white/5 rounded-[2.5rem] group transition-all transform-gpu"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[0.6rem] font-black tracking-[0.4em] text-white/20 uppercase mb-1">
                      {item.label}
                    </p>
                    <p className="text-xl md:text-2xl font-light text-white tracking-tight">
                      {item.val}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}

        {/* =========================================
             TASARIM 2: BENTO
             ========================================= */}
        {viewMode === "bento" && (
          <motion.div
            key="b-contact"
            // KRİTİK: filter blur silindi!
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="max-w-[75rem] w-full mx-auto grid grid-cols-1 md:grid-cols-12 auto-rows-[minmax(200px,auto)] gap-6 relative z-10 transform-gpu"
          >
            {/* ANA CTA */}
            <div className="col-span-1 md:col-span-8 bg-[#111] md:bg-white/[0.02] backdrop-blur-xl md:backdrop-blur-3xl border border-white/[0.05] rounded-[2.5rem] p-10 md:p-16 flex flex-col justify-center relative group overflow-hidden transform-gpu">
              <div
                className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none hidden md:block"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)",
                  backgroundSize: "24px 24px",
                }}
              />
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-10 tracking-tighter leading-tight">
                Bir Sonraki <br />{" "}
                <span className="text-amber-500">Başyapıtı</span> <br />{" "}
                Birlikte Kuralım.
              </h2>
              <div className="flex flex-wrap items-center gap-6 relative z-10">
                <a
                  href={`mailto:${email}`}
                  className="px-10 py-4 bg-white text-black font-black rounded-full hover:scale-105 transition-all flex items-center gap-3 shadow-lg md:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                >
                  <MailIcon /> Mesaj Gönder
                </a>
              </div>
            </div>

            {/* TELEFON KUTUSU */}
            <div className="col-span-1 md:col-span-4 bg-[#111111]/40 border border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-between group hover:border-amber-500/30 transition-all duration-500 transform-gpu">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500">
                <PhoneIcon />
              </div>
              <div>
                <p className="text-gray-500 text-[0.6rem] font-black uppercase tracking-widest mb-2">
                  Doğrudan Hat
                </p>
                <p className="text-white font-bold text-lg md:text-xl tracking-tight">
                  {isMas ? tel : drTel}
                </p>
              </div>
            </div>

            {/* SOSYAL MEDYA */}
            <div className="col-span-1 md:col-span-4 bg-[#111] md:bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-between group transform-gpu">
              <p className="text-white font-black tracking-[0.3em] uppercase text-[0.65rem] opacity-30">
                Bağlantılar
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-black transition-all duration-500"
                >
                  <LinkedInIcon />
                </a>
                <a
                  href="#"
                  className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-white/10 transition-all duration-500"
                >
                  <GithubIcon />
                </a>
              </div>
            </div>

            {/* KAHVE DURUMU */}
            <div className="col-span-1 md:col-span-8 bg-gradient-to-br from-amber-500/10 to-transparent border border-white/5 rounded-[2.5rem] p-10 flex items-center justify-between group overflow-hidden relative transform-gpu">
              <div className="flex items-center gap-8 relative z-10">
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  // Sürekli zıplayan emoji için GPU
                  className="text-6xl filter drop-shadow-2xl transform-gpu will-change-transform"
                >
                  ☕
                </motion.div>
                <div>
                  <h4 className="text-white font-bold text-2xl mb-1 tracking-tight">
                    Kahve Saati?
                  </h4>
                  <p className="text-gray-500 font-light italic max-w-sm">
                    Sivas'ta olsan da olmasan da, dijital bir kahveye her zaman
                    varım.
                  </p>
                </div>
              </div>
              <div className="hidden md:block text-amber-500/[0.03] text-[10rem] font-black select-none pointer-events-none absolute -right-4 -bottom-10">
                COFFEE
              </div>
            </div>
          </motion.div>
        )}

        {/* =========================================
             TASARIM 3: ZEN 
             ========================================= */}
        {viewMode === "zen" && (
          <motion.div
            key="z-contact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-4xl w-full mx-auto text-center transform-gpu"
          >
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="mb-16 flex justify-center text-white/5 transform-gpu will-change-transform"
            >
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v20M2 12h20M12 2l10 10-10 10L2 12z" />
              </svg>
            </motion.div>
            <div className="space-y-12">
              <div className="group cursor-pointer">
                <p className="text-[0.6rem] font-black tracking-[0.8em] text-white/10 group-hover:text-amber-500 transition-colors uppercase mb-4">
                  Sessizlikte Buluşalım
                </p>
                <a
                  href={`mailto:${isMas ? email : drMail}`}
                  className="text-3xl md:text-6xl font-thin text-white/40 hover:text-white transition-all duration-700 tracking-tighter"
                >
                  {isMas ? email : drMail}
                </a>
              </div>
              <p className="text-lg md:text-xl text-white/10 font-thin tracking-[0.4em] italic">
                {isMas ? tel : drTel}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
