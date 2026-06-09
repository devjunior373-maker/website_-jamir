import React, { useState } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { LogIn, UserPlus, Mail, Lock, Loader2, User, BookOpen, UserCheck, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [accessCode, setAccessCode] = useState('');
  
  // Touched states for real-time validation feedback
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [fullNameTouched, setFullNameTouched] = useState(false);
  const [accessCodeTouched, setAccessCodeTouched] = useState(false);
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Pure validation functions
  const getUsernameError = (val: string) => {
    if (!val) return 'O nome de usuário é obrigatório.';
    if (val.trim().length < 3) return 'Mínimo de 3 caracteres.';
    const regex = /^[a-zA-Z0-9._-]+$/;
    if (!regex.test(val.trim())) return 'Use apenas letras, números, ._ ou -. Sem espaços.';
    return null;
  };

  const getAccessCodeError = (val: string) => {
    if (!val) return 'O código de ativação é obrigatório.';
    if (val.trim().length < 5) return 'Mínimo de 5 caracteres.';
    return null;
  };

  const getLoginPasswordError = (val: string) => {
    if (!val) return 'A senha é obrigatória.';
    if (val.length < 4) return 'A senha precisa ter pelo menos 4 caracteres.';
    return null;
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);

    const emailErr = getUsernameError(email);
    const passErr = getLoginPasswordError(password);

    if (emailErr) {
      setError(emailErr);
      return;
    }
    if (passErr) {
      setError(passErr);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const trimmedInput = email.trim();
      const upperInput = trimmedInput.toUpperCase();
      const lowerInput = trimmedInput.toLowerCase();

      // Deliberate aesthetic delay to proudly showcase the spinning loader
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check simulated local storage users
      const simulatedUsers = JSON.parse(localStorage.getItem('jamir_simulated_users') || '[]');
      const matchedUser = simulatedUsers.find(
        (u: any) => 
          (u.username && u.username.toLowerCase() === lowerInput && u.password === password) ||
          (u.username && u.username.toLowerCase() === lowerInput && u.accessCode && u.accessCode.toUpperCase() === password.toUpperCase()) ||
          (u.email && u.email.toLowerCase() === lowerInput && u.password === password) ||
          (u.accessCode && u.accessCode.toUpperCase() === upperInput)
      );

      if (matchedUser) {
        login(matchedUser.email, matchedUser.role, matchedUser.metadata);
        setSuccess(`Sucesso! Bem-vindo de volta, ${matchedUser.metadata.full_name}.`);
        setTimeout(() => {
          if (matchedUser.role === 'student') {
            navigate("/aluno", { replace: true });
          } else {
            navigate("/admin", { replace: true });
          }
        }, 1000);
        return;
      }

      // Hardcoded offline credentials for Student Portal
      if ((lowerInput === 'aluno@jamir.com' || lowerInput === 'aluno') && password === 'aluno1') {
        login('aluno@jamir.com', 'student', { 
          full_name: 'Carlos Jamir',
          turma: '12ª Classe - Informática de Gestão',
          nº_matricula: '2026/04812',
          numero: '12',
          sala: 'Sala 06',
          periodo: 'Tarde'
        });
        setSuccess("Sucesso! Entrando no portal...");
        setTimeout(() => {
          navigate("/aluno", { replace: true });
        }, 800);
        return;
      }

      // Hardcoded offline credentials for Admin Dashboard
      if ((lowerInput === 'admin@jamir.com' || lowerInput === 'admin' || lowerInput === 'devjunior373@gmail.com') && password === 'admin') {
        login(lowerInput.includes('@') ? lowerInput : 'admin@jamir.com', 'admin', {
          full_name: 'Diretor Jamir',
          cargo: 'Administrador Geral'
        });
        setSuccess("Sucesso! Entrando no painel de administração...");
        setTimeout(() => {
          navigate("/admin", { replace: true });
        }, 800);
        return;
      }

      // Supabase fallback if configured or active
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: lowerInput.includes('@') ? lowerInput : `${lowerInput}@jamir.com`,
        password,
      });

      if (signInError) throw signInError;
      
      const assumedRole = lowerInput.includes('aluno') ? 'student' : 'admin';
      login(lowerInput, assumedRole, { full_name: lowerInput.split('@')[0].toUpperCase() });

      setSuccess("Autenticado pelo Supabase! Entrando...");
      setTimeout(() => {
        if (assumedRole === 'student') {
          navigate("/aluno", { replace: true });
        } else {
          navigate("/admin", { replace: true });
        }
      }, 800);
    } catch (err: any) {
      console.error(err);
      setError("Nome de usuário ou senha incorretos.");
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setFullNameTouched(true);
    setAccessCodeTouched(true);

    const nameErr = getUsernameError(fullName);
    const codeErr = getAccessCodeError(accessCode);

    if (nameErr) {
      setError(nameErr);
      return;
    }
    if (codeErr) {
      setError(codeErr);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    const trimmedName = fullName.trim();
    const trimmedCode = accessCode.trim().toUpperCase();

    try {
      // Deliberate delay to proudy showcase the spinning loader
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check duplicate in simulated database
      const simulatedUsers = JSON.parse(localStorage.getItem('jamir_simulated_users') || '[]');
      const usernameLower = trimmedName.toLowerCase();
      if (
        simulatedUsers.some((u: any) => u.username && u.username.toLowerCase() === usernameLower) ||
        simulatedUsers.some((u: any) => u.accessCode && u.accessCode.toUpperCase() === trimmedCode)
      ) {
        setError("Este Nome de Usuário ou Código de Ativação já está cadastrado.");
        setLoading(false);
        return;
      }

      // Create rich customized profile metadata
      const simulatedUser = {
        email: `${trimmedName.replace(/\s+/g, '.').toLowerCase()}@jamir.com`,
        username: trimmedName,
        password: trimmedCode, // unique access code serves as their password
        accessCode: trimmedCode,
        role: 'student',
        metadata: {
          full_name: trimmedName,
          turma: '10ª Classe - Técnico de Informática',
          nº_matricula: `2026/${Math.floor(10000 + Math.random() * 90000)}`,
          numero: String(Math.floor(1 + Math.random() * 32)),
          sala: `Sala 0${Math.floor(1 + Math.random() * 9)}`,
          periodo: 'Manhã'
        }
      };

      // Store in register simulation
      simulatedUsers.push(simulatedUser);
      localStorage.setItem('jamir_simulated_users', JSON.stringify(simulatedUsers));

      // Attempt actual Supabase sign up in background but don't block
      try {
        await supabase.auth.signUp({
          email: simulatedUser.email,
          password: simulatedUser.password,
          options: {
            data: {
              full_name: trimmedName,
              role: 'student',
              turma: '10ª Classe - Técnico de Informática'
            }
          }
        });
      } catch (suppressedErr) {
        console.warn("Supabase backup signUp bypassed offline:", suppressedErr);
      }

      // Log in right away!
      login(simulatedUser.email, simulatedUser.role, simulatedUser.metadata);
      setSuccess("Sua conta foi criada com sucesso! Redirecionando...");
      
      setTimeout(() => {
        navigate("/aluno", { replace: true });
      }, 1500);

    } catch (err: any) {
      console.error(err);
      setError("Erro ao criar conta: " + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/img.png" 
          alt="Login Background" 
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-green-950/20 backdrop-blur-[2px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg w-full bg-white/95 backdrop-blur-md rounded-[5px] shadow-2xl p-8 sm:p-10 border border-white/20 relative z-10 transition-all"
      >
        <div className="text-center mb-6 flex flex-col items-center justify-center">
          <img 
            src="/logo.png" 
            alt="Logo Complexo Jamir" 
            className="h-24 w-auto object-contain mx-auto"
          />
        </div>

        {/* Dynamic Nav Switch Tabs */}
        <div className="flex border-b border-gray-100 mb-8">
          <button
            type="button"
            onClick={() => { setIsRegister(false); setError(null); setSuccess(null); }}
            className={`flex-1 pb-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${!isRegister ? 'border-[#2E7D32] text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-650'}`}
          >
            Fazer Login
          </button>
          <button
            type="button"
            onClick={() => { setIsRegister(true); setError(null); setSuccess(null); }}
            className={`flex-1 pb-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${isRegister ? 'border-[#2E7D32] text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-650'}`}
          >
            Cadastrar
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-bold rounded-[3px] uppercase tracking-wide">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-800 text-xs font-bold rounded-[3px] uppercase tracking-wide flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-600 animate-bounce" />
            {success}
          </div>
        )}

        {!isRegister ? (
          /* Login Form */
          <form onSubmit={handleEmailLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <User size={14} className="text-[#2E7D32]" />
                Nome de Usuário
              </label>
              <input 
                required
                type="text" 
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailTouched(true);
                }}
                onBlur={() => setEmailTouched(true)}
                className={`w-full bg-gray-50 border rounded-[5px] px-4 py-3 focus:outline-none transition-colors ${
                  emailTouched && getUsernameError(email)
                    ? 'border-red-400 focus:border-red-500 bg-red-50/10'
                    : email && emailTouched && !getUsernameError(email)
                      ? 'border-green-500 focus:border-[#2E7D32] bg-green-50/10'
                      : 'border-gray-100 focus:border-[#2E7D32]'
                }`}
                placeholder="Ex: aluno ou carlos.jamir" 
              />
              {emailTouched && getUsernameError(email) && (
                <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-1 px-1">
                  ✕ {getUsernameError(email)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Lock size={14} className="text-[#2E7D32]" />
                Senha
              </label>
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordTouched(true);
                }}
                onBlur={() => setPasswordTouched(true)}
                className={`w-full bg-gray-50 border rounded-[5px] px-4 py-3 focus:outline-none transition-colors ${
                  passwordTouched && getLoginPasswordError(password)
                    ? 'border-red-400 focus:border-red-500 bg-red-50/10'
                    : password && passwordTouched && !getLoginPasswordError(password)
                      ? 'border-green-500 focus:border-[#2E7D32] bg-green-50/10'
                      : 'border-gray-100 focus:border-[#2E7D32]'
                }`}
                placeholder="••••••••" 
              />
              {passwordTouched && getLoginPasswordError(password) && (
                <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-1 px-1">
                  ✕ {getLoginPasswordError(password)}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white py-4 rounded-[5px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin text-white" size={20} />
                  <span>A entrar...</span>
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  <span>Entrar</span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* Register Form */
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <User size={14} className="text-[#2E7D32]" />
                Nome de Usuário
              </label>
              <input 
                required
                type="text" 
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  setFullNameTouched(true);
                }}
                onBlur={() => setFullNameTouched(true)}
                className={`w-full bg-gray-50 border rounded-[5px] px-4 py-3 focus:outline-none transition-colors ${
                  fullNameTouched && getUsernameError(fullName)
                    ? 'border-red-400 focus:border-red-500 bg-red-50/10'
                    : fullName && fullNameTouched && !getUsernameError(fullName)
                      ? 'border-green-500 focus:border-[#2E7D32] bg-green-50/10'
                      : 'border-gray-100 focus:border-[#2E7D32]'
                }`}
                placeholder="Ex: carlos.jamir" 
              />
              {fullNameTouched && getUsernameError(fullName) && (
                <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-1 px-1">
                  ✕ {getUsernameError(fullName)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Lock size={14} className="text-[#2E7D32]" />
                Código de Ativação
              </label>
              <input 
                required
                type="text" 
                value={accessCode}
                onChange={(e) => {
                  setAccessCode(e.target.value);
                  setAccessCodeTouched(true);
                }}
                onBlur={() => setAccessCodeTouched(true)}
                className={`w-full bg-gray-50 border rounded-[5px] px-4 py-3 focus:outline-none transition-colors ${
                  accessCodeTouched && getAccessCodeError(accessCode)
                    ? 'border-red-400 focus:border-red-500 bg-red-50/10'
                    : accessCode && accessCodeTouched && !getAccessCodeError(accessCode)
                      ? 'border-green-500 focus:border-[#2E7D32] bg-green-50/10'
                      : 'border-gray-100 focus:border-[#2E7D32] animate-pulse'
                }`}
                placeholder="Ex: JAMIR-123456" 
              />
              {accessCodeTouched && getAccessCodeError(accessCode) && (
                <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-1 px-1">
                  ✕ {getAccessCodeError(accessCode)}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white py-4 rounded-[5px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95 disabled:opacity-50 text-xs"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin text-white" size={16} />
                  <span>A criar conta...</span>
                </>
              ) : (
                <>
                  <UserPlus size={16} />
                  <span>Criar Minha Conta</span>
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}

