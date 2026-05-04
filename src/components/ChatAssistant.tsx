import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const SYSTEM_INSTRUCTION = `
Você é o Assistente Virtual do Complexo Escolar Privado JAMIR. 
Sua missão é ajudar pais, alunos e interessados com informações sobre a escola.
Seja sempre educado, profissional e acolhedor.

Informações Importantes sobre o JAMIR:
- Fundado em 2012.
- Localização: Luanda, Angola.
- Níveis de Ensino: Primário e Secundário.
- Cursos: Ciências e Tecnologias, Línguas e Humanidades, Artes Visuais, Economia.
- Diferenciais: Laboratório de Robótica e IA, Projeto 'Pequenos Cientistas', Workshop de Artes.
- Matrículas 2026: Estão abertas.
- Contactos: +244 923 000 000 | geral@jamir.ao

Regras de Resposta:
1. Responda sempre em Português.
2. Se não souber uma informação específica, sugira que entrem em contacto direto com a secretaria através do telefone ou e-mail fornecidos.
3. Mantenha as respostas concisas e úteis.
4. Use emojis ocasionalmente para parecer mais amigável (ex: 🎓, 📚, ✨).
`;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Olá! Sou o assistente virtual do JAMIR. Como posso ajudar você hoje? 🎓' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const saveChatInteraction = async (userMessage: string, assistantResponse: string) => {
    try {
      await supabase.from('assistant_chats').insert({
        usuario: user?.email || 'Visitante',
        mensagem: userMessage,
        resposta: assistantResponse
      });
    } catch (err) {
      console.error('Failed to save chat interaction:', err);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      
      // Construct history for the API
      const history = messages.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...history,
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const assistantContent = response.text || "Desculpe, tive um problema ao processar sua mensagem. Por favor, tente novamente.";
      setMessages(prev => [...prev, { role: 'assistant', content: assistantContent }]);
      
      // Save full interaction to DB
      saveChatInteraction(userMessage, assistantContent);
    } catch (error) {
      console.error("Erro no Assistente Virtual:", error);
      const errorMsg = "Lamento, estou com dificuldades técnicas no momento. Por favor, tente mais tarde ou contacte-nos diretamente. 📞";
      setMessages(prev => [...prev, { role: 'assistant', content: errorMsg }]);
      saveChatInteraction(userMessage, errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-[5px] shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#2E7D32] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-[5px] flex items-center justify-center">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Assistente JAMIR</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-[10px] text-green-100 uppercase font-bold tracking-wider">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-[5px] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-[5px] flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-[#2E7D32]'}`}>
                      {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`p-3 rounded-[5px] text-sm shadow-sm ${msg.role === 'user' ? 'bg-[#2E7D32] text-white' : 'bg-white text-gray-700 border border-gray-100'}`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[85%]">
                    <div className="w-8 h-8 rounded-[5px] bg-green-100 text-[#2E7D32] flex items-center justify-center">
                      <Bot size={16} />
                    </div>
                    <div className="p-4 rounded-[5px] bg-white border border-gray-100 shadow-sm flex items-center">
                      <div className="flex gap-1.5 items-center h-4">
                        <motion.div
                          animate={{ y: [0, -6, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                          className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -6, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                          className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -6, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                          className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Escreva sua mensagem..."
                  className="flex-grow bg-gray-50 border border-gray-200 rounded-[5px] px-4 py-2 text-sm focus:outline-none focus:border-[#2E7D32] transition-colors"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-[#2E7D32] text-white p-2 rounded-[5px] hover:bg-[#1B5E20] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-[#2E7D32] text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-[#1B5E20] transition-all relative group"
      >
        {isOpen ? <X size={32} /> : <MessageSquare size={32} />}
      </motion.button>
    </div>
  );
}
