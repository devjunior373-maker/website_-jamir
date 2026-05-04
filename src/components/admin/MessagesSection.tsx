import React from 'react';

interface MessagesSectionProps {
  messages: any[];
  setDeleteConfirm: (id: string) => void;
  searchQuery: string;
}

export const MessagesSection: React.FC<MessagesSectionProps> = ({ messages, setDeleteConfirm, searchQuery }) => {
  const filtered = messages.filter(msg => 
    msg.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.message?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="divide-y divide-gray-100">
      {filtered.map(msg => (
        <div key={msg.id} className="p-8 hover:bg-gray-50 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">{msg.subject}</h3>
              <p className="text-sm text-[#2E7D32] font-medium">{msg.name} ({msg.email})</p>
            </div>
            <span className="text-xs text-gray-400 font-bold uppercase">
              {msg.created_at ? new Date(msg.created_at).toLocaleString() : 'Recent'}
            </span>
          </div>
          <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-[5px] border border-gray-100">{msg.message}</p>
          <div className="mt-4 flex justify-end">
            <button 
              onClick={() => setDeleteConfirm(msg.id)} 
              className="text-red-600 text-xs font-black uppercase tracking-widest hover:underline"
            >
              Eliminar Mensagem
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
