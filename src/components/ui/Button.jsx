import React from "react";
import { cn } from "../../lib/utils";
import { LoadingSpinner } from "./LoadingSpinner";
import { ArrowRight } from "lucide-react";

const variantClasses = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm",
  secondary: "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 active:bg-slate-100 shadow-sm",
  danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm",
  ghost: "bg-transparent text-slate-600 hover:bg-slate-100 active:bg-slate-200",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export const Button = React.forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      className,
      loading = false,
      disabled = false,
      icon,
      showArrow = false,
      type = "button",
      ...props
    },
    ref
  ) => {
    const isPrimary = variant === "primary";
    
    // Default showArrow to true if primary and no icon provided
    const shouldShowArrow = showArrow || (isPrimary && !icon);
    
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {loading && <LoadingSpinner size="sm" className="mr-2" />}
        {!loading && icon && <span className="mr-2">{icon}</span>}
        {children}
        {!loading && shouldShowArrow && <ArrowRight className="ml-2 w-4 h-4" />}
      </button>
    );
  }
);

Button.displayName = "Button";
