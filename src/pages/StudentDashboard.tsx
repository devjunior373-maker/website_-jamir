import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { 
  GraduationCap, 
  Calendar, 
  BookOpen, 
  CreditCard, 
  Award, 
  LogOut, 
  Clock, 
  User, 
  Bell, 
  ChevronRight, 
  FileText, 
  CheckCircle2, 
  FileCheck,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  X,
  Menu
} from 'lucide-react';

interface Grade {
  disciplina: string;
  p1: number;
  p2: number;
  mac: number;
  media: number;
  status: 'Aprovado' | 'Pendente' | 'Exame';
}

interface ScheduleItem {
  hora: string;
  segunda: string;
  terca: string;
  quarta: string;
  quinta: string;
  sexta: string;
}

interface Payment {
  mes: string;
  status: 'Pago' | 'Pendente' | 'Atrasado';
  valor: number;
  dataPagamento?: string;
  recibo?: string;
}

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { user, loading: authLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'grades' | 'schedule' | 'payments' | 'notices'>('grades');
  const [notifications, setNotifications] = useState<string[]>([
    "As provas de recurso de Matemática iniciam na próxima segunda-feira.",
    "A mensalidade de Maio vence no dia 10 do próximo mês.",
    "Projecto Interdisciplinar de Informática deve ser entregue até 30 de Maio."
  ]);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'student')) {
      navigate('/login', { replace: true });
    }
  }, [user, authLoading, navigate]);

  if (authLoading || !user || user.role !== 'student') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-[#2E7D32] rounded-full animate-spin" />
      </div>
    );
  }

  const studentInfo = user.user_metadata || {
    full_name: 'Carlos Jamir',
    turma: '12ª Classe - Informática de Gestão',
    nº_matricula: '2026/04812',
    numero: '12',
    sala: 'Sala 06',
    periodo: 'Tarde'
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Mock Grades data
  const grades: Grade[] = [
    { disciplina: 'Língua Portuguesa', p1: 15, p2: 17, mac: 16, media: 16.0, status: 'Aprovado' },
    { disciplina: 'Matemática', p1: 14, p2: 15, mac: 14, media: 14.3, status: 'Aprovado' },
    { disciplina: 'Física', p1: 13, p2: 14, mac: 15, media: 14.0, status: 'Aprovado' },
    { disciplina: 'Química', p1: 12, p2: 15, mac: 14, media: 13.7, status: 'Aprovado' },
    { disciplina: 'Técnicas de Linguagem de Programação', p1: 18, p2: 19, mac: 18, media: 18.3, status: 'Aprovado' },
    { disciplina: 'Sistemas de Informação', p1: 17, p2: 16, mac: 18, media: 17.0, status: 'Aprovado' },
    { disciplina: 'Educação Física', p1: 18, p2: 18, mac: 20, media: 18.7, status: 'Aprovado' },
    { disciplina: 'Empreendedorismo', p1: 16, p2: 16, mac: 17, media: 16.3, status: 'Aprovado' },
  ];

  // Mock Schedule data
  const schedule: ScheduleItem[] = [
    { hora: '13:00 - 13:50', segunda: 'Matemática', terca: 'Sistemas Inf.', quarta: 'Língua Port.', quinta: 'Física', sexta: 'T.L. Programação' },
    { hora: '13:50 - 14:40', segunda: 'Matemática', terca: 'Sistemas Inf.', quarta: 'Língua Port.', quinta: 'Física', sexta: 'T.L. Programação' },
    { hora: '14:50 - 15:40', segunda: 'Física', terca: 'Química', quarta: 'Matemática', quinta: 'Língua Port.', sexta: 'Sistemas Inf.' },
    { hora: '15:40 - 16:30', segunda: 'Língua Port.', terca: 'Química', quarta: 'Matemática', quinta: 'Empreendedorismo', sexta: 'Sistemas Inf.' },
    { hora: '16:40 - 17:30', segunda: 'T.L. Programação', terca: 'Empreendedorismo', quarta: 'Física', quinta: 'Química', sexta: 'Educação Física' },
    { hora: '17:30 - 18:20', segunda: 'T.L. Programação', terca: 'Estudo Dirigido', quarta: 'Oficina Prática', quinta: 'Química', sexta: 'Educação Física' },
  ];

  // Mock Payments data
  const payments: Payment[] = [
    { mes: 'Janeiro', status: 'Pago', valor: 25000, dataPagamento: '05/01/2026', recibo: 'REC-2026-0012' },
    { mes: 'Fevereiro', status: 'Pago', valor: 25000, dataPagamento: '04/02/2026', recibo: 'REC-2026-0421' },
    { mes: 'Março', status: 'Pago', valor: 25000, dataPagamento: '06/03/2026', recibo: 'REC-2026-0985' },
    { mes: 'Abril', status: 'Pago', valor: 25000, dataPagamento: '08/04/2026', recibo: 'REC-2026-1502' },
    { mes: 'Maio', status: 'Pago', valor: 25000, dataPagamento: '05/05/2026', recibo: 'REC-2026-2119' },
    { mes: 'Junho', status: 'Pendente', valor: 25000 },
    { mes: 'Julho', status: 'Pendente', valor: 25000 },
  ];

  // Mock Notices
  const notices = [
    {
      id: 1,
      titulo: 'Provas Finais do 2º Trimestre',
      data: '15 Mai 2026',
      categoria: 'Académico',
      conteudo: 'As avaliações finais referentes ao segundo trimestre letivo terão início no dia 8 de Junho. Pedimos aos encarregados de educação que verifiquem a situação financeira da propina para emissão de guias de exame.'
    },
    {
      id: 2,
      titulo: 'Feira das Ciências e Tecnologia 2026',
      data: '10 Mai 2026',
      categoria: 'Evento',
      conteudo: 'Nos dias 22 e 23 de Junho realizaremos a nossa Feira Tecnológica Anual sob o lema "Inovar para Integrar". Os grupos devem submeter as propostas de maquetes e programas de computadores aos respectivos coordenadores de curso até o final deste mês.'
    },
    {
      id: 3,
      titulo: 'Interrupção Pedagógica Trimestral',
      data: '02 Mai 2026',
      categoria: 'Calendário',
      conteudo: 'Informamos a toda a comunidade escolar que a pausa pedagógica nacional decorrerá entre 1 e 5 de Junho, período em que as salas estarão abertas para consultas e oficinas excepcionais apenas com marcação.'
    }
  ];

  // General calculated metrics
  const activePaymentsCount = payments.filter(p => p.status === 'Pago').length;
  const isTuitionOK = payments.find(p => p.mes === 'Maio')?.status === 'Pago';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      
      {/* Sidebar - Desktop Layout */}
      <aside className="hidden md:flex flex-col w-72 bg-gradient-to-b from-[#1b5122] to-[#0d2a12] text-white shrink-0 shadow-2xl relative z-20">
        {/* Brand Banner */}
        <div className="p-8 border-b border-white/10 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm shadow-xl">
            <GraduationCap size={32} className="text-[#a3e635]" />
          </div>
          <h2 className="text-sm font-black uppercase tracking-widest text-[#a3e635]">Complexo Jamir</h2>
          <span className="text-[10px] text-white/60 font-medium tracking-wider mt-1 uppercase">Portal Estudantil</span>
        </div>

        {/* User Card */}
        <div className="m-6 p-5 bg-white/5 rounded-[5px] border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#2E7D32] hover:bg-emerald-900 transition-all rounded-full flex items-center justify-center font-bold text-white shadow-md border border-white/20">
              {studentInfo.full_name?.charAt(0) || 'C'}
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-sm text-white truncate">{studentInfo.full_name}</p>
              <p className="text-[10px] text-white/50 font-bold tracking-wider truncate uppercase">{studentInfo.turma}</p>
            </div>
          </div>
          <div className="text-[10px] text-white/60 space-y-1 pt-2 border-t border-white/10 font-medium">
            <p><span className="text-[#a3e635]">Matrícula:</span> {studentInfo.nº_matricula}</p>
            <p><span className="text-[#a3e635]">Regime:</span> {studentInfo.periodo}</p>
          </div>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-grow px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('grades')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-[5px] font-bold text-sm transition-all ${activeTab === 'grades' ? 'bg-[#a3e635] text-[#0d2a12] shadow-lg shadow-black/10' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
          >
            <Award size={18} /> Minhas Notas
          </button>
          
          <button 
            onClick={() => setActiveTab('schedule')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-[5px] font-bold text-sm transition-all ${activeTab === 'schedule' ? 'bg-[#a3e635] text-[#0d2a12] shadow-lg shadow-black/10' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
          >
            <Calendar size={18} /> Horário das Aulas
          </button>
          
          <button 
            onClick={() => setActiveTab('payments')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-[5px] font-bold text-sm transition-all ${activeTab === 'payments' ? 'bg-[#a3e635] text-[#0d2a12] shadow-lg shadow-black/10' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
          >
            <CreditCard size={18} /> Propinas / Pagamentos
          </button>
          
          <button 
            onClick={() => setActiveTab('notices')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-[5px] font-bold text-sm transition-all ${activeTab === 'notices' ? 'bg-[#a3e635] text-[#0d2a12] shadow-lg shadow-black/10' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
          >
            <FileText size={18} /> Comunicados
          </button>
        </nav>

        {/* Footer Logout */}
        <div className="p-6 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-650 hover:bg-red-700 text-white/95 px-4 py-3.5 rounded-[5px] font-bold text-sm transition-colors cursor-pointer border border-white/5 shadow-md active:scale-[0.98]"
          >
            <LogOut size={16} /> Terminar Sessão
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden bg-[#1b5122] text-white p-4 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-3">
          <span className="p-1.5 bg-white/10 rounded-[5px]">
            <GraduationCap size={22} className="text-[#a3e635]" />
          </span>
          <div>
            <h1 className="text-sm font-black uppercase tracking-wider text-[#a3e635]">Complexo Jamir</h1>
            <p className="text-[10px] text-white/70 font-semibold lowercase">portal do estudante</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowNotificationsModal(true)} 
            className="relative p-2 text-white bg-white/10 rounded-[5px] hover:bg-white/20 transition-all"
          >
            <Bell size={18} />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-yellow-500 text-[10px] font-black text-[#0d2a12] rounded-full flex items-center justify-center shadow-md animate-bounce">
                {notifications.length}
              </span>
            )}
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="p-2 text-white bg-white/10 rounded-[5px] hover:bg-white/20 transition-all"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-30 md:hidden"
            />
            {/* Drawer */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-18 bottom-0 left-0 w-4/5 max-w-sm bg-gradient-to-b from-[#1b5122] to-[#0d2a12] text-white p-6 z-35 flex flex-col md:hidden shadow-2xl"
            >
              <div className="mb-6 p-4 bg-white/5 rounded-[5px] border border-white/10">
                <p className="font-bold text-sm text-[#a3e635]">{studentInfo.full_name}</p>
                <p className="text-xs text-white/70 mt-1">{studentInfo.turma}</p>
                <p className="text-[10px] text-white/50 font-medium mt-1">Nº Matrícula: {studentInfo.nº_matricula}</p>
              </div>

              <nav className="space-y-2 flex-grow">
                <button 
                  onClick={() => { setActiveTab('grades'); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-[5px] font-bold text-sm transition-all ${activeTab === 'grades' ? 'bg-[#a3e635] text-[#0d2a12]' : 'text-white/70'}`}
                >
                  <Award size={18} /> Minhas Notas
                </button>
                <button 
                  onClick={() => { setActiveTab('schedule'); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-[5px] font-bold text-sm transition-all ${activeTab === 'schedule' ? 'bg-[#a3e635] text-[#0d2a12]' : 'text-white/70'}`}
                >
                  <Calendar size={18} /> Horário das Aulas
                </button>
                <button 
                  onClick={() => { setActiveTab('payments'); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-[5px] font-bold text-sm transition-all ${activeTab === 'payments' ? 'bg-[#a3e635] text-[#0d2a12]' : 'text-white/70'}`}
                >
                  <CreditCard size={18} /> Propinas / Pagamentos
                </button>
                <button 
                  onClick={() => { setActiveTab('notices'); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-[5px] font-bold text-sm transition-all ${activeTab === 'notices' ? 'bg-[#a3e635] text-[#0d2a12]' : 'text-white/70'}`}
                >
                  <FileText size={18} /> Comunicados
                </button>
              </nav>

              <button 
                onClick={handleLogout}
                className="w-full mt-auto flex items-center justify-center gap-2 bg-red-600/20 border border-red-500/30 text-red-100 py-3.5 rounded-[5px] font-bold text-sm active:scale-[0.98] transition-all"
              >
                <LogOut size={16} /> Terminar Sessão
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Pane */}
      <main className="flex-grow p-6 sm:p-10 md:p-12 overflow-y-auto max-w-7xl mx-auto w-full">
        
        {/* Page Title & Notifications Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 border-b border-gray-200 pb-8">
          <div>
            <div className="flex items-center gap-2 text-[#2E7D32] text-xs font-bold uppercase tracking-widest mb-2">
              <span className="w-1.5 h-1.5 bg-[#2E7D32] rounded-full" />
              Portal do Estudante
            </div>
            <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
              Olá, {studentInfo.full_name?.split(' ')[0]}!
            </h1>
            <p className="text-sm text-gray-500 mt-1">Consulte o seu progresso letivo, histórico financeiro e cronograma das aulas no mesmo espaço.</p>
          </div>

          {/* Notifications Trigger - Desktop */}
          <button 
            onClick={() => setShowNotificationsModal(true)}
            className="hidden sm:flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-700 px-5 py-3.5 border border-gray-200 rounded-[5px] shadow-sm transition-all active:scale-[0.98] shrink-0 relative"
          >
            <Bell size={20} className="text-[#2E7D32]" />
            <span className="font-bold text-sm">Quadro de Avisos</span>
            {notifications.length > 0 && (
              <span className="w-5 h-5 bg-yellow-500 text-[#0d2a12] text-[11px] font-black rounded-full flex items-center justify-center shadow-sm">
                {notifications.length}
              </span>
            )}
          </button>
        </div>

        {/* Quick KPI Overview widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Card 1: Average */}
          <div className="bg-white p-6 rounded-[5px] border border-gray-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-[#2E7D32] shrink-0">
              <Award size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Média Geral</p>
              <h3 className="text-2xl font-black text-gray-900 mt-1">16.14 <span className="text-xs text-gray-400 font-normal">/ 20</span></h3>
            </div>
          </div>

          {/* Card 2: Attendance */}
          <div className="bg-white p-6 rounded-[5px] border border-gray-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 shrink-0">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Presenças</p>
              <h3 className="text-2xl font-black text-gray-900 mt-1">96.8% <span className="text-[10px] text-green-600 font-bold">excelente</span></h3>
            </div>
          </div>

          {/* Card 3: Finance status */}
          <div className="bg-white p-6 rounded-[5px] border border-gray-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isTuitionOK ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
              <CreditCard size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Propina (Maio)</p>
              <h3 className={`text-md font-black mt-1 uppercase ${isTuitionOK ? 'text-[#2E7D32]' : 'text-amber-600'}`}>
                {isTuitionOK ? 'Regularizada' : 'Pendente'}
              </h3>
            </div>
          </div>

          {/* Card 4: Basic Student Meta */}
          <div className="bg-white p-6 rounded-[5px] border border-gray-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 shrink-0">
              <User size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Sala / Número</p>
              <h3 className="text-md font-black text-gray-900 mt-1">{studentInfo.sala} — Nº {studentInfo.numero}</h3>
            </div>
          </div>
        </div>

        {/* Tab section container */}
        <div className="bg-white rounded-[5px] shadow-sm border border-gray-200 overflow-hidden">
          
          {/* Header tabs selector - Only visible on desktop/md */}
          <div className="hidden md:flex border-b border-gray-200 bg-gray-50/50 p-2">
            <button 
              onClick={() => setActiveTab('grades')}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-[5px] text-sm font-bold transition-all ${activeTab === 'grades' ? 'bg-white text-[#2E7D32] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <Award size={16} /> Meu Boletim de Notas
            </button>
            <button 
              onClick={() => setActiveTab('schedule')}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-[5px] text-sm font-bold transition-all ${activeTab === 'schedule' ? 'bg-white text-[#2E7D32] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <Calendar size={16} /> Horário Semanal
            </button>
            <button 
              onClick={() => setActiveTab('payments')}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-[5px] text-sm font-bold transition-all ${activeTab === 'payments' ? 'bg-white text-[#2E7D32] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <CreditCard size={16} /> Propinas & Emolumentos
            </button>
            <button 
              onClick={() => setActiveTab('notices')}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-[5px] text-sm font-bold transition-all ${activeTab === 'notices' ? 'bg-white text-[#2E7D32] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <FileText size={16} /> Comunicados da Direcção
            </button>
          </div>

          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              {/* TAB 1: BOLETIM DE NOTAS */}
              {activeTab === 'grades' && (
                <motion.div 
                  key="grades"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Classificações e Notas</h3>
                      <p className="text-xs text-gray-400 mt-1">Notas correspondentes ao 1º e 2º Trimestres do Ano Lectivo 2026.</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs bg-emerald-50 text-[#2E7D32] px-3 py-1.5 rounded-[5px] font-bold">
                      <TrendingUp size={14} /> Média Ponderada Alta
                    </div>
                  </div>

                  <div className="overflow-x-auto border border-gray-100 rounded-[5px]">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-black tracking-widest text-gray-400 uppercase">
                          <th className="py-4 px-6">Disciplina</th>
                          <th className="py-4 px-4 text-center">P1</th>
                          <th className="py-4 px-4 text-center">P2</th>
                          <th className="py-4 px-4 text-center">MAC</th>
                          <th className="py-4 px-4 text-center">Média Trim.</th>
                          <th className="py-4 px-6 text-center">Situação</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-sm">
                        {grades.map((g, idx) => (
                          <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                            <td className="py-4 px-6 font-bold text-gray-900">{g.disciplina}</td>
                            <td className="py-4 px-4 text-center font-semibold text-gray-600">{g.p1}</td>
                            <td className="py-4 px-4 text-center font-semibold text-gray-600">{g.p2}</td>
                            <td className="py-4 px-4 text-center font-semibold text-gray-600">{g.mac}</td>
                            <td className="py-4 px-4 text-center">
                              <span className={`font-black px-2.5 py-1 rounded-[5px] ${g.media >= 14 ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-700'}`}>
                                {g.media.toFixed(1)}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-center">
                              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-[#2E7D32] text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                                <CheckCircle2 size={12} /> {g.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Informative Disclaimer */}
                  <div className="p-4 bg-orange-50 border-l-4 border-orange-400 text-orange-700 text-xs rounded-r-[5px] leading-relaxed">
                    <strong>Atenção:</strong> As notas exibidas neste portal são provisórias até à publicação oficial do boletim de notas físico assinado pela Secretaria Geral e pela Direção Pedagógica.
                  </div>
                </motion.div>
              )}

              {/* TAB 2: HORARIO SEMANAL */}
              {activeTab === 'schedule' && (
                <motion.div 
                  key="schedule"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Horário Curricular</h3>
                    <p className="text-xs text-gray-400 mt-1">Grade horária semanal das matérias do período da Tarde (Informática de Gestão).</p>
                  </div>

                  <div className="overflow-x-auto border border-gray-100 rounded-[5px]">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-black tracking-widest text-gray-400 uppercase">
                          <th className="py-4 px-4 w-32">Horário</th>
                          <th className="py-4 px-4">Segunda</th>
                          <th className="py-4 px-4">Terça</th>
                          <th className="py-4 px-4">Quarta</th>
                          <th className="py-4 px-4">Quinta</th>
                          <th className="py-4 px-4">Sexta</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-xs font-semibold text-gray-700">
                        {schedule.map((item, idx) => (
                          <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                            <td className="py-4 px-4 font-black flex items-center gap-1.5 text-[#2E7D32] bg-gray-50/20">
                              <Clock size={12} /> {item.hora}
                            </td>
                            <td className="py-4 px-4 border-l border-gray-50">{item.segunda}</td>
                            <td className="py-4 px-4 border-l border-gray-50">{item.terca}</td>
                            <td className="py-4 px-4 border-l border-gray-50 bg-green-50/10 font-bold">{item.quarta}</td>
                            <td className="py-4 px-4 border-l border-gray-50">{item.quinta}</td>
                            <td className="py-4 px-4 border-l border-gray-50">{item.sexta}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: PROPINAS / FINANCEIRO */}
              {activeTab === 'payments' && (
                <motion.div 
                  key="payments"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Histórico de Propinas</h3>
                      <p className="text-xs text-gray-400 mt-1">Valores mensais de propinas e confirmações para o ano letivo.</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-[5px] px-4 py-2 text-xs font-bold text-gray-700">
                      Total Pago: <span className="text-[#2E7D32] font-black">{activePaymentsCount} Meses</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {payments.map((p, idx) => (
                      <div 
                        key={idx} 
                        className={`p-5 rounded-[5px] border flex flex-col justify-between h-44 transition-all hover:shadow-md ${p.status === 'Pago' ? 'bg-green-50/10 border-green-100' : 'bg-white border-gray-100'}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-gray-900 text-lg">{p.mes}</span>
                          <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-[5px] tracking-wider ${
                            p.status === 'Pago' ? 'bg-green-100 text-green-800' :
                            p.status === 'Pendente' ? 'bg-yellow-50 border border-yellow-200 text-yellow-800' :
                            'bg-red-55 border border-red-200 text-red-800'
                          }`}>
                            {p.status}
                          </span>
                        </div>
                        
                        <div className="my-3 text-xs text-gray-500">
                          <p className="font-bold text-gray-800 text-sm">{new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(p.valor)}</p>
                          {p.dataPagamento && <p className="mt-1">Pago em: {p.dataPagamento}</p>}
                          {p.recibo && <p className="mt-0.5">Nº Recibo: {p.recibo}</p>}
                        </div>

                        {p.status === 'Pago' ? (
                          <div className="flex items-center gap-1.5 text-[10px] text-[#2E7D32] font-bold uppercase tracking-wider mt-auto">
                            <FileCheck size={14} /> Recibo Confirmado
                          </div>
                        ) : (
                          <button className="text-[10px] bg-gray-950 hover:bg-gray-800 text-white font-black uppercase text-center py-2 px-3 rounded-[5px] tracking-widest mt-auto transition-colors active:scale-95">
                            Emitir Guia
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* TAB 4: COMUNICADOS */}
              {activeTab === 'notices' && (
                <motion.div 
                  key="notices"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Mural de Avisos da Direcção</h3>
                    <p className="text-xs text-gray-400 mt-1">Fique por dentro das datas, comunicados e regras do Complexo Escolar.</p>
                  </div>

                  <div className="space-y-6">
                    {notices.map((n) => (
                      <div key={n.id} className="p-6 bg-gray-50/50 border border-gray-100 rounded-[5px] hover:border-[#2E7D32]/20 hover:bg-white hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-between mb-3.5 flex-wrap gap-2">
                          <span className="text-[10px] bg-[#2E7D32]/10 text-[#2E7D32] font-black px-2.5 py-1 rounded-[5px] uppercase tracking-wider">
                            {n.categoria}
                          </span>
                          <span className="text-xs text-gray-400 font-bold">{n.data}</span>
                        </div>
                        <h4 className="text-lg font-black text-gray-950 uppercase tracking-tight mb-2 leading-snug">{n.titulo}</h4>
                        <p className="text-sm text-gray-600 leading-relaxed font-normal">{n.conteudo}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Notifications Drawer Modal */}
      <AnimatePresence>
        {showNotificationsModal && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNotificationsModal(false)}
              className="fixed inset-0 bg-black"
            />
            {/* Modal Box */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[5px] shadow-2xl w-full max-w-lg p-8 relative z-10 border border-gray-100"
            >
              <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Bell size={20} className="text-[#2E7D32]" />
                  <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Lembretes & Avisos</h3>
                </div>
                <button 
                  onClick={() => setShowNotificationsModal(false)}
                  className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-150 rounded-full transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                {notifications.map((notif, index) => (
                  <div key={index} className="flex gap-3.5 p-4 bg-amber-50/40 rounded-[5px] border border-amber-50 text-amber-900">
                    <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-sm leading-relaxed font-semibold">{notif}</p>
                  </div>
                ))}
                {notifications.length === 0 && (
                  <div className="text-center py-8 text-gray-400 font-bold">
                    Nenhum lembrete importante no momento.
                  </div>
                )}
              </div>

              <div className="mt-8 pt-4 border-t border-gray-1 bg-white text-right">
                <button 
                  onClick={() => setShowNotificationsModal(false)}
                  className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-6 py-2.5 rounded-[5px] font-bold text-sm transition-all"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
