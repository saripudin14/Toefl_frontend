import React from "react";
import { ClipboardListIcon, BookOpenIcon } from "lucide-react";
import { cn } from "../../lib/utils";

export const RoleSelector = ({ value, onChange, error }) => {
  const roles = [
    {
      id: "PENGGUNA_UJIAN",
      label: "Pengguna Ujian",
      description: "Take official TOEFL tests",
      icon: ClipboardListIcon,
    },
    {
      id: "PENGGUNA_BELAJAR",
      label: "Pengguna Belajar",
      description: "Practice and learn",
      icon: BookOpenIcon,
    },
  ];

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-slate-700 mb-3">
        Select Your Role
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = value === role.id;

          return (
            <button
              key={role.id}
              type="button"
              onClick={() => onChange(role.id)}
              className={cn(
                "flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all duration-200",
                isSelected
                  ? "bg-blue-600 border-blue-600 text-white shadow-lg"
                  : "bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:shadow-md"
              )}
            >
              <Icon className={cn("w-8 h-8 mb-3", isSelected ? "text-white" : "text-blue-600")} />
              <span className="text-base font-semibold mb-1">{role.label}</span>
              <span className={cn("text-sm", isSelected ? "text-blue-100" : "text-slate-500")}>
                {role.description}
              </span>
            </button>
          );
        })}
      </div>
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  );
};
