import { createContext, useContext, useState, useEffect } from "react";

export const THEMES = [
  {
    id: "dark-futuristic",
    name: "Dark Futuristic",
    shortName: "Futuristic",
    icon: "⚡",
    previewColor: "#06b6d4",
    bgPreview: "#030712",
  },
  {
    id: "light-professional",
    name: "Light Professional",
    shortName: "Light",
    icon: "☀️",
    previewColor: "#2563eb",
    bgPreview: "#f8fafc",
  },
  {
    id: "midnight-glass",
    name: "Midnight Glass",
    shortName: "Midnight",
    icon: "🌊",
    previewColor: "#38bdf8",
    bgPreview: "#060d1f",
  },
  {
    id: "modern-violet",
    name: "Modern Violet",
    shortName: "Violet",
    icon: "🔮",
    previewColor: "#a855f7",
    bgPreview: "#0c071e",
  },
  {
    id: "minimal-premium",
    name: "Minimal Premium",
    shortName: "Minimal",
    icon: "💎",
    previewColor: "#94a3b8",
    bgPreview: "#12141a",
  },
];

const ThemeContext = createContext({
  theme: "dark-futuristic",
  setTheme: () => {},
  themes: THEMES,
});

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    try {
      const savedTheme = localStorage.getItem("sanjai-portfolio-theme");
      if (savedTheme && THEMES.some((t) => t.id === savedTheme)) {
        return savedTheme;
      }
    } catch {
      // LocalStorage unavailable
    }
    return "dark-futuristic";
  });

  const setTheme = (newTheme) => {
    if (THEMES.some((t) => t.id === newTheme)) {
      setThemeState(newTheme);
      try {
        localStorage.setItem("sanjai-portfolio-theme", newTheme);
      } catch {
        // Ignored
      }
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);

    if (theme === "light-professional") {
      root.classList.remove("dark");
      root.classList.add("light");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
