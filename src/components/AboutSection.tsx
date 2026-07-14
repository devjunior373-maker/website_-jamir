import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, Calendar, BookOpen } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="pt-16 md:pt-48 lg:pt-64 pb-20 md:pb-36 bg-white relative overflow-hidden">
      {/* Structural visual accent */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-gray-50/50 -skew-x-12 origin-top-right pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Visuals & Stats Overlay */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Backing structural shape accent */}
              <div className="absolute -top-6 -left-6 w-24 h-24 border-t-4 border-l-4 border-[#2E7D32]/20 rounded-tl-[10px]" />
              
              <img 
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=75" 
                alt="JAMIR Campus Life" 
                className="w-full h-[20rem] sm:h-[32rem] object-cover rounded-[5px] shadow-2xl relative z-10"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Float Card with stats */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute -bottom-8 -right-4 sm:right-8 bg-[#2E7D32] text-white p-8 rounded-[5px] shadow-2xl z-20 max-w-[260px]"
              >
                <div className="space-y-4">
                  <div>
                    <p className="text-4xl font-black mb-1 leading-none tracking-tight">14+</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-green-100">Anos de Inovação</p>
                  </div>
                  <div className="w-12 h-px bg-white/20" />
                  <div>
                    <p className="text-4xl font-black mb-1 leading-none tracking-tight">100%</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-green-100">Aprovação Nacional</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Copywriting content */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h2 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-tight leading-tight">
                COMPLEXO ESCOLAR PRIVADO <br />
                <span className="text-[#2E7D32]">JAMIR</span>
              </h2>
              <div className="w-20 h-2 bg-[#2E7D32] rounded-full" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-gray-600 text-[15px] leading-relaxed font-medium"
            >
              Fundado em 2012, o Complexo Escolar Privado JAMIR é uma das instituições de maior prestígio em Luanda, Angola. Guiados pelo lema da integridade e excelência, fundimos tradição académica com metodologias ativas modernas e infraestruturas tecnológicas de ponta.
            </motion.p>

            {/* Quick value cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <div className="flex gap-4 p-5 bg-gray-50 rounded-[5px] border border-gray-100 hover:bg-gray-100/50 transition-colors duration-200">
                <div className="p-3 bg-white text-[#2E7D32] rounded-[5px] shadow-sm shrink-0 h-11 w-11 flex items-center justify-center">
                  <Users size={20} />
                </div>
                <div>
                  <h4 className="font-extrabold text-gray-900 text-sm uppercase tracking-tight">Alunos Ativos</h4>
                  <p className="text-xs text-gray-500 font-semibold mt-1">Mais de 1200 estudantes guiados por mentores de referência.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 bg-gray-50 rounded-[5px] border border-gray-100 hover:bg-gray-100/50 transition-colors duration-200">
                <div className="p-3 bg-white text-[#2E7D32] rounded-[5px] shadow-sm shrink-0 h-11 w-11 flex items-center justify-center">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="font-extrabold text-gray-900 text-sm uppercase tracking-tight">Reconhecimento</h4>
                  <p className="text-xs text-gray-500 font-semibold mt-1">Mais de 45 prémios académicos e inovação reconhecidos nacionalmente.</p>
                </div>
              </div>
            </motion.div>

            {/* Action button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="pt-4"
            >
              <Link 
                to="/sobre"
                className="inline-flex items-center gap-2 hover:gap-3 bg-[#2E7D32] text-white px-8 py-4 rounded-[5px] font-black text-xs uppercase tracking-widest hover:bg-[#1B5E20] transition-all shadow-lg active:scale-95"
              >
                Conhecer a Nossa História
                <ArrowRight size={16} />
              </Link>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
