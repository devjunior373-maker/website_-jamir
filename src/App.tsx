/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';
import { SupabaseConfigGate } from './components/SupabaseConfigGate';
import { ProtectedRoute } from './components/ProtectedRoute';
import SchoolHeader from './components/SchoolHeader';
import Hero from './components/Hero';
import UniqueFeatures from './components/UniqueFeatures';
import LatestNews from './components/LatestNews';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ChatAssistant from './components/ChatAssistant';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import CursosPage from './pages/CursosPage';

function HomePage() {
  return (
    <>
      <Hero />
      <UniqueFeatures />
      <LatestNews />
      <CTA />
    </>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const isLoginPage = location.pathname === '/login';
  const isMinimalPage = isAdminPage || isLoginPage;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!isMinimalPage && <SchoolHeader />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/galeria" element={<GalleryPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/cursos" element={<CursosPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      {!isMinimalPage && <Footer />}
      {!isMinimalPage && <ChatAssistant />}
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <SupabaseConfigGate>
        <AuthProvider>
          <Router>
            <AppContent />
          </Router>
        </AuthProvider>
      </SupabaseConfigGate>
    </ErrorBoundary>
  );
}







