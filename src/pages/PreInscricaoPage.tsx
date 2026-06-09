import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PreInscricaoPage() {
  return (
    <div className="flex-grow bg-[#F8FAFC] flex flex-col items-center justify-center min-h-[75vh] px-4">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 uppercase tracking-tight mb-6">
          Brevemente Disponível
        </h1>
        
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-800 transition-colors text-xs font-black uppercase tracking-widest mt-4"
        >
          <ArrowLeft size={14} />
          Voltar ao Início
        </Link>
      </motion.div>
    </div>
  );
}
