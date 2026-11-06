import { useContext } from "react";
import { ViewContext } from "./viewContextBase";

export const useView = () => {
  const context = useContext(ViewContext);
  if (!context) throw new Error("useView, ViewProvider içinde kullanılmalı.");
  return context;
};
