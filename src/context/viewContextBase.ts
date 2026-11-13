import { createContext } from "react";

export type ViewMode = "vizyon" | "bento" | "zen";

export interface ViewContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export const ViewContext = createContext<ViewContextType | undefined>(
  undefined,
);
