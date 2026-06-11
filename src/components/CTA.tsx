import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CTA() {
  return (
    <section className="py-24 bg-[#F9FAF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2E7D32] rounded-[5px] overflow-hidden relative shadow-2xl">
          {/* Background Pattern/Overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          </div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-stretch">
            {/* Left Content */}
            <div className="p-6 sm:p-10 lg:p-16 lg:w-3/5 text-white flex flex-col justify-center">
              <motion.h2 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl lg:text-4xl font-black mb-6 lg:mb-8 leading-tight tracking-tight uppercase"
              >
                PRONTO PARA COMEÇAR A <br />
                <span className="text-green-300">JORNADA DO SEU FILHO?</span>
              </motion.h2>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/cursos" className="w-full sm:w-auto">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto bg-white text-[#2E7D32] px-6 py-3.5 rounded-[5px] font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all uppercase tracking-wider"
                  >
                    Explorar Cursos
                    <ArrowRight size={16} />
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* Right Info Box - Horizontal grid on mobile/tablet, vertical stack on desktop */}
            <div className="lg:w-2/5 w-full bg-[#1B5E20] p-6 sm:p-10 lg:p-16 flex flex-col sm:flex-row lg:flex-col justify-between lg:justify-center items-stretch sm:items-center lg:items-stretch gap-6 sm:gap-4 lg:gap-8 border-t lg:border-t-0 lg:border-l border-white/10">
              <div className="flex items-center gap-3 text-white flex-1 min-w-[120px]">
                <div className="w-10 h-10 bg-white/10 rounded-[5px] flex items-center justify-center flex-shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-green-300 text-[9px] font-black uppercase tracking-widest leading-none mb-1">Ligue-nos</p>
                  <p className="text-sm sm:text-base font-extrabold leading-tight whitespace-nowrap">+244 923 000 000</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-white flex-1 min-w-[120px]">
                <div className="w-10 h-10 bg-white/10 rounded-[5px] flex items-center justify-center flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-green-300 text-[9px] font-black uppercase tracking-widest leading-none mb-1">E-mail</p>
                  <p className="text-sm sm:text-base font-extrabold leading-tight whitespace-nowrap">geral@jamir.ao</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-white flex-1 min-w-[120px]">
                <div className="w-10 h-10 bg-white/10 rounded-[5px] flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-green-300 text-[9px] font-black uppercase tracking-widest leading-none mb-1">Localização</p>
                  <p className="text-sm sm:text-base font-extrabold leading-tight whitespace-nowrap">Luanda, Angola</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
