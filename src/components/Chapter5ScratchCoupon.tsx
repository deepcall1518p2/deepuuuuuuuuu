import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Gift, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';
import { BearWithHearts } from './CuteIllustrations';
import { soundEngine } from '../utils/audio';

interface Props {
  onContinue: () => void;
  onBack: () => void;
}

export const Chapter5ScratchCoupon: React.FC<Props> = ({ onContinue, onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const isDrawingRef = useRef(false);
  const scratchThrottleRef = useRef(0);

  // Initialize canvas with sparkling gold coating
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Set canvas internal resolution to match displayed size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    // Warm metallic golden champagne coating
    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, '#d4af37');
    grad.addColorStop(0.3, '#f5deb3');
    grad.addColorStop(0.6, '#e6ca65');
    grad.addColorStop(1, '#c59b27');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Add delicate sparkles pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      const r = Math.random() * 2 + 1;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Text on scratch coating
    ctx.fillStyle = '#6b4f10';
    ctx.font = '600 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Rub or Scratch Here ✨', rect.width / 2, rect.height / 2);
  }, []);

  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Sample pixels across a lower-res grid for maximum performance
    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    let transparentCount = 0;
    const sampleStep = 16; // sample every 16th pixel
    let totalSamples = 0;

    for (let i = 3; i < data.length; i += sampleStep * 4) {
      totalSamples++;
      if (data[i] < 30) {
        transparentCount++;
      }
    }

    const percentage = Math.round((transparentCount / totalSamples) * 100);
    setScratchPercent(percentage);

    if (percentage > 40 && !isScratched) {
      setIsScratched(true);
      soundEngine.playChime();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // Confetti fallback
      }
    }
  }, [isScratched]);

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    // Sound effect throttled
    const now = Date.now();
    if (now - scratchThrottleRef.current > 120) {
      scratchThrottleRef.current = now;
      soundEngine.playScratch();
      checkScratchPercentage();
    }
  };

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    scratchAt(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    scratchAt(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
    checkScratchPercentage();
  };

  // Touch handlers with active preventDefault
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    const touch = e.touches[0];
    if (touch) scratchAt(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const touch = e.touches[0];
    if (touch) {
      scratchAt(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = () => {
    isDrawingRef.current = false;
    checkScratchPercentage();
  };

  return (
    <div className="w-full flex flex-col items-center justify-between min-h-[82vh] px-4 py-4 max-w-md mx-auto text-center pb-24">
      {/* Header */}
      <div className="mb-4">
        <p className="text-[11px] tracking-[0.2em] font-medium text-stone-600 uppercase mb-1">
          {BIRTHDAY_CONFIG.coupon.kicker}
        </p>
        <h2 className="text-xl sm:text-2xl font-serif-cormorant font-bold text-stone-900 leading-snug">
          {BIRTHDAY_CONFIG.coupon.title}
        </h2>

        {/* Secret Prize Tag */}
        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
          <Gift className="w-3.5 h-3.5" />
          <span>{BIRTHDAY_CONFIG.coupon.badge}</span>
        </div>
      </div>

      {/* Coupon Container Card */}
      <div className="w-full max-w-[320px] bg-[#fbf9f4] p-5 rounded-2xl shadow-md border border-[#e8dfd3] flex flex-col items-center">
        <h3 className="text-xs tracking-[0.15em] font-semibold text-stone-600 uppercase mb-3">
          {BIRTHDAY_CONFIG.coupon.cardTitle}
        </h3>

        {/* Scratch Card Area */}
        <div className="relative w-full h-44 rounded-xl overflow-hidden border-2 border-dashed border-[#d8c8b4] shadow-inner bg-[#fff7ed]">
          {/* Revealed Secret Underneath */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 select-none">
            <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 mb-2">
              <Sparkles className="w-5 h-5 fill-rose-500 text-rose-500" />
            </div>
            <h4 className="text-xl font-serif-cormorant font-bold tracking-wider text-rose-900 uppercase">
              {BIRTHDAY_CONFIG.coupon.prizeTitle}
            </h4>
            <p className="text-[11px] text-stone-600 mt-1 max-w-[220px] leading-tight">
              {BIRTHDAY_CONFIG.coupon.prizeSubtitle}
            </p>
            <div className="mt-2.5 px-2.5 py-0.5 bg-rose-100/80 rounded border border-rose-200 text-[10px] font-mono text-rose-800">
              {BIRTHDAY_CONFIG.coupon.couponCode}
            </div>
          </div>

          {/* Interactive Scratch Canvas */}
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={`absolute inset-0 w-full h-full cursor-crosshair touch-none transition-opacity duration-700 ${
              isScratched ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          />
        </div>

        {/* Hint text */}
        <p className="mt-3 text-xs text-stone-600 font-medium">
          {isScratched
            ? BIRTHDAY_CONFIG.coupon.revealedHint
            : scratchPercent > 10
            ? `${BIRTHDAY_CONFIG.coupon.progressHint} (${scratchPercent}% revealed)`
            : "Use your finger or mouse to scratch the gold foil!"}
        </p>
      </div>

      {/* Cute Bear with Hearts Illustration at bottom */}
      <div className="my-2">
        <BearWithHearts className="w-28 h-28" />
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
          Secret Prize
        </span>
        <button
          onClick={() => {
            soundEngine.playClick();
            onContinue();
          }}
          className="py-2.5 px-4 rounded-full bg-[#be185d] hover:bg-[#9d174d] text-white text-xs font-medium shadow-sm flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
        >
          <span>Proceed to Love Meter</span>
          <Heart className="w-3 h-3 fill-white" />
        </button>
      </div>
    </div>
  );
};
