import React from 'react';
import { Lock, Unlock, Sparkles, ArrowRight, DoorOpen } from 'lucide-react';
import { GameState } from '../types';

interface StageLockTrackerProps {
  gameState: GameState;
}

export const StageLockTracker: React.FC<StageLockTrackerProps> = ({ gameState }) => {
  const locks = [
    { number: 1, label: '1. Kilit', stageName: 'Sorular', stageKey: 'quiz' },
    { number: 2, label: '2. Kilit', stageName: 'Senaryo', stageKey: 'story' },
    { number: 3, label: '3. Kilit', stageName: 'Eşleştirme', stageKey: 'conditions' },
  ];

  const unlockedSet = new Set(gameState.unlockedLocks);
  const isGateOpen = unlockedSet.size >= 3;

  return (
    <div
      id="stage-lock-tracker"
      className="w-full max-w-4xl mx-auto px-4 py-3 mb-4 rounded-2xl bg-white border border-indigo-100 shadow-sm"
    >
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        {/* 3 Locks */}
        <div className="flex-1 flex items-center justify-between gap-1 sm:gap-3">
          {locks.map((lock, idx) => {
            const isUnlocked = unlockedSet.has(lock.number);
            const isCurrent =
              (lock.number === 1 && gameState.stage === 'quiz') ||
              (lock.number === 2 && gameState.stage === 'story') ||
              (lock.number === 3 && gameState.stage === 'conditions');

            return (
              <React.Fragment key={lock.number}>
                <div
                  id={`stage-lock-item-${lock.number}`}
                  className={`flex-1 flex items-center justify-center sm:justify-start gap-2 px-2.5 sm:px-3.5 py-2 rounded-xl border transition-all duration-300 ${
                    isUnlocked
                      ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-xs'
                      : isCurrent
                      ? 'bg-indigo-50/80 border-indigo-300 text-indigo-950 font-semibold ring-2 ring-indigo-200'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 ${
                      isUnlocked
                        ? 'bg-amber-500 text-slate-950 shadow-xs'
                        : isCurrent
                        ? 'bg-indigo-600 text-white animate-pulse'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {isUnlocked ? (
                      <Unlock className="w-4 h-4" />
                    ) : (
                      <Lock className="w-3.5 h-3.5" />
                    )}
                  </div>

                  <div className="hidden sm:block text-left">
                    <div className="text-[11px] font-bold tracking-tight">
                      {lock.label}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">
                      {lock.stageName}
                    </div>
                  </div>
                </div>

                {idx < locks.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0 hidden xs:block" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Final Target: Tövbe Kapısı */}
        <ArrowRight className="w-4 h-4 text-slate-300 shrink-0 hidden sm:block" />

        <div
          id="gate-status-tracker-badge"
          className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-300 ${
            isGateOpen
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 border-amber-300 text-slate-950 font-black shadow-md'
              : 'bg-slate-100 border-slate-200 text-slate-400'
          }`}
        >
          <div className="relative">
            <DoorOpen className={`w-5 h-5 ${isGateOpen ? 'text-slate-950' : 'text-slate-400'}`} />
            {isGateOpen && (
              <Sparkles className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 text-amber-100 animate-spin" />
            )}
          </div>
          <span className="text-xs font-cinzel font-bold hidden md:inline">
            TÖVBE KAPISI
          </span>
        </div>
      </div>
    </div>
  );
};
