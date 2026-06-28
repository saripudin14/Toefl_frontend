import React from "react";
import { Link } from "react-router-dom";

export const Footer = ({ variant = "full" }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto py-6 border-t border-slate-200 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-600">
            © {currentYear} TOEFL Exam System. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy-policy"
              className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/contact-support"
              className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
