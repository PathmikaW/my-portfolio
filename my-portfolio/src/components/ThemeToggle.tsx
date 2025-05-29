"use client";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

export default function ThemeToggle() {
  const { state, dispatch } = useApp();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", state.theme === "dark");
  }, [state.theme]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() =>
        dispatch({
          type: "SET_THEME",
          payload: state.theme === "dark" ? "light" : "dark",
        })
      }
      title="Toggle Theme"
    >
      {state.theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
}
