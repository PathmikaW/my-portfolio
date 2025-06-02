'use client';

import { createContext, useReducer, useContext, useEffect, ReactNode, Dispatch } from 'react';

// 1️⃣ Define types
type Theme = 'light' | 'dark';

interface State {
  theme: Theme;
}

type Action = { type: 'SET_THEME'; payload: Theme };

// 2️⃣ Initial state
const initialState: State = {
  theme: 'light',
};

// 3️⃣ Reducer
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    default:
      return state;
  }
}

// 4️⃣ Create context
interface AppContextType {
  state: State;
  dispatch: Dispatch<Action>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// 5️⃣ Provider
export function AppContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load theme from localStorage on first render
  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved) {
      dispatch({ type: 'SET_THEME', payload: saved });
      document.documentElement.classList.toggle('dark', saved === 'dark');
    }
  }, []);

  // Save theme to localStorage on change
  useEffect(() => {
    localStorage.setItem('theme', state.theme);
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
  }, [state.theme]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// 6️⃣ Typed hook
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppContextProvider');
  }
  return context;
};
