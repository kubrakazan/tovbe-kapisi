import React, { useEffect } from 'react';
import { RotateCcw, HeartCrack, Sparkles, Heart, Clock, Award } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { GameState } from '../types';
import { formatDuration } from '../utils/timeFormat';

interface GameOverScreenProps {
  gameState: GameState;
  onRestartGame: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({ gameState, onRestartGame }) => {
  useEffect(() => {
    soundManager.playGameOver();
  }, []);

  const elapsedTimeStr = formatDuration(gameState.startTime, gameState.endTime);

  return (
    <div id="game-over-screen-container" className="w-full max-w-xl mx-auto px-4 py-8 flex flex-col items-center justify-center text-center space-y-5 animate-fadeIn">
      {/* Icon Card */}
      <div className="relative">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-rose-500 to-amber-500 border-4 border-amber-200 shadow-2xl flex items-center justify-center text-white mx-auto animate-pulse-slow">
          <HeartCrack className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
        </div>
        <div className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-amber-400 border border-white text-slate-950 shadow-md">
          <Sparkles className="w-4 h-4" />
        </div>
      </div>

      {/* Main Encouraging Message */}
      <div className="space-y-2.5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-xs font-bold uppercase tracking-wider shadow-xs">
          <Heart className="w-3.5 h-3.5 text-rose-500" />
          Yeniden Başlama Fırsatı
        </div>

        <h2 className="text-2xl sm:text-3xl font-black font-cinzel text-slate-900 leading-snug">
          ÜZÜLME, TÖVBE KAPISI HER ZAMAN AÇIK!
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-medium">
          Hatalardan ders çıkarıp yeniden adım atmak her zaman mümkündür. Bilgilerini tazeleyip tekrar deneyebilirsin.
        </p>
      </div>

      {/* Game Duration & Stats Box */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
        {/* Elapsed Time Box */}
        <div id="game-over-time-box" className="p-4 rounded-2xl bg-white border border-indigo-100 shadow-sm text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-indigo-900 uppercase tracking-wider">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span>Oyun Süresi</span>
          </div>
          <div className="text-lg sm:text-xl font-black text-indigo-950 font-cinzel py-0.5">
            {elapsedTimeStr}
          </div>
          <span className="text-[11px] text-slate-500 font-medium block">
            Toplam oynama süresi
          </span>
        </div>

        {/* Score Achieved Box */}
        <div id="game-over-score-box" className="p-4 rounded-2xl bg-white border border-amber-200 shadow-sm text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Ulaşılan Puan</span>
          </div>
          <div className="text-lg sm:text-xl font-black text-amber-950 font-cinzel py-0.5">
            {gameState.score}
          </div>
          <span className="text-[11px] text-amber-700 font-medium block">
            {gameState.unlockedLocks.length} / 3 Kilit Açıldı
          </span>
        </div>
      </div>

      {/* Encouragement Card */}
      <div className="w-full p-4 rounded-2xl bg-white border border-indigo-100 shadow-md space-y-1.5 text-left max-w-md">
        <div className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Hatırla:</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          İslam dini, ümitsizliğe yer bırakmaz. Tövbe kapısı son nefese kadar her kul için açıktır.
        </p>
      </div>

      {/* Restart Button */}
      <button
        id="restart-game-over-button"
        onClick={onRestartGame}
        className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-amber-400/30 flex items-center justify-center gap-2.5 transition transform hover:scale-105 cursor-pointer"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Yeniden Dene</span>
      </button>
    </div>
  );
};
