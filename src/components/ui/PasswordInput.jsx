import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { LockIcon, EyeIcon, EyeOffIcon } from "lucide-react";

export const PasswordInput = React.forwardRef(
  ({ className, label, error, helperText, headerRight, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="w-full">
        {(label || headerRight) && (
          <div className="flex justify-between items-center mb-1.5">
            {label && (
              <label className="block text-sm font-medium text-slate-700">
                {label}
              </label>
            )}
            {headerRight && <div className="text-sm">{headerRight}</div>}
          </div>
        )}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LockIcon className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            className={cn(
              "block w-full h-11 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors shadow-sm sm:text-sm pl-10 pr-10",
              error && "border-red-500 focus:ring-red-500",
              className
            )}
            ref={ref}
            {...props}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
            onClick={togglePasswordVisibility}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOffIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        </div>
        {error ? (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        ) : helperText ? (
          <p className="mt-1.5 text-sm text-slate-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
