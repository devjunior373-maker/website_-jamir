import React from 'react';
import { Image as ImageIcon, Trash2 } from 'lucide-react';
import { Skeleton } from '../ui/Skeleton';

interface GallerySectionProps {
  gallery: any[];
  setIsModalOpen: (open: boolean) => void;
  setDeleteConfirm: (id: string) => void;
  searchQuery: string;
  loading?: boolean;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ gallery, setIsModalOpen, setDeleteConfirm, searchQuery, loading }) => {
  const filtered = gallery.filter(img => 
    img.titulo?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
        {[1, 2, 3, 4].map(n => (
          <div key={n} className="space-y-4">
            <Skeleton className="w-full h-48 rounded-[5px]" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
      {filtered.map(img => (
        <div key={img.id} className="group relative bg-gray-50 rounded-[5px] overflow-hidden border border-gray-100">
          {img.imagem ? (
            <img src={img.imagem} alt="" className="w-full h-48 object-cover" />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
              <ImageIcon className="text-gray-400" size={32} />
            </div>
          )}
          <div className="p-4">
            <p className="font-bold text-sm truncate">{img.titulo}</p>
          </div>
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => setDeleteConfirm(img.id)} 
              className="p-2 bg-red-600 text-white rounded-[5px] shadow-lg"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
