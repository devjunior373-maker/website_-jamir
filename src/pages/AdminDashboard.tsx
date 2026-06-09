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
  Settings,
  User as UserIcon,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  Layers,
  ClipboardList,
  Megaphone,
  Briefcase,
  AlertTriangle,
  TrendingUp,
  CreditCard,
  CheckCircle,
  Clock,
  BookOpen,
  Calendar,
  Bell,
  UploadCloud,
  Check,
  AlertCircle,
  XCircle,
  Book,
  Loader2
} from 'lucide-react';

import { Skeleton } from '../components/ui/Skeleton';

import { AdminTab } from '../components/admin/AdminTab';
import { PostsSection } from '../components/admin/PostsSection';
import { GallerySection } from '../components/admin/GallerySection';
import { MessagesSection } from '../components/admin/MessagesSection';
import { ProfileModal } from '../components/admin/ProfileModal';

// Static simulation data for Admin UI interactivity according to the image description
const initialStudents = [
  { id: '1', nome: 'Carlos Silva', data: '25/10/2023', curso: 'Curso Técnico de Informática', status: 'Pendente', turma: 'Turma A', email: 'carlos.silva@jamir.ao' },
  { id: '2', nome: 'Alnanta Montosa', data: '25/10/2023', curso: 'Curso Geral', status: 'Aprovado', turma: 'Turma B', email: 'alnanta.m@jamir.ao' },
  { id: '3', nome: 'Altamir Beina', data: '07/11/2023', curso: 'Curso de Informática 1', status: 'Aprovado', turma: 'Turma A', email: 'altamir.b@jamir.ao' },
  { id: '4', nome: 'Carlos Herrsina', data: '07/11/2023', curso: 'Curso Técnico de Informática', status: 'Rejeitado', turma: 'Turma C', email: 'carlos.h@jamir.ao' },
  { id: '5', nome: 'Navren Diança', data: '05/11/2023', curso: 'Curso Geral 2', status: 'Pendente', turma: 'Turma B', email: 'navren.d@jamir.ao' },
  { id: '6', nome: 'Mariana Guedes', data: '08/11/2023', curso: 'Ensino Primário', status: 'Aprovado', turma: 'Turma A', email: 'mariana.g@jamir.ao' },
  { id: '7', nome: 'Filipe Lemos', data: '12/11/2023', curso: 'Fª de Informática 2', status: 'Pendente', turma: 'Turma C', email: 'filipe.l@jamir.ao' }
];

const initialTeachers = [
  { id: '1', nome: 'Prof. Jamir de Almeida', materia: 'Matemática & Física', formacao: 'Mestre em Educação (UAN)', status: 'Ativo', cargaHoraria: '16h / semana' },
  { id: '2', nome: 'Prof. Sofia Francisco', materia: 'Língua Portuguesa', formacao: 'Licenciada em Letras', status: 'Ativo', cargaHoraria: '12h / semana' },
  { id: '3', nome: 'Prof. António Neto', materia: 'Técnico de Informática', formacao: 'Licenciado em Redes & TI', status: 'Ativo', cargaHoraria: '20h / semana' },
  { id: '4', nome: 'Prof. Maria Cabral', materia: 'História & Geografia', formacao: 'Doutorada em História', status: 'Ausente', cargaHoraria: '8h / semana' },
];

