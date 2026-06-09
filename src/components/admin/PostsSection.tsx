import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Skeleton } from '../ui/Skeleton';

interface PostsSectionProps {
  posts: any[];
  setEditingItem: (item: any) => void;
  setIsModalOpen: (open: boolean) => void;
  setDeleteConfirm: (id: string) => void;
  searchQuery: string;
  loading?: boolean;
}

export const PostsSection: React.FC<PostsSectionProps> = ({
  posts,
  setEditingItem,
  setIsModalOpen,
  setDeleteConfirm,
  searchQuery,
  loading
}) => {
  const filtered = posts.filter(p => 
    p.titulo?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Título</th>
              <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Data</th>
              <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[1, 2, 3, 4].map(n => (
              <tr key={n}>
                <td className="px-6 py-5"><Skeleton className="h-4 w-48" /></td>
                <td className="px-6 py-5"><Skeleton className="h-4 w-20" /></td>
                <td className="px-6 py-5"><Skeleton className="h-4 w-24" /></td>
                <td className="px-6 py-5 text-right"><Skeleton className="h-6 w-16 ml-auto" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left min-w-[600px]">
      <thead className="bg-gray-50 border-b border-gray-200">
        <tr>
          <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Título</th>
          <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
          <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Data</th>
          <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Ações</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {filtered.map(post => (
          <tr key={post.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 font-bold text-gray-900">{post.titulo}</td>
            <td className="px-6 py-4">
              <span className={`text-[10px] font-black px-2 py-1 rounded-[5px] uppercase ${post.publicado ? 'bg-green-50 text-[#2E7D32]' : 'bg-gray-100 text-gray-400'}`}>
                {post.publicado ? 'Publicado' : 'Rascunho'}
              </span>
            </td>
            <td className="px-6 py-4 text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString()}</td>
            <td className="px-6 py-4 text-right space-x-2">
              <button 
                onClick={() => { setEditingItem(post); setIsModalOpen(true); }} 
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-[5px]"
              >
                <Edit size={18} />
              </button>
              <button 
                onClick={() => setDeleteConfirm(post.id)} 
                className="p-2 text-red-600 hover:bg-red-50 rounded-[5px]"
              >
                <Trash2 size={18} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};
