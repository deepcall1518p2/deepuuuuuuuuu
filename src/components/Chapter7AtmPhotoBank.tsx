import React, { useState, useEffect } from 'react';
import { Heart, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import { BIRTHDAY_CONFIG, PhotoItem } from '../config/birthdayConfig';
import { soundEngine } from '../utils/audio';

interface Props {
  onContinue: () => void;
  onBack: () => void;
}

type AtmScreen = 'CARD_INSERT' | 'PIN_ENTRY' | 'MAIN_MENU' | 'VIEW_PHOTOS' | 'CHECK_BALANCE' | 'DEPOSIT_WISHES' | 'EXIT_RECEIPT';

export const Chapter7AtmPhotoBank: React.FC<Props> = ({ onContinue, onBack }) => {
  const [screen, setScreen] = useState<AtmScreen>('CARD_INSERT');
  const [isCardInserted, setIsCardInserted] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);
  
  // Photos state
  const [photos] = useState<PhotoItem[]>(BIRTHDAY_CONFIG.atm.photos);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [enlargedPhoto, setEnlargedPhoto] = useState<PhotoItem | null>(null);
  const [imgLoadError, setImgLoadError] = useState<{ [key: number]: boolean }>({});

  // Wishes state
  const [selectedWish, setSelectedWish] = useState<string>(BIRTHDAY_CONFIG.atm.preparedWishes[0]);
  const [wishDeposited, setWishDeposited] = useState(false);

  // Receipt printed state
  const [isReceiptPrinted, setIsReceiptPrinted] = useState(false);

  // Handle Card Tap / Slide
  const handleInsertCard = () => {
    soundEngine.playCardInsert();
    setIsCardInserted(true);
    setTimeout(() => {
      setScreen('PIN_ENTRY');
    }, 900);
  };

  // Handle Keypad Press
  const handleKeypadPress = (val: string) => {
    soundEngine.playAtmBeep();
    if (val === 'CLR') {
      setEnteredPin('');
      setPinError(false);
      return;
    }
    if (val === 'ENTER') {
      if (screen === 'PIN_ENTRY') {
        if (enteredPin === BIRTHDAY_CONFIG.atm.pinCode || enteredPin === 'open' || enteredPin.length === 4) {
          soundEngine.playChime();
          setScreen('MAIN_MENU');
        } else {
          setPinError(true);
        }
      }
      return;
    }

    if (screen === 'PIN_ENTRY') {
      if (enteredPin.length < 4) {
        const next = enteredPin + val;
        setEnteredPin(next);
        if (next.length === 4) {
          if (next === BIRTHDAY_CONFIG.atm.pinCode || next === BIRTHDAY_CONFIG.passkey) {
            setTimeout(() => {
              soundEngine.playChime();
              setScreen('MAIN_MENU');
            }, 300);
          }
        }
      }
    } else if (screen === 'MAIN_MENU') {
      if (val === '1') setScreen('VIEW_PHOTOS');
      if (val === '2') setScreen('CHECK_BALANCE');
      if (val === '3') setScreen('DEPOSIT_WISHES');
      if (val === '4') handleExit();
    }
  };

  const handleExit = () => {
    soundEngine.playAtmBeep();
    setScreen('EXIT_RECEIPT');
    setTimeout(() => {
      soundEngine.playUnfold();
      setIsReceiptPrinted(true);
    }, 700);
  };

  const currentPhoto = photos[photoIndex];

  return (
    <div className="w-full flex flex-col items-center justify-between min-h-[82vh] px-3 py-4 max-w-md mx-auto text-center pb-24">
      {/* Chapter Header */}
      <div className="mb-2">
        <p className="text-[11px] tracking-[0.2em] font-medium text-stone-600 uppercase mb-1">
          {BIRTHDAY_CONFIG.atm.kicker}
        </p>
        <h2 className="text-xl sm:text-2xl font-serif-cormorant font-bold text-stone-900">
          {BIRTHDAY_CONFIG.atm.title}
        </h2>
      </div>

      {/* ATM PHYSICAL MACHINE CASING */}
      <div className="w-full max-w-[340px] bg-gradient-to-b from-[#6b7280] via-[#4b5563] to-[#374151] p-3.5 rounded-3xl shadow-2xl border-4 border-[#9ca3af] flex flex-col items-center relative overflow-hidden select-none">
        {/* Machine Top Brand Banner */}
        <div className="w-full flex items-center justify-between px-3 py-1 bg-[#1f2937] rounded-lg border border-gray-600 mb-2.5">
          <span className="text-[11px] font-bold text-gray-200 tracking-wider">
            {BIRTHDAY_CONFIG.atm.bankName}
          </span>
          <span className="text-[9px] text-emerald-400 font-mono tracking-widest flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            ONLINE
          </span>
        </div>

        {/* ATM CRT MONITOR DISPLAY AREA */}
        <div className="relative w-full flex items-center justify-between gap-1 mb-3">
          {/* Left 4 hardware buttons */}
          <div className="flex flex-col gap-3 py-2">
            {[1, 2, 3, 4].map((i) => (
              <button
                key={i}
                onClick={() => {
                  soundEngine.playAtmBeep();
                  if (screen === 'MAIN_MENU' && i === 1) setScreen('VIEW_PHOTOS');
                  if (screen === 'MAIN_MENU' && i === 2) setScreen('CHECK_BALANCE');
                  if (screen === 'VIEW_PHOTOS') setPhotoIndex((p) => (p > 0 ? p - 1 : photos.length - 1));
                  if (screen === 'CHECK_BALANCE' || screen === 'DEPOSIT_WISHES') setScreen('MAIN_MENU');
                }}
                className="w-4 h-6 bg-gradient-to-r from-gray-400 to-gray-200 rounded-sm shadow-sm active:translate-x-0.5 border border-gray-500 cursor-pointer"
                title={`Hardware Button L${i}`}
              />
            ))}
          </div>

          {/* CRT Screen */}
          <div className="flex-1 h-64 crt-screen rounded-xl border-4 border-[#1f2937] p-2 flex flex-col justify-between text-left font-terminal text-emerald-400 relative overflow-hidden shadow-inner">
            {/* Screen Header */}
            <div className="flex items-center justify-between border-b border-emerald-900/60 pb-1 text-[11px] glow-green font-bold tracking-wider">
              <span>{BIRTHDAY_CONFIG.atm.screenTitle}</span>
              <span>17/10/2026</span>
            </div>

            {/* SCREEN 1: CARD INSERT */}
            {screen === 'CARD_INSERT' && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-2">
                <p className="text-xs sm:text-sm font-bold glow-green mb-1 animate-pulse">
                  WELCOME TO PHOTO BANK
                </p>
                <p className="text-[11px] text-emerald-300/80 mb-3">
                  Please insert your card
                </p>
                <div className="text-[10px] text-emerald-400/70 border border-emerald-900/60 rounded px-2.5 py-1">
                  DEEPALI • {BIRTHDAY_CONFIG.atm.cardChipLabel}
                </div>
              </div>
            )}

            {/* SCREEN 2: PIN ENTRY */}
            {screen === 'PIN_ENTRY' && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-2">
                <p className="text-xs font-bold glow-green mb-2">ENTER PIN</p>
                <div className="flex gap-2 my-2">
                  {[0, 1, 2, 3].map((idx) => (
                    <div
                      key={idx}
                      className={`w-4 h-4 rounded-full border border-emerald-400 flex items-center justify-center ${
                        enteredPin.length > idx ? 'bg-emerald-400 glow-box-green' : 'bg-transparent'
                      }`}
                    />
                  ))}
                </div>
                {pinError ? (
                  <p className="text-[10px] text-rose-400 mt-1">Invalid PIN. Try {BIRTHDAY_CONFIG.atm.pinCode}</p>
                ) : (
                  <p className="text-[10px] text-emerald-300/70 mt-1">
                    Use keypad below, then ENTER
                  </p>
                )}
                <p className="text-[9px] text-emerald-400/50 mt-1">
                  {BIRTHDAY_CONFIG.atm.pinHint}
                </p>
              </div>
            )}

            {/* SCREEN 3: MAIN MENU */}
            {screen === 'MAIN_MENU' && (
              <div className="flex-1 flex flex-col justify-center px-2 py-1 text-xs space-y-2 glow-green">
                <button
                  onClick={() => {
                    soundEngine.playAtmBeep();
                    setScreen('VIEW_PHOTOS');
                  }}
                  className="flex items-center justify-between hover:bg-emerald-950/60 p-1 rounded transition-colors text-left cursor-pointer"
                >
                  <span>1 View Photos</span>
                  <span className="text-[10px]">▶</span>
                </button>
                <button
                  onClick={() => {
                    soundEngine.playAtmBeep();
                    setScreen('CHECK_BALANCE');
                  }}
                  className="flex items-center justify-between hover:bg-emerald-950/60 p-1 rounded transition-colors text-left cursor-pointer"
                >
                  <span>2 Check Love Balance</span>
                  <span className="text-[10px]">▶</span>
                </button>
                <button
                  onClick={() => {
                    soundEngine.playAtmBeep();
                    setScreen('DEPOSIT_WISHES');
                  }}
                  className="flex items-center justify-between hover:bg-emerald-950/60 p-1 rounded transition-colors text-left cursor-pointer"
                >
                  <span>3 Deposit Wishes</span>
                  <span className="text-[10px]">▶</span>
                </button>
                <button
                  onClick={handleExit}
                  className="flex items-center justify-between hover:bg-emerald-950/60 p-1 rounded transition-colors text-left cursor-pointer"
                >
                  <span>4 Exit (Print Receipt)</span>
                  <span className="text-[10px]">▶</span>
                </button>
                <p className="text-[9px] text-emerald-400/60 pt-1 text-center border-t border-emerald-950">
                  Tap an option or press its number
                </p>
              </div>
            )}

            {/* SCREEN 4: VIEW PHOTOS */}
            {screen === 'VIEW_PHOTOS' && (
              <div className="flex-1 flex flex-col justify-between py-1">
                <div className="flex items-center justify-between text-[10px] text-emerald-300">
                  <span>Photo {photoIndex + 1}/{photos.length}</span>
                  <span className="text-[9px] text-emerald-400/80 font-mono">{currentPhoto.title}</span>
                </div>

                {/* Photo Display Frame */}
                <div
                  onClick={() => setEnlargedPhoto(currentPhoto)}
                  className="relative w-full h-34 my-1 rounded border border-emerald-800 overflow-hidden bg-black flex items-center justify-center cursor-pointer group shadow-inner"
                  title="Tap to enlarge"
                >
                  <img
                    key={currentPhoto.url}
                    src={currentPhoto.url}
                    alt={currentPhoto.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[8px] text-emerald-300 font-mono">
                    <span>Enlarge 🔍</span>
                  </div>
                </div>

                {/* Caption */}
                <p className="text-[10px] text-emerald-200 truncate glow-green font-sans">
                  &ldquo;{currentPhoto.caption}&rdquo;
                </p>

                {/* Photo Navigation buttons on screen */}
                <div className="flex items-center justify-between text-[10px] pt-1 border-t border-emerald-950">
                  <button
                    onClick={() => {
                      soundEngine.playAtmBeep();
                      setPhotoIndex((p) => (p > 0 ? p - 1 : photos.length - 1));
                    }}
                    className="px-2 py-0.5 bg-emerald-950 border border-emerald-800 rounded hover:bg-emerald-900 cursor-pointer flex items-center gap-1"
                  >
                    <ChevronLeft className="w-2.5 h-2.5" />
                    <span>PREV</span>
                  </button>
                  <button
                    onClick={() => {
                      soundEngine.playAtmBeep();
                      setScreen('MAIN_MENU');
                    }}
                    className="text-[9px] text-emerald-400 hover:underline cursor-pointer"
                  >
                    MENU
                  </button>
                  <button
                    onClick={() => {
                      soundEngine.playAtmBeep();
                      setPhotoIndex((p) => (p < photos.length - 1 ? p + 1 : 0));
                    }}
                    className="px-2 py-0.5 bg-emerald-950 border border-emerald-800 rounded hover:bg-emerald-900 cursor-pointer flex items-center gap-1"
                  >
                    <span>NEXT</span>
                    <ChevronRight className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN 5: CHECK LOVE BALANCE */}
            {screen === 'CHECK_BALANCE' && (
              <div className="flex-1 flex flex-col justify-between py-1 text-[11px]">
                <p className="text-center font-bold glow-green text-xs border-b border-emerald-950 pb-1">
                  LOVE BALANCE
                </p>
                <div className="space-y-1.5 my-1 text-[10px]">
                  {BIRTHDAY_CONFIG.atm.balanceStats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col">
                      <div className="flex justify-between text-emerald-300">
                        <span>{stat.label}</span>
                        <span>{stat.value}%</span>
                      </div>
                      <div className="w-full bg-emerald-950 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-emerald-400 h-full rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                          style={{ width: `${stat.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    soundEngine.playAtmBeep();
                    setScreen('MAIN_MENU');
                  }}
                  className="w-full py-1 text-center bg-emerald-950 border border-emerald-800 rounded text-[10px] hover:bg-emerald-900 cursor-pointer glow-green"
                >
                  ◀ BACK TO MENU
                </button>
              </div>
            )}

            {/* SCREEN 6: DEPOSIT WISHES */}
            {screen === 'DEPOSIT_WISHES' && (
              <div className="flex-1 flex flex-col justify-between py-1 text-[10px]">
                <p className="text-center font-bold glow-green text-xs">DEPOSIT WISHES</p>
                {!wishDeposited ? (
                  <div className="space-y-2">
                    <p className="text-[9px] text-emerald-300">Choose a birthday wish for Deepu:</p>
                    <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                      {BIRTHDAY_CONFIG.atm.preparedWishes.map((w, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setSelectedWish(w);
                          }}
                          className={`p-1 rounded border text-[9px] leading-tight cursor-pointer ${
                            selectedWish === w ? 'border-emerald-400 bg-emerald-950/80 text-emerald-200' : 'border-emerald-900/60 text-emerald-400/80'
                          }`}
                        >
                          {w}
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        soundEngine.playChime();
                        setWishDeposited(true);
                      }}
                      className="w-full py-1 bg-emerald-400 text-black font-bold rounded cursor-pointer hover:bg-emerald-300 transition-colors"
                    >
                      CONFIRM DEPOSIT
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <Check className="w-6 h-6 text-emerald-300 mb-1" />
                    <p className="text-xs glow-green font-bold">WISH DEPOSITED!</p>
                    <p className="text-[9px] text-emerald-300/80 mt-1">Saved into the Universe Vault for Deepu ✨</p>
                    <button
                      onClick={() => {
                        soundEngine.playAtmBeep();
                        setWishDeposited(false);
                        setScreen('MAIN_MENU');
                      }}
                      className="mt-3 px-3 py-1 bg-emerald-950 border border-emerald-800 rounded text-emerald-300 cursor-pointer"
                    >
                      BACK TO MENU
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* SCREEN 7: EXIT / PRINTING RECEIPT */}
            {screen === 'EXIT_RECEIPT' && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-2">
                <p className="text-xs font-bold glow-green animate-pulse mb-1">
                  PRINTING RECEIPT...
                </p>
                <p className="text-[10px] text-emerald-300/80">
                  Please collect your receipt below
                </p>
                <button
                  onClick={() => {
                    soundEngine.playAtmBeep();
                    setScreen('MAIN_MENU');
                  }}
                  className="mt-3 px-2 py-0.5 bg-emerald-950 border border-emerald-800 rounded text-[9px] text-emerald-400 hover:underline cursor-pointer"
                >
                  Return to Menu
                </button>
              </div>
            )}
          </div>

          {/* Right 4 hardware buttons */}
          <div className="flex flex-col gap-3 py-2">
            {[1, 2, 3, 4].map((i) => (
              <button
                key={i}
                onClick={() => {
                  soundEngine.playAtmBeep();
                  if (screen === 'MAIN_MENU' && i === 3) setScreen('DEPOSIT_WISHES');
                  if (screen === 'MAIN_MENU' && i === 4) handleExit();
                  if (screen === 'VIEW_PHOTOS') setPhotoIndex((p) => (p < photos.length - 1 ? p + 1 : 0));
                }}
                className="w-4 h-6 bg-gradient-to-r from-gray-200 to-gray-400 rounded-sm shadow-sm active:-translate-x-0.5 border border-gray-500 cursor-pointer"
                title={`Hardware Button R${i}`}
              />
            ))}
          </div>
        </div>

        {/* SLOTS AREA: CARD SLOT (LEFT) & RECEIPT SLOT (RIGHT) */}
        <div className="w-full flex items-center justify-between px-3 py-2 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl border border-gray-700 mb-3 relative">
          {/* Card Slot */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[8px] font-mono tracking-widest text-gray-400 uppercase">CARD</span>
              <div className={`w-2 h-2 rounded-full ${isCardInserted ? 'bg-emerald-400 glow-box-green' : 'bg-emerald-600/50 animate-pulse'}`} />
            </div>
            <div
              onClick={handleInsertCard}
              className="w-24 h-2.5 bg-black rounded-full border border-gray-600 cursor-pointer hover:border-emerald-400 transition-colors shadow-inner"
              title="Card Slot"
            />
          </div>

          {/* Receipt Slot */}
          <div className="flex flex-col items-center relative">
            <span className="text-[8px] font-mono tracking-widest text-gray-400 uppercase mb-1">RECEIPT</span>
            <div className="w-24 h-2.5 bg-black rounded-full border border-gray-600 shadow-inner" />
            
            {/* Animated Printed Paper Receipt rolling out of slot */}
            {isReceiptPrinted && (
              <div className="absolute top-6 -right-2 z-30 w-52 bg-white text-stone-900 p-3 rounded-b-md shadow-2xl border-t-2 border-stone-300 text-left font-mono text-[9px] animate-in slide-in-from-top-4 duration-700">
                <div className="text-center font-bold text-[11px] border-b pb-1 mb-1 tracking-wider">
                  *** PHOTO BANK ***
                </div>
                <div className="flex justify-between text-[8px] text-stone-500">
                  <span>DATE: 17/10/2026</span>
                  <span>ATM #{BIRTHDAY_CONFIG.atm.pinCode}</span>
                </div>
                <div className="text-[8px] text-stone-500 mb-1">
                  CLIENT: {BIRTHDAY_CONFIG.recipientName} (My Deepu)
                </div>
                <div className="border-t border-dashed my-1" />
                <div className="space-y-0.5">
                  <div className="flex justify-between"><span>Smile:</span><span>100%</span></div>
                  <div className="flex justify-between"><span>Funny Moments:</span><span>97%</span></div>
                  <div className="flex justify-between"><span>Late Replies:</span><span>89%</span></div>
                  <div className="flex justify-between"><span>Kindness:</span><span>100%</span></div>
                </div>
                <div className="border-t border-dashed my-1.5" />
                <p className="italic text-center text-[8px] text-stone-600 font-sans">
                  &ldquo;{BIRTHDAY_CONFIG.atm.receiptMessage}&rdquo;
                </p>
                <div className="mt-2 text-center text-[7px] text-stone-400 font-mono tracking-widest">
                  |||||| |||| ||||||| ||| ||||
                </div>
                <button
                  onClick={() => {
                    soundEngine.playChime();
                    onContinue();
                  }}
                  className="w-full mt-2 py-1 bg-stone-900 text-white rounded text-[9px] font-sans font-medium text-center hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Collect & Continue 💖
                </button>
              </div>
            )}
          </div>
        </div>

        {/* METALLIC NUMERIC KEYPAD */}
        <div className="w-full max-w-[240px] bg-[#2d3748] p-2.5 rounded-xl border-2 border-gray-600 shadow-inner">
          <div className="grid grid-cols-3 gap-1.5">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'CLR', '0', 'ENTER'].map((key) => {
              const isClr = key === 'CLR';
              const isEnter = key === 'ENTER';
              return (
                <button
                  key={key}
                  onClick={() => handleKeypadPress(key)}
                  className={`h-8 rounded font-mono text-xs font-bold shadow-md transition-all active:scale-95 flex items-center justify-center cursor-pointer ${
                    isClr
                      ? 'bg-gradient-to-b from-rose-500 to-rose-700 text-white border border-rose-800'
                      : isEnter
                      ? 'bg-gradient-to-b from-emerald-500 to-emerald-700 text-white border border-emerald-800 text-[10px]'
                      : 'bg-gradient-to-b from-gray-200 to-gray-400 text-gray-900 border border-gray-400'
                  }`}
                >
                  {key}
                </button>
              );
            })}
          </div>
        </div>

        {/* Floating Credit Card before insertion */}
        {!isCardInserted && screen === 'CARD_INSERT' && (
          <div
            onClick={handleInsertCard}
            className="w-full mt-3 p-3 bg-gradient-to-r from-[#be185d] via-[#9d174d] to-[#831843] rounded-xl shadow-lg border border-pink-300/40 text-left text-white cursor-pointer hover:scale-105 active:scale-95 transition-transform"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-wider uppercase font-mono">PHOTO BANK</span>
              <div className="w-7 h-5 rounded bg-amber-300 border border-amber-400 flex items-center justify-center shadow-inner">
                <span className="text-[8px] text-amber-900 font-mono font-bold">EMV</span>
              </div>
            </div>
            <div className="mt-2 text-xs font-mono tracking-widest">
              •••• •••• •••• {BIRTHDAY_CONFIG.atm.pinCode}
            </div>
            <div className="mt-1 flex items-center justify-between text-[9px] text-pink-200">
              <span className="uppercase font-semibold">{BIRTHDAY_CONFIG.atm.cardHolder}</span>
              <span className="text-amber-200 font-bold">TAP TO INSERT 💳</span>
            </div>
          </div>
        )}

        {/* Lightbox / Polaroid Zoom Modal */}
        {enlargedPhoto && (
          <div
            onClick={() => setEnlargedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm bg-[#fdfbf7] p-4 sm:p-5 pb-6 rounded-2xl shadow-2xl border border-stone-200 flex flex-col items-center animate-in zoom-in-95 duration-200"
            >
              {/* Close Button */}
              <button
                onClick={() => setEnlargedPhoto(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Memory Date Badge */}
              <div className="text-[11px] font-mono font-medium tracking-wider text-rose-800 uppercase mb-3 px-2 py-0.5 bg-rose-50 rounded border border-rose-200/60">
                {enlargedPhoto.date}
              </div>

              {/* Large Image Frame */}
              <div className="w-full aspect-[3/4] max-h-[58vh] rounded-xl overflow-hidden shadow-md border-2 border-stone-200/80 bg-stone-900 flex items-center justify-center">
                <img
                  key={enlargedPhoto.url}
                  src={enlargedPhoto.url}
                  alt={enlargedPhoto.title}
                  className="w-full h-full object-contain bg-black"
                />
              </div>

              {/* Title & Caption */}
              <h3 className="font-serif-cormorant font-bold text-lg text-stone-900 mt-4 text-center">
                {enlargedPhoto.title}
              </h3>
              <p className="text-xs text-stone-600 font-sans mt-1 text-center leading-relaxed px-2">
                &ldquo;{enlargedPhoto.caption}&rdquo;
              </p>

              <button
                onClick={() => setEnlargedPhoto(null)}
                className="mt-4 py-2 px-6 rounded-full bg-[#be185d] hover:bg-[#9d174d] text-white text-xs font-medium transition-colors shadow-sm cursor-pointer"
              >
                Back to ATM
              </button>
            </div>
          </div>
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
          Memory Chapter
        </span>
        <button
          onClick={() => {
            soundEngine.playClick();
            onContinue();
          }}
          className="py-2.5 px-4 rounded-full bg-[#be185d] hover:bg-[#9d174d] text-white text-xs font-medium shadow-sm flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
        >
          <span>Continue to Cake</span>
          <Heart className="w-3 h-3 fill-white" />
        </button>
      </div>
    </div>
  );
};
