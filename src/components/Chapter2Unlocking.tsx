import React, { useEffect, useState } from 'react';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';
import { soundEngine } from '../utils/audio';

interface Props {
  onComplete: () => void;
}

export const Chapter2Unlocking: React.FC<Props> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fill progress over 3.5 seconds
    const interval = 35;
    const step = 100 / (BIRTHDAY_CONFIG.unlocking.durationMs / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(100, prev + step);
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const handleContinue = () => {
    soundEngine.playChime();
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#120f18] text-white flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
      {/* Background Starry Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: `${(i * 19) % 100}%`,
              left: `${(i * 27) % 100}%`,
              width: `${(i % 3) + 1.5}px`,
              height: `${(i % 3) + 1.5}px`,
              opacity: ((i % 5) + 3) / 10,
              animationDuration: `${2 + (i % 3)}s`,
              animationDelay: `${(i % 4) * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Magical Center Orb */}
      <div className="relative mb-10">
        {/* Outer glowing ripple rings */}
        <div className="absolute -inset-8 rounded-full border border-rose-400/20 animate-ping opacity-30" style={{ animationDuration: '3s' }} />
        <div className="absolute -inset-4 rounded-full border border-rose-400/30 animate-pulse" />
        
        {/* Center glowing orb */}
        <div className="relative w-32 h-32 rounded-full bg-gradient-to-tr from-[#831843] via-[#be185d] to-[#fb7185] flex items-center justify-center shadow-[0_0_50px_rgba(244,63,94,0.4)]">
          <Heart className="w-14 h-14 fill-white text-white drop-shadow-md animate-bounce" style={{ animationDuration: '1.8s' }} />
          
          {/* Orbiting sparkles */}
          <Sparkles className="absolute -top-2 -right-1 w-6 h-6 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <div className="absolute bottom-1 -left-2 text-rose-200 text-xs">✨</div>
        </div>
      </div>

      {/* Main Title */}
      <h2 className="text-2xl sm:text-3xl font-serif-cormorant font-semibold tracking-wide text-rose-100 mb-3">
        {BIRTHDAY_CONFIG.unlocking.title}
      </h2>

      {/* Subtitle */}
      <p className="text-sm text-rose-200/80 font-normal max-w-xs mb-8 leading-relaxed">
        {BIRTHDAY_CONFIG.unlocking.subtitle}
      </p>

      {/* Progress Bar */}
      <div className="w-64 max-w-xs bg-rose-950/60 rounded-full h-2 p-0.5 border border-rose-800/40 mb-8 overflow-hidden">
        <div
          className="bg-gradient-to-r from-rose-500 via-pink-400 to-amber-300 h-full rounded-full transition-all duration-150 shadow-[0_0_12px_rgba(251,113,133,0.7)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Tap to Enter Universe Button */}
      <div className={`transition-all duration-500 ${progress >= 85 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <button
          onClick={handleContinue}
          className="py-3 px-7 rounded-full bg-gradient-to-r from-rose-600 to-pink-500 text-white font-medium text-sm tracking-wide shadow-lg shadow-rose-900/40 hover:scale-105 active:scale-95 transition-transform flex items-center gap-2 cursor-pointer border border-rose-300/30"
        >
          <span>Step Inside</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
