import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Logo } from "../ui/Logo";
import { Button } from "../ui/Button";
import { NAV_ITEMS } from "../../lib/constants";
import { useAuth } from "../../features/auth/auth-context";
import * as Icons from "lucide-react";

export function Sidebar({ className, onClose }) {
  const { logout } = useAuth();

  return (
    <aside className={cn("w-64 bg-white border-r border-slate-200 h-screen flex flex-col fixed inset-y-0 left-0 z-40 transition-transform bg-white", className)}>
      {/* Sidebar Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-200">
        <Logo variant="compact" size="sm" />
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = Icons[item.icon];
            
            if (!item.enabled) {
              return (
                <div
                  key={item.id}
                  className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-slate-300 cursor-not-allowed select-none"
                  title="Coming soon"
                >
                  {Icon && <Icon className="mr-3 h-5 w-5" aria-hidden="true" />}
                  {item.label}
                </div>
              );
            }

            return (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )
                }
              >
                {Icon && (
                  <Icon
                    className="mr-3 h-5 w-5 flex-shrink-0"
                    aria-hidden="true"
                  />
                )}
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-slate-200 space-y-2">
        <Button variant="primary" className="w-full justify-start text-sm px-3 py-2" disabled showArrow={false}>
          <Icons.PlayCircle className="mr-2 h-4 w-4" />
          Take Practice Test
        </Button>
        <button
          type="button"
          className="flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
        >
          <Icons.HelpCircle className="mr-3 h-5 w-5 text-slate-400" />
          Help Center
        </button>
        <button
          type="button"
          onClick={() => {
            onClose?.();
            logout();
          }}
          className="flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <Icons.LogOut className="mr-3 h-5 w-5 text-red-500" />
          Log out
        </button>
      </div>
    </aside>
  );
}
