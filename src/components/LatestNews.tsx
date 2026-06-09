import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { USE_MOCK_DATA, supabase } from '../lib/supabase';
import { Skeleton } from './ui/Skeleton';

const MOCK_NEWS = [
  {
    id: '1',
    categoria: 'Avisos',
    titulo: 'Início do Ano Letivo',
    conteudo: 'Estamos preparados para receber nossos alunos com novas instalações e um corpo docente renovado para impulsionar a inovação pedagógica.',
    imagem: 'https://images.unsplash.com/photo-1523050335391-4b7f32994c6d?q=80&w=1000',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    categoria: 'Tecnologia',
    titulo: 'Novo Laboratório de Informática',
    conteudo: 'Inauguração do novo laboratório equipado com tecnologia de ponta para preparar nossos alunos para os exigentes resultados académicos.',
    imagem: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000',
    created_at: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: '3',
    categoria: 'Cultura',
    titulo: 'Semana Cultural no JAMIR',
    conteudo: 'Participe da nossa tradicional semana cultural com diversas atividades, palestras, artes e talentos locais em destaque.',
    imagem: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString()
  }
];

export default function LatestNews() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth } = containerRef.current;
      // Scroll by approximately one card width plus gap (responsive step)
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      
      let scrollAmount = clientWidth;
      if (!isMobile) {
        scrollAmount = isTablet ? clientWidth / 2 : clientWidth / 3;
      }

      containerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);

      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 400));
        setNews(MOCK_NEWS);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(6); // Allowing up to 6 in carousel

        if (error) {
          console.error('Error fetching news:', error);
        } else {
          setNews(data || []);
        }
      } catch (err: any) {
        console.error('Connection error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();

    let subscription: any;
    if (!USE_MOCK_DATA) {
      subscription = supabase
        .channel('public:blog_posts_latest')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'blog_posts' }, fetchNews)
        .subscribe();
    }

    return () => {
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollButtons);
      // Run once
      updateScrollButtons();
      // Handle resize recalculation
      window.addEventListener('resize', updateScrollButtons);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', updateScrollButtons);
      }
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [news, loading]);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Heading & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight"
            >
              ÚLTIMAS <span className="text-[#2E7D32]">NOTÍCIAS</span>
            </motion.h2>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Carousel Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-[#2E7D32] hover:text-[#2E7D32] active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none"
                aria-label="Notícia anterior"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-[#2E7D32] hover:text-[#2E7D32] active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none"
                aria-label="Próxima notícia"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <Link 
              to="/blog"
              className="group flex items-center gap-2 text-gray-900 font-bold hover:text-[#2E7D32] transition-colors whitespace-nowrap text-sm"
            >
              Ver tudo
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={containerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {loading ? (
            [1, 2, 3].map((n) => (
              <div 
                key={n} 
                className="snap-start shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white rounded-[5px] overflow-hidden border border-gray-100 shadow-sm flex flex-col h-[420px]"
              >
                <Skeleton className="h-56 w-full rounded-none" />
                <div className="p-8 space-y-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-7 w-full" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-4/5" />
                </div>
              </div>
            ))
          ) : (
            news.map((item, index) => (
              <motion.article 
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.8, ease: [0.21, 1.02, 0.43, 1.01], delay: index * 0.15 }}
                className="snap-start shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] group bg-white rounded-[5px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
              >
                <div className="relative h-56 overflow-hidden bg-gray-100 shrink-0">
                  {/* Category Tag */}
                  {item.categoria && (
                    <span className="absolute top-4 left-4 z-10 bg-[#2E7D32]/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-[3px]">
                      {item.categoria}
                    </span>
                  )}
                  {item.imagem ? (
                    <img 
                      src={item.imagem} 
                      alt={item.titulo}
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
                  <h3 className="text-lg font-black text-gray-900 mb-3 line-clamp-2 group-hover:text-[#2E7D32] transition-colors duration-200 leading-snug">
                    <Link to="/blog" className="hover:underline">
                      {item.titulo}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-500 text-[13px] leading-relaxed mb-6 line-clamp-3 font-medium">
                    {item.conteudo}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-50">
                    <Link 
                      to="/blog" 
                      className="text-[#2E7D32] hover:text-[#1B5E20] font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all"
                    >
                      Ler mais
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
