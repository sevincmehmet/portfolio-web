import React, { useState } from "react";
import { ViewContext, type ViewMode } from "./viewContextBase";

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
