import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Camera, Save, Lock, Calendar, Clock, User, Mail, Phone } from 'lucide-react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';

interface ProfileModalProps {
  user: SupabaseUser | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ user, isOpen, onClose, onSuccess, onError }) => {
  const [displayName, setDisplayName] = useState(user?.user_metadata?.display_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [photoURL, setPhotoURL] = useState(user?.user_metadata?.photo_url || '');
  const [phone, setPhone] = useState(user?.user_metadata?.phone || '');
  const [newPassword, setNewPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch additional data like phone from profile if needed
  React.useEffect(() => {
    if (user && isOpen) {
      // Reset fields to current user data
      setDisplayName(user.user_metadata?.display_name || '');
      setEmail(user.email || '');
      setPhotoURL(user.user_metadata?.photo_url || '');
      setPhone(user.user_metadata?.phone || '');
      setNewPassword('');
    }
  }, [user, isOpen]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    let successMsg = 'Perfil atualizado com sucesso!';
    try {
      // Update Auth User
      const updates: any = {
        data: {
          display_name: displayName,
          photo_url: photoURL,
          phone: phone
        }
      };

      if (email !== user.email) {
        updates.email = email;
        successMsg += ' Um e-mail de confirmação foi enviado para o novo endereço.';
      }

      if (newPassword) {
        if (newPassword.length < 6) {
          throw new Error('A senha deve ter pelo menos 6 caracteres.');
        }
        updates.password = newPassword;
        successMsg += ' Senha alterada com sucesso!';
      }

      const { error: authError } = await supabase.auth.updateUser(updates);
      if (authError) throw authError;

      // Update Profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          display_name: displayName,
          photo_url: photoURL,
          email: email
        })
        .eq('id', user.id);

      if (profileError) {
        console.warn('Profile table update error:', profileError);
      }

      onSuccess(successMsg);
      onClose();
    } catch (err: any) {
      console.error(err);
      onError('Erro ao atualizar perfil: ' + (err.message || 'Erro desconhecido'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const creationDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
    : 'N/A';
  
  const lastLogin = user?.last_sign_in_at
    ? new Date(user.last_sign_in_at).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : 'N/A';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white w-full max-w-2xl rounded-[5px] shadow-2xl overflow-hidden"
          >
            <div className="bg-[#2E7D32] p-6 text-white flex justify-between items-center">
              <h2 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                <User size={24} /> Perfil do Administrador
              </h2>
              <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleUpdateProfile} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Avatar Section */}
                <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-[5px] border border-dashed border-gray-300">
                  <div className="relative group">
                    {photoURL ? (
                      <img src={photoURL} alt="Avatar" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg" />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-gray-800 flex items-center justify-center text-4xl font-black text-white border-4 border-white shadow-lg">
                        {displayName?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                      <Camera className="text-white" size={24} />
                    </div>
                  </div>
                  <div className="mt-4 w-full">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">URL do Avatar</label>
                    <input 
                      type="text" 
                      value={photoURL}
                      onChange={(e) => setPhotoURL(e.target.value)}
                      placeholder="https://exemplo.com/foto.jpg"
                      className="w-full bg-white border border-gray-200 rounded-[5px] px-3 py-2 text-sm focus:outline-none focus:border-[#2E7D32]"
                    />
                  </div>
                </div>

                {/* Info Section */}
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Nome Completo</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input 
                        type="text" 
                        required
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-[5px] pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#2E7D32]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">E-mail</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-[5px] pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#2E7D32]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Telefone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input 
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+244 ..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-[5px] pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#2E7D32]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-100 pt-8">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Alterar Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="password" 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Nova senha (deixe vazio para manter)"
                      className="w-full bg-gray-50 border border-gray-200 rounded-[5px] pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#2E7D32]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Criação</label>
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-600 bg-gray-50 p-2.5 rounded-[5px] border border-gray-100">
                      <Calendar size={14} className="text-[#2E7D32]" />
                      {creationDate}
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Último Acesso</label>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-600 bg-gray-50 p-2.5 rounded-[5px] border border-gray-100">
                      <Clock size={14} className="text-[#2E7D32]" />
                      {lastLogin}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-10">
                <button 
                  type="button" 
                  onClick={onClose}
                  className="px-6 py-3 font-bold text-gray-500 hover:bg-gray-100 rounded-[5px] transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-[#2E7D32] text-white px-10 py-3 rounded-[5px] font-black uppercase tracking-widest shadow-lg hover:bg-[#1B5E20] transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save size={20} />
                  )}
                  Guardar Alterações
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
