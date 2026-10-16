import React, { useState, useRef } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';
import { BearBalloons } from './CuteIllustrations';
import { soundEngine } from '../utils/audio';

interface Props {
  onContinue: () => void;
  onBack: () => void;
}

export const Chapter8CakeCutting: React.FC<Props> = ({ onContinue, onBack }) => {
  const [isCut, setIsCut] = useState(false);
  const [pieces, setPieces] = useState(1);
  const [knifePosition, setKnifePosition] = useState({ x: 0, y: 0 });
  const [isDraggingKnife, setIsDraggingKnife] = useState(false);
  const cakeContainerRef = useRef<HTMLDivElement | null>(null);

  const triggerSlice = () => {
    if (isCut) return;
    setIsCut(true);
    setPieces(2);
    soundEngine.playCakeSlice();
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // Confetti fallback
    }
  };

  // Dragging logic for knife across cake
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!cakeContainerRef.current || isCut) return;
    const touch = e.touches[0];
    const rect = cakeContainerRef.current.getBoundingClientRect();
    const relX = touch.clientX - rect.left;
    const relY = touch.clientY - rect.top;

    // If knife moves across middle of cake (horizontally or vertically)
    if (relX > rect.width * 0.25 && relX < rect.width * 0.75 && relY > rect.height * 0.25 && relY < rect.height * 0.75) {
      triggerSlice();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingKnife || !cakeContainerRef.current || isCut) return;
    const rect = cakeContainerRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    if (relX > rect.width * 0.25 && relX < rect.width * 0.75 && relY > rect.height * 0.25 && relY < rect.height * 0.75) {
      triggerSlice();
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-between min-h-[82vh] px-4 py-4 max-w-md mx-auto text-center pb-24">
      {/* Header */}
      <div className="mb-2">
        <p className="text-[11px] tracking-[0.2em] font-medium text-stone-600 uppercase mb-1">
          {BIRTHDAY_CONFIG.cakeCutting.kicker}
        </p>
        <h2 className="text-xl sm:text-2xl font-serif-cormorant font-bold text-stone-900">
          {BIRTHDAY_CONFIG.cakeCutting.title}
        </h2>
      </div>

      {/* Cute Bear with Balloons above the cake */}
      <div className="-mb-4 z-10">
        <BearBalloons className="w-32 h-32" />
      </div>

      {/* Pieces indicator */}
      <div className="w-full max-w-[280px] flex items-center justify-between text-xs text-stone-600 mb-2 px-3">
        <span className="font-mono">Pieces: {pieces}</span>
        {isCut && (
          <span className="text-rose-600 font-medium flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 fill-rose-400" /> Sliced!
          </span>
        )}
      </div>

      {/* CAKE PLATE & CAKE CONTAINER */}
      <div
        ref={cakeContainerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-64 h-64 rounded-full bg-gradient-to-b from-[#f3e8d7] to-[#e4d3bc] p-4 shadow-xl border-4 border-[#d5c3aa] flex items-center justify-center select-none"
      >
        {/* Cake Base Plate Rim */}
        <div className="absolute inset-1.5 rounded-full border border-dashed border-[#b8a184]/50 pointer-events-none" />

        {/* The Round Cake */}
        <div
          onClick={triggerSlice}
          className="relative w-48 h-48 rounded-full bg-gradient-to-tr from-pink-100 via-rose-50 to-amber-50 shadow-md border-4 border-rose-300 flex items-center justify-center overflow-hidden cursor-pointer"
        >
          {/* Cake frosting swirls */}
          <div className="absolute inset-3 rounded-full border-2 border-dotted border-rose-200 pointer-events-none" />

          {/* Sliced division animation */}
          {isCut ? (
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Left half slice */}
              <div className="w-1/2 h-full bg-rose-50 border-r-2 border-rose-400 -translate-x-2 transition-transform duration-500 flex items-center justify-end pr-2">
                <span className="text-2xl font-serif-cormorant font-bold text-rose-800">
                  {BIRTHDAY_CONFIG.cakeCutting.cakeNumber[0] || '1'}
                </span>
              </div>
              {/* Right half slice */}
              <div className="w-1/2 h-full bg-rose-50 border-l-2 border-rose-400 translate-x-2 transition-transform duration-500 flex items-center justify-start pl-2">
                <span className="text-2xl font-serif-cormorant font-bold text-rose-800">
                  {BIRTHDAY_CONFIG.cakeCutting.cakeNumber[1] || '7'}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              {/* Glowing Candles */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-3 rounded-full bg-amber-400 animate-ping opacity-75" />
                  <div className="w-1.5 h-4 bg-rose-400 rounded-sm" />
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-2 h-3 rounded-full bg-amber-400 animate-ping opacity-75" style={{ animationDelay: '0.3s' }} />
                  <div className="w-1.5 h-4 bg-amber-400 rounded-sm" />
                </div>
              </div>
              <span className="text-3xl font-serif-cormorant font-bold text-stone-800 tracking-wider">
                {BIRTHDAY_CONFIG.cakeCutting.cakeNumber}
              </span>
            </div>
          )}

          {/* Rosette details */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 text-xs">🍓</div>
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs">🍓</div>
          <div className="absolute left-1 top-1/2 -translate-y-1/2 text-xs">🍓</div>
          <div className="absolute right-1 top-1/2 -translate-y-1/2 text-xs">🍓</div>
        </div>

        {/* Draggable Virtual Knife */}
        {!isCut && (
          <div
            onMouseDown={() => setIsDraggingKnife(true)}
            onMouseUp={() => setIsDraggingKnife(false)}
            onClick={triggerSlice}
            className="absolute -right-3 bottom-6 w-12 h-28 flex flex-col items-center cursor-grab active:cursor-grabbing hover:scale-110 active:scale-95 transition-transform"
            title="Drag or tap to cut cake"
          >
            {/* Knife Blade */}
            <div className="w-4 h-16 bg-gradient-to-r from-gray-300 via-white to-gray-400 rounded-t-sm shadow-md border border-gray-400 flex items-center justify-center">
              <span className="text-[8px] text-gray-500 rotate-90">✨</span>
            </div>
            {/* Knife Handle */}
            <div className="w-5 h-10 bg-amber-900 rounded-b-md shadow border border-amber-950 flex flex-col items-center justify-center">
              <div className="w-2 h-1 bg-amber-300 rounded-full mb-1" />
              <div className="w-2 h-1 bg-amber-300 rounded-full" />
            </div>
            <span className="text-[9px] font-bold text-stone-700 bg-white/90 px-1 rounded shadow-xs mt-1 whitespace-nowrap">
              Knife
            </span>
          </div>
        )}
      </div>

      {/* Instruction text */}
      <div className="mt-4 px-4 text-center">
        <p className="text-xs text-stone-700 font-medium">
          {isCut ? "Delicious! The birthday cake is sliced! 🍰" : BIRTHDAY_CONFIG.cakeCutting.instruction}
        </p>
        {!isCut && (
          <button
            onClick={triggerSlice}
            className="mt-2 text-xs text-rose-700 underline font-medium hover:text-rose-900 cursor-pointer"
          >
            (Or tap here to slice cake with love ✨)
          </button>
        )}
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
          Cut the Cake
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
