import React from "react";
import { cn } from "../../lib/utils";
import { CheckCircle2Icon, AlertCircleIcon, AlertTriangleIcon, InfoIcon, XIcon } from "lucide-react";

const alertStyles = {
  success: {
    container: "bg-green-50 border-green-200 text-green-800",
    icon: "text-green-500",
    closeBtn: "text-green-500 hover:text-green-600 focus:ring-green-600",
    Icon: CheckCircle2Icon,
  },
  error: {
    container: "bg-red-50 border-red-200 text-red-800",
    icon: "text-red-500",
    closeBtn: "text-red-500 hover:text-red-600 focus:ring-red-600",
    Icon: AlertCircleIcon,
  },
  warning: {
    container: "bg-amber-50 border-amber-200 text-amber-800",
    icon: "text-amber-500",
    closeBtn: "text-amber-500 hover:text-amber-600 focus:ring-amber-600",
    Icon: AlertTriangleIcon,
  },
  info: {
    container: "bg-blue-50 border-blue-200 text-blue-800",
    icon: "text-blue-500",
    closeBtn: "text-blue-500 hover:text-blue-600 focus:ring-blue-600",
    Icon: InfoIcon,
  },
};

export function Alert({ variant = "info", title, message, onClose, className, children }) {
  const style = alertStyles[variant] || alertStyles.info;
  const Icon = style.Icon;

  return (
    <div className={cn("rounded-lg border p-4", style.container, className)} role="alert">
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={cn("h-5 w-5", style.icon)} aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1">
          {title && <h3 className="text-sm font-medium">{title}</h3>}
          <div className={cn("text-sm", title ? "mt-2" : "")}>
            {message || children}
          </div>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onClose}
                className={cn(
                  "inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2",
                  style.closeBtn,
                  style.container
                )}
              >
                <span className="sr-only">Dismiss</span>
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
