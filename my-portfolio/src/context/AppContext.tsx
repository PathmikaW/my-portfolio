"use client";
import { createContext, useReducer, useContext, useEffect, ReactNode, Dispatch } from "react";

// 1️⃣ Define types
type Theme = "light" | "dark";

interface State {
  theme: Theme;
}

type Action = { type: "SET_THEME"; payload: Theme };

// 2️⃣ Initial state
const initialState: State = {
  theme: "light",
};

// 3️⃣ Reducer with typed state and action
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_THEME":
      return { ...state, theme: action.payload };
    default:
      return state;
  }
}

// 4️⃣ Create context with type
interface AppContextType {
  state: State;
  dispatch: Dispatch<Action>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// 5️⃣ Provider
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme;
    if (saved) dispatch({ type: "SET_THEME", payload: saved });
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", state.theme);
  }, [state.theme]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// 6️⃣ Typed hook
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
