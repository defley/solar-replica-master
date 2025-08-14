"use client";

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ScrollToSimulatorButton({
  className = "",
  children = "Simuler son loyer annuel",
  variant = "cta",
  size = "default",
}: {
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "cta";
  size?: "default" | "sm" | "lg" | "icon";
}) {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    const target = document.getElementById("simulateur-toiture");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/simulateur");
    }
  }, [navigate]);

  return (
    <Button
      type="button"
      onClick={handleClick}
      variant={variant}
      size={size}
      className={`rounded-full h-11 px-6 ${className}`}
      data-cta="simulateur"
      aria-label="Simuler son loyer annuel"
    >
      {children}
    </Button>
  );
}