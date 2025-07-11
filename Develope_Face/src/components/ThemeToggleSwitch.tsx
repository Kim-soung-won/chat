"use client";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import IconButton from '@mui/material/IconButton';
import { motion, AnimatePresence } from 'framer-motion';
import { Color } from '@/shared/constants';
import useThemeStore from "@/shared/store/useLayoutStore";
import { useEffect } from 'react';


export default function ThemeToggleSwitch() {
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);


  return (
    <IconButton 
      onClick={toggleTheme}
      color="inherit"
    >
      <AnimatePresence mode="wait">
        {theme === "light" ? (
          <motion.div
            key="light"
            initial={{  scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 200
            }}
            style={{ 
              color: Color.sunColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <LightModeIcon 
              sx={{ 
                fontSize: '1.5rem',
                filter: 'drop-shadow(0 0 2px rgba(255, 152, 0, 0.5))'
              }} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="dark"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 200
            }}
            style={{ 
              color: Color.moonColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <DarkModeIcon 
              sx={{ 
                fontSize: '1.5rem',
                filter: 'drop-shadow(0 0 2px rgba(255, 193, 7, 0.5))'
              }} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </IconButton>
  );
}
