import React, { createContext, useContext, useState } from "react";

type ViewMode = "vizyon" | "bento" | "zen";

interface ViewContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export const ViewProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>("vizyon");
  return (
    <ViewContext.Provider value={{ viewMode, setViewMode }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useView = () => {
  const context = useContext(ViewContext);
  if (!context) throw new Error("useView Provider içinde kullanılmalı kral!");
  return context;
};
