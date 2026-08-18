import React, { useEffect } from 'react';
import { GameState } from '../types';
import { Sparkles, RotateCcw, Unlock, CheckCircle2, Clock, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';
import { GateKeyLogo } from './GateKeyLogo';
import { formatDuration } from '../utils/timeFormat';

interface SummaryStageProps {
  gameState: GameState;
  onRestartGame: () => void;
}

export const SummaryStage: React.FC<SummaryStageProps> = ({
  gameState,
  onRestartGame,
}) => {
  useEffect(() => {
    soundManager.playVictory();
    try {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#F59E0B', '#6366F1', '#FBBF24', '#38BDF8', '#10B981', '#FFFFFF'],
      });
    } catch {
      // ignore
    }
  }, []);

  const completionTimeStr = formatDuration(gameState.startTime, gameState.endTime);

  return (
    <div id="summary-stage-container" className="w-full max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-5 animate-fadeIn text-center">
      
      {/* Top Completion Header */}
      <div className="space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold uppercase tracking-wider shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Yolculuk Başarıyla Tamamlandı
        </div>
        
        <h2 className="text-3xl sm:text-5xl font-black font-cinzel text-slate-900 tracking-wider">
          TEBRİKLER!
        </h2>
        
        <p className="text-lg sm:text-2xl font-bold font-cinzel text-amber-600 max-w-lg mx-auto">
          Tövbe Kapısı'nı Açtın.
        </p>

        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto font-medium">
          Bilgi sorularını çözdün, örnek olayda doğru kararı verdin ve ayet-konu eşleştirmelerini tamamlayarak 3 kilidi de başarıyla açtın.
        </p>
      </div>

      {/* 3 Unlocked Locks Badge Row */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-1">
        {[
          { num: 1, label: '1. Kilit: Sorular' },
          { num: 2, label: '2. Kilit: Senaryo' },
          { num: 3, label: '3. Kilit: Eşleştirme' },
        ].map((item) => (
          <div
            key={item.num}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold shadow-xs"
          >
            <Unlock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Radiant Completion Card */}
      <div className="p-5 sm:p-7 rounded-3xl bg-white border-2 border-amber-300 shadow-xl relative overflow-hidden space-y-5">
        {/* Certificate Header with Logo */}
        <div className="flex flex-col items-center justify-center space-y-2.5 border-b border-slate-100 pb-4">
          <GateKeyLogo size="lg" className="shadow-md" />
          <div>
            <h3 className="text-lg sm:text-xl font-black font-cinzel text-slate-900 tracking-wide">
              TÖVBE VE İSTİĞFAR ETKİNLİK BAŞARISI
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
              Temel Dinî Bilgiler • Hatalardan Arınma: Tövbe
            </p>
          </div>
        </div>

        {/* Stats Grid: Score and Elapsed Time Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-lg mx-auto">
          {/* Total Score Display */}
          <div id="summary-score-box" className="p-4 rounded-2xl bg-amber-50/80 border border-amber-300 space-y-1 text-center shadow-xs">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Toplam Puan</span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-amber-950 font-cinzel">
              {gameState.score}
            </div>
            <span className="text-[11px] text-amber-700 font-medium block">
              Tüm kilitler eksiksiz açıldı
            </span>
          </div>

          {/* Completion Time Box */}
          <div id="summary-time-box" className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-300 space-y-1 text-center shadow-xs">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-indigo-900 uppercase tracking-wider">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>Tamamlama Süresi</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-indigo-950 font-cinzel py-1">
              {completionTimeStr}
            </div>
            <span className="text-[11px] text-indigo-700 font-medium block">
              Oyun süresi başarıyla kaydedildi
            </span>
          </div>
        </div>

        {/* Hadith & Moral Value Banner */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1.5">
          <p className="text-xs sm:text-sm text-slate-900 font-bold font-serif leading-relaxed">
            "Şüphesiz Allah (cc), kulunun tövbesinden son derece hoşnut olur."
          </p>
          <span className="text-[11px] text-slate-500 font-semibold block">
            (Müslim, Tevbe, 1)
          </span>
        </div>
      </div>

      {/* Action Restart Button */}
      <div className="pt-2 flex justify-center">
        <button
          id="restart-game-summary-button"
          onClick={onRestartGame}
          className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:brightness-105 active:scale-95 text-slate-950 font-cinzel font-black text-sm sm:text-base shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>OYUNU YENİDEN OYNA</span>
        </button>
      </div>
    </div>
  );
};
