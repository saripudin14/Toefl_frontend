import React from "react";

export function GuestLayout({ children, heroPanel }) {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Panel - Hero */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-50 border-r border-slate-200 flex-col justify-center relative overflow-hidden">
        {heroPanel || (
          <div className="flex flex-col items-center justify-center p-12 text-center h-full relative z-10">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                Master English Proficiency
              </h2>
              <p className="text-slate-500 mb-8">
                Experience the gold standard in TOEFL preparation with our comprehensive learning platform and realistic practice tests.
              </p>
              {/* Using generated hero image */}
              <div className="w-full aspect-[4/3] rounded-2xl flex items-center justify-center shadow-lg overflow-hidden relative">
                <img src="/src/assets/images/hero-login.png" alt="TOEFL Preparation" className="object-cover w-full h-full" />
              </div>
            </div>
          </div>
        )}
        
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/50 blur-3xl"></div>
          <div className="absolute bottom-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-blue-50/50 blur-3xl"></div>
        </div>
      </div>
      
      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
