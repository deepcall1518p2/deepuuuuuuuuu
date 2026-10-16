/**
 * Audio Engine:
 * 1. Supports playing user's uploaded MP3 (/music.mp3 or custom audio element / file reader)
 * 2. Provides realistic acoustic guitar fingerpicking arpeggio synthesis matching the romantic theme as an instant, zero-dependency fallback
 * 3. Tactile sound effects for ATM, scratch card, cake slice, and chimes
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMusicPlaying = false;
  private musicInterval: number | null = null;
  private chordIndex = 0;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private htmlAudio: HTMLAudioElement | null = null;
  private customAudioUrl: string | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initHtmlAudio();
    }
  }

  private initHtmlAudio() {
    try {
      this.htmlAudio = new Audio();
      this.htmlAudio.src = this.customAudioUrl || '/music.mp3';
      this.htmlAudio.loop = true;
      this.htmlAudio.preload = 'auto';
    } catch {
      // Audio element setup
    }
  }

  public setCustomAudioUrl(url: string) {
    this.customAudioUrl = url;
    if (this.htmlAudio) {
      this.htmlAudio.src = url;
      if (this.isMusicPlaying) {
        this.htmlAudio.play().catch(() => {});
      }
    }
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.75, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0.28, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playClick() {
    // Disabled - button pop sound removed per user request
  }

  public playAtmBeep() {
    try {
      this.initCtx();
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Ignore
    }
  }

  public playCardInsert() {
    try {
      this.initCtx();
      if (!this.ctx || !this.masterGain) return;
      const bufferSize = this.ctx.sampleRate * 0.15;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
      filter.Q.setValueAtTime(2, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      whiteNoise.start();
    } catch {
      // Ignore
    }
  }

  public playScratch() {
    try {
      this.initCtx();
      if (!this.ctx || !this.masterGain) return;
      const bufferSize = this.ctx.sampleRate * 0.04;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.3;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(3000, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.04);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      noise.start();
    } catch {
      // Ignore
    }
  }

  public playChime() {
    try {
      this.initCtx();
      if (!this.ctx || !this.masterGain) return;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0, this.ctx.currentTime + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + idx * 0.08 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + idx * 0.08 + 0.7);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(this.ctx.currentTime + idx * 0.08);
        osc.stop(this.ctx.currentTime + idx * 0.08 + 0.75);
      });
    } catch {
      // Ignore
    }
  }

  public playCakeSlice() {
    try {
      this.initCtx();
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);

      setTimeout(() => this.playChime(), 180);
    } catch {
      // Ignore
    }
  }

  public playUnfold() {
    try {
      this.initCtx();
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(640, this.ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch {
      // Ignore
    }
  }

  // Acoustic Guitar simulation (warm plucked notes)
  private playAcousticPluck(freq: number, startTime: number, duration: number) {
    if (!this.ctx || !this.musicGain) return;
    
    // Fundamental note
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, startTime);

    // Warm subtle overtone
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, startTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2200, startTime);
    filter.frequency.exponentialRampToValueAtTime(450, startTime + duration);

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.18, startTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + duration + 0.05);
    osc2.stop(startTime + duration + 0.05);
  }

  public getIsPlaying(): boolean {
    return this.isMusicPlaying;
  }

  public startMusic() {
    this.initCtx();
    this.isMusicPlaying = true;

    // First attempt: play HTML5 audio (/music.mp3 or uploaded track)
    if (!this.htmlAudio) {
      this.initHtmlAudio();
    }

    if (this.htmlAudio) {
      const playPromise = this.htmlAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // HTML Audio successfully playing!
          })
          .catch(() => {
            // If MP3 file is not found or blocked, start the acoustic fingerpicking synthesizer!
            this.startSynthesizedAcousticGuitar();
          });
        return;
      }
    }

    // Fallback directly to synthesized acoustic guitar
    this.startSynthesizedAcousticGuitar();
  }

  private startSynthesizedAcousticGuitar() {
    if (this.musicInterval !== null) return;

    // Romantic acoustic fingerpicking arpeggios (in D/A major matching the uploaded track):
    // Dmaj7 (D, F#, A, C#) -> A (A, C#, E, A) -> Bm7 (B, D, F#, A) -> Gmaj7 (G, B, D, F#)
    const guitarChords = [
      [146.83, 220.00, 293.66, 369.99, 440.00], // D A D F# A
      [110.00, 164.81, 220.00, 277.18, 329.63], // A E A C# E
      [123.47, 185.00, 246.94, 293.66, 369.99], // B F# B D F#
      [98.00, 146.83, 196.00, 246.94, 369.99],  // G D G B F#
      [146.83, 220.00, 293.66, 369.99, 440.00], // D
      [110.00, 164.81, 220.00, 277.18, 329.63], // A
      [164.81, 246.94, 329.63, 392.00, 493.88], // Em
      [110.00, 164.81, 220.00, 277.18, 329.63]  // A
    ];

    const playFingerpick = () => {
      if (!this.ctx || !this.isMusicPlaying) return;
      const chord = guitarChords[this.chordIndex % guitarChords.length];
      const now = this.ctx.currentTime;
      // Arpeggiate notes in romantic acoustic fingerstyle rhythm
      chord.forEach((freq, idx) => {
        this.playAcousticPluck(freq, now + idx * 0.22, 1.4);
      });
      this.chordIndex++;
    };

    playFingerpick();
    this.musicInterval = window.setInterval(playFingerpick, 1400);
  }

  public stopMusic() {
    this.isMusicPlaying = false;
    if (this.htmlAudio) {
      try {
        this.htmlAudio.pause();
      } catch {
        // Ignore
      }
    }
    if (this.musicInterval !== null) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  public toggleMusic(): boolean {
    if (this.isMusicPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }
}

export const soundEngine = new SoundEngine();
