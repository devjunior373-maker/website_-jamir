import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { 
  LayoutDashboard, 
  FileText, 
  Image as ImageIcon, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Edit, 
  LogOut,
  Save,
  X,
  Users,
  Search,
  Bell,
  Settings,
  User as UserIcon,
  ChevronDown,
  GraduationCap
} from 'lucide-react';

import { AdminTab } from '../components/admin/AdminTab';
import { PostsSection } from '../components/admin/PostsSection';
import { GallerySection } from '../components/admin/GallerySection';
import { MessagesSection } from '../components/admin/MessagesSection';
import { ProfileModal } from '../components/admin/ProfileModal';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, isAdmin, isEditor } = useAuth();
  const [activeTab, setActiveTab] = useState<'posts' | 'gallery' | 'messages' | 'courses'>('posts');
  const [posts, setPosts] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string, table: string } | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Real-time listeners
  useEffect(() => {
    if (!user) return;

    // Initial Fetch
    const fetchData = async () => {
      const { data: postsData } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
      if (postsData) setPosts(postsData);

      const { data: galleryData } = await supabase.from('gallery_images').select('*').order('created_at', { ascending: false });
      if (galleryData) setGallery(galleryData);

      const { data: coursesData } = await supabase.from('courses').select('*').order('nome');
      if (coursesData) setCourses(coursesData);

      if (isEditor) {
        const { data: messagesData } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
        if (messagesData) setMessages(messagesData);
      }
    };

    fetchData();

    // Subscriptions
    const postsSub = supabase.channel('blog_posts_changes').on('postgres_changes', { event: '*', schema: 'public', table: 'blog_posts' }, () => fetchData()).subscribe();
    const gallerySub = supabase.channel('gallery_images_changes').on('postgres_changes', { event: '*', schema: 'public', table: 'gallery_images' }, () => fetchData()).subscribe();
    const coursesSub = supabase.channel('courses_changes').on('postgres_changes', { event: '*', schema: 'public', table: 'courses' }, () => fetchData()).subscribe();
    const messagesSub = supabase.channel('contact_messages_changes').on('postgres_changes', { event: '*', schema: 'public', table: 'contact_messages' }, () => fetchData()).subscribe();

    return () => {
      supabase.removeChannel(postsSub);
      supabase.removeChannel(gallerySub);
      supabase.removeChannel(coursesSub);
      supabase.removeChannel(messagesSub);
    };
  }, [user, isEditor]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    try {
      const { error } = await supabase.from(deleteConfirm.table).delete().eq('id', deleteConfirm.id);
      if (error) throw error;
      setDeleteConfirm(null);
    } catch (err: any) {
      setErrorMessage('Erro ao excluir: ' + err.message);
    }
  };

  const menuGroups = [
    {
      title: 'Conteúdo do Site',
      items: [
        { id: 'posts', label: 'Notícias', icon: <FileText size={20} /> },
        { id: 'gallery', label: 'Galeria', icon: <ImageIcon size={20} /> },
        { id: 'courses', label: 'Cursos', icon: <GraduationCap size={20} /> },
      ]
    },
    {
      title: 'Comunicação',
      items: [
        { id: 'messages', label: 'Mensagens', icon: <MessageSquare size={20} /> },
      ]
    }
  ];

  const allMenuItems = menuGroups.flatMap(g => g.items);
  const currentTabLabel = allMenuItems.find(item => item.id === activeTab)?.label || 'Dashboard';

  const handleTabChange = (tab: 'posts' | 'gallery' | 'messages') => {
    setActiveTab(tab);
    setSearchQuery('');
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Header */}
      <header className="flex justify-between items-center bg-white p-6 shadow-sm border-b border-gray-200 sticky top-0 z-[60]">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Painel Admin</h1>
          
          <div className="w-96">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Busca global..." 
                className="w-full bg-gray-50 border border-gray-200 rounded-[5px] pl-10 pr-4 py-2 focus:outline-none focus:border-[#2E7D32] transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="relative p-2 text-gray-400 hover:text-[#2E7D32] transition-colors">
            <Bell size={22} />
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">3</span>
          </button>

          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 p-1 pr-3 hover:bg-gray-50 rounded-full transition-all"
            >
              {user?.photoURL ? (
                <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full border-2 border-[#2E7D32]" />
              ) : (
                <div className="w-10 h-10 rounded-full border-2 border-[#2E7D32] bg-gray-800 flex items-center justify-center text-xs font-bold text-white">
                  {user?.displayName?.charAt(0) || 'U'}
                </div>
              )}
              <ChevronDown size={16} className={`text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-[5px] shadow-2xl border border-gray-100 z-20 overflow-hidden"
                  >
                    <button 
                      onClick={() => {
                        setIsProfileModalOpen(true);
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      <UserIcon size={16} /> Perfil
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                      <Settings size={16} /> Configurações
                    </button>
                    <div className="border-t border-gray-100" />
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} /> Sair
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <div className="flex flex-grow h-[calc(100vh-88px)]">
        {/* Sidebar */}
        <aside className="w-72 bg-gray-900 text-white flex flex-col sticky top-0 h-full">
          <nav className="flex-grow p-4 space-y-8 overflow-y-auto mt-8">
            {menuGroups.map(group => (
              <div key={group.title}>
                <p className="px-4 mb-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">{group.title}</p>
                <div className="space-y-1">
                  {group.items.map(item => (
                    <button 
                      key={item.id}
                      onClick={() => handleTabChange(item.id as any)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-[5px] font-bold transition-all ${activeTab === item.id ? 'bg-[#2E7D32] text-white' : 'text-gray-400 hover:bg-gray-800'}`}
                    >
                      {item.icon} {item.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-800">
            <p className="text-[10px] text-gray-500 uppercase text-center font-bold tracking-widest">JAMIR Escola © 2026</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-12 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
              {currentTabLabel}
            </h2>
            {['posts', 'gallery', 'courses'].includes(activeTab) && (
              <button 
                onClick={() => { 
                  setEditingItem({ type: activeTab }); 
                  setIsModalOpen(true); 
                  setSuccessMessage(null); 
                  setErrorMessage(null); 
                }}
                className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-6 py-3 rounded-[5px] font-bold flex items-center gap-2 shadow-lg transition-all active:scale-95"
              >
                <Plus size={20} /> Adicionar Novo
              </button>
            )}
          </div>

          {successMessage && (
            <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-700 rounded-[5px] font-bold flex justify-between items-center">
              <span>{successMessage}</span>
              <button onClick={() => setSuccessMessage(null)}><X size={18} /></button>
            </div>
          )}

          {errorMessage && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-[5px] font-bold flex justify-between items-center">
              <span>{errorMessage}</span>
              <button onClick={() => setErrorMessage(null)}><X size={18} /></button>
            </div>
          )}

          {/* Content Lists */}
          <div className="bg-white rounded-[5px] shadow-xl border border-gray-200 overflow-hidden">
            <AnimatePresence mode="wait">
              <AdminTab id={activeTab}>
                {activeTab === 'posts' && (
                  <PostsSection 
                    posts={posts}
                    setEditingItem={setEditingItem}
                    setIsModalOpen={setIsModalOpen}
                    setDeleteConfirm={(id) => setDeleteConfirm({ id, table: 'blog_posts' })}
                    searchQuery={searchQuery}
                  />
                )}

                {activeTab === 'gallery' && (
                  <GallerySection 
                    gallery={gallery}
                    setIsModalOpen={setIsModalOpen}
                    setDeleteConfirm={(id) => setDeleteConfirm({ id, table: 'gallery_images' })}
                    searchQuery={searchQuery}
                  />
                )}

                {activeTab === 'courses' && (
                  <div className="p-8">
                    <div className="grid grid-cols-1 gap-4">
                      {courses.filter(c => c.nome.toLowerCase().includes(searchQuery.toLowerCase())).map((course) => (
                        <div key={course.id} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-[5px] hover:bg-white hover:shadow-md transition-all">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-green-100 text-[#2E7D32] rounded-[5px] flex items-center justify-center">
                              <GraduationCap size={20} />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 uppercase">{course.nome}</p>
                              <p className="text-xs text-gray-500">Propina: {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(course.propina)}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => { setEditingItem(course); setIsModalOpen(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-[5px]"><Edit size={18} /></button>
                            <button onClick={() => setDeleteConfirm({ id: course.id, table: 'courses' })} className="p-2 text-red-600 hover:bg-red-50 rounded-[5px]"><Trash2 size={18} /></button>
                          </div>
                        </div>
                      ))}
                      {courses.length === 0 && <p className="text-center py-10 text-gray-400">Nenhum curso cadastrado.</p>}
                    </div>
                  </div>
                )}

                {activeTab === 'messages' && (
                  <MessagesSection 
                    messages={messages}
                    setDeleteConfirm={(id) => setDeleteConfirm({ id, table: 'contact_messages' })}
                    searchQuery={searchQuery}
                  />
                )}
              </AdminTab>
            </AnimatePresence>
          </div>
        </main>
      </div>

      <ProfileModal 
        user={user}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onSuccess={(msg) => setSuccessMessage(msg)}
        onError={(msg) => setErrorMessage(msg)}
      />

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white w-full max-w-2xl rounded-[5px] shadow-2xl p-10 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black uppercase tracking-tight">
                {editingItem?.id ? 'Editar' : 'Novo'} {
                  activeTab === 'posts' ? 'Post' : 
                  activeTab === 'gallery' ? 'Item da Galeria' : 
                  'Curso'
                }
              </h2>
              <button onClick={() => setIsModalOpen(false)}><X size={24} /></button>
            </div>
            
            <form className="space-y-6" onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const rawData: any = Object.fromEntries(formData.entries());
              
              try {
                const table = activeTab === 'posts' ? 'blog_posts' : 
                             activeTab === 'gallery' ? 'gallery_images' : 
                             'courses';
                
                // Tratar conversão de números para a tabela de cursos
                if (activeTab === 'courses') {
                  rawData.preco_matricula = parseFloat(rawData.preco_matricula);
                  rawData.preco_confirmacao = parseFloat(rawData.preco_confirmacao);
                  rawData.propina = parseFloat(rawData.propina);
                  rawData.multa = parseFloat(rawData.multa) || 0;
                }

                if (editingItem?.id) {
                  const { error } = await supabase.from(table).update(rawData).eq('id', editingItem.id);
                  if (error) throw error;
                } else {
                  const { error } = await supabase.from(table).insert([rawData]);
                  if (error) throw error;
                }
                setIsModalOpen(false);
                setEditingItem(null);
                setSuccessMessage('Salvo com sucesso!');
                setTimeout(() => setSuccessMessage(null), 3000);
              } catch (err: any) {
                setErrorMessage('Erro ao salvar: ' + err.message);
              }
            }}>
              {activeTab === 'posts' && (
                <>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">Título</label>
                    <input name="titulo" type="text" defaultValue={editingItem?.titulo} className="w-full bg-gray-50 border border-gray-200 rounded-[5px] px-4 py-3 focus:outline-none focus:border-[#2E7D32]" required />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">Conteúdo</label>
                    <textarea name="conteudo" defaultValue={editingItem?.conteudo} className="w-full bg-gray-50 border border-gray-200 rounded-[5px] px-4 py-3 focus:outline-none focus:border-[#2E7D32]" rows={6} required />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">URL da Imagem</label>
                    <input name="imagem" type="text" defaultValue={editingItem?.imagem} className="w-full bg-gray-50 border border-gray-200 rounded-[5px] px-4 py-3 focus:outline-none focus:border-[#2E7D32]" />
                  </div>
                </>
              )}

              {activeTab === 'gallery' && (
                <>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">Título da Imagem</label>
                    <input name="titulo" type="text" defaultValue={editingItem?.titulo} className="w-full bg-gray-50 border border-gray-200 rounded-[5px] px-4 py-3 focus:outline-none focus:border-[#2E7D32]" required />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">URL da Imagem</label>
                    <input name="imagem" type="text" defaultValue={editingItem?.imagem} className="w-full bg-gray-50 border border-gray-200 rounded-[5px] px-4 py-3 focus:outline-none focus:border-[#2E7D32]" required />
                  </div>
                </>
              )}

              {activeTab === 'courses' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">Nome do Curso</label>
                    <input name="nome" type="text" defaultValue={editingItem?.nome} className="w-full bg-gray-50 border border-gray-200 rounded-[5px] px-4 py-3 focus:outline-none focus:border-[#2E7D32]" required />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">Preço Matrícula</label>
                    <input name="preco_matricula" type="number" step="0.01" defaultValue={editingItem?.preco_matricula} className="w-full bg-gray-50 border border-gray-200 rounded-[5px] px-4 py-3 focus:outline-none focus:border-[#2E7D32]" required />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">Preço Confirmação</label>
                    <input name="preco_confirmacao" type="number" step="0.01" defaultValue={editingItem?.preco_confirmacao} className="w-full bg-gray-50 border border-gray-200 rounded-[5px] px-4 py-3 focus:outline-none focus:border-[#2E7D32]" required />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">Propina Mensal</label>
                    <input name="propina" type="number" step="0.01" defaultValue={editingItem?.propina} className="w-full bg-gray-50 border border-gray-200 rounded-[5px] px-4 py-3 focus:outline-none focus:border-[#2E7D32]" required />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">Multa Estimada</label>
                    <input name="multa" type="number" step="0.01" defaultValue={editingItem?.multa || 0} className="w-full bg-gray-50 border border-gray-200 rounded-[5px] px-4 py-3 focus:outline-none focus:border-[#2E7D32]" />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-4 pt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-bold text-gray-500 hover:bg-gray-100 rounded-[5px]">Cancelar</button>
                <button type="submit" className="bg-[#2E7D32] text-white px-8 py-3 rounded-[5px] font-bold shadow-lg hover:bg-[#1B5E20] transition-all">Guardar</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[110] bg-black/60 flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white w-full max-w-md rounded-[5px] shadow-2xl p-8 text-center"
          >
            <Trash2 size={48} className="mx-auto text-red-600 mb-4" />
            <h2 className="text-xl font-black uppercase mb-2">Confirmar Exclusão</h2>
            <p className="text-gray-500 mb-8">Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.</p>
            <div className="flex gap-4">
              <button 
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-6 py-3 font-bold text-gray-500 hover:bg-gray-100 rounded-[5px]"
              >
                Cancelar
              </button>
              <button 
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white px-6 py-3 rounded-[5px] font-bold shadow-lg hover:bg-red-700 transition-all"
              >
                Excluir
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
