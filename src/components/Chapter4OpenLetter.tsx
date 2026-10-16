import React, { useState } from 'react';
import { Mail, Heart, RotateCcw, ArrowRight } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';
import { BearOnEnvelope } from './CuteIllustrations';
import { soundEngine } from '../utils/audio';

interface Props {
  onContinue: () => void;
  onBack: () => void;
}

export const Chapter4OpenLetter: React.FC<Props> = ({ onContinue, onBack }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    soundEngine.playUnfold();
    setIsOpen(true);
  };

  const handleReplay = () => {
    soundEngine.playClick();
    setIsOpen(false);
  };

  return (
    <div className="w-full flex flex-col items-center justify-between min-h-[82vh] px-4 py-4 max-w-md mx-auto text-center pb-24">
      {/* Top Header */}
      <div className="mb-4">
        <p className="text-[11px] tracking-[0.2em] font-medium text-stone-600 uppercase mb-1">
          {BIRTHDAY_CONFIG.letter.sectionKicker}
        </p>
        <h2 className="text-2xl sm:text-3xl font-serif-cormorant font-bold text-stone-900">
          {isOpen ? "A letter written for you" : BIRTHDAY_CONFIG.letter.sectionTitle}
        </h2>
      </div>

      {!isOpen ? (
        /* Envelope State (Page 5) */
        <div className="w-full flex flex-col items-center my-auto">
          {/* Cute Bear sitting on envelope */}
          <div className="relative -mb-6 z-10 transition-transform hover:scale-105 duration-300">
            <BearOnEnvelope className="w-32 h-32" />
          </div>

          {/* Envelope Graphic */}
          <div
            onClick={handleOpen}
            className="group relative w-72 h-48 bg-[#f5ede0] rounded-xl shadow-lg border border-[#e3d3be] flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
          >
            {/* Envelope flap lines */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 288 192" preserveAspectRatio="none">
                <path d="M0 0 L144 110 L288 0" fill="#eddcc8" stroke="#dec9b2" strokeWidth="1.5" />
                <path d="M0 192 L110 95" stroke="#dec9b2" strokeWidth="1.2" />
                <path d="M288 192 L178 95" stroke="#dec9b2" strokeWidth="1.2" />
              </svg>
            </div>

            {/* Center Seal / "TAP TO OPEN" Button */}
            <div className="relative z-10 py-2 px-5 rounded-full bg-[#be185d] group-hover:bg-[#9d174d] text-white text-xs font-medium tracking-wider uppercase shadow-md flex items-center gap-1.5 transition-all">
              <span>{BIRTHDAY_CONFIG.letter.envelopeLabel}</span>
              <Heart className="w-3 h-3 fill-white" />
            </div>
          </div>

          <p className="mt-4 text-xs text-stone-600 font-handwriting text-base">
            Click the envelope to unfold the letter ✨
          </p>
        </div>
      ) : (
        /* Unfolded Letter State (Page 6) */
        <div className="w-full bg-[#fdfbf7] p-6 sm:p-7 rounded-2xl shadow-md border border-[#eee4d6] text-left transition-all duration-500 animate-in fade-in zoom-in-95">
          {/* Header Bar inside Letter */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200/80">
            <div className="px-2.5 py-1 bg-stone-100 rounded text-[11px] font-mono font-medium text-stone-600">
              {BIRTHDAY_CONFIG.letter.letterDate}
            </div>
            <div className="text-[11px] font-medium tracking-wider uppercase text-rose-700 flex items-center gap-1">
              <span>{BIRTHDAY_CONFIG.letter.letterTag}</span>
            </div>
          </div>

          {/* Salutation */}
          <h3 className="font-serif-cormorant text-xl font-bold text-stone-900 mb-3">
            {BIRTHDAY_CONFIG.letter.salutation}
          </h3>

          {/* Body Paragraphs */}
          <div className="space-y-3 font-serif-cormorant text-stone-700 text-sm sm:text-base leading-relaxed">
            {BIRTHDAY_CONFIG.letter.bodyParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Sign off */}
          <div className="mt-5 text-right font-handwriting text-lg text-[#be185d]">
            {BIRTHDAY_CONFIG.letter.signOff}
          </div>

          {/* Quick Action Buttons inside letter */}
          <div className="mt-6 pt-4 border-t border-stone-200/80 flex items-center justify-between gap-3">
            <button
              onClick={handleReplay}
              className="px-3.5 py-2 rounded-lg bg-stone-100 hover:bg-stone-200/70 text-stone-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Note</span>
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                onContinue();
              }}
              className="px-4 py-2 rounded-lg bg-[#be185d] hover:bg-[#9d174d] text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <span>Next Chapter</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
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
          {isOpen ? "A Love Letter" : "Envelope"}
        </span>
        <button
          onClick={() => {
            soundEngine.playClick();
            if (!isOpen) {
              handleOpen();
            } else {
              onContinue();
            }
          }}
          className="py-2.5 px-5 rounded-full bg-[#be185d] hover:bg-[#9d174d] text-white text-xs font-medium shadow-sm flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
        >
          <span>{isOpen ? "Continue" : "Open Letter"}</span>
          {isOpen ? <Heart className="w-3 h-3 fill-white" /> : <Mail className="w-3 h-3" />}
        </button>
      </div>
    </div>
  );
};
