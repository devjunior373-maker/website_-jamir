import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Users, 
  Lightbulb, 
  Trophy, 
  Globe, 
  Heart,
  ArrowUpRight
} from 'lucide-react';

const features = [
  {
    title: "Segurança e Confiança",
    description: "Ambiente monitorado e seguro, garantindo a tranquilidade dos pais e o bem-estar dos alunos.",
    icon: <ShieldCheck className="w-6 h-6" />,
    image: "https://picsum.photos/seed/student-girl/600/400",
  },
  {
    title: "Turmas Reduzidas",
    description: "Atenção personalizada para cada estudante.",
    icon: <Users className="w-6 h-6" />,
  },
  {
    title: "Inovação Pedagógica",
    description: "Metodologias ativas e tecnologia de ponta.",
    icon: <Lightbulb className="w-6 h-6" />,
  },
  {
    title: "Excelência Académica",
    description: "Resultados comprovados com altos índices de aprovação nacional.",
    icon: <Trophy className="w-6 h-6" />,
    image: "https://picsum.photos/seed/school-award/600/400",
  }
];

export default function UniqueFeatures() {
  return (
    <section className="py-32 bg-[#F9FAF9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black text-gray-900 leading-tight tracking-tighter"
            >
              O QUE NOS TORNA <br />
              <span className="text-[#2E7D32]">REALMENTE ÚNICOS</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-500 font-medium max-w-xs text-sm uppercase tracking-widest leading-relaxed"
          >
            Mais do que uma escola, somos um parceiro no desenvolvimento do potencial ilimitado de cada aluno.
          </motion.p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[240px]">
          
          {/* Card 1: Large Featured */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 md:row-span-2 relative rounded-[5px] overflow-hidden group shadow-sm border border-gray-100"
          >
            <img 
              src={features[0].image} 
              alt={features[0].title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </motion.div>

          {/* Card 2: Small White */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-1 md:row-span-1 bg-white p-8 rounded-[5px] flex flex-col justify-between border border-gray-100 shadow-sm group"
          >
            <div className="w-12 h-12 bg-green-50 text-[#2E7D32] rounded-[5px] flex items-center justify-center group-hover:bg-[#2E7D32] group-hover:text-white transition-colors">
              {features[1].icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{features[1].title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{features[1].description}</p>
            </div>
          </motion.div>

          {/* Card 3: Small Green Tint */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-1 md:row-span-1 bg-[#2E7D32] p-8 rounded-[5px] flex flex-col justify-between text-white shadow-lg group"
          >
            <div className="w-12 h-12 bg-white/20 rounded-[5px] flex items-center justify-center">
              {features[2].icon}
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">{features[2].title}</h3>
              <p className="text-white/80 text-sm leading-relaxed">{features[2].description}</p>
            </div>
          </motion.div>

          {/* Card 4: Medium Text-only */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 md:row-span-1 bg-white p-10 rounded-[5px] flex flex-col justify-center border border-gray-100 shadow-sm group"
          >
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 bg-green-50 text-[#2E7D32] rounded-[5px] flex items-center justify-center mb-6">
                {features[3].icon}
              </div>
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:text-[#2E7D32] group-hover:bg-green-50 transition-colors">
                <ArrowUpRight size={20} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{features[3].title}</h3>
            <p className="text-gray-600 leading-relaxed">{features[3].description}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
