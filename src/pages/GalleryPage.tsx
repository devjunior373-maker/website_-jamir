import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Maximize2, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function GalleryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [filter, setFilter] = useState('Todos');

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching gallery:', error);
      } else {
        setImages(data || []);
      }
      setLoading(false);
    };

    fetchGallery();

    const subscription = supabase
      .channel('public:gallery_images')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'gallery_images' }, fetchGallery)
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const categories = ['Todos', ...new Set(images.map(img => img.category))];
  const filteredImages = filter === 'Todos' ? images : images.filter(img => img.category === filter);

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Hero */}
      <section className="bg-gray-900 py-20 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black text-white mb-4 tracking-tight"
          >
            NOSSA <span className="text-[#2E7D32]">GALERIA</span>
          </motion.h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Explore os espaços e momentos que tornam o JAMIR um lugar único para aprender e crescer.</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-[5px] font-bold text-sm transition-all ${
                filter === cat 
                ? 'bg-[#2E7D32] text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img) => (
              <motion.div
                layout
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                className="group relative cursor-pointer"
                onClick={() => setSelectedImage(img)}
              >
                <div className="relative overflow-hidden rounded-[5px] aspect-[4/3] shadow-md border border-gray-100">
                  {img.src ? (
                    <img 
                      src={img.src} 
                      alt={img.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <ImageIcon className="text-gray-300" size={48} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="text-white" size={32} />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#2E7D32] bg-green-50 px-2 py-1 rounded-[5px]">
                    {img.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mt-2">{img.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 text-white hover:text-green-400 transition-colors">
              <X size={40} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl w-full"
              onClick={e => e.stopPropagation()}
            >
              {selectedImage.src && (
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.title} 
                  className="w-full h-auto rounded-[5px] shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="mt-6 text-center">
                <h2 className="text-2xl font-black text-white">{selectedImage.title}</h2>
                <p className="text-green-400 font-bold uppercase tracking-widest text-sm mt-2">{selectedImage.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
