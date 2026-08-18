import React from 'react';
import { GameState } from '../types';
import { Play, Sparkles, KeyRound, BookOpen, Layers, ArrowRight, Heart } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { GateKeyLogo } from './GateKeyLogo';

interface IntroScreenProps {
  gameState: GameState;
  onStartGame: () => void;
  onResumeGame?: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({
  gameState,
  onStartGame,
  onResumeGame,
}) => {
  const hasPreviousProgress = gameState.score > 0 || gameState.unlockedLocks.length > 0;

  const handleStart = () => {
    soundManager.playUnlock();
    onStartGame();
  };

  return (
    <div id="intro-screen" className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[75vh] text-center space-y-8 animate-fadeIn">
      
      {/* Top Gate & Key Logo */}
      <div className="relative group">
        <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/40 via-sky-400/30 to-indigo-400/40 rounded-full blur-2xl opacity-80 group-hover:opacity-100 transition duration-1000"></div>
        <GateKeyLogo size="xl" className="relative shadow-2xl scale-110" />
      </div>

      {/* Main Title & Subtitle */}
      <div className="space-y-3.5 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold tracking-wider uppercase shadow-xs">
          <Sparkles className="w-4 h-4 text-amber-600" />
          Temel Dinî Bilgiler • Hatalardan Arınma: Tövbe
        </div>

        <h1 className="text-4xl sm:text-6xl font-black font-cinzel tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-indigo-950 via-slate-900 to-amber-900 drop-shadow-xs">
          TÖVBE KAPISI
        </h1>

        <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed max-w-xl mx-auto">
          Bilgilerini test et, örnek olaylarda doğru kararı ver ve ayet-konu eşleştirmelerini tamamlayarak 3 kilidi aç.
        </p>

        {/* Lives Preview */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
          <span>Her turda 3 Canın bulunmaktadır:</span>
          <div className="flex items-center gap-1 text-rose-500">
            <Heart className="w-4 h-4 fill-rose-500" />
            <Heart className="w-4 h-4 fill-rose-500" />
            <Heart className="w-4 h-4 fill-rose-500" />
          </div>
        </div>
      </div>

      {/* 3 Game Stages Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl text-left">
        
        {/* Stage 1 */}
        <div className="p-5 rounded-3xl bg-white border border-indigo-100 shadow-md hover:shadow-lg transition-all flex items-start gap-3.5">
          <div className="p-3 rounded-2xl bg-amber-100 text-amber-700 shrink-0 border border-amber-200">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">1. Aşama</span>
            </div>
            <h2 className="text-sm font-bold text-slate-900 mt-1">1. Kilit: Bilgi Soruları</h2>
            <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
              Süre dolmadan soruları doğru cevaplayarak 1. kilidi aç.
            </p>
          </div>
        </div>

        {/* Stage 2 */}
        <div className="p-5 rounded-3xl bg-white border border-indigo-100 shadow-md hover:shadow-lg transition-all flex items-start gap-3.5">
          <div className="p-3 rounded-2xl bg-sky-100 text-sky-700 shrink-0 border border-sky-200">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">2. Aşama</span>
            </div>
            <h2 className="text-sm font-bold text-slate-900 mt-1">2. Kilit: Senaryo ve Karar</h2>
            <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
              Örnek olayı inceleyip süre içerisinde en doğru seçimi yaparak 2. kilidi aç.
            </p>
          </div>
        </div>

        {/* Stage 3 */}
        <div className="p-5 rounded-3xl bg-white border border-indigo-100 shadow-md hover:shadow-lg transition-all flex items-start gap-3.5">
          <div className="p-3 rounded-2xl bg-indigo-100 text-indigo-700 shrink-0 border border-indigo-200">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">3. Aşama</span>
            </div>
            <h2 className="text-sm font-bold text-slate-900 mt-1">3. Kilit: Ayet ve Konu Eşleştirme</h2>
            <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
              Ayetlerin anlamlarını doğru kavrayıp ilgili konularla eşleştirerek 3. kilidi çöz ve kapıyı arala.
            </p>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md pt-2">
        <button
          id="btn-start-game"
          onClick={handleStart}
          className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 text-slate-950 font-cinzel font-black text-base sm:text-lg tracking-wider hover:brightness-110 active:scale-95 shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-3 cursor-pointer"
        >
          <Play className="w-5 h-5 fill-slate-950" />
          <span>OYUNA BAŞLA</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        {hasPreviousProgress && onResumeGame && (
          <button
            id="btn-resume-game"
            onClick={onResumeGame}
            className="w-full py-3.5 px-6 rounded-2xl bg-white border-2 border-indigo-200 text-indigo-900 font-bold text-sm hover:bg-indigo-50 active:scale-95 transition-all cursor-pointer"
          >
            Kaldığım Yerden Devam Et
          </button>
        )}
      </div>
    </div>
  );
};
