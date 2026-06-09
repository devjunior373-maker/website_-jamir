import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 md:pb-48">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/img.png"
          alt="Escola"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6 tracking-tight">
            Bem-vindo ao <span className="text-[#4CAF50]">Instituto Médio</span> Politécnico Privado Jamir
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed font-normal">
            Mais do que ensinar conteúdos, a escola prepara os seus estudantes para o futuro, incentivando o pensamento crítico, a autonomia e a capacidade de adaptação num mundo em constante transformação.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-start gap-4 mb-12">
            <Link to="/sobre" className="w-full sm:w-auto">
              <button className="w-full bg-[#2E7D32] text-white px-10 py-4 rounded-[5px] text-lg font-bold hover:bg-[#1B5E20] transition-all shadow-lg flex items-center justify-center gap-2 group">
                Saber Mais
              </button>
            </Link>
          </div>


        </motion.div>
      </div>

      {/* Floating Cards */}
      <div className="relative mt-12 md:absolute md:bottom-0 md:left-0 md:right-0 md:transform md:translate-y-1/2 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 bg-white rounded-[5px] shadow-2xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-gray-100 border border-gray-100">
            {[
              {
                title: "Ensino Técnico",
                description: "Formação prática e certificada, orientada para o mercado de trabalho e para o desenvolvimento de competências profissionais",
                icon: <GraduationCap className="text-[#2E7D32]" size={24} />,
                color: "bg-white",
                href: "/cursos"
              },
              {
                title: "Comunidade Escolar",
                description: "Um ambiente educativo que valoriza a colaboração entre alunos, professores, encarregados de educação e toda a equipa escolar, promovendo o sucesso académico e pessoal.",
                icon: <Users className="text-[#2E7D32]" size={24} />,
                color: "bg-white",
                href: "/sobre"
              },
              {
                title: "Excelência",
                description: "Compromisso contínuo com a qualidade do ensino, inovação pedagógica e melhoria dos resultados académicos dos alunos.",
                icon: <Award className="text-[#2E7D32]" size={24} />,
                color: "bg-white",
                href: "/sobre"
              }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + (idx * 0.1) }}
                className={`${card.color} p-8 flex flex-col items-start text-left group hover:bg-green-50/30 transition-all duration-300 relative min-h-[250px]`}
              >
                {/* Icon and Title Area */}
                <div className="mb-4">
                  <div className="p-2 bg-green-50 rounded-[5px] text-[#2E7D32] w-fit mb-4">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-extrabold text-gray-900 uppercase tracking-tight">{card.title}</h3>
                </div>

                <div className="flex-1">
                  <p className="text-gray-500 text-[11px] leading-relaxed font-bold uppercase tracking-wider mb-4">
                    {card.description}
                  </p>
                </div>

                <Link 
                  to={card.href}
                  className="text-[#2E7D32] text-[10px] font-black uppercase tracking-widest hover:translate-x-1 transition-transform inline-flex items-center gap-1 mt-auto"
                >
                  Saber Mais →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

