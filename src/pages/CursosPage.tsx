import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, ArrowRight, GraduationCap, Loader2, Coins, Receipt, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { USE_MOCK_DATA, supabase } from '../lib/supabase';
import { Skeleton } from '../components/ui/Skeleton';

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
        await new Promise(resolve => setTimeout(resolve, 4000));
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
    <div className="pt-12 sm:pt-16 pb-20">
      {/* Courses Grid */}
      <section className="pt-8 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-left">
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">Cursos Disponíveis</h1>
            <div className="w-20 h-2 bg-[#2E7D32] rounded-full" />
          </div>

          {loading ? (
            <div className="bg-white border border-gray-100 rounded-[5px] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Curso</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Matrícula</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Confirmação</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Propina</th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <tr key={n}>
                        <td className="px-6 py-6">
                          <div className="flex items-center gap-4">
                            <Skeleton className="w-10 h-10 hidden sm:block" />
                            <Skeleton className="h-4 w-48" />
                          </div>
                        </td>
                        <td className="px-6 py-6"><Skeleton className="h-4 w-24" /></td>
                        <td className="px-6 py-6"><Skeleton className="h-4 w-24" /></td>
                        <td className="px-6 py-6"><Skeleton className="h-4 w-24" /></td>
                        <td className="px-6 py-6 text-right"><Skeleton className="h-9 w-24 ml-auto" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
            <div className="bg-white border border-gray-100 rounded-[5px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#2E7D32]">
                    <tr>
                      <th className="px-6 py-5 text-left text-xs font-black text-white uppercase tracking-widest">Curso</th>
                      <th className="px-6 py-5 text-left text-xs font-black text-white uppercase tracking-widest">Matrícula</th>
                      <th className="px-6 py-5 text-left text-xs font-black text-white uppercase tracking-widest">Confirmação</th>
                      <th className="px-6 py-5 text-left text-xs font-black text-white uppercase tracking-widest">Propina</th>
                      <th className="px-6 py-5 text-right text-xs font-black text-white uppercase tracking-widest">Informações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {courses.map((course, index) => (
                      <motion.tr
                        key={course.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-green-50/30 transition-colors group"
                      >
                        <td className="px-6 py-6">
                          <div className="flex items-center gap-4">
                            <div className="hidden sm:flex w-10 h-10 bg-green-50 rounded-[5px] items-center justify-center text-[#2E7D32]">
                              <GraduationCap size={20} />
                            </div>
                            <span className="font-black text-gray-900 group-hover:text-[#2E7D32] transition-colors uppercase">
                              {course.nome}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-6 font-bold text-gray-600">
                          {formatCurrency(course.preco_matricula)}
                        </td>
                        <td className="px-6 py-6 font-bold text-gray-600">
                          {formatCurrency(course.preco_confirmacao)}
                        </td>
                        <td className="px-6 py-6 font-bold text-gray-600">
                          {formatCurrency(course.propina)}
                        </td>
                        <td className="px-6 py-6 text-right">
                          <Link 
                            to="/sobre" 
                            className="inline-flex items-center gap-2 bg-[#2E7D32] text-white px-4 py-2 rounded-[5px] font-black text-xs uppercase tracking-wider hover:bg-[#1B5E20] transition-all shadow-sm active:scale-95 group"
                          >
                            <span>Saber Mais</span>
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
              to="/sobre"
              className="inline-flex items-center gap-3 bg-[#2E7D32] text-white px-10 py-5 rounded-[5px] font-black text-xl hover:bg-[#1B5E20] transition-all relative z-10 shadow-2xl active:scale-95 group uppercase"
            >
              SOBRE O INSTITUTO
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
