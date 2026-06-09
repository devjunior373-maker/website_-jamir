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
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center">
            {/* Left Content */}
            <div className="p-10 lg:p-20 lg:w-3/5 text-white">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-black mb-10 leading-tight tracking-tight"
              >
                PRONTO PARA COMEÇAR A <br />
                <span className="text-green-300">JORNADA DO SEU FILHO?</span>
              </motion.h2>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/cursos">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white text-[#2E7D32] px-8 py-4 rounded-[5px] font-black text-lg flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    Explorar Cursos
                    <ArrowRight size={20} />
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* Right Info Box */}
            <div className="lg:w-2/5 w-full bg-[#1B5E20] p-10 lg:p-20 flex flex-col justify-center gap-8">
              <div className="flex items-start gap-4 text-white">
                <div className="w-12 h-12 bg-white/10 rounded-[5px] flex items-center justify-center flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-green-300 text-sm font-bold uppercase tracking-widest mb-1">Ligue-nos</p>
                  <p className="text-xl font-bold">+244 923 000 000</p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-white">
                <div className="w-12 h-12 bg-white/10 rounded-[5px] flex items-center justify-center flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-green-300 text-sm font-bold uppercase tracking-widest mb-1">E-mail</p>
                  <p className="text-xl font-bold">geral@jamir.ao</p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-white">
                <div className="w-12 h-12 bg-white/10 rounded-[5px] flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-green-300 text-sm font-bold uppercase tracking-widest mb-1">Localização</p>
                  <p className="text-xl font-bold">Luanda, Angola</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
