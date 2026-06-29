import React from "react";
import { SearchIcon, FilterIcon } from "lucide-react";
import { Input } from "../../../components/ui/Input";

export function UserFilters({ filters, onFilterChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1 relative">
        <Input
          type="text"
          placeholder="Cari data pengguna..."
          value={filters.search}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          className="pl-10"
        />
        <SearchIcon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
      </div>
      
      <div className="flex gap-4">
        <div className="relative">
          <select
            value={filters.role}
            onChange={(e) => onFilterChange({ ...filters, role: e.target.value })}
            className="w-full sm:w-48 appearance-none bg-white border border-slate-200 text-slate-700 rounded-lg px-4 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-sm"
          >
            <option value="ALL">Semua Peran</option>
            <option value="ADMIN">Admin</option>
            <option value="PENGGUNA_BELAJAR">Pengguna Belajar</option>
            <option value="PENGGUNA_UJIAN">Pengguna Ujian</option>
            <option value="PENGAWAS">Pengawas</option>
          </select>
          <FilterIcon className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
        
        <div className="relative">
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
            className="w-full sm:w-48 appearance-none bg-white border border-slate-200 text-slate-700 rounded-lg px-4 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-sm"
          >
            <option value="ALL">Semua Status</option>
            <option value="ACTIVE">Aktif</option>
            <option value="INACTIVE">Tidak Aktif</option>
            <option value="PENDING">Pending</option>
            <option value="SUSPENDED">Suspended</option>
          </select>
          <FilterIcon className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
