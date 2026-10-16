import React from 'react';
import { Heart, Gift, Bookmark } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';
import { soundEngine } from '../utils/audio';

interface Props {
  onContinue: () => void;
  onBack: () => void;
}

export const Chapter3HappyBirthday: React.FC<Props> = ({ onContinue, onBack }) => {
  return (
    <div className="w-full flex flex-col items-center justify-between min-h-[82vh] px-4 py-4 max-w-md mx-auto text-center pb-24">
      {/* Date Header */}
      <div className="w-full flex items-center justify-center gap-3 text-stone-600 text-xs tracking-[0.2em] uppercase font-medium mb-3">
        <span className="h-[1px] w-12 bg-stone-300" />
        <span>{BIRTHDAY_CONFIG.happyBirthday.dateBadge}</span>
        <span className="h-[1px] w-12 bg-stone-300" />
      </div>

      {/* Hero Headline Section */}
      <div className="flex flex-col items-center mb-5">
        <p className="text-[11px] sm:text-xs tracking-[0.2em] font-medium text-stone-600 uppercase mb-2">
          {BIRTHDAY_CONFIG.happyBirthday.headlineTop}
        </p>
        
        <h1 className="text-3xl sm:text-4xl font-serif-cormorant font-bold text-stone-900 tracking-tight leading-tight mb-3">
          {BIRTHDAY_CONFIG.happyBirthday.headlineMain}
        </h1>

        {/* Recipient Name Box */}
        <div className="px-5 py-1.5 bg-[#9d174d] text-white font-serif-cormorant text-lg sm:text-xl tracking-[0.25em] uppercase font-semibold rounded-md shadow-sm mb-4">
          {BIRTHDAY_CONFIG.happyBirthday.nameBadge}
        </div>

        {/* Personalized Warm Greeting */}
        <p className="text-xs sm:text-sm text-stone-700 font-normal leading-relaxed max-w-xs">
          {BIRTHDAY_CONFIG.happyBirthday.message}
        </p>
      </div>

      {/* Polaroid / Paper Card with Heart & Washi Tape */}
      <div className="relative w-full max-w-[280px] bg-[#fbf9f4] p-5 pt-7 pb-6 rounded-xl shadow-md border border-[#e8ded1] flex flex-col items-center">
        {/* Top Washi Tape Accents */}
        <div className="absolute -top-2.5 left-6 w-14 h-4 bg-[#e5d4be]/80 rounded-sm rotate-[-4deg] shadow-sm pointer-events-none" />
        <div className="absolute -top-2.5 right-6 w-14 h-4 bg-[#e5d4be]/80 rounded-sm rotate-[5deg] shadow-sm pointer-events-none" />

        {/* Little decorative floating icons on sides */}
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white shadow-sm border border-stone-200/60 flex items-center justify-center text-rose-400">
          <Gift className="w-3.5 h-3.5" />
        </div>
        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white shadow-sm border border-stone-200/60 flex items-center justify-center text-amber-500">
          <Bookmark className="w-3.5 h-3.5" />
        </div>

        {/* Big Heart in Center */}
        <div className="w-32 h-32 flex items-center justify-center my-2">
          <Heart className="w-28 h-28 fill-[#dc2626] text-[#b91c1c] drop-shadow-md transition-transform hover:scale-110 active:scale-95 duration-300 cursor-pointer" onClick={() => soundEngine.playClick()} />
        </div>

        {/* Handwritten note at bottom */}
        <p className="font-handwriting text-xl text-stone-600 mt-2 rotate-[-2deg]">
          {BIRTHDAY_CONFIG.happyBirthday.handwrittenNote}
        </p>
      </div>

      {/* Bottom Fixed Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/80 px-4 py-3 flex items-center justify-between max-w-md mx-auto">
        <button
          onClick={() => {
            soundEngine.playClick();
            onBack();
          }}
          className="text-xs font-medium text-stone-500 hover:text-stone-800 px-3 py-2 rounded-lg transition-colors"
        >
          Back
        </button>
        <span className="text-[11px] font-medium text-stone-600 tracking-wider uppercase">
          Welcome
        </span>
        <button
          onClick={() => {
            soundEngine.playClick();
            onContinue();
          }}
          className="py-2.5 px-5 rounded-full bg-[#be185d] hover:bg-[#9d174d] text-white text-xs font-medium shadow-sm flex items-center gap-1.5 transition-all active:scale-95"
        >
          <span>Continue</span>
          <Heart className="w-3 h-3 fill-white" />
        </button>
      </div>
    </div>
  );
};
