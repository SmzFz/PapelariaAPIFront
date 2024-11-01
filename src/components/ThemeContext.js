import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('theme');
    if (savedMode) {
      setIsDarkMode(savedMode === 'dark');
      updateBodyClasses(savedMode === 'dark');
    }
  }, []);

  const updateBodyClasses = (isDark) => {
    document.body.classList.toggle('bg-dark', isDark);
    document.body.classList.toggle('text-white', isDark);
    document.body.classList.toggle('bg-light', !isDark);
    document.body.classList.toggle('text-dark', !isDark);
  };

  const toggleTheme = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      updateBodyClasses(newMode);
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
