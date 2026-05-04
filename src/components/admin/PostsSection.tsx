import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

interface PostsSectionProps {
  posts: any[];
  setEditingItem: (item: any) => void;
  setIsModalOpen: (open: boolean) => void;
  setDeleteConfirm: (id: string) => void;
  searchQuery: string;
}

export const PostsSection: React.FC<PostsSectionProps> = ({
  posts,
  setEditingItem,
  setIsModalOpen,
  setDeleteConfirm,
  searchQuery
}) => {
  const filtered = posts.filter(p => 
    p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <table className="w-full text-left">
      <thead className="bg-gray-50 border-b border-gray-200">
        <tr>
          <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Título</th>
          <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Categoria</th>
          <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Data</th>
          <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Ações</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {filtered.map(post => (
          <tr key={post.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 font-bold text-gray-900">{post.title}</td>
            <td className="px-6 py-4"><span className="bg-green-50 text-[#2E7D32] text-[10px] font-black px-2 py-1 rounded-[5px] uppercase">{post.category}</span></td>
            <td className="px-6 py-4 text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</td>
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
  );
};
