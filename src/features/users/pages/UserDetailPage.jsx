import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, UserIcon, MailIcon, PhoneIcon, CalendarIcon, ShieldIcon } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { Alert } from "../../../components/ui/Alert";
import { getUserById } from "../api/users-api";
import { LoadingSpinner } from "../../../components/ui/LoadingSpinner";

export function UserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await getUserById(id);
        setUser(response.data);
      } catch (err) {
        setError(err.message || "Gagal memuat detail pengguna.");
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchUser();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" className="text-blue-600" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => navigate("/admin/users")} className="gap-2">
          <ArrowLeftIcon className="w-4 h-4" /> Kembali
        </Button>
        <Alert variant="danger">{error || "Pengguna tidak ditemukan."}</Alert>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-10">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="p-2 h-10 w-10 shrink-0" onClick={() => navigate("/admin/users")}>
            <ArrowLeftIcon className="w-5 h-5 text-slate-500" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Detail Pengguna</h2>
            <p className="text-slate-500 mt-1">ID: {user.id}</p>
          </div>
        </div>
        <Button variant="primary" onClick={() => navigate(`/admin/users/${user.id}/edit`)}>
          Edit Pengguna
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-slate-100">
            <div className="w-20 h-20 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-2xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">{user.name}</h3>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={user.status === "ACTIVE" ? "success" : "danger"}>
                  {user.status === "ACTIVE" ? "Aktif" : "Tidak Aktif"}
                </Badge>
                {user.email_verified_at && (
                  <Badge variant="primary" className="bg-blue-50 text-blue-600 border-blue-200">Terverifikasi</Badge>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-800">Informasi Kontak</h4>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-slate-50 flex items-center justify-center text-slate-400">
                  <MailIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Email</p>
                  <p className="text-sm font-medium text-slate-800">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-slate-50 flex items-center justify-center text-slate-400">
                  <PhoneIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Nomor Telepon</p>
                  <p className="text-sm font-medium text-slate-800">{user.phone || "-"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-slate-50 flex items-center justify-center text-slate-400">
                  <CalendarIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Tanggal Bergabung</p>
                  <p className="text-sm font-medium text-slate-800">
                    {new Date(user.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-slate-800">Peran Akses (Role)</h4>
              <div className="flex flex-col gap-3">
                {user.roles && user.roles.map(role => (
                  <div key={role} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded flex items-center justify-center ${
                      role === "ADMIN" ? "bg-red-50 text-red-600" : 
                      role === "PENGAWAS" ? "bg-amber-50 text-amber-600" :
                      "bg-blue-50 text-blue-600"
                    }`}>
                      <ShieldIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{role.replace("_", " ")}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
