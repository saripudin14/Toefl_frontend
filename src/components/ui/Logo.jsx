import React from "react";
import { GraduationCapIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";

export function Logo({ variant = "full", size = "md", className }) {
  const isFull = variant === "full";
  
  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };
  
  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <Link to="/" className={cn("flex items-center gap-2", className)}>
      <div className="bg-blue-600 text-white p-1.5 rounded-lg flex items-center justify-center">
        <GraduationCapIcon className={iconSizes[size]} />
      </div>
      <span className={cn("font-bold text-slate-800 tracking-tight", textSizes[size])}>
        {isFull ? "TOEFL Prep Pro" : "TOEFL Pro"}
      </span>
    </Link>
  );
}
