import React, { useState } from "react";
import { SearchIcon, BellIcon, MenuIcon, ChevronDownIcon } from "lucide-react";
import { useAuth } from "../../features/auth/auth-context";
import { ROLE_LABELS } from "../../lib/constants";

export function Topbar({ onMenuClick, title }) {
  const { user } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // User might have multiple roles, we just show the first one or a default
  const primaryRole = user?.roles?.[0];
  const roleLabel = primaryRole ? ROLE_LABELS[primaryRole] : "User";
  const initials = user?.name ? user.name.substring(0, 2).toUpperCase() : "U";

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 z-30 relative">
      <div className="flex items-center">
        <button
          type="button"
          className="mr-4 text-slate-500 hover:text-slate-700 lg:hidden focus:outline-none"
          onClick={onMenuClick}
        >
          <span className="sr-only">Open sidebar</span>
          <MenuIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        {title && (
          <h1 className="text-xl font-semibold text-slate-800 tracking-tight hidden sm:block">
            {title}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Search - placeholder */}
        <div className="hidden md:flex relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="block w-full sm:w-64 h-9 pl-9 pr-3 rounded-full border border-slate-200 bg-slate-50 text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors"
          />
        </div>

        {/* Notifications */}
        <button className="p-2 text-slate-400 hover:text-slate-600 relative rounded-full hover:bg-slate-50 transition-colors">
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            type="button"
            className="flex items-center gap-2 focus:outline-none p-1 rounded-full hover:bg-slate-50 transition-colors"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium text-sm overflow-hidden">
              {initials}
            </div>
            <div className="hidden md:flex flex-col items-start mr-1">
              <span className="text-sm font-medium text-slate-700 leading-none mb-1">
                {user?.name || "User"}
              </span>
              <span className="text-xs text-slate-500 leading-none">
                {roleLabel}
              </span>
            </div>
            <ChevronDownIcon className="h-4 w-4 text-slate-400 hidden md:block" />
          </button>

          {/* Simple dropdown menu (could be extracted to a reusable component) */}
          {showProfileMenu && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowProfileMenu(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div className="px-4 py-2 border-b border-slate-100 md:hidden">
                  <p className="text-sm font-medium text-slate-900">{user?.name || "User"}</p>
                  <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                </div>
                <a href="/settings" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                  Account Settings
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
