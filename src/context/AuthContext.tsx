import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  isEditor: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  isEditor: false
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Modo offline/hardcode: Desativamos a escuta do Supabase
    setLoading(false);
    setUser(null);
    setIsAdmin(false);
  }, []);

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
    isEditor: isAdmin // Simplified for single admin model
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
