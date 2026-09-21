import { createContext, useContext, useState, useEffect } from "react";

export const THEMES = [
  {
    id: "dark",
    name: "Dark",
    shortName: "Dark",
    icon: "🌙",
    previewColor: "#06b6d4",
    bgPreview: "#030712",
  },
  {
    id: "light",
    name: "Light",
    shortName: "Light",
    icon: "☀️",
    previewColor: "#2563eb",
    bgPreview: "#f8fafc",
  },
];

const ThemeContext = createContext({
  theme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
  themes: THEMES,
});

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    try {
      const savedTheme = localStorage.getItem("sanjai-portfolio-theme");
      if (savedTheme === "light" || savedTheme === "light-professional") {
        return "light";
      }
      if (savedTheme === "dark" || savedTheme === "dark-futuristic") {
        return "dark";
      }
    } catch {
      // LocalStorage unavailable
    }
    return "dark";
  });

  const setTheme = (newTheme) => {
    const target =
      newTheme === "light" || newTheme === "light-professional"
        ? "light"
        : "dark";
    setThemeState(target);
    try {
      localStorage.setItem("sanjai-portfolio-theme", target);
    } catch {
      // Ignored
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);

    if (theme === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, toggleTheme, themes: THEMES }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
