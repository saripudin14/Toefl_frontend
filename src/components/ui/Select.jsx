import React from "react";
import { cn } from "../../lib/utils";
import { ChevronDownIcon } from "lucide-react";

export const Select = React.forwardRef(
  ({ className, label, options = [], error, helperText, icon: Icon, placeholder, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className="h-5 w-5 text-slate-400" />
            </div>
          )}
          <select
            className={cn(
              "block w-full h-11 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors shadow-sm sm:text-sm appearance-none pr-10",
              Icon && "pl-10",
              error && "border-red-500 focus:ring-red-500",
              !props.value && placeholder && "text-slate-400",
              className
            )}
            ref={ref}
            {...props}
          >
            {placeholder && (
              <option value="" disabled className="text-slate-400">
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} className="text-slate-900">
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ChevronDownIcon className="h-5 w-5 text-slate-400" />
          </div>
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

Select.displayName = "Select";
