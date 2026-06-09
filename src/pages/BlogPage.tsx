import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, ArrowRight, FileText, X, Image as ImageIcon } from 'lucide-react';
import { USE_MOCK_DATA, supabase } from '../lib/supabase';
import { Skeleton } from '../components/ui/Skeleton';

const MOCK_POSTS = [
  {
    id: '1',
    categoria: 'Avisos',
    titulo: 'Início do Ano Letivo',
    conteudo: 'Estamos preparados para receber nossos alunos com novas instalações e um corpo docente renovado para impulsionar a inovação pedagógica. Todo o pessoal docente e administrativo já participou das jornadas pedagógicas de preparação.',
    imagem: 'https://images.unsplash.com/photo-1523050335391-4b7f32994c6d?q=80&w=1000',
    created_at: new Date().toISOString(),
    publicado: true
  },
  {
    id: '2',
    categoria: 'Tecnologia',
    titulo: 'Novo Laboratório de Informática',
    conteudo: 'Inauguração do novo laboratório equipado com tecnologia de ponta para preparar nossos alunos para os exigentes resultados académicos e competências essenciais no sec. XXI.',
    imagem: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    publicado: true
  },
  {
    id: '3',
    categoria: 'Cultura',
    titulo: 'Semana Cultural no JAMIR',
    conteudo: 'Participe da nossa tradicional semana cultural com diversas atividades, palestras, artes e talentos locais em destaque. Venha apoiar as criações dinâmicas dos nossos estudantes.',
    imagem: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    publicado: true
  }
];

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 400));
        setPosts(MOCK_POSTS);
        setLoading(false);
        return;
      }

      try {
        const { data, error: supabaseError } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (supabaseError) {
          console.error('Supabase error:', supabaseError);
          throw supabaseError;
        } 
        setPosts(data || []);
      } catch (err: any) {
        console.error('Connection error fetching posts:', err);
        setError(err.message === 'Failed to fetch' 
          ? 'Erro de conexão: Não foi possível alcançar o servidor do Supabase. Verifique a URL do projeto nas configurações.' 
          : 'Houve um problema ao carregar as notícias.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    // Subscribe to changes IF not using mock data
    let subscription: any;
    if (!USE_MOCK_DATA) {
      subscription = supabase
        .channel('public:blog_posts')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'blog_posts' }, fetchPosts)
        .subscribe();
    }

    return () => {
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    };
  }, []);


  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Hero */}
      <section className="bg-[#2E7D32] py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight uppercase"
          >
            PORTAL DE <span className="text-green-300">NOTÍCIAS</span>
          </motion.h1>
          <p className="text-green-50 text-xl max-w-2xl mx-auto leading-relaxed font-semibold">
            Confira avisos, artigos educativos e as últimas novidades da nossa comunidade escolar.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div 
                key={n} 
                className="bg-white rounded-[5px] overflow-hidden border border-gray-100 shadow-sm flex flex-col h-[420px]"
              >
                <Skeleton className="h-56 w-full rounded-none" />
                <div className="p-8 space-y-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-7 w-full" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-4/5" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-100 p-8 rounded-[5px] text-center">
            <p className="text-red-600 font-bold mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-[#2E7D32] text-white px-6 py-2 rounded-[5px] font-bold"
            >
              Tentar Novamente
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.8, ease: [0.21, 1.02, 0.43, 1.01], delay: index * 0.1 }}
                className="group bg-white rounded-[5px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
              >
                <div className="relative h-56 overflow-hidden bg-gray-100 shrink-0">
                  {/* Category Tag */}
                  <span className="absolute top-4 left-4 z-10 bg-[#2E7D32]/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-[3px]">
                    {post.categoria || 'Geral'}
                  </span>
                  
                  {post.imagem ? (
                    <img 
                      src={post.imagem} 
                      alt={post.titulo}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                      <ImageIcon className="text-gray-300 animate-pulse" size={40} />
                    </div>
                  )}
                </div>
                
                <div className="p-7 flex-grow flex flex-col">
                  {/* Calendar details */}
                  <div className="flex items-center gap-1.5 text-gray-400 text-[11px] font-black uppercase tracking-wider mb-2">
                    <Calendar size={12} className="text-[#2E7D32]" />
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>

                  <h3 className="text-lg font-black text-gray-900 mb-3 line-clamp-2 group-hover:text-[#2E7D32] transition-colors duration-200 leading-snug">
                    <button 
                      onClick={() => setSelectedPost(post)}
                      className="hover:underline text-left"
                    >
                      {post.titulo}
                    </button>
                  </h3>
                  
                  <p className="text-gray-500 text-[13px] leading-relaxed mb-6 line-clamp-3 font-medium">
                    {post.conteudo}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-50">
                    <button 
                      onClick={() => setSelectedPost(post)} 
                      className="text-[#2E7D32] hover:text-[#1B5E20] font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all group/btn"
                    >
                      Ler mais
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Article Reader Modal */}
        <AnimatePresence>
          {selectedPost && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backing Overlay */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPost(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />

              {/* Modal Container */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="relative bg-white rounded-[5px] overflow-hidden max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl z-10 border-t-8 border-[#2E7D32]"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
                  aria-label="Fechar"
                >
                  <X size={16} />
                </button>

                {/* Cover Image Area */}
                <div className="relative h-64 bg-gray-150 shrink-0">
                  {selectedPost.categoria && (
                    <span className="absolute top-4 left-4 z-10 bg-[#2E7D32]/95 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-[3px]">
                      {selectedPost.categoria}
                    </span>
                  )}
                  {selectedPost.imagem ? (
                    <img 
                      src={selectedPost.imagem} 
                      alt={selectedPost.titulo} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                      <ImageIcon className="text-gray-300" size={48} />
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-8 overflow-y-auto space-y-4">
                  <div className="flex items-center gap-1.5 text-gray-400 text-[11px] font-black uppercase tracking-wider">
                    <Calendar size={12} className="text-[#2E7D32]" />
                    <span>{new Date(selectedPost.created_at).toLocaleDateString()}</span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight leading-tight uppercase">
                    {selectedPost.titulo}
                  </h2>

                  <div className="w-12 h-1 bg-[#2E7D32] rounded-full my-1" />

                  <p className="text-gray-600 text-[14px] leading-relaxed font-semibold whitespace-pre-line pt-2">
                    {selectedPost.conteudo}
                  </p>
                </div>

                {/* Footer Area */}
                <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end shrink-0">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-6 py-2.5 rounded-[3px] text-xs font-black uppercase tracking-widest transition-colors"
                  >
                    Fechar Leitura
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Newsletter */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-gray-900 rounded-[5px] p-12 text-center text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-black mb-4 tracking-tight uppercase">SUBSCREVA A NOSSA NEWSLETTER</h3>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto font-semibold text-sm">Receba mensalmente os melhores artigos e as novidades do JAMIR diretamente no seu e-mail.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Seu melhor e-mail"
                className="flex-grow bg-white/10 border border-white/20 rounded-[5px] px-6 py-4 text-white focus:outline-none focus:border-green-400 transition-colors placeholder:text-gray-500 font-bold"
              />
              <button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-8 py-4 rounded-[5px] font-black uppercase tracking-widest transition-all">
                Subscrever
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

