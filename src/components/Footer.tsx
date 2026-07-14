import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <img 
          src="/logo.png" 
          alt="Logo Complexo Escolar Privado Jamir" 
          className="h-16 w-auto object-contain"
          loading="lazy"
        />
        <div className="text-center md:text-right text-sm font-medium tracking-wide">
          <p className="text-white flex flex-col md:flex-row items-center md:justify-end gap-1 md:gap-2">
            <span>© 2026 Complexo Escolar Privado Jamir.</span>
            <span className="text-gray-500 text-xs uppercase tracking-widest">
              Feito por <span className="text-[#2E7D32] font-black">Osvaldo José</span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
