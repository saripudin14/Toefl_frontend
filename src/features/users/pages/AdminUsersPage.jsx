import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PlusIcon, AlertCircleIcon, XIcon } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Alert } from "../../../components/ui/Alert";
import { UserStatsCards } from "../components/UserStatsCards";
import { UserFilters } from "../components/UserFilters";
import { UserTable } from "../components/UserTable";
import { getUsers, deleteUser, updateUserStatus } from "../api/users-api";

export function AdminUsersPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Modal states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Status update states
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [userToUpdateStatus, setUserToUpdateStatus] = useState(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const [filters, setFilters] = useState({
    page: parseInt(searchParams.get("page") || "1"),
    limit: parseInt(searchParams.get("limit") || "10"),
    search: searchParams.get("search") || "",
    role: searchParams.get("role") || "ALL",
    status: searchParams.get("status") || "ALL",
  });

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await getUsers(filters);
      setUsers(response.data.users || []);
      setMeta(response.data.meta || null);
    } catch (err) {
      setError(err.message || "Gagal memuat data pengguna.");
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Sync state to URL when filters change (except search while typing)
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.page > 1) params.set("page", filters.page);
    if (filters.limit !== 10) params.set("limit", filters.limit);
    if (filters.search) params.set("search", filters.search);
    if (filters.role !== "ALL") params.set("role", filters.role);
    if (filters.status !== "ALL") params.set("status", filters.status);
    
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  // Handle filter changes (debouncing for search is omitted here for simplicity, but we reset page)
  const handleFilterChange = (newFilters) => {
    setFilters({
      ...newFilters,
      page: 1, // Reset page when filter changes
    });
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  // Handlers for Table actions
  const handleEdit = (user) => navigate(`/admin/users/${user.id}/edit`);
  const handleView = (user) => navigate(`/admin/users/${user.id}`);
  
  const handleDeleteRequest = (user) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    setIsDeleting(true);
    try {
      await deleteUser(userToDelete.id);
      setDeleteModalOpen(false);
      setUserToDelete(null);
      // Refresh list
      fetchUsers();
    } catch (err) {
      setError(err.message || "Gagal menghapus pengguna.");
      setDeleteModalOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusChangeRequest = (user) => {
    setUserToUpdateStatus(user);
    setStatusModalOpen(true);
  };

  const confirmStatusChange = async () => {
    if (!userToUpdateStatus) return;
    setIsUpdatingStatus(true);
    const newStatus = userToUpdateStatus.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    try {
      await updateUserStatus(userToUpdateStatus.id, newStatus);
      setStatusModalOpen(false);
      setUserToUpdateStatus(null);
      // Refresh list
      fetchUsers();
    } catch (err) {
      setError(err.message || "Gagal mengubah status pengguna.");
      setStatusModalOpen(false);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manajemen Pengguna</h2>
          <p className="text-slate-500 mt-1">
            Kelola semua data dan status pengguna dalam ekosistem TOEFL Pro.
          </p>
        </div>
        <Button onClick={() => navigate("/admin/users/new")} className="shrink-0 gap-2">
          <PlusIcon className="w-4 h-4" /> Tambah Pengguna
        </Button>
      </div>

      {error && (
        <Alert variant="danger" icon={AlertCircleIcon}>
          {error}
        </Alert>
      )}

      {/* Stats Cards */}
      <UserStatsCards meta={meta} />

      {/* Filters and Table Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 pb-0">
          <UserFilters filters={filters} onFilterChange={handleFilterChange} />
        </div>
        
        <UserTable 
          users={users} 
          isLoading={isLoading} 
          onEdit={handleEdit}
          onView={handleView}
          onDelete={handleDeleteRequest}
          onStatusChange={handleStatusChangeRequest}
        />

        {/* Pagination */}
        {meta && meta.total_pages > 1 && (
          <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm">
            <span className="text-slate-500">
              Menampilkan {((filters.page - 1) * filters.limit) + 1} - {Math.min(filters.page * filters.limit, meta.total)} dari {meta.total} pengguna
            </span>
            <div className="flex gap-1">
              <Button 
                variant="outline" 
                size="sm" 
                disabled={filters.page === 1}
                onClick={() => handlePageChange(filters.page - 1)}
              >
                Sebelumnya
              </Button>
              {Array.from({ length: meta.total_pages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-8 h-8 rounded-md flex items-center justify-center text-sm font-medium transition-colors ${
                    filters.page === pageNum 
                      ? "bg-blue-600 text-white" 
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {pageNum}
                </button>
              ))}
              <Button 
                variant="outline" 
                size="sm" 
                disabled={filters.page === meta.total_pages}
                onClick={() => handlePageChange(filters.page + 1)}
              >
                Berikutnya
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-600">
                <AlertCircleIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Hapus Pengguna</h3>
              <p className="text-slate-500">
                Apakah Anda yakin ingin menghapus pengguna <span className="font-semibold text-slate-700">{userToDelete?.name}</span>? 
                Tindakan ini tidak dapat dibatalkan dan semua data terkait pengguna ini mungkin akan dihapus.
              </p>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setDeleteModalOpen(false)} disabled={isDeleting}>
                Batal
              </Button>
              <Button variant="danger" onClick={confirmDelete} isLoading={isDeleting}>
                Hapus Pengguna
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Status Change Confirmation Modal */}
      {statusModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4 text-amber-600">
                <AlertCircleIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                {userToUpdateStatus?.status === "ACTIVE" ? "Nonaktifkan Pengguna" : "Aktifkan Pengguna"}
              </h3>
              <p className="text-slate-500">
                Apakah Anda yakin ingin mengubah status pengguna <span className="font-semibold text-slate-700">{userToUpdateStatus?.name}</span> menjadi 
                <span className="font-semibold text-slate-700">{userToUpdateStatus?.status === "ACTIVE" ? " INACTIVE" : " ACTIVE"}</span>?
              </p>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setStatusModalOpen(false)} disabled={isUpdatingStatus}>
                Batal
              </Button>
              <Button variant="primary" onClick={confirmStatusChange} isLoading={isUpdatingStatus}>
                Ya, Ubah Status
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
