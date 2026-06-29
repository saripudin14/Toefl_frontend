import React from "react";
import { Badge } from "../../../components/ui/Badge";
import { Button } from "../../../components/ui/Button";
import { EyeIcon, EditIcon, TrashIcon, UserXIcon, UserCheckIcon } from "lucide-react";

export function UserTable({ users, isLoading, onEdit, onView, onDelete, onStatusChange }) {
  if (isLoading) {
    return (
      <div className="w-full py-12 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-slate-500">Memuat data pengguna...</p>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="w-full py-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <UserXIcon className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-800 mb-1">Tidak ada data</h3>
        <p className="text-slate-500 max-w-sm">
          Tidak dapat menemukan pengguna dengan filter saat ini. Coba sesuaikan kata kunci pencarian atau filter Anda.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
          <tr>
            <th className="px-6 py-4 font-medium whitespace-nowrap">No</th>
            <th className="px-6 py-4 font-medium whitespace-nowrap">Nama Lengkap</th>
            <th className="px-6 py-4 font-medium whitespace-nowrap">Email</th>
            <th className="px-6 py-4 font-medium whitespace-nowrap">Status</th>
            <th className="px-6 py-4 font-medium whitespace-nowrap">Peran</th>
            <th className="px-6 py-4 font-medium whitespace-nowrap">Tgl Terdaftar</th>
            <th className="px-6 py-4 font-medium whitespace-nowrap text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {users.map((user, index) => (
            <tr key={user.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 text-slate-500">{index + 1}</td>
              <td className="px-6 py-4">
                <div className="font-medium text-slate-800">{user.name}</div>
                <div className="text-xs text-slate-500">{user.phone || "-"}</div>
              </td>
              <td className="px-6 py-4 text-slate-600">{user.email}</td>
              <td className="px-6 py-4">
                <Badge 
                  variant={user.status === "ACTIVE" ? "success" : user.status === "INACTIVE" ? "danger" : "warning"}
                >
                  {user.status === "ACTIVE" ? "Aktif" : user.status === "INACTIVE" ? "Tidak Aktif" : user.status}
                </Badge>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1">
                  {user.roles && user.roles.map(role => (
                    <Badge key={role} variant={role === "ADMIN" ? "primary" : "secondary"} className="text-[10px]">
                      {role.replace("_", " ")}
                    </Badge>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 text-slate-600">
                {new Date(user.created_at).toLocaleDateString('id-ID', {
                  day: 'numeric', month: 'short', year: 'numeric'
                })}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onStatusChange(user)}
                    className="h-8 w-8 p-0"
                    title={user.status === "ACTIVE" ? "Nonaktifkan User" : "Aktifkan User"}
                  >
                    {user.status === "ACTIVE" ? (
                      <UserXIcon className="w-4 h-4 text-amber-500" />
                    ) : (
                      <UserCheckIcon className="w-4 h-4 text-green-500" />
                    )}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onView(user)}
                    className="h-8 w-8 p-0 text-slate-400 hover:text-blue-600"
                    title="Lihat Detail"
                  >
                    <EyeIcon className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onEdit(user)}
                    className="h-8 w-8 p-0 text-slate-400 hover:text-indigo-600"
                    title="Edit User"
                  >
                    <EditIcon className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onDelete(user)}
                    className="h-8 w-8 p-0 text-slate-400 hover:text-red-600 hover:bg-red-50"
                    title="Hapus User"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
