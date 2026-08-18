import React, { useEffect, useState } from 'react';
import { Sparkles, Unlock, KeyRound } from 'lucide-react';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';

interface GateOpeningSequenceProps {
  onComplete: () => void;
}

export const GateOpeningSequence: React.FC<GateOpeningSequenceProps> = ({ onComplete }) => {
  // Sequence phases:
  // 1: 'showing_locks' (all 3 locks glow)
  // 2: 'key_insert' (golden key slides in & turns)
  // 3: 'doors_opening' (doors swing wide open)
  // 4: 'light_burst' (glorious golden radiant light expands and fills screen)
  const [phase, setPhase] = useState<'showing_locks' | 'key_insert' | 'doors_opening' | 'light_burst'>('showing_locks');

  useEffect(() => {
    // 1. Showing all 3 locks glowing & chime
    soundManager.playUnlock();

    // 2. Key turns (1000ms)
    const t1 = setTimeout(() => {
      setPhase('key_insert');
      soundManager.playKeyTurn();

      // 3. Doors swing open (2000ms)
      const t2 = setTimeout(() => {
        setPhase('doors_opening');
        soundManager.playGateOpen();

        try {
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.5 },
            colors: ['#F59E0B', '#FDE68A', '#FEF08A', '#38BDF8', '#818CF8', '#FFFFFF'],
          });
        } catch {
          // ignore
        }

        // 4. Light burst fills screen (3200ms)
        const t3 = setTimeout(() => {
          setPhase('light_burst');
          soundManager.playVictory();

          // 5. Complete and show victory screen
          const t4 = setTimeout(() => {
            onComplete();
          }, 1400);

          return () => clearTimeout(t4);
        }, 1400);

        return () => clearTimeout(t3);
      }, 1100);

      return () => clearTimeout(t2);
    }, 1000);

    return () => clearTimeout(t1);
  }, [onComplete]);

  return (
    <div
      id="gate-opening-sequence"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-slate-950 text-white overflow-hidden select-none"
    >
      {/* Radiant Light Burst Layer */}
      <div
        className={`fixed inset-0 z-40 pointer-events-none transition-opacity duration-1000 flex items-center justify-center ${
          phase === 'light_burst' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-full h-full bg-gradient-to-t from-amber-200 via-amber-100 to-white animate-pulse" />
      </div>

      {/* Background Starry / Golden Aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/60 via-slate-950 to-black pointer-events-none" />

      {/* Header Info */}
      <div className="relative z-10 text-center mb-4 space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
          3 Kilit Açıldı • Büyük Açılış
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-cinzel text-white tracking-wider">
          TÖVBE KAPISI AÇILIYOR
        </h2>
        <p className="text-xs sm:text-sm text-amber-200 font-medium">
          Tüm kilitler çözüldü, mağfiret kapısı ardına kadar aralanıyor.
        </p>
      </div>

      {/* The 3 Stage Locks Status Row */}
      <div className="relative z-10 flex items-center justify-center gap-4 sm:gap-6 mb-6">
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-amber-500/20 border border-amber-400/60 text-amber-300 shadow-md shadow-amber-500/20 animate-pulse"
          >
            <Unlock className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold font-cinzel">{num}. Kilit</span>
          </div>
        ))}
      </div>

      {/* Portal Container */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md h-[380px] sm:h-[420px] rounded-t-full bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-900 border-4 border-amber-400 p-3 shadow-2xl flex flex-col items-center justify-between overflow-hidden shadow-amber-500/40">
        
        {/* Gate Arch Top */}
        <div className="w-full text-center pt-3 pb-2 border-b border-amber-400/40 z-20">
          <span className="text-sm uppercase font-cinzel tracking-widest text-amber-200 font-extrabold block drop-shadow">
            TÖVBE VE MAĞFİRET KAPISI
          </span>
        </div>

        {/* Door Canvas with Left/Right Wings */}
        <div className="relative w-full flex-1 flex my-2 gap-1 perspective-[1200px] overflow-hidden rounded-lg">
          {/* Radiant Light Behind The Door */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-0 transition-opacity duration-1000 ${
              phase === 'doors_opening' || phase === 'light_burst'
                ? 'opacity-100 bg-gradient-to-b from-amber-100 via-amber-200 to-sky-100'
                : 'opacity-0'
            }`}
          >
            <div className="space-y-3 z-10">
              <div className="w-16 h-16 rounded-full bg-white/80 border-2 border-amber-400 shadow-xl flex items-center justify-center mx-auto text-amber-500 animate-pulse">
                <Sparkles className="w-9 h-9" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-cinzel text-indigo-950">
                KAPI AÇILDI!
              </h3>
            </div>
          </div>

          {/* Left Door Leaf */}
          <div
            className={`w-1/2 h-full bg-gradient-to-br from-indigo-900 via-slate-800 to-indigo-950 border-r border-amber-400/60 p-3 flex flex-col justify-between origin-left transition-transform duration-1000 ease-out z-10 ${
              phase === 'doors_opening' || phase === 'light_burst'
                ? '-rotate-y-110 shadow-2xl'
                : 'rotate-y-0'
            }`}
          >
            <div className="w-full h-full border border-amber-400/30 rounded-t-full flex flex-col items-center justify-around py-4">
              <div className="w-8 h-8 rounded-full border border-amber-400/40 flex items-center justify-center text-amber-300">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="w-2 h-16 bg-amber-400/40 rounded-full" />
            </div>
          </div>

          {/* Right Door Leaf */}
          <div
            className={`w-1/2 h-full bg-gradient-to-bl from-indigo-900 via-slate-800 to-indigo-950 border-l border-amber-400/60 p-3 flex flex-col justify-between origin-right transition-transform duration-1000 ease-out z-10 ${
              phase === 'doors_opening' || phase === 'light_burst'
                ? 'rotate-y-110 shadow-2xl'
                : 'rotate-y-0'
            }`}
          >
            <div className="w-full h-full border border-amber-400/30 rounded-t-full flex flex-col items-center justify-around py-4">
              <div className="w-8 h-8 rounded-full border border-amber-400/40 flex items-center justify-center text-amber-300">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="w-2 h-16 bg-amber-400/40 rounded-full" />
            </div>
          </div>

          {/* Golden Key Turning in the Lock Center */}
          {(phase === 'showing_locks' || phase === 'key_insert') && (
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
              <div
                className={`p-3.5 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-slate-950 shadow-xl border-2 border-white transition-all duration-700 ${
                  phase === 'key_insert' ? 'rotate-90 scale-125 shadow-amber-400/80' : 'rotate-0 scale-100'
                }`}
              >
                <KeyRound className="w-8 h-8" />
              </div>
            </div>
          )}
        </div>

        {/* Portal Base Step */}
        <div className="w-full text-center py-2 border-t border-amber-400/40 bg-indigo-950/80 z-20">
          <span className="text-[11px] font-bold text-amber-300 tracking-wider">
            HER ZAMAN AÇIK OLAN MAĞFİRET KAPISI
          </span>
        </div>
      </div>
    </div>
  );
};