const initialClasses = [
  { id: '1', nome: 'Turma A - 10º Ano', curso: 'Técnico de Informática', sala: 'Sala 04 (Bloco Central)', alunosCount: 28, professorResponsavel: 'Prof. António Neto' },
  { id: '2', nome: 'Turma B - Ensino Primário', curso: 'Geral', sala: 'Sala 01 (Bloco Primário)', alunosCount: 22, professorResponsavel: 'Prof. Sofia Francisco' },
  { id: '3', nome: 'Turma C - 11º Ano', curso: 'II Ciclo Geral', sala: 'Sala 09 (Bloco Central)', alunosCount: 30, professorResponsavel: 'Prof. Jamir de Almeida' },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, isAdmin, isEditor } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [posts, setPosts] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string, table: string } | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // State for school logo error handling
  const [logoFailed, setLogoFailed] = useState(false);

  // Database fetching and modification state loaders
  const [isDbLoading, setIsDbLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Interactive UI Simulation States
  const [studentsList, setStudentsList] = useState<any[]>(initialStudents);
  const [teachersList, setTeachersList] = useState<any[]>(initialTeachers);
  const [classesList, setClassesList] = useState<any[]>(initialClasses);

  // Biblioteca digital static and uploading books state
  const [digitalBooks, setDigitalBooks] = useState<any[]>([
    { id: '1', titulo: 'Matemática Prática 10º Ano', disciplina: 'Matemática', classe: '10ª Classe', tamanho: '5.2 MB', dataUpload: '12/05/2026', url: '#' },
    { id: '2', titulo: 'Física Geral II - Termodinâmica', disciplina: 'Física', classe: '11ª Classe', tamanho: '8.1 MB', dataUpload: '18/05/2026', url: '#' },
    { id: '3', titulo: 'Introdução às Redes de Computadores', disciplina: 'Técnico de Informática', classe: '10ª Classe', tamanho: '12.4 MB', dataUpload: '20/05/2026', url: '#' },
    { id: '4', titulo: 'Caderno de Leituras de Angola', disciplina: 'Língua Portuguesa', classe: 'Ensino Primário', tamanho: '3.8 MB', dataUpload: '01/06/2026', url: '#' },
  ]);

  // Attendance states
  const [selectedClassForAttendance, setSelectedClassForAttendance] = useState<string>('1');
  const [attendanceDate, setAttendanceDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, Record<string, string>>>({
    '1': { [new Date().toISOString().split('T')[0]]: 'P' },
    '3': { [new Date().toISOString().split('T')[0]]: 'FJ' },
    '5': { [new Date().toISOString().split('T')[0]]: 'FI' },
  });
  
  // Modals for simulation data creation & details
  const [selectedEnrollmentDetail, setSelectedEnrollmentDetail] = useState<any>(null);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false);
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);

  // Sub-tabs for academic section
  const [subAcademicTab, setSubAcademicTab] = useState<'courses' | 'gallery'>('courses');

  // Load real-time Supabase listeners
  useEffect(() => {
    if (!user) return;

    const fetchData = async (isInitial = false) => {
      if (isInitial) setIsDbLoading(true);
      try {
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
      } catch (err) {
        console.error("Error fetching db data:", err);
      } finally {
        if (isInitial) setIsDbLoading(false);
      }
    };

    fetchData(true);

    const postsSub = supabase.channel('blog_posts_changes').on('postgres_changes', { event: '*', schema: 'public', table: 'blog_posts' }, () => fetchData(false)).subscribe();
    const gallerySub = supabase.channel('gallery_images_changes').on('postgres_changes', { event: '*', schema: 'public', table: 'gallery_images' }, () => fetchData(false)).subscribe();
    const coursesSub = supabase.channel('courses_changes').on('postgres_changes', { event: '*', schema: 'public', table: 'courses' }, () => fetchData(false)).subscribe();
    const messagesSub = supabase.channel('contact_messages_changes').on('postgres_changes', { event: '*', schema: 'public', table: 'contact_messages' }, () => fetchData(false)).subscribe();

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
      setIsDeleting(true);
      const { error } = await supabase.from(deleteConfirm.table).delete().eq('id', deleteConfirm.id);
      if (error) throw error;
      setDeleteConfirm(null);
      setSuccessMessage('Excluído do banco de dados com sucesso!');
      setTimeout(() => setSuccessMessage(null), 3500);
    } catch (err: any) {
      setErrorMessage('Erro ao excluir: ' + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  // Re-map labels precisely matching the school administration specification with professional Lucide icons
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, desc: 'Visão Geral' },
    { id: 'aprovacao_contas', label: 'Aprovação de Contas', icon: Clock, desc: 'Validação de Cadastros' },
    { id: 'controle_faltas', label: 'Controle de Faltas', icon: ClipboardList, desc: 'Lançamento de Faltas' },
    { id: 'posts', label: 'Comunicados', icon: Megaphone, desc: 'Avisos em Tempo Real' },
    { id: 'biblioteca_digital', label: 'Biblioteca Digital', icon: BookOpen, desc: 'Upload de PDFs e Livros' },
    { id: 'configuracoes', label: 'Configurações', icon: Settings, desc: 'Sistema' },
  ];

  const currentTabLabel = navigationItems.find(item => item.id === activeTab)?.label || 'Dashboard';

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSearchQuery('');
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  // Action helper to update student enrollment status
  const handleUpdateStudentStatus = (id: string, newStatus: string) => {
    setStudentsList(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
    if (selectedEnrollmentDetail?.id === id) {
      setSelectedEnrollmentDetail((prev: any) => ({ ...prev, status: newStatus }));
    }
    setSuccessMessage(`Inscrição do aluno atualizada para "${newStatus}" com sucesso!`);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <div className="h-screen w-screen bg-[#F4F6F9] flex flex-col font-sans selection:bg-[#2E7D32] selection:text-white overflow-hidden">
      {/* Top Header Section with Professional school branding */}
      <header className="bg-gradient-to-r from-[#1b5122] to-[#0d2a12] text-white shrink-0 z-20 shadow-lg">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center p-1 border border-yellow-400 shadow shadow-black/30 shrink-0 overflow-hidden">
              {!logoFailed ? (
                <img 
                  src="/logo.png" 
                  alt="Complexo Jamir Logo" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                  onError={() => setLogoFailed(true)}
                />
              ) : (
                <svg className="w-8 h-8 text-[#2E7D32]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L4 5v6c0 5.25 3.42 10.16 8 11.5 4.58-1.34 8-6.25 8-11.5V5l-8-3zM12 6.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm2.5 10H9.5v-1c0-.83.67-1.5 1.5-1.5h2c.83 0 1.5.67 1.5 1.5v1z" />
                </svg>
              )}
            </div>
            <div>
              <span className="text-sm uppercase font-black tracking-widest text-[#a3e635] block leading-none">
                Complexo Jamir
              </span>
              <span className="text-[10px] uppercase font-bold text-white/70 tracking-wide block mt-1.5 leading-none">
                Administração Escolar
              </span>
            </div>
          </div>

          {/* Quick Search */}
          <div className="relative w-full max-w-sm">
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="w-full bg-white/10 hover:bg-white/15 focus:bg-white border border-white/15 text-white focus:text-gray-900 rounded-xl pl-4 pr-10 py-1.5 text-xs font-bold uppercase tracking-wider placeholder:text-white/50 focus:outline-none focus:ring-4 focus:ring-[#a1e734]/20 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-opacity">
              <Search size={14} />
            </button>
          </div>

          {/* User Section & Utilities */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <button className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all relative">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-yellow-400 rounded-full" />
              </button>
              <button className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all">
                <MessageSquare size={18} />
              </button>
              <button className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all">
                <Calendar size={18} />
              </button>
            </div>
            <div className="h-6 w-[1px] bg-white/20" />
            <button 
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded-lg transition-all text-xs font-black text-white uppercase tracking-wider"
            >
              <span>{user?.displayName || 'Diretor'}</span>
            </button>
            <button 
              onClick={handleLogout}
              className="px-3.5 py-1.5 bg-[#a3e635] hover:bg-[#8ecb2f] text-[#0d2a12] font-black text-xs uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 shadow"
            >
              <LogOut size={14} />
              <span>Sair</span>
            </button>
          </div>
        </div>

        {/* Tab-like horizontal navbar */}
        <div className="border-t border-white/10 bg-black/15">
          <div className="max-w-[1600px] mx-auto px-6 overflow-x-auto flex">
            {navigationItems.map(item => {
              const isActive = activeTab === item.id;
              const IconComponent = item.icon;
              return (
                <button 
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`flex items-center gap-2.5 px-6 py-4.5 border-b-2 font-extrabold text-[11px] uppercase tracking-wider transition-all relative group shrink-0 whitespace-nowrap ${
                    isActive 
                      ? 'border-[#a3e635] text-[#a3e635] font-black bg-white/5' 
                      : 'border-transparent text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <IconComponent size={16} className={`${isActive ? 'text-[#a3e635]' : 'text-white/60 group-hover:text-white'}`} />
                  <span>{item.label}</span>
                  {item.desc && (
                    <span className="text-[9px] font-medium lowercase tracking-normal pl-0.5 opacity-50 block md:inline hidden">
                      ({item.desc})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-grow overflow-hidden flex flex-col">
        <main className="flex-grow p-10 overflow-y-auto">
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg font-bold flex justify-between items-center text-xs uppercase tracking-wider">
              <span>{successMessage}</span>
              <button onClick={() => setSuccessMessage(null)}><X size={16} /></button>
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg font-bold flex justify-between items-center text-xs uppercase tracking-wider">
              <span>{errorMessage}</span>
              <button onClick={() => setErrorMessage(null)}><X size={16} /></button>
            </div>
          )}

          <AnimatePresence mode="wait">
            <AdminTab id={activeTab}>
              {activeTab === 'dashboard' && (
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
                        Dashboard Administrativo
                      </h2>
                      <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-bold">
                        Visão geral em tempo real do Complexo Escolar Jamir
                      </p>
                    </div>
                  </div>

                  {/* Dashboard Content Grid with Requested Professional Metric Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1: Total de Alunos Ativos */}
                    <button 
                      onClick={() => handleTabChange('aprovacao_contas')}
                      className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between hover:shadow-md transition-all text-left focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 hover:-translate-y-0.5 duration-200"
                    >
                      <div className="flex justify-between items-start w-full">
                        <div>
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Total de Alunos Ativos</span>
                          <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">Contas confirmadas no sistema</span>
                        </div>
                        <div className="w-12 h-12 bg-emerald-50 text-[#2E7D32] border border-emerald-100 rounded-2xl flex items-center justify-center shadow-sm">
                          <Users size={22} />
                        </div>
                      </div>
                      <div className="flex items-baseline gap-2 mt-10 md:mt-14 w-full justify-between">
                        <span className="text-4xl font-extrabold text-gray-900 tracking-tight">
                          {studentsList.filter(s => s.status === 'Aprovado').length}
                        </span>
                        <span className="text-[10px] font-black text-[#2E7D32] uppercase tracking-widest bg-emerald-50 px-2.5 py-1.5 rounded-lg flex items-center gap-1">
                          Gerenciar →
                        </span>
                      </div>
                    </button>

                    {/* Card 2: Solicitações Pendentes */}
                    {(() => {
                      const pendingCount = studentsList.filter(s => s.status === 'Pendente').length;
                      const hasPending = pendingCount > 0;
                      return (
                        <button 
                          onClick={() => handleTabChange('aprovacao_contas')}
                          className={`bg-white p-6 rounded-2xl border transition-all text-left focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 hover:-translate-y-0.5 duration-200 ${
                            hasPending 
                              ? 'border-amber-300 shadow-amber-50/50 bg-amber-50/5 hover:shadow-md' 
                              : 'border-gray-150 shadow-sm hover:shadow-md'
                          }`}
                        >
                          <div className="flex justify-between items-start w-full">
                            <div>
                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Solicitações Pendentes</span>
                              <span className={`text-[11px] font-bold uppercase tracking-wider ${hasPending ? 'text-amber-600' : 'text-gray-500'}`}>
                                {hasPending ? 'Novos cadastros aguardando' : 'Nenhuma pendência recente'}
                              </span>
                            </div>
                            <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shadow-sm transition-all ${
                              hasPending 
                                ? 'bg-amber-100 border-amber-200 text-amber-600 animate-pulse' 
                                : 'bg-gray-50 border-gray-100 text-gray-400'
                            }`}>
                              <Clock size={22} className={hasPending ? 'animate-spin-slow' : ''} />
                            </div>
                          </div>
                          <div className="flex items-baseline gap-2 mt-10 md:mt-14 w-full justify-between">
                            <div className="flex items-center gap-2">
                              <span className={`text-4xl font-extrabold tracking-tight ${
                                hasPending 
                                  ? 'text-amber-500 animate-pulse font-black' 
                                  : 'text-gray-900'
                              }`}>
                                {pendingCount}
                              </span>
                              {hasPending && (
                                <span className="flex h-2 w-2 relative">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                </span>
                              )}
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-lg flex items-center gap-1 ${
                              hasPending 
                                ? 'bg-amber-150 text-amber-800' 
                                : 'bg-gray-100 text-gray-500'
                            }`}>
                              Decidir →
                            </span>
                          </div>
                        </button>
                      );
                    })()}

                    {/* Card 3: Livros na Biblioteca */}
                    <button 
                      onClick={() => handleTabChange('biblioteca_digital')}
                      className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between hover:shadow-md transition-all text-left focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 hover:-translate-y-0.5 duration-200"
                    >
                      <div className="flex justify-between items-start w-full">
                        <div>
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 font-sans">Livros na Biblioteca</span>
                          <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">Livros escolares e PDFs do acervo</span>
                        </div>
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 border border-blue-100 rounded-2xl flex items-center justify-center shadow-sm">
                          <BookOpen size={22} />
                        </div>
                      </div>
                      <div className="flex items-baseline gap-2 mt-10 md:mt-14 w-full justify-between">
                        <span className="text-4xl font-extrabold text-gray-900 tracking-tight">
                          {digitalBooks.length}
                        </span>
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-1.5 rounded-lg flex items-center gap-1">
                          Acessar Acervo →
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* BRAND NEW TABS IMPLEMENTING PRECISE VISUAL AND ARCHITECTURAL DIRECTIVES */}
              {activeTab === 'aprovacao_contas' && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
                        <span>⏳</span> Aprovação de Contas
                      </h2>
                      <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-bold">
                        Onde os novos cadastros de alunos e inscrições aparecem para validação
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-150 shadow-sm p-6" id="aprovacao-contas-container">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-gray-150 bg-gray-50/50 text-gray-400 font-extrabold uppercase tracking-widest text-[10px]">
                            <th className="p-4">Nome do Candidato</th>
                            <th className="p-4">Email / Contacto</th>
                            <th className="p-4">Curso Requerido</th>
                            <th className="p-4">Data do Envio</th>
                            <th className="p-4 text-right">Tomada de Decisão</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {studentsList.filter(s => s.status === 'Pendente' && s.nome.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 ? (
                            <tr>
                              <td colSpan={5} className="p-8 text-center font-bold text-gray-400 uppercase tracking-wider">
                                Nenhum cadastro pendente encontrado
                              </td>
                            </tr>
                          ) : (
                            studentsList.filter(s => s.status === 'Pendente' && s.nome.toLowerCase().includes(searchQuery.toLowerCase())).map((student) => (
                              <tr key={student.id} className="hover:bg-gray-50/55 transition-colors">
                                <td className="p-4 font-black text-gray-900 uppercase tracking-wide">{student.nome}</td>
                                <td className="p-4 font-mono text-gray-400 text-[10px]">{student.email}</td>
                                <td className="p-4 text-[#2E7D32] font-semibold uppercase">{student.curso}</td>
                                <td className="p-4 text-gray-400 font-bold">{student.data}</td>
                                <td className="p-4 text-right space-x-2">
                                  <button 
                                    onClick={() => setSelectedEnrollmentDetail(student)}
                                    className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-black text-[10px] uppercase tracking-wider rounded-lg transition-all"
                                  >
                                    Ficha Completa
                                  </button>
                                  <button 
                                    onClick={() => handleUpdateStudentStatus(student.id, 'Aprovado')}
                                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] uppercase tracking-widest rounded-lg shadow-sm transition-all active:scale-95"
                                  >
                                    Aprovar
                                  </button>
                                  <button 
                                    onClick={() => handleUpdateStudentStatus(student.id, 'Rejeitado')}
                                    className="px-3.5 py-2 bg-red-650 hover:bg-red-750 text-white font-black text-[10px] uppercase tracking-widest rounded-lg shadow-sm transition-all active:scale-95"
                                  >
                                    Rejeitar
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Active / Validated Accounts */}
                  <div className="space-y-4 pt-4">
                    <h3 className="text-sm font-black text-[#2E7D32] uppercase tracking-wider bg-emerald-50 px-3 py-1.5 rounded-lg inline-block">
                      Contas Ativas e Confirmadas ({studentsList.filter(s => s.status === 'Aprovado').length})
                    </h3>

                    <div className="bg-white rounded-2xl border border-gray-150 shadow-sm overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="border-b border-gray-150 bg-gray-50/50 text-gray-400 font-extrabold uppercase tracking-widest text-[10px]">
                              <th className="p-4">Estudante</th>
                              <th className="p-4">Email</th>
                              <th className="p-4">Curso Matriculado</th>
                              <th className="p-4">Turma Alocada</th>
                              <th className="p-4">Data Cadastro</th>
                              <th className="p-4 text-right">Ação</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {studentsList.filter(s => s.status === 'Aprovado' && s.nome.toLowerCase().includes(searchQuery.toLowerCase())).map((student) => (
                              <tr key={student.id} className="hover:bg-gray-50/20 transition-colors">
                                <td className="p-4 font-extrabold text-gray-800 uppercase">{student.nome}</td>
                                <td className="p-4 font-mono text-gray-500 text-[10px]">{student.email}</td>
                                <td className="p-4 text-gray-650 font-bold uppercase">{student.curso}</td>
                                <td className="p-4 text-gray-700 font-bold">{student.turma}</td>
                                <td className="p-4 text-gray-400 font-medium">{student.data}</td>
                                <td className="p-4 text-right">
                                  <button 
                                    onClick={() => handleUpdateStudentStatus(student.id, 'Pendente')}
                                    className="text-amber-700 hover:underline font-black uppercase text-[10px] tracking-wider"
                                  >
                                    Tornar Pendente
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CONTROLE DE FALTAS TAB */}
              {activeTab === 'controle_faltas' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
                      <span>❌</span> Controle de Faltas
                    </h2>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-bold">
                      Portal administrativo para lançar e monitorar as faltas dos alunos do Complexo Jamir
                    </p>
                  </div>

                  {/* Selection Bar: Class & Date */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white border border-gray-150 p-6 rounded-2xl shadow-sm items-center">
                    <div className="md:col-span-12 lg:col-span-12 xl:col-span-5 space-y-1.5 font-bold">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Proceder ao Lançamento para a Turma</label>
                      <select 
                        value={selectedClassForAttendance}
                        onChange={(e) => setSelectedClassForAttendance(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 text-gray-800 font-extrabold p-3 rounded-xl focus:border-[#2E7D32]"
                      >
                        {classesList.map(c => (
                          <option key={c.id} value={c.id}>{c.nome} ({c.professorResponsavel})</option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-12 lg:col-span-12 xl:col-span-4 space-y-1.5 font-bold">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Data das Aulas</label>
                      <input 
                        type="date" 
                        value={attendanceDate}
                        onChange={(e) => setAttendanceDate(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 text-gray-800 font-mono font-extrabold p-3 rounded-xl focus:border-[#2E7D32]"
                      />
                    </div>

                    <div className="md:col-span-12 lg:col-span-12 xl:col-span-3 pt-5 xl:pt-0">
                      <button 
                        onClick={() => {
                          setSuccessMessage(`Faltas da turma cadastradas com sucesso para as aulas do dia ${attendanceDate}!`);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                          setTimeout(() => setSuccessMessage(null), 3500);
                        }}
                        className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white p-3.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg transition-transform active:scale-95"
                      >
                        Salvar Relatório
                      </button>
                    </div>
                  </div>

                  {/* Students list with attendance records */}
                  <div className="bg-white rounded-2xl border border-gray-150 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50">
                      <span className="text-xs font-black text-gray-700 uppercase tracking-wider">
                        Lista de Estudantes da Turma Selecionada
                      </span>
                      <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-extrabold">
                        Status Presença: P (Presente) • FJ (Falta Justificada) • FI (Falta Injustificada)
                      </span>
                    </div>

                    <div className="divide-y divide-gray-100">
                      {studentsList
                        .filter(s => s.status === 'Aprovado' && s.nome.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((student) => {
                          const currentRecord = attendanceRecords[student.id]?.[attendanceDate] || 'P';
                          const updateRecord = (val: string) => {
                            setAttendanceRecords(prev => ({
                              ...prev,
                              [student.id]: {
                                ...(prev[student.id] || {}),
                                [attendanceDate]: val
                              }
                            }));
                          };

                          return (
                            <div key={student.id} className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-gray-50/40 transition-colors">
                              <div>
                                <h4 className="font-black text-gray-900 uppercase text-xs tracking-wide">{student.nome}</h4>
                                <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">{student.curso}</p>
                              </div>

                              {/* Attendance Switches */}
                              <div className="flex gap-2">
                                {/* Present (P) */}
                                <button 
                                  onClick={() => updateRecord('P')}
                                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border ${
                                    currentRecord === 'P'
                                      ? 'bg-green-150 border-green-300 text-green-700 font-extrabold'
                                      : 'bg-white border-gray-200 text-gray-400 hover:bg-gray-55'
                                  }`}
                                >
                                  <Check size={12} /> Presente
                                </button>

                                {/* Justified Absence (FJ) */}
                                <button 
                                  onClick={() => updateRecord('FJ')}
                                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border ${
                                    currentRecord === 'FJ'
                                      ? 'bg-amber-100 border-amber-300 text-amber-700 font-extrabold'
                                      : 'bg-white border-gray-200 text-gray-400 hover:bg-gray-55'
                                  }`}
                                >
                                  <AlertCircle size={12} /> Justificada
                                </button>

                                {/* Unjustified Absence (FI) */}
                                <button 
                                  onClick={() => updateRecord('FI')}
                                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border ${
                                    currentRecord === 'FI'
                                      ? 'bg-red-100 border-red-300 text-red-700 font-extrabold'
                                      : 'bg-white border-gray-200 text-gray-400 hover:bg-gray-55'
                                  }`}
                                >
                                  <XCircle size={12} /> Injustificada
                                </button>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}

              {/* BIBLIOTECA DIGITAL TAB */}
              {activeTab === 'biblioteca_digital' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
                        <span>📚</span> Biblioteca Digital
                      </h2>
                      <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-bold font-sans">
                        Fazer upload de PDFs e gerenciar os livros digitais escolares do acervo acadêmico
                      </p>
                    </div>
                  </div>

                  {/* Drag and Drop pdf upload form */}
                  <div className="bg-white rounded-2xl border border-gray-150 p-6 shadow-sm">
                    <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider mb-4">Adicionar Novo Livro ao Acervo</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-1">Título do Livro</label>
                          <input 
                            type="text" 
                            placeholder="Ex: Introdução à Programação" 
                            className="w-full bg-gray-50 border border-gray-200 text-gray-800 font-bold p-3 rounded-xl focus:border-[#2E7D32]"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-1">Autor</label>
                          <input 
                            type="text" 
                            placeholder="Ex: Dr. Jamir" 
                            className="w-full bg-gray-50 border border-gray-200 text-gray-800 font-bold p-3 rounded-xl focus:border-[#2E7D32]"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-1">Ano / Edição</label>
                            <input 
                              type="text" 
                              placeholder="Ex: 2026" 
                              className="w-full bg-gray-50 border border-gray-200 text-gray-800 font-bold p-3 rounded-xl focus:border-[#2E7D32]"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-1">Categoria / Disciplina</label>
                            <input 
                              type="text" 
                              placeholder="Ex: Informática" 
                              className="w-full bg-gray-50 border border-gray-200 text-gray-800 font-bold p-3 rounded-xl focus:border-[#2E7D32]"
                            />
                          </div>
                        </div>
                      </div>

                      {/* File Upload Zone */}
                      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-[#2E7D32] rounded-2xl p-6 bg-gray-50 cursor-pointer transition-colors group">
                        <UploadCloud size={40} className="text-gray-400 group-hover:text-[#2E7D32] mb-3 transition-colors" />
                        <span className="text-xs font-black text-gray-700 uppercase tracking-wider">Arraste seu PDF aqui</span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase mt-1">ou clique para selecionar do computador</span>
                        <input type="file" accept=".pdf" className="hidden" />
                      </div>
                    </div>

                    <div className="flex justify-end mt-6">
                      <button 
                        onClick={() => {
                          setSuccessMessage("Livro cadastrado na biblioteca escolar com sucesso! PDF armazenado de forma segura.");
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                          setTimeout(() => setSuccessMessage(null), 3000);
                        }}
                        className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-5 py-3 rounded-lg font-black text-xs uppercase tracking-widest shadow transition-all active:scale-95"
                      >
                        Publicar Livro
                      </button>
                    </div>
                  </div>

                  {/* Books Catalog */}
                  <div className="bg-white rounded-2xl border border-gray-150 p-6 shadow-sm">
                    <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider mb-4">Acervo Digital Disponível</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {digitalBooks.map((book) => (
                        <div key={book.id} className="p-4 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-between hover:bg-white hover:shadow transition-all">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center border border-red-100">
                              <BookOpen size={20} />
                            </div>
                            <div>
                              <p className="font-black text-gray-950 uppercase text-xs tracking-wide">{book.titulo}</p>
                              <p className="text-[9px] text-gray-500 font-bold uppercase mt-0.5">{book.autor} | {book.categoria} ({book.ano})</p>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <span className="text-[10px] font-mono text-gray-400 font-bold self-center mr-2">{book.size}</span>
                            <button className="text-[#2E7D32] hover:underline font-black text-[10px] uppercase">Baixar</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* PROFESSORES VIEW */}
              {activeTab === 'professores' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Corpo Docente</h2>
                      <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-bold font-sans">Professores e orientadores pedagógicos</p>
                    </div>
                    <button 
                      onClick={() => setIsAddTeacherOpen(true)}
                      className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-5 py-3 rounded-lg font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-md transition-all active:scale-95"
                    >
                      <Plus size={18} /> Adicionar Professor
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {teachersList.filter(t => t.nome.toLowerCase().includes(searchQuery.toLowerCase())).map((teacher) => (
                      <div key={teacher.id} className="bg-white rounded-2xl border border-gray-150 shadow-sm p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-[#2E7D32]/10 border border-[#2E7D32]/20 text-[#2E7D32] rounded-full flex items-center justify-center font-black text-lg">
                              {teacher.nome.charAt(5)}
                            </div>
                            <div>
                              <h4 className="font-black text-gray-900 uppercase text-sm leading-tight">{teacher.nome}</h4>
                              <p className="text-xs text-[#2E7D32] font-bold mt-1">{teacher.materia}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                            teacher.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {teacher.status}
                          </span>
                        </div>
                        <div className="border-t border-gray-100 pt-4 mt-3 space-y-2 text-xs">
                          <div className="flex justify-between"><span className="text-gray-400 font-bold uppercase text-[10px]">Formação</span><span className="font-bold text-gray-700">{teacher.formacao}</span></div>
                          <div className="flex justify-between"><span className="text-gray-400 font-bold uppercase text-[10px]">Carga Semanal</span><span className="font-mono text-gray-700 font-extrabold">{teacher.cargaHoraria}</span></div>
                        </div>
                        <div className="flex justify-end gap-2.5 mt-5">
                          <button 
                            onClick={() => {
                              setTeachersList(prev => prev.map(t => t.id === teacher.id ? { ...t, status: t.status === 'Ativo' ? 'Ausente' : 'Ativo' } : t));
                              setSuccessMessage('Status do professor alterado com sucesso!');
                              setTimeout(() => setSuccessMessage(null), 2500);
                            }}
                            className="text-xs font-black text-[#2E7D32] hover:bg-[#2E7D32]/5 px-3 py-1.5 rounded-lg border border-[#2E7D32]/10 uppercase transition-all"
                          >
                            Alterar Status
                          </button>
                          <button 
                            onClick={() => {
                              setTeachersList(prev => prev.filter(t => t.id !== teacher.id));
                              setSuccessMessage('Professor removido com sucesso!');
                              setTimeout(() => setSuccessMessage(null), 2500);
                            }}
                            className="text-xs font-black text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg border border-red-150 uppercase transition-all"
                          >
                            Demitir
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TURMAS VIEW */}
              {activeTab === 'turmas' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Classes e Turmas</h2>
                      <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-bold">Unidades pedagógicas do ano letivo vigente</p>
                    </div>
                    <button 
                      onClick={() => setIsAddClassOpen(true)}
                      className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-5 py-3 rounded-lg font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-md transition-all active:scale-95"
                    >
                      <Plus size={18} /> Criar Turma
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {classesList.filter(c => c.nome.toLowerCase().includes(searchQuery.toLowerCase())).map((cls) => (
                      <div key={cls.id} className="bg-white rounded-2xl border border-gray-150 shadow-sm p-6 hover:shadow-md transition-shadow">
                        <h4 className="font-black text-gray-900 uppercase text-lg mb-1">{cls.nome}</h4>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-4">{cls.curso}</p>

                        <div className="space-y-3 my-4 border-t border-b border-gray-100 py-4 text-xs">
                          <div className="flex justify-between"><span className="text-gray-400 font-bold uppercase text-[10px]">Sala de Aula</span><span className="font-extrabold text-[#2E7D32]">{cls.sala}</span></div>
                          <div className="flex justify-between"><span className="text-gray-400 font-bold uppercase text-[10px]">Alunos Alocados</span><span className="font-black text-gray-700 bg-gray-100 px-2 py-0.5 rounded">{cls.alunosCount} alunos</span></div>
                          <div className="flex justify-between"><span className="text-gray-400 font-bold uppercase text-[10px]">Diretor de Turma</span><span className="font-bold text-gray-800">{cls.professorResponsavel}</span></div>
                        </div>

                        <div className="flex gap-2 justify-end mt-4">
                          <button 
                            onClick={() => {
                              setClassesList(prev => prev.filter(c => c.id !== cls.id));
                              setSuccessMessage('Turma desfeita com sucesso!');
                              setTimeout(() => setSuccessMessage(null), 2500);
                            }}
                            className="text-red-600 hover:bg-red-50 border border-red-150 hover:text-red-850 py-2 px-3 rounded-lg text-xs font-black uppercase tracking-wider transition-all"
                          >
                            Desfazer Turma
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* INTEGRATED ACADEMICO TAB (CURSOS DO SITE COMPILADOS AQUI COM GALERIA) */}
              {activeTab === 'academico' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Gestão Académica</h2>
                      <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-bold">Configure preços, disciplinas recomendadas e imagens acadêmicas</p>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          if (subAcademicTab === 'courses') {
                            setEditingItem({ type: 'courses' });
                            setIsModalOpen(true);
                          } else {
                            setEditingItem({ type: 'gallery' });
                            setIsModalOpen(true);
                          }
                        }}
                        className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-5 py-2.5 rounded-lg font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow transition-all active:scale-95"
                      >
                        <Plus size={16} /> Adicionar {subAcademicTab === 'courses' ? 'Curso' : 'Imagem'}
                      </button>
                    </div>
                  </div>

                  {/* Segments Header */}
                  <div className="flex border-b border-gray-200">
                    <button 
                      onClick={() => setSubAcademicTab('courses')}
                      className={`px-6 py-3 font-black text-xs uppercase tracking-wider border-b-2 transition-all ${
                        subAcademicTab === 'courses' ? 'border-[#2E7D32] text-[#2E7D32]' : 'border-transparent text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      Cursos Ofertados ({courses.length})
                    </button>
                    <button 
                      onClick={() => setSubAcademicTab('gallery')}
                      className={`px-6 py-3 font-black text-xs uppercase tracking-wider border-b-2 transition-all ${
                        subAcademicTab === 'gallery' ? 'border-[#2E7D32] text-[#2E7D32]' : 'border-transparent text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      Fotos Pedagógicas ({gallery.length})
                    </button>
                  </div>

                  {subAcademicTab === 'courses' && (
                    <div className="bg-white rounded-2xl border border-gray-150 p-6 shadow-sm">
                      {isDbLoading ? (
                        <div className="space-y-4">
                          {[1, 2, 3].map((n) => (
                            <div key={n} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-lg animate-pulse">
                              <div className="flex items-center gap-4 w-full">
                                <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
                                <div className="space-y-2 w-1/2">
                                  <Skeleton className="h-4 w-2/3" />
                                  <Skeleton className="h-3 w-1/3" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-4">
                          {courses.filter(c => c.nome.toLowerCase().includes(searchQuery.toLowerCase())).map((course) => (
                            <div key={course.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-lg hover:bg-white hover:shadow transition-all gap-4">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-green-50 text-[#2E7D32] rounded-lg flex items-center justify-center border border-green-100/40">
                                  <GraduationCap size={20} />
                                </div>
                                <div>
                                  <p className="font-black text-gray-900 uppercase text-xs tracking-wide">{course.nome}</p>
                                  <p className="text-[10px] text-gray-500 font-bold uppercase mt-0.5">
                                    Propina: {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(course.propina)} | 
                                    Matrícula: {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(course.preco_matricula || 0)}
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-2 self-end sm:self-auto">
                                <button onClick={() => { setEditingItem(course); setIsModalOpen(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={16} /></button>
                                <button onClick={() => setDeleteConfirm({ id: course.id, table: 'courses' })} className="p-2 text-red-650 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                              </div>
                            </div>
                          ))}
                          {courses.length === 0 && <p className="text-center py-10 text-gray-400">Nenhum curso cadastrado no banco do Supabase.</p>}
                        </div>
                      )}
                    </div>
                  )}

                  {subAcademicTab === 'gallery' && (
                    <div className="bg-white rounded-2xl border border-gray-150 p-6 shadow-sm">
                      <GallerySection 
                        gallery={gallery}
                        setIsModalOpen={setIsModalOpen}
                        setDeleteConfirm={(id) => setDeleteConfirm({ id, table: 'gallery_images' })}
                        searchQuery={searchQuery}
                        loading={isDbLoading}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* MATRICULAS SECTION (REAL DATABASE OR RECENT LIST FOR INTERACTION FLOW) */}
              {activeTab === 'matriculas' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Avaliação de Matrículas</h2>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-bold">Controle e validação de inscrições escolares para aprovação</p>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-150 p-6 shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-gray-100 text-gray-400 font-black uppercase tracking-widest text-[10px] pb-3">
                            <th className="pb-3">Candidato</th>
                            <th className="pb-3">Curso Requerido</th>
                            <th className="pb-3">Data de Entrada</th>
                            <th className="pb-3">Status Atual</th>
                            <th className="pb-3 text-right">Tomada de Decisão</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {studentsList.filter(s => s.nome.toLowerCase().includes(searchQuery.toLowerCase())).map((student) => (
                            <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                              <td className="py-4 font-black uppercase text-gray-850 text-xs tracking-wide">{student.nome}</td>
                              <td className="py-4 text-gray-650 font-bold">{student.curso}</td>
                              <td className="py-4 text-gray-400 font-mono text-[10px]">{student.data}</td>
                              <td className="py-4">
                                <span className={`px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                                  student.status === 'Aprovado' ? 'bg-green-100 text-green-700' :
                                  student.status === 'Rejeitado' ? 'bg-red-100 text-red-700' :
                                  'bg-amber-100 text-amber-700'
                                }`}>
                                  {student.status}
                                </span>
                              </td>
                              <td className="py-4 text-right space-x-2">
                                <button 
                                  onClick={() => handleUpdateStudentStatus(student.id, 'Aprovado')}
                                  className="text-white bg-green-600 hover:bg-green-700 font-black text-[9px] uppercase tracking-wider px-2 py-1 rounded"
                                >
                                  Aprovar
                                </button>
                                <button 
                                  onClick={() => handleUpdateStudentStatus(student.id, 'Rejeitado')}
                                  className="text-white bg-red-650 hover:bg-red-700 font-black text-[9px] uppercase tracking-wider px-2 py-1 rounded"
                                >
                                  Rejeitar
                                </button>
                                <button 
                                  onClick={() => setSelectedEnrollmentDetail(student)}
                                  className="text-[#2E7D32] hover:underline font-black text-[9px] uppercase tracking-wider px-1 inline-block"
                                >
                                  Dados
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* POSTS OR AVISOS FOR DIRECT SUPABASE DB */}
              {activeTab === 'posts' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Comunicados & Avisos</h2>
                      <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-bold">Configure artigos e avisos urgentes exibidos no portal</p>
                    </div>
                    <button 
                      onClick={() => { 
                        setEditingItem({ type: 'posts' }); 
                        setIsModalOpen(true); 
                        setSuccessMessage(null); 
                        setErrorMessage(null); 
                      }}
                      className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-5 py-3 rounded-lg font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow transition-all active:scale-95"
                    >
                      <Plus size={16} /> Publicar Comunicado
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-150 p-6 shadow-sm">
                    <PostsSection 
                      posts={posts}
                      setEditingItem={setEditingItem}
                      setIsModalOpen={setIsModalOpen}
                      setDeleteConfirm={(id) => setDeleteConfirm({ id, table: 'blog_posts' })}
                      searchQuery={searchQuery}
                      loading={isDbLoading}
                    />
                  </div>
                </div>
              )}

              {/* MESSAGES SECTION */}
              {activeTab === 'messages' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Mensagens de Fale Conosco</h2>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-bold">Respostas enviadas de dúvidas do portal de visitantes</p>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-150 p-6 shadow-sm">
                    <MessagesSection 
                      messages={messages}
                      setDeleteConfirm={(id) => setDeleteConfirm({ id, table: 'contact_messages' })}
                      searchQuery={searchQuery}
                      loading={isDbLoading}
                    />
                  </div>
                </div>
              )}

              {/* SITE CONFIGURATIONS OR PROFILE FORM */}
              {activeTab === 'configuracoes' && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Preferências Gerais</h2>
                    <p className="text-xs text-gray-500 mt-1">Configurações globais e dados do administrador escolar</p>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-150 p-8 shadow-sm space-y-6">
                    <div>
                      <h4 className="font-black text-gray-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Informações Principais</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 text-xs font-bold font-sans">
                        <div>
                          <p className="text-gray-400 uppercase text-[9px] mb-1">Escola Operada</p>
                          <p className="bg-gray-50 p-2.5 rounded-lg text-gray-800 border">Complexo Escolar Privado Jamir</p>
                        </div>
                        <div>
                          <p className="text-gray-400 uppercase text-[9px] mb-1">Localização Operada</p>
                          <p className="bg-gray-50 p-2.5 rounded-lg text-gray-800 border">Luanda, Angola</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <h4 className="font-black text-gray-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Suporte Técnico</h4>
                      <p className="text-xs text-gray-500 font-semibold my-3">Conexão à base de dados do Supabase: <span className="font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">ONLINE</span></p>
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-gray-100 justify-end">
                      <button 
                        onClick={() => setIsProfileModalOpen(true)}
                        className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-black text-xs uppercase px-5 py-3 rounded-lg shadow-md transition-all active:scale-95 flex items-center gap-2"
                      >
                        <UserIcon size={16} /> Editar Dados Pessoais
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </AdminTab>
          </AnimatePresence>
        </main>
      </div>

      {/* Profile Modals */}
      <ProfileModal 
        user={user}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onSuccess={(msg) => setSuccessMessage(msg)}
        onError={(msg) => setErrorMessage(msg)}
      />

      {/* IN-DEPTH VIEW DATA MATRICULAS MODAL FOR REAL APPROVAL / TOMADA DE DECISÃO FLOW */}
      {selectedEnrollmentDetail && (
        <div className="fixed inset-0 z-[100] bg-black/60 shadow-2xl backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6"
          >
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-lg font-black uppercase text-[#2E7D32] tracking-wider">Ficha de Matrícula</h3>
              <button onClick={() => setSelectedEnrollmentDetail(null)} className="hover:bg-gray-100 p-1.5 rounded-full transition-colors"><X size={20} /></button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="col-span-2">
                <span className="text-gray-400 font-bold uppercase text-[9px] block">Nome do Aluno</span>
                <span className="font-black text-base text-gray-900 uppercase block mt-1">{selectedEnrollmentDetail.nome}</span>
              </div>
              <div>
                <span className="text-gray-400 font-bold uppercase text-[9px] block">Curso Selecionado</span>
                <span className="font-black text-gray-800 block mt-1 uppercase">{selectedEnrollmentDetail.curso}</span>
              </div>
              <div>
                <span className="text-gray-400 font-bold uppercase text-[9px] block">Alocado Inicial</span>
                <span className="font-extrabold text-gray-800 block mt-1">{selectedEnrollmentDetail.turma}</span>
              </div>
              <div>
                <span className="text-gray-400 font-bold uppercase text-[9px] block">Email de Contato</span>
                <span className="font-mono text-gray-600 block mt-1">{selectedEnrollmentDetail.email}</span>
              </div>
              <div>
                <span className="text-gray-400 font-bold uppercase text-[9px] block">Data do Envio</span>
                <span className="font-extrabold text-gray-650 block mt-1">{selectedEnrollmentDetail.data}</span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex justify-between items-center">
              <div>
                <span className="text-gray-400 font-black uppercase text-[9px] block">Estado de Inscrição</span>
                <span className={`inline-block mt-1 px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                  selectedEnrollmentDetail.status === 'Aprovado' ? 'bg-green-100 text-green-700' :
                  selectedEnrollmentDetail.status === 'Rejeitado' ? 'bg-red-100 text-red-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {selectedEnrollmentDetail.status}
                </span>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => handleUpdateStudentStatus(selectedEnrollmentDetail.id, 'Aprovado')}
                  className="px-3.5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-xs uppercase shadow transition-all active:scale-95"
                >
                  Confirmar
                </button>
                <button 
                  onClick={() => handleUpdateStudentStatus(selectedEnrollmentDetail.id, 'Rejeitado')}
                  className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-xs uppercase shadow transition-all active:scale-95"
                >
                  Recusar
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-3">
              <button 
                onClick={() => setSelectedEnrollmentDetail(null)}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-black uppercase text-gray-500 tracking-wider transition-colors"
              >
                Fechar Ficha
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* MODAL FOR ADDING BRAND NEW SIMULATED STUDENTS FOR SESSIONS */}
      {isAddStudentOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 shadow-2xl backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 space-y-6"
          >
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-lg font-black uppercase text-[#2E7D32] tracking-wider">Novo Aluno</h3>
              <button onClick={() => setIsAddStudentOpen(false)} className="hover:bg-gray-100 p-1.5 rounded-full"><X size={20} /></button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              const data = {
                id: String(studentsList.length + 1),
                nome: String(f.get('nome')),
                email: String(f.get('email')),
                curso: String(f.get('curso')),
                turma: String(f.get('turma')),
                data: new Date().toLocaleDateString('pt-BR'),
                status: 'Pendente'
              };
              setStudentsList(prev => [data, ...prev]);
              setIsAddStudentOpen(false);
              setSuccessMessage('Novo estudante cadastrado para a lista com sucesso!');
              setTimeout(() => setSuccessMessage(null), 3000);
            }} className="space-y-4 text-xs font-bold">
              <div>
                <label className="text-gray-400 uppercase text-[9px] mb-1 block">Nome Completo</label>
                <input name="nome" type="text" required className="w-full bg-gray-50 border p-2.5 rounded-xl uppercase" />
              </div>
              <div>
                <label className="text-gray-400 uppercase text-[9px] mb-1 block">Correio Electrónico</label>
                <input name="email" type="email" required className="w-full bg-gray-50 border p-2.5 rounded-xl font-mono text-[11px]" />
              </div>
              <div>
                <label className="text-gray-400 uppercase text-[9px] mb-1 block">Selecione o Curso</label>
                <select name="curso" className="w-full bg-gray-50 border p-2.5 rounded-xl">
                  {courses.map(c => <option key={c.id} value={c.nome}>{c.nome}</option>)}
                  <option value="Ensino Primário">Ensino Primário</option>
                  <option value="Ensino Geral">Ensino Geral</option>
                  <option value="Técnico de Informática">Técnico de Informática</option>
                </select>
              </div>
              <div>
                <label className="text-gray-400 uppercase text-[9px] mb-1 block">Escolha a Turma</label>
                <select name="turma" className="w-full bg-gray-50 border p-2.5 rounded-xl">
                  <option value="Turma A">Turma A</option>
                  <option value="Turma B">Turma B</option>
                  <option value="Turma C">Turma C</option>
                </select>
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <button type="button" onClick={() => setIsAddStudentOpen(false)} className="px-5 py-2.5 bg-gray-100 rounded-lg">Cancelar</button>
                <button type="submit" className="px-6 py-2.5 bg-[#2E7D32] text-white rounded-lg">Cadastrar</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* MODAL FOR ADDING BRAND NEW SIMULATED TEACHER */}
      {isAddTeacherOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 shadow-2xl backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 space-y-6"
          >
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-lg font-black uppercase text-[#2E7D32] tracking-wider">Novo Professor</h3>
              <button onClick={() => setIsAddTeacherOpen(false)} className="hover:bg-gray-100 p-1.5 rounded-full"><X size={20} /></button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              const data = {
                id: String(teachersList.length + 1),
                nome: 'Prof. ' + String(f.get('nome')),
                materia: String(f.get('materia')),
                formacao: String(f.get('formacao')),
                status: 'Ativo',
                cargaHoraria: String(f.get('carga')) + 'h / semana'
              };
              setTeachersList(prev => [data, ...prev]);
              setIsAddTeacherOpen(false);
              setSuccessMessage('Novo professor cadastrado para o Jamir com sucesso!');
              setTimeout(() => setSuccessMessage(null), 3000);
            }} className="space-y-4 text-xs font-bold font-sans">
              <div>
                <label className="text-gray-400 uppercase text-[9px] mb-1 block">Nome Completo</label>
                <input name="nome" type="text" required className="w-full bg-gray-50 border p-2.5 rounded-xl" />
              </div>
              <div>
                <label className="text-gray-400 uppercase text-[9px] mb-1 block">Disciplina Responsável</label>
                <input name="materia" type="text" required placeholder="Língua Portuguesa, Geografia, etc" className="w-full bg-gray-50 border p-2.5 rounded-xl" />
              </div>
              <div>
                <label className="text-gray-400 uppercase text-[9px] mb-1 block">Formação Académica</label>
                <input name="formacao" type="text" required placeholder="Mestre, Licenciado..." className="w-full bg-gray-50 border p-2.5 rounded-xl" />
              </div>
              <div>
                <label className="text-gray-400 uppercase text-[9px] mb-1 block">Carga Horária Semanal (horas)</label>
                <input name="carga" type="number" required defaultValue="15" className="w-full bg-gray-50 border p-2.5 rounded-xl" />
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <button type="button" onClick={() => setIsAddTeacherOpen(false)} className="px-5 py-2.5 bg-gray-100 rounded-lg">Cancelar</button>
                <button type="submit" className="px-6 py-2.5 bg-[#2E7D32] text-white rounded-lg">Adicionar</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* MODAL FOR ADDING BRAND NEW SIMULATED CLASS */}
      {isAddClassOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 shadow-2xl backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 space-y-6"
          >
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-lg font-black uppercase text-[#2E7D32] tracking-wider">Nova Turma</h3>
              <button onClick={() => setIsAddClassOpen(false)} className="hover:bg-gray-100 p-1.5 rounded-full"><X size={20} /></button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              const data = {
                id: String(classesList.length + 1),
                nome: String(f.get('nome')),
                curso: String(f.get('curso')),
                sala: 'Sala ' + String(f.get('sala')),
                alunosCount: parseInt(String(f.get('alunosCount'))) || 18,
                professorResponsavel: String(f.get('professor'))
              };
              setClassesList(prev => [...prev, data]);
              setIsAddClassOpen(false);
              setSuccessMessage('Nova turma aberta com sucesso!');
              setTimeout(() => setSuccessMessage(null), 3000);
            }} className="space-y-4 text-xs font-bold font-sans">
              <div>
                <label className="text-gray-400 uppercase text-[9px] mb-1 block">Identificação (ex: Turma D - 12º Ano)</label>
                <input name="nome" type="text" required className="w-full bg-gray-50 border p-2.5 rounded-xl" />
              </div>
              <div>
                <label className="text-gray-400 uppercase text-[9px] mb-1 block">Grade Curricular</label>
                <input name="curso" type="text" required placeholder="Técnico de Informática, Geral..." className="w-full bg-gray-50 border p-2.5 rounded-xl" />
              </div>
              <div>
                <label className="text-gray-400 uppercase text-[9px] mb-1 block">Identificador da Sala</label>
                <input name="sala" type="text" required placeholder="05 (Bloco Primário)" className="w-full bg-gray-50 border p-2.5 rounded-xl" />
              </div>
              <div>
                <label className="text-gray-400 uppercase text-[9px] mb-1 block">Lotação de Alunos Esperada</label>
                <input name="alunosCount" type="number" required defaultValue="25" className="w-full bg-gray-50 border p-2.5 rounded-xl" />
              </div>
              <div>
                <label className="text-gray-400 uppercase text-[9px] mb-1 block">Diretor de Turma Responsável</label>
                <select name="professor" className="w-full bg-gray-50 border p-2.5 rounded-xl">
                  {teachersList.map(t => <option key={t.id} value={t.nome}>{t.nome}</option>)}
                </select>
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <button type="button" onClick={() => setIsAddClassOpen(false)} className="px-5 py-2.5 bg-gray-100 rounded-lg">Cancelar</button>
                <button type="submit" className="px-6 py-2.5 bg-[#2E7D32] text-white rounded-lg">Abrir Turma</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Modal for adding/editing database listings (Posts, Courses, Gallery) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto space-y-6"
          >
            <div className="flex justify-between items-center border-b pb-4">
              <h2 className="text-2xl font-black uppercase text-[#2E7D32] tracking-tight">
                {editingItem?.id ? 'Editar' : 'Novo'} {
                  activeTab === 'posts' ? 'Post' : 
                  activeTab === 'gallery' ? 'Item da Galeria' : 
                  'Curso'
                }
              </h2>
              <button onClick={() => { setIsModalOpen(false); setEditingItem(null); }} className="hover:bg-gray-100 p-2 rounded-full transition-colors"><X size={24} /></button>
            </div>
            
            <form className="space-y-6 font-bold" onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const rawData: any = Object.fromEntries(formData.entries());
              
              try {
                setIsSaving(true);
                const table = activeTab === 'posts' ? 'blog_posts' : 
                             (activeTab === 'academico' && subAcademicTab === 'gallery') ? 'gallery_images' : 
                             'courses';
                
                if (table === 'courses') {
                  rawData.preco_matricula = parseFloat(rawData.preco_matricula) || 0;
                  rawData.preco_confirmacao = parseFloat(rawData.preco_confirmacao) || 0;
                  rawData.propina = parseFloat(rawData.propina) || 0;
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
                setSuccessMessage('Gravação efetuada com sucesso!');
                setTimeout(() => setSuccessMessage(null), 3500);
              } catch (err: any) {
                setErrorMessage('Erro ao salvar no Supabase: ' + err.message);
              } finally {
                setIsSaving(false);
              }
            }}>
              {activeTab === 'posts' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">Título do Comunicado</label>
                    <input name="titulo" type="text" defaultValue={editingItem?.titulo} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#2E7D32]" required />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">Conteúdo do Aviso</label>
                    <textarea name="conteudo" defaultValue={editingItem?.conteudo} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#2E7D32]" rows={6} required />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">URL da Imagem Ilustrativa</label>
                    <input name="imagem" type="text" defaultValue={editingItem?.imagem} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#2E7D32]" />
                  </div>
                </div>
              )}

              {(activeTab === 'gallery' || (activeTab === 'academico' && subAcademicTab === 'gallery')) && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">Título da Imagem</label>
                    <input name="titulo" type="text" defaultValue={editingItem?.titulo} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#2E7D32]" required />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">URL da Imagem</label>
                    <input name="imagem" type="text" defaultValue={editingItem?.imagem} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#2E7D32]" required />
                  </div>
                </div>
              )}

              {(activeTab === 'courses' || (activeTab === 'academico' && subAcademicTab === 'courses')) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">Nome do Curso</label>
                    <input name="nome" type="text" defaultValue={editingItem?.nome} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#2E7D32]" required />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">Preço de Matrícula (Kz)</label>
                    <input name="preco_matricula" type="number" step="0.01" defaultValue={editingItem?.preco_matricula} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#2E7D32]" required />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">Preço de Confirmação (Kz)</label>
                    <input name="preco_confirmacao" type="number" step="0.01" defaultValue={editingItem?.preco_confirmacao} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#2E7D32]" required />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">Propina Mensal (Kz)</label>
                    <input name="propina" type="number" step="0.01" defaultValue={editingItem?.propina} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#2E7D32]" required />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">Multa Estimada</label>
                    <input name="multa" type="number" step="0.01" defaultValue={editingItem?.multa || 0} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#2E7D32]" />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-6 border-t">
                <button type="button" disabled={isSaving} onClick={() => { setIsModalOpen(false); setEditingItem(null); }} className="px-6 py-3 font-bold text-gray-500 hover:bg-gray-100 rounded-lg disabled:opacity-50">Cancelar</button>
                <button type="submit" disabled={isSaving} className="bg-[#2E7D32] text-white px-8 py-3 rounded-lg font-black uppercase tracking-wider shadow-lg hover:bg-[#1B5E20] transition-all flex items-center justify-center gap-2 disabled:opacity-55">
                  {isSaving ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Gravando...
                    </>
                  ) : 'Guardar'}
                </button>
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
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 text-center space-y-4"
          >
            <Trash2 size={48} className="mx-auto text-red-600 animate-pulse" />
            <h2 className="text-xl font-black uppercase text-gray-900">Confirmar Exclusão</h2>
            <p className="text-gray-500 text-xs font-medium">Tem certeza que deseja excluir permanentemente este registro da base de dados do Supabase? Esta ação não possui retorno.</p>
            <div className="flex gap-3 pt-4">
              <button 
                onClick={() => setDeleteConfirm(null)}
                disabled={isDeleting}
                className="flex-1 px-6 py-3 font-bold text-gray-500 hover:bg-gray-100 rounded-lg text-xs uppercase disabled:opacity-55"
              >
                Cancelar
              </button>
              <button 
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-black shadow-lg hover:bg-red-700 uppercase text-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-55"
              >
                {isDeleting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Excluindo...
                  </>
                ) : 'Excluir'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
