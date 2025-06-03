'use client';

import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
  }, [state.theme]);

  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={() =>
          dispatch({
            type: 'SET_THEME',
            payload: state.theme === 'dark' ? 'light' : 'dark',
          })
        }
        className="border-blue-500 text-blue-400 hover:bg-blue-200/20 dark:hover:bg-blue-500/20 transition-all duration-300"
        title="Toggle Theme"
      >
        {state.theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </Button>
    </motion.div>
  );
}
