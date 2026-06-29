import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/auth-context";
import { Logo } from "../../../components/ui/Logo";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { CheckCircle2Icon, BookOpenIcon, BarChart3Icon, ShieldCheckIcon } from "lucide-react";
const heroImage = "https://raw.githubusercontent.com/saripudin14/img/refs/heads/main/Interactive%20Online%20English%20Tutoring%20Session.jpg";

export default function LandingPage() {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      title: "Ujian Realistis",
      description: "Rasakan pengalaman ujian sesungguhnya dengan simulasi environment TOEFL ITP berstandar internasional.",
      icon: <BookOpenIcon className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Analisis Detail",
      description: "Dapatkan laporan skor yang komprehensif untuk setiap seksi guna mengetahui kekuatan dan kelemahan Anda.",
      icon: <BarChart3Icon className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Sistem Aman & Teruji",
      description: "Keamanan setingkat institusi yang memastikan validitas pengerjaan dengan proteksi khusus.",
      icon: <ShieldCheckIcon className="w-6 h-6 text-blue-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <Logo variant="full" size="md" />
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button variant="primary">Go to Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                    Sign In
                  </Link>
                  <Link to="/register">
                    <Button variant="primary">Mulai Sekarang</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-slate-50 pt-16 pb-24 sm:pt-24 sm:pb-32 lg:pb-40">
          {/* Decorative background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden z-0 pointer-events-none">
            <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-blue-200/40 blur-3xl"></div>
            <div className="absolute bottom-[20%] right-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
              <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-50 mb-6">
                  <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
                  Platform Persiapan TOEFL #1
                </div>
                <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                  <span className="block xl:inline">Kuasai Bahasa Inggris.</span>{" "}
                  <span className="block text-blue-600">Raih Skor Impianmu.</span>
                </h1>
                <p className="mt-3 text-base text-slate-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  Persiapkan ujian TOEFL Anda dengan platform modern kami. Dilengkapi dengan simulasi tes realistis, sistem evaluasi otomatis, dan materi berstandar institusi akademik.
                </p>
                <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0 flex flex-col sm:flex-row gap-4">
                  <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                    <Button variant="primary" size="lg" className="w-full sm:w-auto" showArrow>
                      {isAuthenticated ? "Masuk ke Dashboard" : "Mulai Belajar Sekarang"}
                    </Button>
                  </Link>
                  <Link to={isAuthenticated ? "/dashboard" : "/login"}>
                    <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white">
                      Lihat Demo
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                <div className="relative mx-auto w-full rounded-2xl shadow-xl lg:max-w-md overflow-hidden bg-white aspect-[4/3] ring-1 ring-slate-900/5">
                  <img
                    className="w-full h-full object-cover"
                    src={heroImage}
                    alt="TOEFL Preparation Dashboard Preview"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Keunggulan</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Cara Terbaik untuk Bersiap
              </p>
              <p className="mt-4 max-w-2xl text-xl text-slate-500 mx-auto">
                Semua alat yang Anda butuhkan untuk mencapai target skor ada di satu tempat dengan antarmuka yang bebas distraksi.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-8 flex flex-col h-full bg-white">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-blue-50 mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                  <p className="text-slate-500 flex-grow leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4 bg-white/10 p-2 rounded-xl">
            <Logo variant="full" size="md" className="text-white" />
          </div>
          <p className="text-slate-400 text-sm text-center max-w-md">
            Membantu ribuan siswa dan profesional membuktikan kemampuan bahasa Inggris mereka untuk dunia.
          </p>
          <div className="mt-8 border-t border-slate-800 pt-8 w-full flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
            <p>&copy; 2026 TOEFL Prep Pro. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="#" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
