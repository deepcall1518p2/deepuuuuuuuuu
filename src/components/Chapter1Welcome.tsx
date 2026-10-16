import React, { useState } from 'react';
import { KeyRound, Heart, Lock, AlertCircle } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';
import { soundEngine } from '../utils/audio';

interface Props {
  onUnlock: () => void;
}

export const Chapter1Welcome: React.FC<Props> = ({ onUnlock }) => {
  const [passkeyInput, setPasskeyInput] = useState('');
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playClick();

    const normalizedInput = passkeyInput.trim().toLowerCase();
    const targetPasskey = BIRTHDAY_CONFIG.passkey.trim().toLowerCase();

    // Check passkey match or bypass
    if (normalizedInput === targetPasskey || normalizedInput === 'open') {
      soundEngine.playChime();
      // Start the uploaded romantic music immediately upon unlocking!
      soundEngine.startMusic();
      onUnlock();
    } else {
      soundEngine.playAtmBeep();
      setError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[82vh] px-4 py-8 max-w-md mx-auto text-center">
      {/* Little Floating Lock Icon */}
      <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center shadow-inner mb-6 border border-rose-200/60 animate-pulse">
        <Lock className="w-7 h-7 stroke-[1.8]" />
      </div>

      {/* Recipient Title: Deepali (My Deepu) */}
      <h1 className="text-3xl sm:text-4xl font-serif-cormorant tracking-[0.2em] text-stone-900 font-semibold mb-1 uppercase">
        {BIRTHDAY_CONFIG.welcome.title}
      </h1>
      <p className="font-handwriting text-xl text-[#be185d] mb-3">
        (my sweetest Deepu ❤️)
      </p>

      {/* Romantic Subtitle */}
      <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed max-w-xs mb-8">
        {BIRTHDAY_CONFIG.welcome.subtitle}
      </p>

      {/* Passkey Card */}
      <div className="w-full bg-white/85 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-stone-200/70">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="text-left">
            <label htmlFor="passkey" className="block text-xs font-medium text-stone-600 mb-1.5 uppercase tracking-wider">
              {BIRTHDAY_CONFIG.welcome.passkeyLabel}
            </label>
            <div className={`relative flex items-center transition-all ${isShaking ? 'animate-bounce' : ''}`}>
              <div className="absolute left-3.5 text-stone-400 pointer-events-none">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                id="passkey"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={passkeyInput}
                onChange={(e) => {
                  setPasskeyInput(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="e.g. 1710"
                className={`w-full pl-10 pr-4 py-3 bg-stone-50 border rounded-xl text-stone-800 font-mono text-base focus:outline-none transition-colors ${
                  error ? 'border-rose-400 bg-rose-50/50' : 'border-stone-200 focus:border-rose-400 focus:bg-white'
                }`}
                autoComplete="off"
              />
            </div>
            
            {error && (
              <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                Oops! That passkey doesn&apos;t match. Try her birthday!
              </p>
            )}

            {/* Clean Hint requested by user: Hint: your birthday date and month */}
            <p className="mt-2 text-xs text-stone-500 flex items-center gap-1 leading-normal font-medium">
              <span>✨</span>
              <span>{BIRTHDAY_CONFIG.passkeyHint}</span>
            </p>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#9d174d] via-[#be185d] to-[#db2777] text-white font-medium text-sm tracking-wide shadow-md shadow-rose-900/15 hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{BIRTHDAY_CONFIG.welcome.buttonText}</span>
          </button>
        </form>
      </div>

      {/* Handcrafted Footer */}
      <div className="mt-8 flex items-center gap-1.5 text-xs text-stone-600 font-handwriting text-base">
        <span>{BIRTHDAY_CONFIG.welcome.footerText}</span>
        <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400 inline" />
      </div>
    </div>
  );
};
