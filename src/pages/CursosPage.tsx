import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, ArrowRight, GraduationCap, Loader2, Coins, Receipt, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { USE_MOCK_DATA, supabase } from '../lib/supabase';

interface Course {
  id: string;
  nome: string;
  preco_matricula: number;
  preco_confirmacao: number;
  propina: number;
  multa: number;
}

const MOCK_COURSES: Course[] = [
  {
    id: '1',
    nome: 'Ciências da Saúde',
    preco_matricula: 15000,
    preco_confirmacao: 10000,
    propina: 18000,
    multa: 1800
  },
  {
    id: '2',
    nome: 'Engenharia Informática',
    preco_matricula: 18000,
    preco_confirmacao: 12000,
    propina: 22000,
    multa: 2200
  },
  {
    id: '3',
    nome: 'Direito e Cidadania',
    preco_matricula: 12000,
    preco_confirmacao: 8000,
    propina: 15000,
    multa: 1500
  }
];

export default function CursosPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);

      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setCourses(MOCK_COURSES);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('nome');
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      if (!data || data.length === 0) {
        console.log('Nenhum curso encontrado no Supabase para a tabela "courses". Verifique se o RLS está configurado para leitura pública.');
      }

      setCourses(data || []);
    } catch (err: any) {
      console.error('Erro ao carregar cursos:', err);
      if (err.message === 'Failed to fetch') {
        setError('Erro de conexão: Não foi possível alcançar o servidor do Supabase. Verifique se as variáveis de ambiente (URL e Chave Anon) estão configuradas corretamente nas configurações do projeto.');
      } else {
        setError(err.message || 'Houve um problema ao carregar os cursos. Verifique sua conexão ou se a tabela existe no Supabase.');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA'
    }).format(value);
  };

  return (
    <div className="pt-24 pb-20">
      {/* Courses Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tight">Cursos Disponíveis</h1>
            <div className="w-20 h-2 bg-[#2E7D32] mx-auto rounded-full" />
          </div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-white border border-gray-100 rounded-[5px] p-8 animate-pulse">
                  <div className="w-14 h-14 bg-gray-200 rounded-[5px] mb-6" />
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-6" />
                  <div className="space-y-4">
                    <div className="h-12 bg-gray-100 rounded-[5px]" />
                    <div className="h-12 bg-gray-100 rounded-[5px]" />
                    <div className="h-12 bg-gray-100 rounded-[5px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="bg-red-50 text-red-600 p-6 rounded-[5px] max-w-lg mx-auto inline-block border border-red-100">
                <p className="font-bold mb-4">{error}</p>
                <button 
                  onClick={fetchCourses}
                  className="bg-red-600 text-white px-6 py-2 rounded-[5px] font-bold hover:bg-red-700 transition-colors"
                >
                  Tentar Novamente
                </button>
              </div>
            </div>
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white border border-gray-100 rounded-[5px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                >
                  <div className="p-8 flex-grow">
                    <div className="w-14 h-14 bg-green-50 rounded-[5px] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <GraduationCap className="text-[#2E7D32]" size={28} />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-6 group-hover:text-[#2E7D32] transition-colors uppercase leading-tight">
                      {course.nome}
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-[5px]">
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Receipt size={16} />
                          <span>Matrícula</span>
                        </div>
                        <span className="font-bold text-gray-900">{formatCurrency(course.preco_matricula)}</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-[5px]">
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <CreditCard size={16} />
                          <span>Propina</span>
                        </div>
                        <span className="font-bold text-gray-900">{formatCurrency(course.propina)}</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-[5px]">
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Coins size={16} />
                          <span>Confirmação</span>
                        </div>
                        <span className="font-bold text-gray-900">{formatCurrency(course.preco_confirmacao)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 border-t border-gray-50 bg-gray-50/50 flex items-center justify-between group-hover:bg-green-50 transition-colors">
                    <Link 
                      to="/contacto" 
                      className="flex items-center gap-2 text-[#2E7D32] font-black text-sm uppercase tracking-wider"
                    >
                      Solicitar Info
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-[5px] border border-dashed border-gray-200">
              <GraduationCap className="mx-auto text-gray-300 mb-4" size={48} />
              <p className="text-gray-500 text-lg font-medium">Nenhum curso cadastrado no momento.</p>
              <p className="text-gray-400 text-sm mt-2">Os cursos registrados pelo administrador aparecerão aqui.</p>
            </div>
          )}

          {/* CTA Bottom */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-20 bg-gray-900 rounded-[5px] p-10 md:p-16 text-center text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#2E7D32] opacity-20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 opacity-10 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <h2 className="text-3xl md:text-5xl font-black mb-6 relative z-10 uppercase tracking-tight">Pronto para dar o seu próximo passo?</h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto relative z-10 leading-relaxed font-medium">
              As inscrições para o próximo ano letivo já estão abertas. Garanta a sua vaga no COMPLEXO JAMIR hoje mesmo.
            </p>
            <Link 
              to="/contacto"
              className="inline-flex items-center gap-3 bg-[#2E7D32] text-white px-10 py-5 rounded-[5px] font-black text-xl hover:bg-[#1B5E20] transition-all relative z-10 shadow-2xl active:scale-95 group"
            >
              Matricular-se Agora
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
