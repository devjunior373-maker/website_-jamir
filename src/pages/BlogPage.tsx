import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, FileText } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    };

    fetchPosts();

    // Subscribe to changes
    const subscription = supabase
      .channel('public:blog_posts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'blog_posts' }, fetchPosts)
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
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
            BLOG <span className="text-green-300">JAMIR</span>
          </motion.h1>
          <p className="text-green-50 text-xl max-w-2xl mx-auto leading-relaxed">
            Notícias, artigos educativos e as últimas novidades da nossa comunidade escolar.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {posts.map((post, index) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-[5px] overflow-hidden shadow-xl border border-gray-100 flex flex-col md:flex-row group"
              >
                <div className="md:w-2/5 relative overflow-hidden">
                  {post.image ? (
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <FileText className="text-gray-300" size={48} />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#2E7D32] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-[5px] shadow-lg">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="md:w-3/5 p-8 flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-bold uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} className="text-[#2E7D32]" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={14} className="text-[#2E7D32]" />
                      {post.author}
                    </div>
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 mb-4 leading-tight group-hover:text-[#2E7D32] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                    {post.excerpt}
                  </p>
                  <button className="inline-flex items-center text-[#2E7D32] font-black text-sm uppercase tracking-widest group/btn">
                    Ler Artigo Completo
                    <ArrowRight size={18} className="ml-2 group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Newsletter */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-gray-900 rounded-[5px] p-12 text-center text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-3xl font-black mb-4 tracking-tight">SUBSCREVA A NOSSA NEWSLETTER</h3>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">Receba mensalmente os melhores artigos e as novidades do JAMIR diretamente no seu e-mail.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Seu melhor e-mail"
                className="flex-grow bg-white/10 border border-white/20 rounded-[5px] px-6 py-4 text-white focus:outline-none focus:border-green-400 transition-colors"
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
