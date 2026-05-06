import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  ChevronDown, 
  LogIn, 
  Menu, 
  X,
  BookOpen,
  Briefcase,
  School,
  LayoutDashboard
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { useAuth } from '../context/AuthContext';

export default function SchoolHeader() {
  const { user, isEditor } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', href: '/', type: 'link' },
    { name: 'Explorar Cursos', href: '/cursos', type: 'link' },
    { name: 'Sobre', href: '/sobre', type: 'link' },
    { name: 'Ajuda / Suporte', href: '/contacto', type: 'link' },
  ];

  return (
    <header className={cn(
      "w-full z-50 transition-all duration-300",
      isScrolled 
        ? "sticky top-0 bg-white shadow-lg py-2 border-b border-gray-100" 
        : isHome 
          ? "absolute top-0 bg-transparent py-4" 
          : "sticky top-0 bg-white border-b border-gray-100 py-3"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* LADO ESQUERDO: Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 hover:opacity-90 transition-opacity">
            <img 
              src="/logo.png" 
              alt="Logo Complexo Jamir" 
              className={cn(
                "h-16 w-auto object-contain transition-all",
                isScrolled ? "h-14" : "h-16"
              )}
            />
            <div className="flex flex-col">
              <span className={cn(
                "font-bold text-xl leading-none transition-colors",
                (isHome && !isScrolled) ? "text-white" : "text-[#2E7D32]"
              )}>
                COMPLEXO JAMIR
              </span>
            </div>
          </Link>

          {/* CENTRO: Navegação (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <div 
                key={item.name}
                className="relative group"
              >
                <Link 
                  to={item.href || '/'}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 text-sm font-semibold transition-colors rounded-[5px]",
                    (isHome && !isScrolled) 
                      ? "text-white hover:bg-white/10" 
                      : "text-gray-600 hover:text-[#2E7D32] hover:bg-green-50"
                  )}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </nav>

          {/* LADO DIREITO: Botões */}
          <div className="hidden lg:flex items-center gap-3">
            <Link 
              to="/contacto"
              className="flex items-center gap-2 bg-[#2E7D32] text-white px-6 py-2.5 rounded-[5px] font-bold text-sm hover:bg-[#1B5E20] transition-all shadow-md active:scale-95"
            >
              <GraduationCap size={18} />
              Matricular-se
            </Link>

            {user && isEditor && (
              <Link 
                to="/admin"
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-2.5 rounded-[5px] font-bold text-sm hover:bg-gray-200 transition-all active:scale-95 border border-gray-200"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={cn(
              "lg:hidden p-2 rounded-[5px] transition-colors",
              (isHome && !isScrolled) 
                ? "text-white hover:bg-white/10" 
                : "text-gray-600 hover:bg-gray-100"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <Link 
                to="/contacto"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-[#2E7D32] text-white py-4 rounded-[5px] font-bold shadow-lg"
              >
                <GraduationCap size={20} />
                Matricular-se
              </Link>

              {user && isEditor && (
                <Link 
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-4 rounded-[5px] font-bold border border-gray-200"
                >
                  <LayoutDashboard size={20} />
                  Dashboard
                </Link>
              )}
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <div key={item.name}>
                    {item.type === 'link' ? (
                      <Link 
                        to={item.href || '/'}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full flex justify-between items-center py-3 text-gray-700 font-semibold border-b border-gray-50"
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <button className="w-full flex justify-between items-center py-3 text-gray-700 font-semibold border-b border-gray-50">
                        {item.name}
                        {item.type === 'dropdown' && <ChevronDown size={18} />}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
