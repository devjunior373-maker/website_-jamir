import React from 'react';
import { motion } from 'motion/react';
import { School, Target, Users, Award, BookOpen, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://picsum.photos/seed/school-building/1920/1080" 
            alt="JAMIR Building" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/80 to-gray-900" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight"
          >
            SOBRE O <span className="text-[#2E7D32]">JAMIR</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Desde 2012, transformamos vidas através de uma educação que une tradição, inovação e valores humanos em Angola.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div 
              whileHover={{ y: -10 }}
              className="p-10 bg-gray-50 rounded-[5px] border border-gray-100"
            >
              <div className="w-16 h-16 bg-[#2E7D32] text-white rounded-[5px] flex items-center justify-center mb-6 shadow-lg">
                <Target size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Nossa Missão</h3>
              <p className="text-gray-600 leading-relaxed">
                Proporcionar uma educação de excelência que capacite os alunos a serem líderes inovadores e cidadãos éticos num mundo globalizado.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="p-10 bg-gray-50 rounded-[5px] border border-gray-100"
            >
              <div className="w-16 h-16 bg-[#2E7D32] text-white rounded-[5px] flex items-center justify-center mb-6 shadow-lg">
                <BookOpen size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Nossa Visão</h3>
              <p className="text-gray-600 leading-relaxed">
                Ser a instituição de ensino referência em Angola pela qualidade académica, inovação tecnológica e formação integral do ser humano.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="p-10 bg-gray-50 rounded-[5px] border border-gray-100"
            >
              <div className="w-16 h-16 bg-[#2E7D32] text-white rounded-[5px] flex items-center justify-center mb-6 shadow-lg">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Nossos Valores</h3>
              <p className="text-gray-600 leading-relaxed">
                Integridade, respeito, excelência, inovação e compromisso social são os pilares que sustentam toda a nossa comunidade educativa.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="relative">
                <img 
                  src="https://picsum.photos/seed/history/800/600" 
                  alt="JAMIR History" 
                  className="rounded-[5px] shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-8 -right-8 bg-[#2E7D32] text-white p-8 rounded-[5px] shadow-xl hidden md:block">
                  <p className="text-4xl font-black mb-1">14+</p>
                  <p className="text-sm font-bold uppercase tracking-widest">Anos de História</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
                UMA HISTÓRIA DE <br />
                <span className="text-[#2E7D32]">DEDICAÇÃO E SUCESSO</span>
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  O Complexo Escolar Privado JAMIR nasceu em 2012 com o sonho de oferecer uma educação diferenciada em Luanda. O que começou como um pequeno projeto educativo cresceu e tornou-se numa das instituições mais respeitadas da região.
                </p>
                <p>
                  Ao longo dos anos, investimos constantemente em infraestruturas modernas, tecnologia de ponta e, acima de tudo, na formação contínua do nosso corpo docente. Acreditamos que o professor é o mediador essencial no processo de aprendizagem.
                </p>
                <p>
                  Hoje, o JAMIR é orgulhosamente um espaço onde a curiosidade é estimulada, o talento é nutrido e o futuro é construído todos os dias por centenas de alunos.
                </p>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-8">
                <div className="flex items-center gap-4">
                  <Users className="text-[#2E7D32]" size={32} />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">1200+</p>
                    <p className="text-sm text-gray-500">Alunos Ativos</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Award className="text-[#2E7D32]" size={32} />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">45+</p>
                    <p className="text-sm text-gray-500">Prémios Académicos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight uppercase">Liderança Académica</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Conheça as mentes dedicadas que guiam o futuro dos nossos alunos.</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Dr. António Silva", role: "Diretor Geral", img: "https://picsum.photos/seed/p1/400/500" },
              { name: "Dra. Maria Santos", role: "Diretora Pedagógica", img: "https://picsum.photos/seed/p2/400/500" },
              { name: "Eng. Paulo Jorge", role: "Coord. Inovação", img: "https://picsum.photos/seed/p3/400/500" },
              { name: "Dra. Ana Costa", role: "Coord. Primário", img: "https://picsum.photos/seed/p4/400/500" }
            ].map((member, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-[5px] mb-4">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-[350px] object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2E7D32]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white text-sm font-medium">Ver perfil completo</p>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900">{member.name}</h4>
                <p className="text-[#2E7D32] font-medium">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
