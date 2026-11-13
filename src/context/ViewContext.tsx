import React, { useState } from "react";
import { ViewContext, type ViewMode } from "./viewContextBase";

export const ViewProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Seçili mod sayfa yenilense de korunsun (tarayıcı izin vermezse varsayılan)
  const [viewMode, setMode] = useState<ViewMode>(() => {
    // ?mod=bento gibi bir bağlantı modu doğrudan açar (paylaşım ve ölçüm için)
    const fromUrl = new URLSearchParams(window.location.search).get("mod");
    if (fromUrl === "vizyon" || fromUrl === "bento" || fromUrl === "zen")
      return fromUrl;
    try {
      const saved = localStorage.getItem("gorunum-modu");
      if (saved === "vizyon" || saved === "bento" || saved === "zen")
        return saved;
    } catch {
      /* depolama kapalı */
    }
    return "vizyon";
  });
  const setViewMode = (mode: ViewMode) => {
    setMode(mode);
    try {
      localStorage.setItem("gorunum-modu", mode);
    } catch {
      /* depolama kapalı */
    }
  };
  return (
    <ViewContext.Provider value={{ viewMode, setViewMode }}>
      {children}
    </ViewContext.Provider>
  );
};
