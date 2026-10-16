import React, { useState } from 'react';
import { Sparkles, Heart, Play } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';
import { PandaHoldingHeart } from './CuteIllustrations';
import { soundEngine } from '../utils/audio';

interface Props {
  onContinue: () => void;
  onBack: () => void;
}

export const Chapter6LoveMeter: React.FC<Props> = ({ onContinue, onBack }) => {
  const [percentage, setPercentage] = useState(80);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [hasMeasured, setHasMeasured] = useState(false);

  const handleMeasure = () => {
    if (isMeasuring) return;
    setIsMeasuring(true);
    soundEngine.playClick();

    let current = 0;
    const target = 100;
    const duration = 1600;
    const intervalTime = 30;
    const increment = target / (duration / intervalTime);

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(timer);
        setPercentage(100);
        setIsMeasuring(false);
        setHasMeasured(true);
        soundEngine.playChime();
        try {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {
          // Confetti fallback
        }
      } else {
        setPercentage(Math.round(current));
        if (Math.random() > 0.6) soundEngine.playScratch();
      }
    }, intervalTime);
  };

  return (
    <div className="w-full flex flex-col items-center justify-between min-h-[82vh] px-4 py-4 max-w-md mx-auto text-center pb-24">
      {/* Header */}
      <div className="mb-2">
        <p className="text-[11px] tracking-[0.2em] font-medium text-stone-600 uppercase mb-1">
          {BIRTHDAY_CONFIG.loveMeter.kicker}
        </p>
        <h2 className="text-xl sm:text-2xl font-serif-cormorant font-bold text-stone-900">
          {BIRTHDAY_CONFIG.loveMeter.title}
        </h2>

        {/* Experiment Badge */}
        <div className="mt-1.5 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{BIRTHDAY_CONFIG.loveMeter.badge}</span>
        </div>
      </div>

      {/* Love Meter Card */}
      <div className="w-full max-w-[310px] bg-[#fbf9f4] p-5 rounded-2xl shadow-md border border-[#e8ded1] flex flex-col items-center">
        <h3 className="text-base font-serif-cormorant font-bold text-stone-900 mb-3">
          {BIRTHDAY_CONFIG.loveMeter.question}
        </h3>

        {/* Animated Capsule / Bottle */}
        <div className="relative w-36 h-48 rounded-t-full rounded-b-2xl border-4 border-stone-300 bg-stone-100/60 overflow-hidden shadow-inner flex flex-col justify-end p-1">
          {/* Liquid level */}
          <div
            className="w-full bg-gradient-to-t from-[#be185d] via-[#e11d48] to-[#fb7185] rounded-b-xl rounded-t-lg transition-all duration-300 flex items-center justify-center relative overflow-hidden"
            style={{ height: `${percentage}%` }}
          >
            {/* Liquid wave highlight */}
            <div className="absolute top-0 inset-x-0 h-2 bg-white/40 animate-pulse" />
            
            {/* Heart floating inside liquid */}
            <Heart className="w-10 h-10 fill-white text-white drop-shadow-md animate-bounce" style={{ animationDuration: '2s' }} />

            {/* Sparkles */}
            <div className="absolute bottom-2 left-3 w-1.5 h-1.5 rounded-full bg-white/70 animate-ping" />
            <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-white/60 animate-ping" style={{ animationDuration: '1.5s' }} />
          </div>

          {/* Glass reflection */}
          <div className="absolute top-3 left-3 w-2 h-24 bg-white/30 rounded-full pointer-events-none" />
        </div>

        {/* Percentage Display */}
        <div className="mt-3 text-2xl font-bold font-serif-cormorant text-rose-900 flex items-center gap-1">
          <span>{percentage}%</span>
          {percentage >= 100 && <span className="text-sm font-sans font-semibold text-rose-600">(Infinite ✨)</span>}
        </div>

        {/* Prompt Instruction */}
        <p className="mt-1 text-xs text-stone-600 font-normal">
          {BIRTHDAY_CONFIG.loveMeter.promptText}
        </p>

        {/* Measure Button */}
        <button
          onClick={handleMeasure}
          disabled={isMeasuring}
          className="mt-3 py-2 px-5 rounded-full bg-[#be185d] hover:bg-[#9d174d] text-white text-xs font-medium tracking-wide shadow-md flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer disabled:opacity-80"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span>{isMeasuring ? "Calculating with love..." : BIRTHDAY_CONFIG.loveMeter.buttonText}</span>
        </button>

        {/* Category Breakdown (revealed when measured) */}
        {hasMeasured && (
          <div className="w-full mt-4 pt-3 border-t border-stone-200/80 space-y-2 text-left animate-in fade-in duration-500">
            {BIRTHDAY_CONFIG.loveMeter.categories.map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <span className="text-stone-700 font-medium">{cat.label}</span>
                <span className="font-mono text-rose-700 font-bold">{cat.value}%</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cute Panda holding Heart */}
      <div className="my-1">
        <PandaHoldingHeart className="w-28 h-28" />
      </div>

      {/* Bottom Fixed Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/80 px-4 py-3 flex items-center justify-between max-w-md mx-auto">
        <button
          onClick={() => {
            soundEngine.playClick();
            onBack();
          }}
          className="text-xs font-medium text-stone-500 hover:text-stone-800 px-3 py-2 rounded-lg transition-colors cursor-pointer"
        >
          Back
        </button>
        <span className="text-[11px] font-medium text-stone-600 tracking-wider uppercase">
          Love Meter
        </span>
        <button
          onClick={() => {
            soundEngine.playClick();
            onContinue();
          }}
          className="py-2.5 px-5 rounded-full bg-[#be185d] hover:bg-[#9d174d] text-white text-xs font-medium shadow-sm flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
        >
          <span>Continue</span>
          <Heart className="w-3 h-3 fill-white" />
        </button>
      </div>
    </div>
  );
};
