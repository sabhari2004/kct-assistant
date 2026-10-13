import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Bot, Eye, EyeOff, GraduationCap, ShieldCheck } from 'lucide-react';
import { login, DEMO_STUDENT } from '../services/auth';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignIn = async (id: string, pwd: string) => {
    setLoading(true);
    setError(null);
    try {
      const user = await login(id, pwd);
      if (user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/chat', { replace: true });
      }
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code || '';
      if (code === 'auth/user-not-found' || code === 'auth/invalid-credential' || code === 'auth/wrong-password') {
        setError('Invalid email or password. Please try again.');
      } else if (code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please wait a moment and try again.');
      } else if (code === 'auth/network-request-failed') {
        setError('Network error. Please check your internet connection.');
      } else {
        setError('Sign in failed. Please check your credentials and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSignIn(identifier, password);
  };

  const quickLoginAdmin = () => {
    setIdentifier('admin');
    setPassword('admin123');
    handleSignIn('admin', 'admin123');
  };

  const quickLoginStudent = () => {
    setIdentifier('s@kct.ac.in');
    setPassword('12345678');
    handleSignIn('s@kct.ac.in', '12345678');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-indigo-600 flex-col items-center justify-center p-12 text-white">
        <div className="max-w-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Bot size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">KCT AI Assistant</h1>
              <p className="text-indigo-200 text-sm">Your Intelligent College Assistant</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4 leading-snug">
            AI-powered assistance for KCT students
          </h2>
          <p className="text-indigo-200 leading-relaxed mb-8">
            From academics and examinations to placements and campus facilities — KCT AI Assistant has you covered with information from official college documents.
          </p>
          <div className="space-y-3">
            {['24/7 AI-powered assistance', 'Official college information', 'Exam schedules & results', 'Placement updates'].map((f) => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <GraduationCap size={11} />
                </div>
                <span className="text-sm text-indigo-100">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">KCT AI Assistant</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Your Intelligent College Assistant</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">Welcome back</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Sign in to your KCT AI Assistant account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1.5">
                Email Address or Username
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="you@kct.ac.in or admin"
                required
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-700"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Password</label>
                <Link to="/forgot-password" className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-3 py-2.5 pr-10 rounded-xl border border-gray-200 dark:border-gray-700 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="px-3 py-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
              Register
            </Link>
          </p>

          {/* Quick Access Demo Badges */}
          <div className="mt-6 p-3.5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700">
            <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center mb-2.5">
              Instant Demo Access
            </p>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <button
                type="button"
                onClick={() => { setIdentifier(DEMO_STUDENT.email); setPassword('12345678'); }}
                className="px-2.5 py-1.5 text-xs font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 rounded-lg border border-indigo-200 dark:border-indigo-800 text-center transition-colors"
              >
                Fill Student
              </button>
              <button
                type="button"
                onClick={() => { setIdentifier('admin'); setPassword('admin123'); }}
                className="px-2.5 py-1.5 text-xs font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 rounded-lg border border-purple-200 dark:border-purple-800 text-center transition-colors"
              >
                Fill Admin
              </button>
            </div>
            <div className="space-y-1.5 pt-1 border-t border-gray-200/60 dark:border-gray-700/60">
              <button
                type="button"
                onClick={quickLoginStudent}
                className="w-full text-xs text-indigo-600 dark:text-indigo-400 py-1 hover:underline font-medium text-center flex items-center justify-center gap-1.5"
              >
                <GraduationCap size={13} />
                One-Click Student Login →
              </button>
              <button
                type="button"
                onClick={quickLoginAdmin}
                className="w-full text-xs text-purple-600 dark:text-purple-400 py-1 hover:underline font-medium text-center flex items-center justify-center gap-1.5"
              >
                <ShieldCheck size={13} />
                One-Click Admin Login →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
