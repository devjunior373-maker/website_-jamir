import React from 'react';
import { Edit, Trash2, X } from 'lucide-react';

interface UsersSectionProps {
  students: any[];
  teachers: any[];
  parents: any[];
  setEditingItem: (item: any) => void;
  setIsModalOpen: (open: boolean) => void;
  handleToggleStatus: (item: any, coll: string) => void;
  setDeleteConfirm: (confirm: { id: string, coll: string } | null) => void;
}

export const UsersSection: React.FC<UsersSectionProps> = ({
  students,
  teachers,
  parents,
  setEditingItem,
  setIsModalOpen,
  handleToggleStatus,
  setDeleteConfirm
}) => {
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-blue-50 p-6 rounded-[5px] border border-blue-100">
          <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2">Alunos</p>
          <p className="text-3xl font-black text-blue-900">{students.length}</p>
        </div>
        <div className="bg-green-50 p-6 rounded-[5px] border border-green-100">
          <p className="text-xs font-black text-green-600 uppercase tracking-widest mb-2">Professores</p>
          <p className="text-3xl font-black text-green-900">{teachers.length}</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-[5px] border border-purple-100">
          <p className="text-xs font-black text-purple-600 uppercase tracking-widest mb-2">Pais/Resp.</p>
          <p className="text-3xl font-black text-purple-900">{parents.length}</p>
        </div>
      </div>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-4">Alunos</h3>
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Nome</th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Contato</th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.map(s => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{s.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{s.contact}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black px-2 py-1 rounded-[5px] uppercase ${s.status === 'blocked' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                      {s.status || 'Ativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => { setEditingItem({...s, type: 'student'}); setIsModalOpen(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-[5px]"><Edit size={18} /></button>
                    <button onClick={() => handleToggleStatus(s, 'users')} className={`p-2 rounded-[5px] ${s.status === 'blocked' ? 'text-green-600 hover:bg-green-50' : 'text-orange-600 hover:bg-orange-50'}`}>
                      <X size={18} />
                    </button>
                    <button onClick={() => setDeleteConfirm({ id: s.id, coll: 'users' })} className="p-2 text-red-600 hover:bg-red-50 rounded-[5px]"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-4">Professores</h3>
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Nome</th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">E-mail</th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {teachers.map(t => (
                <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{t.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{t.email}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black px-2 py-1 rounded-[5px] uppercase ${t.status === 'blocked' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                      {t.status || 'Ativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => { setEditingItem({...t, type: 'teacher'}); setIsModalOpen(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-[5px]"><Edit size={18} /></button>
                    <button onClick={() => handleToggleStatus(t, 'teachers')} className={`p-2 rounded-[5px] ${t.status === 'blocked' ? 'text-green-600 hover:bg-green-50' : 'text-orange-600 hover:bg-orange-50'}`}>
                      <X size={18} />
                    </button>
                    <button onClick={() => setDeleteConfirm({ id: t.id, coll: 'teachers' })} className="p-2 text-red-600 hover:bg-red-50 rounded-[5px]"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
