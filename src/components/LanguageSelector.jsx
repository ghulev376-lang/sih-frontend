import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, Check, ChevronDown } from 'lucide-react';

const LanguageSelector = ({ variant = 'dropdown' }) => {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', label: 'English', native: 'English', flag: '🌐' },
    { code: 'mr', label: 'Marathi', native: 'मराठी', flag: '🚩' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  ];

  const currentLanguage = languages.find((l) => l.code === lang) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'pills') {
    return (
      <div className="flex items-center gap-1.5 p-1 bg-ocean-900/80 border border-cyan-500/20 rounded-xl">
        {languages.map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              lang === l.code
                ? 'bg-cyan-500 text-ocean-950 shadow-md shadow-cyan-500/20 scale-102'
                : 'text-slate-300 hover:text-white hover:bg-ocean-800'
            }`}
          >
            <span>{l.flag}</span>
            <span>{l.native}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-cyan-200 bg-ocean-900/90 border border-cyan-500/30 rounded-xl hover:bg-ocean-800/90 hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 shadow-sm transition-all"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-4 h-4 text-cyan-400 animate-pulse-slow" />
        <span>{currentLanguage.native}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-cyan-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-xl bg-ocean-900 border border-cyan-500/30 shadow-xl shadow-ocean-950/80 backdrop-blur-xl ring-1 ring-black/5 focus:outline-none overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          <div className="py-1 divide-y divide-ocean-800">
            {languages.map((item) => (
              <button
                key={item.code}
                onClick={() => {
                  setLang(item.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm font-medium flex items-center justify-between transition-colors ${
                  lang === item.code
                    ? 'bg-cyan-500/15 text-cyan-300 font-semibold'
                    : 'text-slate-200 hover:bg-ocean-800/80 hover:text-cyan-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{item.flag}</span>
                  <div>
                    <div>{item.native}</div>
                    <div className="text-xs text-slate-400 font-normal">{item.label}</div>
                  </div>
                </div>
                {lang === item.code && <Check className="w-4 h-4 text-cyan-400" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;

