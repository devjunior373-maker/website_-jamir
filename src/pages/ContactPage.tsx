import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Send, Instagram, Facebook, Linkedin, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Informações Gerais',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([{
          nome: formData.name,
          email: formData.email,
          tipo: formData.subject,
          mensagem: formData.message
        }]);

      if (error) throw error;

      setIsSent(true);
      setFormData({ name: '', email: '', subject: 'Informações Gerais', message: '' });
      setTimeout(() => setIsSent(false), 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight uppercase"
          >
            FALE <span className="text-[#2E7D32]">CONNOSCO</span>
          </motion.h1>
          <p className="text-gray-500 text-xl max-w-2xl mx-auto">Estamos aqui para responder a todas as suas perguntas e ajudá-lo no processo de admissão.</p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-10 tracking-tight uppercase">Informações de Contacto</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-green-50 text-[#2E7D32] rounded-[5px] flex items-center justify-center flex-shrink-0">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">Localização</h4>
                    <p className="text-gray-500">Rua da Educação, Bairro Talatona, Luanda, Angola</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-green-50 text-[#2E7D32] rounded-[5px] flex items-center justify-center flex-shrink-0">
                    <Phone size={28} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">Telefone</h4>
                    <p className="text-gray-500">+244 923 000 000 / +244 912 000 000</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-green-50 text-[#2E7D32] rounded-[5px] flex items-center justify-center flex-shrink-0">
                    <Mail size={28} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">E-mail</h4>
                    <p className="text-gray-500">geral@jamir.ao / admissoes@jamir.ao</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-green-50 text-[#2E7D32] rounded-[5px] flex items-center justify-center flex-shrink-0">
                    <Clock size={28} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">Horário de Atendimento</h4>
                    <p className="text-gray-500">Segunda a Sexta: 07:30 - 16:30</p>
                    <p className="text-gray-500">Sábado: 08:00 - 12:00</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-gray-100">
                <h4 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-widest">Siga-nos nas Redes Sociais</h4>
                <div className="flex gap-4">
                  {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                    <motion.a
                      key={i}
                      href="#"
                      whileHover={{ y: -5, backgroundColor: '#2E7D32', color: '#fff' }}
                      className="w-12 h-12 border border-gray-200 text-gray-400 rounded-[5px] flex items-center justify-center transition-all"
                    >
                      <Icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-10 rounded-[5px] shadow-2xl border border-gray-100">
              <h2 className="text-3xl font-black text-gray-900 mb-8 tracking-tight uppercase">Envie uma Mensagem</h2>
              
              {isSent ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-100 p-8 rounded-[5px] text-center"
                >
                  <CheckCircle size={48} className="text-[#2E7D32] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Mensagem Enviada!</h3>
                  <p className="text-gray-600">Agradecemos o seu contacto. Responderemos o mais breve possível.</p>
                </motion.div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Nome Completo</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-100 rounded-[5px] px-4 py-3 focus:outline-none focus:border-[#2E7D32] transition-colors" 
                        placeholder="Ex: João Silva" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">E-mail</label>
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-100 rounded-[5px] px-4 py-3 focus:outline-none focus:border-[#2E7D32] transition-colors" 
                        placeholder="Ex: joao@email.com" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Assunto</label>
                    <select 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-100 rounded-[5px] px-4 py-3 focus:outline-none focus:border-[#2E7D32] transition-colors appearance-none"
                    >
                      <option>Informações Gerais</option>
                      <option>Matrículas e Admissões</option>
                      <option>Recursos Humanos</option>
                      <option>Outros</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Mensagem</label>
                    <textarea 
                      required
                      rows={5} 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-100 rounded-[5px] px-4 py-3 focus:outline-none focus:border-[#2E7D32] transition-colors resize-none" 
                      placeholder="Como podemos ajudar?"
                    ></textarea>
                  </div>
                  <button 
                    disabled={isSubmitting}
                    className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white py-4 rounded-[5px] font-black uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Send size={20} />
                        Enviar Mensagem
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[500px] w-full bg-gray-200 relative">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 flex-col gap-4">
          <MapPin size={64} />
          <p className="font-bold uppercase tracking-widest">Mapa de Localização (Google Maps)</p>
        </div>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.256241234567!2d13.2345678!3d-8.9123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwNTQnNDQuNCJTIDEzwrAxNCc0NC40IkU!5e0!3m2!1spt-PT!2sao!4v1234567890123" 
          className="w-full h-full border-0 grayscale opacity-50"
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  );
}
