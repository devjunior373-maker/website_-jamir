/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import SchoolHeader from './components/SchoolHeader';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import LatestNews from './components/LatestNews';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ChatAssistant from './components/ChatAssistant';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import CursosPage from './pages/CursosPage';
import StudentDashboard from './pages/StudentDashboard';
import PreInscricaoPage from './pages/PreInscricaoPage';

function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <LatestNews />
      <CTA />
    </>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const isLoginPage = location.pathname === '/login';
  const isAlunoPage = location.pathname.startsWith('/aluno');
  const isMinimalPage = isAdminPage || isLoginPage || isAlunoPage;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {!isMinimalPage && <SchoolHeader />}
      <main className="flex-grow flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex-grow flex flex-col"
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/sobre" element={<AboutPage />} />
              <Route path="/galeria" element={<GalleryPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/cursos" element={<CursosPage />} />
              <Route path="/pre-inscricao" element={<PreInscricaoPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/aluno" element={<StudentDashboard />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      {!isMinimalPage && <Footer />}
      {!isMinimalPage && <ChatAssistant />}
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}







