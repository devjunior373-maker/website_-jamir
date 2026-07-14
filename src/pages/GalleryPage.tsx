import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Maximize2, X } from 'lucide-react';
import { USE_MOCK_DATA, supabase } from '../lib/supabase';
import { Skeleton } from '../components/ui/Skeleton';

const MOCK_GALLERY = [
  { id: '1', titulo: 'Nossas Instalações', imagem: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&w=600&q=75' },
  { id: '2', titulo: 'Pátio Principal', imagem: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=75' },
  { id: '3', titulo: 'Biblioteca Escolar', imagem: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=75' },
  { id: '4', titulo: 'Sala de Conferências', imagem: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=600&q=75' },
  { id: '5', titulo: 'Área Desportiva', imagem: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=75' },
  { id: '6', titulo: 'Laboratório de Química', imagem: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=75' }
];

export default function GalleryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<any | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);

      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 4000));
        setImages(MOCK_GALLERY);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('gallery_images')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching gallery:', error);
        } else {
          setImages(data || []);
        }
      } catch (err: any) {
        console.error('Connection error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();

    let subscription: any;
    if (!USE_MOCK_DATA) {
      subscription = supabase
        .channel('public:gallery_images')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'gallery_images' }, fetchGallery)
        .subscribe();
    }

    return () => {
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    };
  }, []);


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

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[4/3] w-full" />
                <Skeleton className="h-6 w-3/4" />
              </div>
            ))
          ) : (
            <AnimatePresence mode="popLayout">
              {images.map((img) => (
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
                    {img.imagem ? (
                      <img 
                        src={img.imagem} 
                        alt={img.titulo} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
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
                    <h3 className="text-lg font-bold text-gray-900 mt-2 line-clamp-1">{img.titulo}</h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
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
              {selectedImage.imagem && (
                <img 
                  src={selectedImage.imagem} 
                  alt={selectedImage.titulo} 
                  className="w-full h-auto rounded-[5px] shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="mt-6 text-center">
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">{selectedImage.titulo}</h2>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
