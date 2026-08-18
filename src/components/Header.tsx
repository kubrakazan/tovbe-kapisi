import React, { useState } from 'react';
import { GameStage, GameState } from '../types';
import { Volume2, VolumeX, RotateCcw, Award, Key, BookOpen, Layers, Heart } from 'lucide-react';
import { GateKeyLogo } from './GateKeyLogo';

interface HeaderProps {
  gameState: GameState;
  onReset: () => void;
  onToggleSound: () => void;
}

const STAGES: { key: GameStage; label: string; icon: React.ElementType }[] = [
  { key: 'intro', label: 'Giriş', icon: BookOpen },
  { key: 'quiz', label: '1. Kilit: Sorular', icon: Key },
  { key: 'story', label: '2. Kilit: Senaryo', icon: BookOpen },
  { key: 'conditions', label: '3. Kilit: Eşleştirme', icon: Layers },
  { key: 'victory_summary', label: 'Tövbe Kapısı', icon: Award },
];

export const Header: React.FC<HeaderProps> = ({
  gameState,
  onReset,
  onToggleSound,
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const currentIndex = STAGES.findIndex((s) => s.key === gameState.stage);

  return (
    <header id="game-header" className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-indigo-100 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <GateKeyLogo size="md" />
          <div>
            <h1 className="text-base sm:text-lg font-black font-cinzel tracking-wider text-slate-900 flex items-center gap-2">
              TÖVBE KAPISI
              <span className="hidden md:inline-block text-[11px] font-sans font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                Temel Dinî Bilgiler
              </span>
            </h1>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              Hatalardan Arınma: Tövbe ve İstiğfar
            </p>
          </div>
        </div>

        {/* Center: Stage Progress Tracker (desktop) */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
          {STAGES.map((stg, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            return (
              <div
                key={stg.key}
                id={`stage-indicator-${stg.key}`}
                className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full transition-all duration-300 ${
                  isCurrent
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                    : isCompleted
                    ? 'text-indigo-700 bg-indigo-50 font-semibold'
                    : 'text-slate-400 font-medium'
                }`}
                title={stg.label}
              >
                <stg.icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-slate-950' : isCompleted ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span className="hidden xl:inline">{stg.label}</span>
              </div>
            );
          })}
        </div>

        {/* Right: Lives, Score & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Hearts / Lives */}
          {gameState.stage !== 'intro' && gameState.stage !== 'victory_summary' && gameState.stage !== 'game_over' && (
            <div id="lives-counter-badge" className="flex items-center gap-1 bg-rose-50 border border-rose-200 px-2.5 py-1.5 rounded-2xl shadow-xs" title={`${gameState.lives} Canın Kaldı`}>
              {Array.from({ length: gameState.maxLives }).map((_, i) => (
                <Heart
                  key={i}
                  className={`w-4 h-4 transition-all duration-300 ${
                    i < gameState.lives
                      ? 'text-rose-500 fill-rose-500 scale-100'
                      : 'text-slate-300 fill-slate-200 scale-90 opacity-40'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Score counter */}
          <div id="player-score-badge" className="flex items-center gap-1.5 bg-amber-50 border border-amber-300 px-3 py-1.5 rounded-2xl shadow-xs text-amber-900 font-black text-sm">
            <Award className="w-4 h-4 text-amber-600" />
            <span>{gameState.score}</span>
            <span className="text-[11px] text-amber-700 font-semibold">Puan</span>
          </div>

          {/* Sound Toggle */}
          <button
            id="btn-toggle-sound"
            onClick={onToggleSound}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              gameState.soundEnabled
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100'
                : 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200'
            }`}
            title={gameState.soundEnabled ? 'Sesi Kapat' : 'Sesi Aç'}
            aria-label={gameState.soundEnabled ? 'Sesi Kapat' : 'Sesi Aç'}
          >
            {gameState.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Reset Game */}
          <div className="relative">
            <button
              id="btn-reset-game-prompt"
              onClick={() => setShowConfirmReset(!showConfirmReset)}
              className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-all cursor-pointer"
              title="Yeniden Başlat"
              aria-label="Yeniden Başlat"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Confirm Dialog popover */}
            {showConfirmReset && (
              <div
                id="reset-confirm-dialog"
                className="absolute right-0 mt-2 w-56 p-3 bg-white rounded-2xl border border-slate-200 shadow-xl z-50 animate-fadeIn text-center space-y-2.5"
              >
                <p className="text-xs font-semibold text-slate-700">
                  Oyunu baştan başlatmak istiyor musunuz?
                </p>
                <div className="flex gap-2">
                  <button
                    id="btn-confirm-reset-yes"
                    onClick={() => {
                      setShowConfirmReset(false);
                      onReset();
                    }}
                    className="flex-1 py-1 px-2 text-xs font-bold bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors cursor-pointer"
                  >
                    Evet
                  </button>
                  <button
                    id="btn-confirm-reset-no"
                    onClick={() => setShowConfirmReset(false)}
                    className="flex-1 py-1 px-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
                  >
                    İptal
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
