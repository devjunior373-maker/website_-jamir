import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function LatestNews() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('date', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Error fetching news:', error);
      } else {
        setNews(data || []);
      }
      setLoading(false);
    };

    fetchNews();

    const subscription = supabase
      .channel('public:blog_posts_latest')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'blog_posts' }, fetchNews)
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight"
            >
              ÚLTIMAS <span className="text-[#2E7D32]">NOTÍCIAS</span>
            </motion.h2>
          </div>
          
          <Link 
            to="/blog"
            className="group flex items-center gap-2 text-gray-900 font-bold hover:text-[#2E7D32] transition-colors"
          >
            Ver todas as notícias
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[5px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <ImageIcon className="text-gray-300" size={48} />
                  </div>
                )}
              </div>
              
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                  <Calendar size={16} />
                  {item.date}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-[#2E7D32] transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {item.excerpt}
                </p>
                <div className="mt-auto">
                  <button className="text-[#2E7D32] font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                    Ler mais
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
