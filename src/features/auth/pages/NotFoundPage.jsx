import React from "react";
import { Link } from "react-router-dom";
import { SearchXIcon } from "lucide-react";
import { Button } from "../../../components/ui/Button";

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-md w-full text-center">
        <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <SearchXIcon className="h-8 w-8 text-slate-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Halaman Tidak Ditemukan</h1>
        <p className="text-slate-500 mb-8">
          Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>
        <Link to="/">
          <Button variant="primary" className="w-full">
            Kembali ke Beranda
          </Button>
        </Link>
      </div>
    </div>
  );
}
