import React from 'react';
import { ShieldAlert, Terminal, ExternalLink } from 'lucide-react';
import { isConfigured } from '../lib/supabase';

interface SupabaseConfigGateProps {
  children: React.ReactNode;
}

export const SupabaseConfigGate: React.FC<SupabaseConfigGateProps> = ({ children }) => {
  if (isConfigured) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-yellow-500/10 p-3 rounded-lg">
            <ShieldAlert className="text-yellow-500" size={32} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Configuração Necessária</h1>
        </div>
        
        <p className="text-gray-400 mb-6 leading-relaxed">
          O Supabase não foi configurado. Você precisa adicionar as variáveis de ambiente necessárias nas Definições do projeto.
        </p>

        <div className="bg-black/50 rounded-lg p-4 mb-8 font-mono text-sm border border-gray-700">
          <div className="flex items-center gap-2 text-gray-500 mb-2 border-b border-gray-800 pb-2">
            <Terminal size={14} />
            <span>Variáveis faltantes:</span>
          </div>
          <ul className="space-y-1 text-green-400">
            <li>VITE_SUPABASE_URL</li>
            <li>VITE_SUPABASE_ANON_KEY</li>
          </ul>
        </div>

        <div className="space-y-3">
          <button 
            onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
            className="w-full bg-white text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
          >
            Abrir Supabase Dashboard
            <ExternalLink size={16} />
          </button>
          
          <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest font-black">
            Pressione CTRL+S para recarregar após configurar
          </p>
        </div>
      </div>
    </div>
  );
};
