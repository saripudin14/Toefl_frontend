import React from "react";
import { Link } from "react-router-dom";
import { ShieldAlertIcon } from "lucide-react";
import { Button } from "../../../components/ui/Button";

export function ForbiddenPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-md w-full text-center">
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <ShieldAlertIcon className="h-8 w-8 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Akses Ditolak</h1>
        <p className="text-slate-500 mb-8">
          Anda tidak memiliki izin untuk mengakses halaman ini. Silakan kembali ke dashboard atau hubungi administrator.
        </p>
        <Link to="/dashboard">
          <Button variant="primary" className="w-full">
            Kembali ke Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
