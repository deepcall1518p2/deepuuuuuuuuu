import React, { useState } from 'react';
import { Heart, Sparkles, RotateCcw, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';
import { BearInGiftBox, BearThankYouHeart } from './CuteIllustrations';
import { soundEngine } from '../utils/audio';

interface Props {
  onRestart: () => void;
  onBack: () => void;
}

export const Chapter9FinalGift: React.FC<Props> = ({ onRestart, onBack }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  const handleOpenBox = () => {
    if (isOpen) return;
    soundEngine.playChime();
    setIsOpen(true);
    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 }
      });
    } catch {
      // Confetti fallback
    }
  };

  const handleAccept = () => {
    soundEngine.playChime();
    setIsAccepted(true);
    try {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 }
      });
    } catch {
      // Confetti fallback
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-between min-h-[82vh] px-4 py-4 max-w-md mx-auto text-center pb-24">
      {/* Header */}
      <div className="mb-2">
        <p className="text-[11px] tracking-[0.2em] font-medium text-stone-600 uppercase mb-1">
          {BIRTHDAY_CONFIG.finalGift.kicker}
        </p>
        <h2 className="text-xl sm:text-2xl font-serif-cormorant font-bold text-stone-900">
          {!isOpen ? BIRTHDAY_CONFIG.finalGift.title : `Happiest ${BIRTHDAY_CONFIG.age}th Birthday, Deepali (My Deepu ❤️)`}
        </h2>
      </div>

      {!isOpen ? (
        /* Unopened Gift State (Page 16) */
        <div className="w-full flex flex-col items-center my-auto">
          {/* Animated Gift Box */}
          <div
            onClick={handleOpenBox}
            className="cursor-pointer group flex flex-col items-center transition-transform hover:scale-105 active:scale-95 duration-300"
          >
            <BearInGiftBox isOpen={isOpen} className="w-48 h-48" />

            <div className="mt-4 py-2 px-6 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold tracking-wider uppercase shadow-sm group-hover:bg-rose-100 transition-colors">
              {BIRTHDAY_CONFIG.finalGift.tapPrompt}
            </div>
          </div>
          <p className="mt-3 text-xs text-stone-600 font-handwriting text-lg">
            Tap the present to discover what&apos;s inside ✨
          </p>
        </div>
      ) : (
        /* Revealed Gift & Sweet Letter (Page 17) */
        <div className="w-full bg-[#fdfbf7] p-5 sm:p-6 rounded-2xl shadow-md border border-[#eee4d6] text-left transition-all duration-700 animate-in fade-in zoom-in-95">
          {/* Recipient Headline */}
          <div className="text-center mb-4">
            <h3 className="font-serif-cormorant text-2xl font-bold text-stone-900 leading-tight">
              {BIRTHDAY_CONFIG.finalGift.cardHeadline}
            </h3>
          </div>

          {/* Emotional Message */}
          <div className="space-y-3 font-serif-cormorant text-stone-700 text-sm leading-relaxed">
            {BIRTHDAY_CONFIG.finalGift.cardParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* 4 Lifetime Perk Badges */}
          <div className="grid grid-cols-2 gap-2 my-5">
            {BIRTHDAY_CONFIG.finalGift.perkPills.map((perk, idx) => (
              <div
                key={idx}
                className="py-2 px-2.5 bg-rose-50/80 border border-rose-200 rounded-lg text-center text-[10px] font-semibold text-rose-900 tracking-wider uppercase shadow-xs flex items-center justify-center gap-1"
              >
                <span>{perk}</span>
              </div>
            ))}
          </div>

          {/* Gift Tag */}
          <div className="text-center text-xs font-handwriting text-xl text-rose-700 mb-2">
            {BIRTHDAY_CONFIG.finalGift.giftTag}
          </div>

          {/* Cute Bear with giant Thank You Heart illustration */}
          <div className="flex justify-center my-1">
            <BearThankYouHeart className="w-36 h-36" />
          </div>

          {isAccepted && (
            <div className="mt-3 p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-center text-xs text-emerald-800 font-medium flex items-center justify-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Gift accepted! Stored in your heart forever 💖</span>
            </div>
          )}
        </div>
      )}

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
          {isOpen ? "Special Gift" : "Accept Gift"}
        </span>
        <div className="flex items-center gap-2">
          {!isOpen ? (
            <button
              onClick={handleOpenBox}
              className="py-2.5 px-5 rounded-full bg-[#be185d] hover:bg-[#9d174d] text-white text-xs font-medium shadow-sm flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <span>Open Box</span>
              <Sparkles className="w-3 h-3 fill-white" />
            </button>
          ) : (
            <>
              <button
                onClick={handleAccept}
                className="py-2.5 px-4 rounded-full bg-[#be185d] hover:bg-[#9d174d] text-white text-xs font-medium shadow-sm flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
              >
                <span>Accept</span>
                <Heart className="w-3 h-3 fill-white" />
              </button>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onRestart();
                }}
                className="p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                title="Replay journey from start"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
