import React from "react";
import { cn } from "../../lib/utils";
import { STATUS_COLORS, ROLE_COLORS, STATUSES } from "../../lib/constants";

export function Badge({ variant = "status", value, className, showDot = false }) {
  let colors = { bg: "bg-gray-100", text: "text-gray-800" };
  
  if (variant === "status" && STATUS_COLORS[value]) {
    colors = STATUS_COLORS[value];
  } else if (variant === "role" && ROLE_COLORS[value]) {
    colors = ROLE_COLORS[value];
  }

  const isStatus = variant === "status";
  const shouldShowDot = showDot || isStatus;

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        colors.bg,
        colors.text,
        className
      )}
    >
      {shouldShowDot && colors.dot && (
        <span className={cn("mr-1.5 h-1.5 w-1.5 rounded-full", colors.dot)} aria-hidden="true"></span>
      )}
      {value || children}
    </span>
  );
}
