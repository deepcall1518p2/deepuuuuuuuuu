import React, { useState } from 'react';
import { Heart, Menu, X, Settings } from 'lucide-react';
import { BIRTHDAY_CONFIG } from './config/birthdayConfig';
import { soundEngine } from './utils/audio';
import { Chapter1Welcome } from './components/Chapter1Welcome';
import { Chapter2Unlocking } from './components/Chapter2Unlocking';
import { Chapter3HappyBirthday } from './components/Chapter3HappyBirthday';
import { Chapter4OpenLetter } from './components/Chapter4OpenLetter';
import { Chapter5ScratchCoupon } from './components/Chapter5ScratchCoupon';
import { Chapter6LoveMeter } from './components/Chapter6LoveMeter';
import { Chapter7AtmPhotoBank } from './components/Chapter7AtmPhotoBank';
import { Chapter8CakeCutting } from './components/Chapter8CakeCutting';
import { Chapter9FinalGift } from './components/Chapter9FinalGift';
import { AdminAssetSetup } from './components/AdminAssetSetup';

export default function App() {
  const [currentChapter, setCurrentChapter] = useState<number>(1);
  const [maxUnlockedChapter, setMaxUnlockedChapter] = useState<number>(1);
  const [showChapterMenu, setShowChapterMenu] = useState<boolean>(false);
  const [showAdminSetup, setShowAdminSetup] = useState<boolean>(false);

  // Navigate to next chapter
  const goToChapter = (chapterNum: number) => {
    setCurrentChapter(chapterNum);
    if (chapterNum > maxUnlockedChapter) {
      setMaxUnlockedChapter(chapterNum);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (currentChapter < 9) {
      goToChapter(currentChapter + 1);
    }
  };

  const handleBack = () => {
    if (currentChapter > 1) {
      goToChapter(currentChapter - 1);
    }
  };

  const handleRestart = () => {
    setCurrentChapter(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const chapterNames = [
    "Welcome & Passkey",
    "Unlocking Universe",
    "Happy Birthday",
    "A Love Letter",
    "Secret Coupon",
    "Love Meter",
    "Photo Bank ATM",
    "Cut the Cake",
    "Final Birthday Gift"
  ];

  return (
    <div className="min-h-screen bg-[#fcfaf7] text-stone-800 flex flex-col relative overflow-x-hidden selection:bg-rose-200">
      {/* Background Floating Hearts & Twinkles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-4 text-rose-200/40 text-xl animate-pulse">🤍</div>
        <div className="absolute top-1/4 right-6 text-pink-200/50 text-base animate-bounce" style={{ animationDuration: '4s' }}>✨</div>
        <div className="absolute top-1/2 left-8 text-rose-300/30 text-lg animate-pulse" style={{ animationDuration: '3s' }}>💖</div>
        <div className="absolute bottom-1/3 right-10 text-amber-200/50 text-sm">✨</div>
        <div className="absolute bottom-16 left-6 text-pink-200/40 text-xs">🤍</div>
      </div>

      {/* TOP HEADER BAR (Compact, < 56px, mobile-friendly without play music icon) */}
      <header className="sticky top-0 z-40 w-full bg-[#fdfbf7]/90 backdrop-blur-md border-b border-stone-200/70 px-4 py-3 flex items-center justify-between max-w-md mx-auto">
        {/* Left: Romantic Title */}
        <div className="flex items-center gap-1.5">
          <span className="font-serif-cormorant font-semibold text-sm tracking-wider text-stone-800 uppercase">
            Deepali
          </span>
          <span className="font-handwriting text-rose-600 text-sm">
            · my Deepu
          </span>
        </div>

        {/* Center: Chapter Progress Dots */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 9 }).map((_, idx) => {
            const ch = idx + 1;
            const isCurrent = ch === currentChapter;
            const isUnlocked = ch <= maxUnlockedChapter;
            return (
              <button
                key={ch}
                disabled={!isUnlocked}
                onClick={() => isUnlocked && goToChapter(ch)}
                className={`transition-all rounded-full cursor-pointer ${
                  isCurrent
                    ? 'w-4 h-1.5 bg-[#be185d]'
                    : isUnlocked
                    ? 'w-1.5 h-1.5 bg-rose-300 hover:bg-rose-400'
                    : 'w-1.5 h-1.5 bg-stone-300 opacity-50'
                }`}
                title={`Chapter ${ch}: ${chapterNames[idx]}`}
              />
            );
          })}
        </div>

        {/* Right: Quick Menu Toggle */}
        <button
          onClick={() => setShowChapterMenu(!showChapterMenu)}
          className="p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
          title="Chapters menu"
        >
          {showChapterMenu ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </header>

      {/* Chapter Selection Drawer */}
      {showChapterMenu && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end">
          <div className="w-72 bg-[#fdfbf7] h-full shadow-2xl p-5 flex flex-col justify-between border-l border-stone-200 animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-200">
                <div>
                  <span className="font-serif-cormorant font-bold text-lg text-stone-800 block">All Chapters</span>
                  <span className="text-[11px] text-stone-500 font-handwriting">For Deepu&apos;s 17th Birthday</span>
                </div>
                <button
                  onClick={() => setShowChapterMenu(false)}
                  className="p-1 rounded text-stone-500 hover:text-stone-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1.5">
                {chapterNames.map((name, idx) => {
                  const ch = idx + 1;
                  const isCurrent = ch === currentChapter;
                  const isUnlocked = ch <= maxUnlockedChapter;
                  return (
                    <button
                      key={ch}
                      disabled={!isUnlocked}
                      onClick={() => {
                        soundEngine.playClick();
                        goToChapter(ch);
                        setShowChapterMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                        isCurrent
                          ? 'bg-rose-100 text-rose-900 font-semibold'
                          : isUnlocked
                          ? 'text-stone-700 hover:bg-stone-100'
                          : 'text-stone-400 opacity-60'
                      }`}
                    >
                      <span>{ch}. {name}</span>
                      {isCurrent && <Heart className="w-3 h-3 fill-rose-600 text-rose-600" />}
                    </button>
                  );
                })}
              </div>

              {/* Admin Setup Button for Vercel Deployment (Only in DEV) */}
              {import.meta.env.DEV && (
                <div className="mt-5 pt-3 border-t border-stone-200">
                  <button
                    onClick={() => {
                      setShowAdminSetup(true);
                      setShowChapterMenu(false);
                    }}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg text-rose-900 text-xs font-medium transition-colors"
                  >
                    <Settings className="w-3.5 h-3.5 text-rose-700" />
                    <span>Setup Real Photos & Music for Vercel</span>
                  </button>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-stone-200 text-[11px] text-stone-600">
              <p className="font-semibold text-stone-800">For: Deepali (My Deepu)</p>
              <p>DOB: 17 Oct 2009 (17th Birthday)</p>
              <p>Passkey: 1710</p>
            </div>
          </div>
        </div>
      )}

      {/* Admin Setup Modal */}
      <AdminAssetSetup
        isOpen={showAdminSetup}
        onClose={() => setShowAdminSetup(false)}
        onSuccess={() => {
          // Force reload image states
          window.location.reload();
        }}
      />

      {/* MAIN CHAPTER CONTAINER */}
      <main className="flex-1 w-full flex flex-col items-center justify-center relative z-10">
        {currentChapter === 1 && <Chapter1Welcome onUnlock={handleNext} />}
        {currentChapter === 2 && <Chapter2Unlocking onComplete={handleNext} />}
        {currentChapter === 3 && <Chapter3HappyBirthday onContinue={handleNext} onBack={handleBack} />}
        {currentChapter === 4 && <Chapter4OpenLetter onContinue={handleNext} onBack={handleBack} />}
        {currentChapter === 5 && <Chapter5ScratchCoupon onContinue={handleNext} onBack={handleBack} />}
        {currentChapter === 6 && <Chapter6LoveMeter onContinue={handleNext} onBack={handleBack} />}
        {currentChapter === 7 && <Chapter7AtmPhotoBank onContinue={handleNext} onBack={handleBack} />}
        {currentChapter === 8 && <Chapter8CakeCutting onContinue={handleNext} onBack={handleBack} />}
        {currentChapter === 9 && <Chapter9FinalGift onRestart={handleRestart} onBack={handleBack} />}
      </main>
    </div>
  );
}
