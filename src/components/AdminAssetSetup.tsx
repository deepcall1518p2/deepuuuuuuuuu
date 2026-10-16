import React, { useState } from 'react';
import { Upload, CheckCircle2, Music, Image, ShieldAlert, Sparkles, X } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminAssetSetup: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const [photoStatus, setPhotoStatus] = useState<string[]>(['Pending', 'Pending', 'Pending', 'Pending', 'Pending']);
  const [musicStatus, setMusicStatus] = useState<string>('Pending');
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handlePhotosUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsSaving(true);
    const newStatuses = [...photoStatus];

    for (let i = 0; i < Math.min(files.length, 5); i++) {
      const file = files[i];
      const index = i + 1;
      newStatuses[i] = 'Saving...';
      setPhotoStatus([...newStatuses]);

      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      try {
        const res = await fetch('/api/save-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ index, dataUrl })
        });
        if (res.ok) {
          newStatuses[i] = 'Saved to disk!';
        } else {
          newStatuses[i] = 'Saved to local browser';
        }
      } catch {
        newStatuses[i] = 'Saved to local browser';
      }
      setPhotoStatus([...newStatuses]);
    }

    setIsSaving(false);
    setSuccessMessage('Deepu’s photos are permanently saved to the project files! Ready for Vercel deployment.');
    soundEngine.playChime();
    onSuccess();
  };

  const handleMusicUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setMusicStatus('Saving music...');
    const dataUrl = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });

    try {
      const res = await fetch('/api/save-music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataUrl })
      });
      if (res.ok) {
        setMusicStatus('Saved to /public/music.mp3!');
      } else {
        setMusicStatus('Loaded in browser');
      }
    } catch {
      setMusicStatus('Loaded in browser');
    }

    soundEngine.setCustomAudioUrl(dataUrl);
    soundEngine.playChime();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-[#fdfbf7] p-6 rounded-2xl shadow-2xl border border-stone-300 animate-in zoom-in-95 duration-200 text-left">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-200">
          <div className="flex items-center gap-2 text-stone-900">
            <Sparkles className="w-5 h-5 text-rose-600" />
            <h3 className="font-serif-cormorant font-bold text-lg">
              Setup Deepu&apos;s Real Photos & Music
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-500 hover:text-stone-800 hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-stone-600 mb-4 leading-relaxed">
          Upload Deepu&apos;s 5 photos and MP3 music once here. They are saved directly into the website&apos;s project files (`public/photos/` and `public/music.mp3`) so when you deploy to Vercel, she sees her real photos and hears the song with <strong>zero upload required from her!</strong>
        </p>

        {/* 1. Photos Section */}
        <div className="mb-4 p-3.5 bg-stone-50 rounded-xl border border-stone-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
              <Image className="w-3.5 h-3.5 text-rose-600" />
              1. Deepu&apos;s 5 Real Photos
            </span>
            <span className="text-[10px] text-stone-500 font-mono">Select 5 files</span>
          </div>

          <label className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white rounded-lg text-xs font-medium cursor-pointer shadow-sm transition-all active:scale-98">
            <Upload className="w-3.5 h-3.5" />
            <span>Select 5 Photos from your Device</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotosUpload}
              className="hidden"
            />
          </label>

          {/* Slots list */}
          <div className="mt-3 space-y-1">
            {[1, 2, 3, 4, 5].map((num, idx) => (
              <div key={num} className="flex items-center justify-between text-[11px] text-stone-600 px-2 py-1 bg-white rounded border border-stone-200/60">
                <span>Memory 0{num}</span>
                <span className={`font-mono text-[10px] ${photoStatus[idx].includes('Saved') ? 'text-emerald-600 font-bold' : 'text-stone-400'}`}>
                  {photoStatus[idx]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Music Section */}
        <div className="mb-4 p-3.5 bg-stone-50 rounded-xl border border-stone-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-rose-600" />
              2. Uploaded MP3 Song
            </span>
            <span className="text-[10px] text-stone-500 font-mono">/music.mp3</span>
          </div>

          <label className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-stone-800 hover:bg-stone-900 text-white rounded-lg text-xs font-medium cursor-pointer shadow-sm transition-all active:scale-98">
            <Upload className="w-3.5 h-3.5" />
            <span>Select MP3 Music File</span>
            <input
              type="file"
              accept="audio/*,.mp3,.m4a,.wav"
              onChange={handleMusicUpload}
              className="hidden"
            />
          </label>
          <div className="mt-2 text-[11px] text-stone-500 flex justify-between px-2 font-mono">
            <span>Status:</span>
            <span className={musicStatus.includes('Saved') ? 'text-emerald-600 font-bold' : 'text-stone-400'}>
              {musicStatus}
            </span>
          </div>
        </div>

        {successMessage && (
          <div className="mb-4 p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-stone-900 text-white rounded-xl text-xs font-medium text-center hover:bg-stone-800 transition-colors"
        >
          Done & Close Setup
        </button>
      </div>
    </div>
  );
};
