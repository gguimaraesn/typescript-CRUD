"use client";

import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const root = window.document.documentElement;
    const initialTheme = root.classList.contains('dark') ? 'dark' : 'light';
    setTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('dark');
      setTheme('dark');
    } else {
      root.classList.remove('dark');
      setTheme('light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="bg-transparent border-none cursor-pointer"
    >
      {theme === 'light' ? (
        <img src="/toggle-icon-on.png" alt="Switch to Dark Mode" width="40" height="40" />
      ) : (
        <img src="/toggle-icon-off.png" alt="Switch to Light Mode" width="40" height="40" />
      )}
    </button>
  );
}