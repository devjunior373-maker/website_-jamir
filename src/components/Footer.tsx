import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-6 text-center">
        <img 
          src="/logo.png" 
          alt="Logo Complexo Escolar Privado Jamir" 
          className="h-16 w-auto object-contain"
          loading="lazy"
        />
        <div className="text-sm font-medium tracking-wide">
          <p className="mb-2 text-white">© 2026 Complexo Escolar Privado Jamir.</p>
          <p className="text-gray-500 text-xs uppercase tracking-widest">
            Feito por <span className="text-[#2E7D32] font-black">Osvaldo José</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
