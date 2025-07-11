import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeType = "light" | "dark";

interface ThemeStore {
  theme: ThemeType;
  setTheme: (newTheme: ThemeType) => void;
  toggleTheme: () => void;
}

const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "dark",
      setTheme: (newTheme) => set({ theme: newTheme }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
    }),
    {
      name: "theme",
    }
  )
);

export default useThemeStore;