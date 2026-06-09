import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: any;
  loading: boolean;
  isAdmin: boolean;
  isEditor: boolean;
  login: (email: string, role: string, metadata: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  isEditor: false,
  login: () => {},
  logout: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore state from localStorage if available
    const savedUser = localStorage.getItem('jamir_user');
    const savedAdmin = localStorage.getItem('jamir_isAdmin');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedAdmin) {
      setIsAdmin(savedAdmin === 'true');
    }
    setLoading(false);
  }, []);

  const login = (email: string, role: string, metadata: any) => {
    const mockUser = {
      id: role === 'admin' ? 'admin-id-123' : 'student-id-456',
      email,
      role,
      user_metadata: metadata,
      displayName: metadata.full_name || 'Usuário',
      photoURL: null
    };
    setUser(mockUser);
    setIsAdmin(role === 'admin');
    localStorage.setItem('jamir_user', JSON.stringify(mockUser));
    localStorage.setItem('jamir_isAdmin', role === 'admin' ? 'true' : 'false');
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('jamir_user');
    localStorage.removeItem('jamir_isAdmin');
  };

  const fetchAdminStatus = async (userId: string, email?: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching admin status:', error);
        // Fallback for bootstrap admin
        if (email?.toLowerCase() === "devjunior373@gmail.com") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else if (data) {
        setIsAdmin(!!data.is_admin);
      }
    } catch (err) {
      console.error('Catch error in fetchAdminStatus:', err);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    isAdmin,
    isEditor: isAdmin, // Simplified for single admin model
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
