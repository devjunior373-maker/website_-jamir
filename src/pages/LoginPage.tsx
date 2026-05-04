import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { LogIn, ShieldAlert, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { user, loading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && user) {
      navigate("/admin", { replace: true });
    }
  }, [user, authLoading, navigate]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;
      
      navigate("/admin", { replace: true });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "E-mail ou senha incorretos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[5px] shadow-2xl p-10 border border-gray-100"
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-green-50 text-[#2E7D32] rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert size={40} />
          </div>
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Área Restrita</h1>
          <p className="text-gray-500 mt-2">Acesso exclusivo para administradores e editores do JAMIR.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-medium rounded-[5px]">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Mail size={14} />
              E-mail
            </label>
            <input 
              required
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-[5px] px-4 py-3 focus:outline-none focus:border-[#2E7D32] transition-colors" 
              placeholder="Ex: admin@jamir.ao" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Lock size={14} />
              Senha
            </label>
            <input 
              required
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-[5px] px-4 py-3 focus:outline-none focus:border-[#2E7D32] transition-colors" 
              placeholder="••••••••" 
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white py-4 rounded-[5px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={20} />
                Entrar
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
