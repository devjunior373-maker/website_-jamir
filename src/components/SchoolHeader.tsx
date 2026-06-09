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
  FileText,
  Search,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin
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
    { name: 'PÁGINA INICIAL', href: '/', type: 'link' },
    { name: 'NOSSOS CURSOS', href: '/cursos', type: 'link' },
    { name: 'PRÉ-INSCRIÇÃO', href: '/pre-inscricao', type: 'link' },
    { name: 'SOBRE O INSTITUTO', href: '/sobre', type: 'link' },
    { name: 'NOTÍCIAS', href: '/blog', type: 'link' },
    { name: 'GALERIAS', href: '/galeria', type: 'link' },
    { name: 'PORTAL ESTUDANTIL', href: '/login', type: 'link' },
  ];

  const mobileMenuSections = [
    {
      title: "Institucional",
      items: [
        { name: "Página Inicial", href: "/", icon: <School size={18} /> },
        { name: "Sobre o Instituto", href: "/sobre", icon: <Briefcase size={18} /> },
        { name: "Galerias", href: "/galeria", icon: <BookOpen size={18} /> },
        { name: "Notícias", href: "/blog", icon: <FileText size={18} /> },
      ]
    },
    {
      title: "Área Académica",
      items: [
        { name: "Nossos Cursos", href: "/cursos", icon: <GraduationCap size={18} /> },
        { name: "Pré-Inscrição Online", href: "/pre-inscricao", icon: <FileText size={18} /> },
        { name: "Portal do Aluno", href: "/login", icon: <LogIn size={18} /> },
      ]
    },
    {
      title: "Área do Aluno",
      items: [
        { name: "Portal Estudantil", href: "/login", icon: <LogIn size={18} /> },
        { name: "Consultar Notas", href: "/login", icon: <GraduationCap size={18} /> },
        { name: "Pagamentos Online", href: "/login", icon: <CreditCard size={18} /> },
      ]
    }
  ];

  // Components moved inside for easier access to state if needed, 
  // but could be outside for purity. Keeping inside for cohesion in this refactor.

  const TopBar = () => (
    <div className="bg-[#2E7D32] text-white shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 sm:py-2">
        <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] sm:text-[11px] font-bold uppercase tracking-wider gap-1.5 sm:gap-3">
          {/* Left Side: Location */}
          <div className="flex items-center gap-1.5 text-white order-2 sm:order-1">
            <MapPin size={10} className="text-green-200 sm:w-3 sm:h-3" />
            <span className="opacity-90">Luanda, Angola</span>
          </div>

          {/* Right Side: Contacts */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-6 order-1 sm:order-2">
            <div className="flex items-center gap-3 sm:gap-6">
              <a href="tel:+244923000000" className="flex items-center gap-1.5 hover:text-green-200 transition-colors">
                <Phone size={10} className="text-green-200 sm:w-3 sm:h-3" />
                <span className="inline">+244 923 000 000</span>
              </a>
              <a href="mailto:info@complexojamir.com" className="hidden md:flex items-center gap-1.5 hover:text-green-200 transition-colors">
                <Mail size={10} className="text-green-200 sm:w-3 sm:h-3" />
                info@complexojamir.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full z-50 sticky top-0">
      <TopBar />

      <motion.header
        animate={{ 
          paddingTop: isScrolled ? "4px" : "8px",
          paddingBottom: isScrolled ? "4px" : "8px",
          boxShadow: isScrolled ? "0 4px 6px -1px rgb(0 0 0 / 0.1)" : "0 0 0 0 rgb(0 0 0 / 0)"
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="w-full bg-white border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            
            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0 hover:opacity-90 transition-opacity">
              <motion.img 
                animate={{ 
                  height: isScrolled ? 36 : 48
                }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                src="/logo.png" 
                alt="Logo Complexo Jamir" 
                className="w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              {menuItems.map((item) => (
                <div key={item.name} className="relative py-2">
                  <Link 
                    to={item.href || '/'}
                    className={cn(
                      "relative flex items-center gap-1 px-3 xl:px-4 py-2 text-[13px] xl:text-[14px] font-bold transition-all whitespace-nowrap",
                      location.pathname === item.href 
                        ? "text-[#2E7D32]" 
                        : "text-gray-600 hover:text-[#2E7D32]"
                    )}
                  >
                    {item.name}
                    {location.pathname === item.href && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#2E7D32] rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </div>
              ))}
            </nav>



            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2 rounded-[5px] transition-colors relative z-[60] text-gray-600 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Alternar menu"
            >
              {isMobileMenuOpen ? <X size={28} className="text-gray-800" /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55]"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-[56] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
                  <div>
                    <h3 className="text-[#2E7D32] font-bold text-base leading-tight uppercase">COMPLEXO JAMIR</h3>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Navegação</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
                {mobileMenuSections.map((section, idx) => (
                  <motion.div 
                    key={section.title} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="space-y-3"
                  >
                    <h4 className="text-[10px] uppercase tracking-widest text-[#2E7D32] font-extrabold px-1">
                      {section.title}
                    </h4>
                    <div className="space-y-1">
                      {section.items.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-[5px] transition-all font-bold text-sm",
                            location.pathname === item.href 
                              ? "bg-green-50 text-[#2E7D32]" 
                              : "text-gray-700 hover:bg-gray-50"
                          )}
                        >
                          <span className={cn(
                            "transition-colors",
                            location.pathname === item.href ? "text-[#2E7D32]" : "text-gray-400"
                          )}>
                            {item.icon}
                          </span>
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                ))}


              </div>

              <div className="p-6 bg-gray-50 border-t border-gray-100 italic">
                <p className="text-[9px] text-gray-400 text-center font-bold uppercase tracking-tighter">
                  © 2024 Instituto Médio Politécnico Privado Jamir<br />Todos os direitos reservados.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
