import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const cards = [
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
  ];

  return (
    <div className="relative bg-[#F8FAFC]">
      {/* Hero Banner Section */}
      <section className="relative min-h-[60vh] md:min-h-[85vh] lg:min-h-[90vh] flex items-center pt-32 pb-20 md:pb-48">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/img.png"
            alt="Escola"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6 tracking-tight">
              Bem-vindo ao <span className="text-[#4CAF50]">Instituto Médio</span> Politécnico Privado Jamir
            </h1>
            
            <p className="text-base md:text-xl text-gray-200 mb-10 leading-relaxed font-normal">
              Mais do que ensinar conteúdos, a escola prepara os seus estudantes para o futuro, incentivando o pensamento crítico, a autonomia e a capacidade de adaptação num mundo em constante transformação.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-start gap-4">
              <Link to="/sobre" className="w-full sm:w-auto">
                <button className="w-full bg-[#2E7D32] text-white px-10 py-4 rounded-[5px] text-lg font-bold hover:bg-[#1B5E20] transition-all shadow-lg flex items-center justify-center gap-2 group">
                  Saber Mais
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating Cards (Desktop) or Inline Cards (Mobile) */}
      <div className="relative -mt-10 md:mt-0 md:absolute md:bottom-0 md:left-0 md:right-0 md:transform md:translate-y-1/2 z-20 pb-12 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 bg-transparent md:bg-white rounded-[8px] md:rounded-[5px] md:shadow-2xl overflow-visible md:overflow-hidden md:divide-x divide-gray-100 md:border md:border-gray-100">
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + (idx * 0.1) }}
                className={`${card.color} p-6 sm:p-8 flex flex-col items-start text-left group hover:bg-green-50/30 transition-all duration-300 relative min-h-[200px] md:min-h-[250px] rounded-[8px] md:rounded-none shadow-md md:shadow-none border border-gray-100 md:border-0`}
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

      {/* Spacing spacer specifically on desktop to compensate for absolute translate-y-1/2 overflow */}
      <div className="hidden md:block md:h-28" />
    </div>
  );
}

