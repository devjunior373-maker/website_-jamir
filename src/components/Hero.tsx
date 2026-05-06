import React from 'react';
import { motion } from 'motion/react';
import { Calendar, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/img.png"
          alt="Escola"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight">
            Educação que <span className="text-[#4CAF50]">Inspira</span> Futuros
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
            Há mais de 14 anos formando líderes para o amanhã
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/contacto" className="w-full sm:w-auto">
              <button className="w-full bg-[#2E7D32] text-white px-10 py-4 rounded-[5px] text-lg font-bold hover:bg-[#1B5E20] transition-all shadow-lg flex items-center justify-center gap-2 group">
                <Calendar size={20} />
                Agendar Visita
              </button>
            </Link>
            <Link to="/cursos" className="w-full sm:w-auto">
              <button className="w-full bg-transparent border-2 border-white text-white px-10 py-4 rounded-[5px] text-lg font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                <BookOpen size={20} />
                Nossos Cursos
              </button>
            </Link>
          </div>

          {/* Student Avatars in Hero */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  className="w-12 h-12 rounded-full border-4 border-white object-cover"
                  src={`https://picsum.photos/seed/student-${i}/100/100`}
                  alt={`Aluno ${i}`}
                  referrerPolicy="no-referrer"
                />
              ))}
              <div className="w-12 h-12 rounded-full border-4 border-white bg-[#2E7D32] flex items-center justify-center text-white text-xs font-bold">
                +1k
              </div>
            </div>
            <p className="text-white/80 text-sm font-medium">Junta-te a mais de 1.000 alunos felizes</p>
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent z-10" />
    </section>
  );
}

