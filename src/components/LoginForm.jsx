import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, LogIn, Compass, Waves, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const LoginForm = () => {
  const navigate = useNavigate();
  const { loginWithEmail, loginWithGoogle, loading } = useAuth();
  const { t } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitFeedback, setSubmitFeedback] = useState(null);

  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = t('errEmailRequired');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = t('errEmailInvalid');
    }

    if (!password) {
      errs.password = t('errPasswordRequired');
    } else if (password.length < 6) {
      errs.password = t('errPasswordShort');
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitFeedback({ type: 'info', message: t('loggingIn') });
      await loginWithEmail(email, password);
      setSubmitFeedback({ type: 'success', message: 'Authentication successful! Loading marine radar...' });
      setTimeout(() => {
        navigate('/location');
      }, 400);
    } catch (err) {
      setSubmitFeedback({ type: 'error', message: 'Login failed. Please check credentials.' });
    }
  };

  const handleGoogleSubmit = async () => {
    try {
      setSubmitFeedback({ type: 'info', message: 'Connecting to Google Secure Marine Gateway...' });
      await loginWithGoogle();
      setSubmitFeedback({ type: 'success', message: 'Google Authentication successful! Opening ocean radar...' });
      setTimeout(() => {
        navigate('/location');
      }, 400);
    } catch (err) {
      setSubmitFeedback({ type: 'error', message: 'Google Sign-in failed. Please retry.' });
    }
  };

  // Quick autofill demo credentials helper for easy testing
  const fillDemoCredentials = () => {
    setEmail('captain.sagar@orca.marine');
    setPassword('orca2026');
    setErrors({});
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Login Card Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 shadow-lg shadow-cyan-500/25 ring-2 ring-cyan-300/30 mb-4 animate-float">
          <span className="text-3xl filter drop-shadow">🐋</span>
        </div>
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-2xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-sky-200 to-white">
            {t('appName')}
          </span>
          <span className="px-2 py-0.5 text-[11px] font-bold tracking-wide uppercase rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
            SIH 2026
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {t('loginTitle')}
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-1.5 max-w-xs mx-auto">
          {t('loginSubtitle')}
        </p>
      </div>

      {/* Demo Credentials Quick-Chip */}
      <div className="mb-6 p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/20 flex items-center justify-between">
        <div className="text-xs text-cyan-200 flex items-center gap-1.5">
          <Waves className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Quick Demo Account</span>
        </div>
        <button
          type="button"
          onClick={fillDemoCredentials}
          className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-400/30 transition-all"
        >
          Auto-fill
        </button>
      </div>

      {/* Feedback Banner */}
      {submitFeedback && (
        <div
          className={`mb-6 p-3.5 rounded-xl text-sm flex items-center gap-2.5 transition-all ${
            submitFeedback.type === 'success'
              ? 'bg-emerald-500/20 border border-emerald-400/40 text-emerald-200'
              : submitFeedback.type === 'error'
              ? 'bg-rose-500/20 border border-rose-400/40 text-rose-200'
              : 'bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 animate-pulse'
          }`}
        >
          {submitFeedback.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : submitFeedback.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          ) : (
            <Compass className="w-5 h-5 text-cyan-400 shrink-0 animate-spin" />
          )}
          <span className="font-medium">{submitFeedback.message}</span>
        </div>
      )}

      {/* Main Email/Password Form */}
      <form onSubmit={handleEmailSubmit} className="space-y-5" noValidate>
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-200 mb-1.5">
            {t('emailLabel')} <span className="text-cyan-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-5 h-5 text-cyan-400/80" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
              }}
              placeholder={t('emailPlaceholder')}
              className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-ocean-900/90 text-white placeholder-slate-400 border text-base transition-all focus:outline-none focus:ring-2 min-h-[52px] ${
                errors.email
                  ? 'border-rose-400 focus:ring-rose-400/50 bg-rose-950/20'
                  : 'border-cyan-500/30 focus:border-cyan-400 focus:ring-cyan-400/40 focus:bg-ocean-850'
              }`}
            />
          </div>
          {errors.email && (
            <p className="mt-1.5 text-xs sm:text-sm font-medium text-rose-400 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="password" className="block text-sm font-semibold text-slate-200">
              {t('passwordLabel')} <span className="text-cyan-400">*</span>
            </label>
            <button
              type="button"
              onClick={() => alert("Password reset link will be sent to registered mobile/email in the production build.")}
              className="text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 underline-offset-2 hover:underline focus:outline-none"
            >
              {t('forgotPassword')}
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-5 h-5 text-cyan-400/80" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
              }}
              placeholder={t('passwordPlaceholder')}
              className={`w-full pl-11 pr-12 py-3.5 rounded-xl bg-ocean-900/90 text-white placeholder-slate-400 border text-base transition-all focus:outline-none focus:ring-2 min-h-[52px] ${
                errors.password
                  ? 'border-rose-400 focus:ring-rose-400/50 bg-rose-950/20'
                  : 'border-cyan-500/30 focus:border-cyan-400 focus:ring-cyan-400/40 focus:bg-ocean-850'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-cyan-300 focus:outline-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-xs sm:text-sm font-medium text-rose-400 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.password}
            </p>
          )}
        </div>

        {/* Submit Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 px-6 rounded-xl font-extrabold text-base sm:text-lg text-ocean-950 bg-gradient-to-r from-cyan-400 via-sky-400 to-marine-neon hover:from-cyan-300 hover:to-sky-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/40 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 min-h-[54px] disabled:opacity-60 cursor-pointer"
        >
          {loading ? (
            <>
              <Compass className="w-5 h-5 animate-spin" />
              <span>{t('loggingIn')}</span>
            </>
          ) : (
            <>
              <LogIn className="w-5 h-5" />
              <span>{t('loginButton')}</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-7">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-ocean-700/60"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-ocean-900/90 px-4 text-slate-400 font-bold tracking-widest border border-cyan-500/20 rounded-full py-0.5">
            {t('orDivider')}
          </span>
        </div>
      </div>

      {/* Google Login Button */}
      <button
        type="button"
        onClick={handleGoogleSubmit}
        disabled={loading}
        className="w-full py-3.5 px-6 rounded-xl font-bold text-base text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-3 min-h-[54px] cursor-pointer"
      >
        {/* Official Google Vector Icon */}
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>{t('googleLogin')}</span>
      </button>

      {/* Footer link to create account */}
      <div className="mt-8 text-center text-sm text-slate-300">
        <span>{t('noAccount')} </span>
        <button
          type="button"
          onClick={() => {
            fillDemoCredentials();
            alert("Prototype note: Use standard demo login or Google login to proceed directly to the location flow.");
          }}
          className="font-bold text-cyan-400 hover:text-cyan-300 underline-offset-2 hover:underline focus:outline-none ml-1"
        >
          {t('createAccount')}
        </button>
      </div>
    </div>
  );
};

export default LoginForm;

