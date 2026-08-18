import React, { useEffect, useState } from 'react';
import { Lock, Unlock, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';

interface LockUnlockModalProps {
  lockNumber: number; // 1, 2, or 3
  stageTitle: string;
  stageSubtitle: string;
  onProceed: () => void;
}

export const LockUnlockModal: React.FC<LockUnlockModalProps> = ({
  lockNumber,
  stageTitle,
  stageSubtitle,
  onProceed,
}) => {
  // 'shaking' -> 'unlocking' -> 'opened'
  const [phase, setPhase] = useState<'shaking' | 'unlocking' | 'opened'>('shaking');

  useEffect(() => {
    // 1. Shaking & rattle sound
    soundManager.playLockShake();

    const t1 = setTimeout(() => {
      // 2. Unlock click & chime
      setPhase('unlocking');
      soundManager.playUnlock();

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#FDE68A', '#D97706', '#6366F1', '#38BDF8'],
        });
      } catch {
        // ignore
      }

      const t2 = setTimeout(() => {
        // 3. Fully opened & ready
        setPhase('opened');
      }, 500);

      return () => clearTimeout(t2);
    }, 700);

    return () => clearTimeout(t1);
  }, [lockNumber]);

  return (
    <div
      id={`lock-unlock-modal-${lockNumber}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
    >
      <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 border-2 border-amber-400/80 rounded-3xl p-6 sm:p-8 shadow-2xl text-center overflow-hidden">
        {/* Golden ambient background rays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent pointer-events-none" />

        {/* Lock Animation Visual */}
        <div className="relative my-4 flex items-center justify-center">
          {/* Pulsing light rings */}
          <div
            className={`absolute w-32 h-32 rounded-full bg-amber-400/20 blur-xl transition-all duration-700 ${
              phase === 'opened' ? 'scale-150 opacity-100 bg-amber-400/40' : 'scale-90 opacity-40'
            }`}
          />

          <div
            className={`relative w-24 h-24 rounded-3xl border-2 flex items-center justify-center transition-all duration-500 ${
              phase === 'shaking'
                ? 'bg-slate-800 border-amber-400/50 text-amber-300 animate-bounce'
                : 'bg-gradient-to-br from-amber-400 to-amber-500 border-amber-200 text-slate-950 shadow-lg shadow-amber-400/50 scale-110'
            }`}
          >
            {phase === 'shaking' ? (
              <Lock className="w-12 h-12 animate-pulse" />
            ) : (
              <Unlock className="w-12 h-12 transition-transform duration-300 rotate-6" />
            )}

            {phase === 'opened' && (
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-amber-300 animate-spin" />
            )}
          </div>
        </div>

        {/* Stage & Lock Info */}
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
            {stageTitle} Tamamlandı
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-white">
            {lockNumber}. KİLİT AÇILDI!
          </h3>

          <p className="text-sm text-slate-300 max-w-xs mx-auto font-medium">
            {stageSubtitle}
          </p>
        </div>

        {/* Proceed Action Button */}
        <div className="mt-8 relative z-10">
          <button
            id={`btn-proceed-after-lock-${lockNumber}`}
            onClick={onProceed}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 text-slate-950 font-cinzel font-black text-sm sm:text-base tracking-wider hover:brightness-110 active:scale-95 shadow-lg shadow-amber-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>
              {lockNumber === 3
                ? "TÖVBE KAPISI'NI AÇ"
                : `${lockNumber + 1}. AŞAMAYA GEÇ`}
            </span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
