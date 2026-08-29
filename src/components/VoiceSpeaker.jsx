import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const VoiceSpeaker = ({ text, label, className = "", size = "normal" }) => {
  const { speak, stopSpeaking, isSpeaking, t } = useLanguage();

  const handleToggle = (e) => {
    e.stopPropagation();
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(text);
    }
  };

  const isSmall = size === "small";
  const isLarge = size === "large";

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`inline-flex items-center justify-center gap-2 font-bold rounded-2xl transition-all shadow-md active:scale-95 border ${
        isSpeaking
          ? 'bg-rose-500/20 text-rose-300 border-rose-400/50 hover:bg-rose-500/30 ring-2 ring-rose-400/50 animate-pulse'
          : 'bg-cyan-500/15 text-cyan-300 border-cyan-400/40 hover:bg-cyan-500/25 hover:border-cyan-300 hover:text-white shadow-cyan-900/20'
      } ${
        isLarge
          ? 'px-6 py-3.5 text-base sm:text-lg min-h-[52px]'
          : isSmall
          ? 'px-3 py-1.5 text-xs min-h-[36px]'
          : 'px-4 py-2 text-sm min-h-[42px]'
      } ${className}`}
      title={isSpeaking ? "Stop Voice Narration" : "Listen in Selected Language"}
    >
      {isSpeaking ? (
        <>
          <VolumeX className={isLarge ? "w-5 h-5 text-rose-400" : "w-4 h-4 text-rose-400"} />
          <span>{t('speaking')}</span>
          <span className="flex gap-0.5 ml-1">
            <span className="w-1 h-3 bg-rose-400 animate-pulse rounded-full" />
            <span className="w-1 h-4 bg-rose-400 animate-pulse rounded-full delay-75" />
            <span className="w-1 h-2 bg-rose-400 animate-pulse rounded-full delay-150" />
          </span>
        </>
      ) : (
        <>
          <Volume2 className={isLarge ? "w-6 h-6 text-cyan-400" : "w-4 h-4 text-cyan-400"} />
          <span>{label || t('listen')}</span>
        </>
      )}
    </button>
  );
};

export default VoiceSpeaker;

