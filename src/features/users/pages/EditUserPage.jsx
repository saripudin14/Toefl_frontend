import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserIcon, MailIcon, PhoneIcon, CheckCircleIcon, ArrowLeftIcon } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Alert } from "../../../components/ui/Alert";
import { getUserById, updateUser, updateUserRoles } from "../api/users-api";
import { Card, CardContent } from "../../../components/ui/Card";
import { LoadingSpinner } from "../../../components/ui/LoadingSpinner";

export function EditUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    roles: [],
  });

  const [initialRoles, setInitialRoles] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const availableRoles = [
    { id: "ADMIN", label: "Admin", description: "Akses penuh ke sistem." },
    { id: "PENGGUNA_UJIAN", label: "Pengguna Ujian", description: "Peserta yang akan mengikuti tes." },
    { id: "PENGGUNA_BELAJAR", label: "Pengguna Belajar", description: "Peserta yang mengakses materi belajar." },
    { id: "PENGAWAS", label: "Pengawas", description: "Pengawas jalannya ujian (Proctor)." }
  ];

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoadingData(true);
      try {
        const response = await getUserById(id);
        const user = response.data;
        setFormData({
          name: user.name,
          email: user.email,
          phone: user.phone || "",
          roles: user.roles || [],
        });
        setInitialRoles(user.roles || []);
      } catch (err) {
        setError(err.message || "Gagal memuat data pengguna.");
      } finally {
        setIsLoadingData(false);
      }
    };
    
    if (id) {
      fetchUser();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleToggle = (roleId) => {
    setFormData((prev) => {
      const currentRoles = prev.roles;
      if (currentRoles.includes(roleId)) {
        return { ...prev, roles: currentRoles.filter(r => r !== roleId) };
      } else {
        return { ...prev, roles: [...currentRoles, roleId] };
      }
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Nama lengkap wajib diisi.";
    if (!formData.email.trim()) return "Email wajib diisi.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) return "Format email tidak valid.";
    if (formData.roles.length === 0) return "Pilih minimal satu peran (role).";
    return null;
  };

  const arraysEqual = (a, b) => {
    if (a.length !== b.length) return false;
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();
    return sortedA.every((val, index) => val === sortedB[index]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setIsSaving(true);

    try {
      // Update basic info
      await updateUser(id, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });

      // Update roles only if changed
      if (!arraysEqual(formData.roles, initialRoles)) {
        await updateUserRoles(id, formData.roles);
      }

      setSuccess(true);
      setTimeout(() => {
        navigate(`/admin/users/${id}`);
      }, 1500);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat menyimpan perubahan.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" className="text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-10">
      <div className="flex items-center gap-4">
        <Button variant="ghost" className="p-2 h-10 w-10 shrink-0" onClick={() => navigate(`/admin/users/${id}`)}>
          <ArrowLeftIcon className="w-5 h-5 text-slate-500" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Edit Pengguna</h2>
          <p className="text-slate-500 mt-1">Perbarui profil dan peran akses pengguna.</p>
        </div>
      </div>

      {error && <Alert variant="danger" className="mb-6">{error}</Alert>}
      {success && <Alert variant="success" icon={CheckCircleIcon} className="mb-6">Perubahan berhasil disimpan! Mengalihkan...</Alert>}

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-800 border-b border-slate-100 pb-2">Informasi Profil</h3>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Nama Lengkap *</label>
                  <Input
                    name="name"
                    placeholder="Contoh: Budi Santoso"
                    icon={UserIcon}
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={isSaving || success}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Alamat Email *</label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="budi@example.com"
                    icon={MailIcon}
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isSaving || success}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-slate-800 border-b border-slate-100 pb-2">Kontak Tambahan</h3>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Nomor Telepon</label>
                  <Input
                    name="phone"
                    placeholder="081234567890"
                    icon={PhoneIcon}
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={isSaving || success}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="font-semibold text-slate-800">Peran Akses (Role) *</h3>
              <p className="text-sm text-slate-500">Pilih satu atau lebih peran untuk pengguna ini.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableRoles.map((role) => (
                  <div 
                    key={role.id}
                    onClick={() => !isSaving && !success && handleRoleToggle(role.id)}
                    className={`flex items-start p-4 border rounded-xl cursor-pointer transition-all ${
                      formData.roles.includes(role.id)
                        ? "border-blue-600 bg-blue-50/50"
                        : "border-slate-200 hover:border-blue-300"
                    }`}
                  >
                    <div className={`mt-0.5 mr-3 flex items-center justify-center w-5 h-5 rounded border ${
                      formData.roles.includes(role.id)
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-slate-300 bg-white"
                    }`}>
                      {formData.roles.includes(role.id) && <CheckCircleIcon className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <p className={`font-medium text-sm ${
                        formData.roles.includes(role.id) ? "text-blue-900" : "text-slate-800"
                      }`}>
                        {role.label}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">{role.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => navigate(`/admin/users/${id}`)} disabled={isSaving || success}>
                Batal
              </Button>
              <Button type="submit" variant="primary" isLoading={isSaving} disabled={success}>
                Simpan Perubahan
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
