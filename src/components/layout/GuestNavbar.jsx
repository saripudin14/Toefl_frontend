import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../ui/Logo";
import { Button } from "../ui/Button";
import { MenuIcon, XIcon, BellIcon, SettingsIcon, HelpCircleIcon } from "lucide-react";
import { cn } from "../../lib/utils";

export function GuestNavbar({ variant = "full" }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Practice", href: "/practice", disabled: true },
    { name: "Test Center", href: "/test-center", disabled: true },
    { name: "Resources", href: "/resources", disabled: true },
  ];

  if (variant === "minimal") {
    return (
      <nav className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo />
          <Button variant="ghost" size="sm" icon={<HelpCircleIcon className="w-4 h-4" />} asChild>
            <Link to="/contact-support">Help</Link>
          </Button>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation Links - Center */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                link.disabled
                  ? "text-slate-400 cursor-not-allowed pointer-events-none"
                  : "text-slate-700 hover:text-blue-600"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-4">
          <button
            className="text-slate-400 hover:text-slate-600 transition-colors cursor-not-allowed"
            disabled
            title="Coming soon"
          >
            <BellIcon className="w-5 h-5" />
          </button>
          <button
            className="text-slate-400 hover:text-slate-600 transition-colors cursor-not-allowed"
            disabled
            title="Coming soon"
          >
            <SettingsIcon className="w-5 h-5" />
          </button>
          <Button variant="secondary" size="sm" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-slate-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <XIcon className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm font-medium py-2 transition-colors",
                  link.disabled
                    ? "text-slate-400 cursor-not-allowed pointer-events-none"
                    : "text-slate-700 hover:text-blue-600"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Button variant="secondary" size="sm" asChild className="mt-2">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
