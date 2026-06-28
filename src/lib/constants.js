// Role enums matching backend
export const ROLES = {
  ADMIN: 'ADMIN',
  PENGGUNA_BELAJAR: 'PENGGUNA_BELAJAR',
  PENGGUNA_UJIAN: 'PENGGUNA_UJIAN',
  PENGAWAS: 'PENGAWAS',
};

// Status enums
export const STATUSES = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  PENDING: 'PENDING',
  SUSPENDED: 'SUSPENDED',
};

// Human-readable role labels
export const ROLE_LABELS = {
  [ROLES.ADMIN]: 'Admin',
  [ROLES.PENGGUNA_BELAJAR]: 'Pengguna Belajar',
  [ROLES.PENGGUNA_UJIAN]: 'Pengguna Ujian',
  [ROLES.PENGAWAS]: 'Pengawas',
};

// Status badge color mappings (Tailwind classes)
export const STATUS_COLORS = {
  [STATUSES.ACTIVE]: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    dot: 'bg-green-500',
  },
  [STATUSES.INACTIVE]: {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    dot: 'bg-gray-500',
  },
  [STATUSES.PENDING]: {
    bg: 'bg-amber-100',
    text: 'text-amber-700',
    dot: 'bg-amber-500',
  },
  [STATUSES.SUSPENDED]: {
    bg: 'bg-red-100',
    text: 'text-red-700',
    dot: 'bg-red-500',
  },
};

// Role badge color mappings
export const ROLE_COLORS = {
  [ROLES.ADMIN]: {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
  },
  [ROLES.PENGGUNA_BELAJAR]: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
  },
  [ROLES.PENGGUNA_UJIAN]: {
    bg: 'bg-indigo-100',
    text: 'text-indigo-700',
  },
  [ROLES.PENGAWAS]: {
    bg: 'bg-teal-100',
    text: 'text-teal-700',
  },
};

// Role options for login dropdown
export const ROLE_OPTIONS = [
  { value: ROLES.PENGGUNA_UJIAN, label: 'Pengguna Ujian' },
  { value: ROLES.PENGGUNA_BELAJAR, label: 'Pengguna Belajar' },
  { value: ROLES.PENGAWAS, label: 'Pengawas' },
  { value: ROLES.ADMIN, label: 'Admin' },
];

// Sidebar navigation configuration
export const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    path: '/dashboard',
    enabled: true,
  },
  {
    id: 'test-center',
    label: 'Test Center',
    icon: 'ClipboardList',
    path: null,
    enabled: false,
  },
  {
    id: 'learning-hub',
    label: 'Learning Hub',
    icon: 'BookOpen',
    path: null,
    enabled: false,
  },
  {
    id: 'results',
    label: 'Results',
    icon: 'BarChart3',
    path: null,
    enabled: false,
  },
  {
    id: 'proctoring',
    label: 'Proctoring',
    icon: 'Eye',
    path: null,
    enabled: false,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'Settings',
    path: '/settings',
    enabled: true,
  },
];

// API response codes
export const RESPONSE_CODES = {
  SUCCESS: '0000',
  INVALID_FORMAT: '0001',
  MISSING_FIELD: '0002',
  NOT_ALLOWED: '0003',
  NOT_FOUND: '0004',
  GENERAL_ERROR: '9999',
};

// Error message mappings
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Tidak dapat terhubung ke server. Coba lagi beberapa saat.',
  INVALID_CREDENTIALS: 'Email atau password tidak sesuai.',
  SESSION_EXPIRED: 'Sesi berakhir. Silakan login kembali.',
  ACCESS_DENIED: 'Anda tidak memiliki akses ke halaman ini.',
  NOT_FOUND: 'Data tidak ditemukan.',
  SERVER_ERROR: 'Terjadi kesalahan server. Coba lagi nanti.',
  VALIDATION_ERROR: 'Data yang dikirim belum valid. Periksa kembali input.',
  MISSING_FIELDS: 'Field wajib belum lengkap.',
};

// Storage keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'toefl_access_token',
  REFRESH_TOKEN: 'toefl_refresh_token',
  USER: 'toefl_user',
  REMEMBER: 'toefl_remember',
};
