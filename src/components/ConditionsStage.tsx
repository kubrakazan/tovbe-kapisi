import React, { useState, useEffect } from 'react';
import { GameState, AyetTopicPair } from '../types';
import { AYET_TOPIC_PAIRS } from '../data/conditionsData';
import { 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  AlertCircle,
  GripVertical,
  Layers,
  RotateCcw
} from 'lucide-react';
import { soundManager } from '../utils/audio';
import { GateOpeningSequence } from './GateOpeningSequence';
import { LockUnlockModal } from './LockUnlockModal';
import { StageLockTracker } from './StageLockTracker';

interface ConditionsStageProps {
  gameState: GameState;
  onCompleteConditions: (points: number) => void;
  onWrongOrTimeout: () => void;
  onStage3Complete: () => void;
  onProceedToVictory: () => void;
}

interface TopicCardItem {
  pairId: string;
  topicText: string;
  colorTheme: {
    border: string;
    bg: string;
    text: string;
    badgeBg: string;
    badgeText: string;
    hoverBorder: string;
    selectedRing: string;
  };
}

const CARD_THEMES = [
  {
    border: 'border-amber-300',
    bg: 'bg-gradient-to-r from-amber-50 to-orange-50/80',
    text: 'text-amber-950',
    badgeBg: 'bg-amber-200/80 text-amber-900 border-amber-300',
    badgeText: 'text-amber-800',
    hoverBorder: 'hover:border-amber-400 hover:shadow-amber-100',
    selectedRing: 'ring-2 ring-amber-400 border-amber-500 bg-amber-100/70',
  },
  {
    border: 'border-sky-300',
    bg: 'bg-gradient-to-r from-sky-50 to-blue-50/80',
    text: 'text-sky-950',
    badgeBg: 'bg-sky-200/80 text-sky-900 border-sky-300',
    badgeText: 'text-sky-800',
    hoverBorder: 'hover:border-sky-400 hover:shadow-sky-100',
    selectedRing: 'ring-2 ring-sky-400 border-sky-500 bg-sky-100/70',
  },
  {
    border: 'border-emerald-300',
    bg: 'bg-gradient-to-r from-emerald-50 to-teal-50/80',
    text: 'text-emerald-950',
    badgeBg: 'bg-emerald-200/80 text-emerald-900 border-emerald-300',
    badgeText: 'text-emerald-800',
    hoverBorder: 'hover:border-emerald-400 hover:shadow-emerald-100',
    selectedRing: 'ring-2 ring-emerald-400 border-emerald-500 bg-emerald-100/70',
  },
  {
    border: 'border-purple-300',
    bg: 'bg-gradient-to-r from-purple-50 to-indigo-50/80',
    text: 'text-purple-950',
    badgeBg: 'bg-purple-200/80 text-purple-900 border-purple-300',
    badgeText: 'text-purple-800',
    hoverBorder: 'hover:border-purple-400 hover:shadow-purple-100',
    selectedRing: 'ring-2 ring-purple-400 border-purple-500 bg-purple-100/70',
  },
];

export const ConditionsStage: React.FC<ConditionsStageProps> = ({
  gameState,
  onCompleteConditions,
  onWrongOrTimeout,
  onStage3Complete,
  onProceedToVictory,
}) => {
  // Matched pairs: mapping from verseId -> topicPairId
  const [matches, setMatches] = useState<Record<string, string>>({});
  
  // Currently dragged or selected topic card
  const [draggedTopicId, setDraggedTopicId] = useState<string | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  
  // Feedback animation state
  const [wrongTargetId, setWrongTargetId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const [showLock3Modal, setShowLock3Modal] = useState(false);
  const [showGateSequence, setShowGateSequence] = useState(false);

  // Available topic cards shuffled
  const [topicCards, setTopicCards] = useState<TopicCardItem[]>([]);

  useEffect(() => {
    const cards: TopicCardItem[] = AYET_TOPIC_PAIRS.map((pair, idx) => ({
      pairId: pair.id,
      topicText: pair.topicText,
      colorTheme: CARD_THEMES[idx % CARD_THEMES.length],
    }));
    // Shuffle cards
    setTopicCards([...cards].sort(() => Math.random() - 0.5));
  }, []);

  const totalPairs = AYET_TOPIC_PAIRS.length;
  const matchedCount = Object.keys(matches).length;
  const isAllMatched = matchedCount === totalPairs;

  // Handle matching attempt
  const attemptMatch = (verseId: string, topicPairId: string) => {
    if (matches[verseId]) return; // already matched

    const isCorrect = verseId === topicPairId;

    if (isCorrect) {
      soundManager.playCorrect();
      setFeedbackMessage(null);
      setWrongTargetId(null);
      
      const newMatches = { ...matches, [verseId]: topicPairId };
      setMatches(newMatches);
      setSelectedTopicId(null);
      setDraggedTopicId(null);

      // Check if this was the last match
      if (Object.keys(newMatches).length === totalPairs) {
        soundManager.playUnlock();
        onCompleteConditions(40);
        onStage3Complete();
        setTimeout(() => {
          setShowLock3Modal(true);
        }, 700);
      }
    } else {
      soundManager.playHint();
      setWrongTargetId(verseId);
      setFeedbackMessage("Bu konu açıklaması seçilen ayetin anlamı ile örtüşmüyor. Anlamı tekrar düşünerek yeniden deneyebilirsin.");
      
      // Deduct 1 life immediately on wrong match
      onWrongOrTimeout();
      
      setSelectedTopicId(null);
      setDraggedTopicId(null);

      setTimeout(() => {
        setWrongTargetId(null);
      }, 1200);
    }
  };

  // Drag handlers
  const handleDragStart = (e: React.DragEvent, topicId: string) => {
    setDraggedTopicId(topicId);
    e.dataTransfer.setData('text/plain', topicId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, verseId: string) => {
    e.preventDefault();
    const topicId = e.dataTransfer.getData('text/plain') || draggedTopicId;
    if (topicId) {
      attemptMatch(verseId, topicId);
    }
  };

  // Click-to-pair fallback
  const handleTopicCardClick = (topicId: string) => {
    if (selectedTopicId === topicId) {
      setSelectedTopicId(null);
    } else {
      setSelectedTopicId(topicId);
    }
  };

  const handleVerseSlotClick = (verseId: string) => {
    if (matches[verseId]) return;
    if (selectedTopicId) {
      attemptMatch(verseId, selectedTopicId);
    }
  };

  // Reset matching state
  const handleResetMatches = () => {
    setMatches({});
    setSelectedTopicId(null);
    setDraggedTopicId(null);
    setFeedbackMessage(null);
    setWrongTargetId(null);
    setTopicCards([...topicCards].sort(() => Math.random() - 0.5));
  };

  return (
    <div id="conditions-stage-container" className="w-full max-w-4xl mx-auto px-4 py-4 space-y-4 animate-fadeIn">
      {/* 3-Locks Stage Tracker */}
      <StageLockTracker gameState={gameState} />

      {/* Header Info Card */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-indigo-100 shadow-md">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-indigo-500/15 border border-indigo-400/40 text-indigo-700 shadow-xs">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900 font-cinzel tracking-wide">
                3. AŞAMA: AYET VE KONU EŞLEŞTİRME
              </h2>
              <span className="text-xs text-indigo-900 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200 font-bold">
                {matchedCount} / {totalPairs} Eşleşti
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5 font-medium">
              Renkli konu kartlarını sürükleyip (veya tıklayarak) ilgili ayetin anlamıyla doğru şekilde eşleştir.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="self-end sm:self-center flex items-center gap-2">
          {!isAllMatched && matchedCount > 0 && (
            <button
              onClick={handleResetMatches}
              className="text-xs font-semibold text-slate-600 hover:text-slate-800 flex items-center gap-1 p-2 rounded-xl bg-slate-100 border border-slate-200 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Sıfırla</span>
            </button>
          )}
          <span className={`text-xs px-3 py-1.5 rounded-full font-bold border transition-all ${
            isAllMatched
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
              : 'bg-indigo-50 text-indigo-800 border-indigo-200'
          }`}>
            {isAllMatched ? 'Tüm Eşleştirmeler Tamam' : 'Eşleştirmeleri Tamamla'}
          </span>
        </div>
      </div>

      {/* Wrong Feedback Message */}
      {feedbackMessage && (
        <div
          id="conditions-wrong-feedback"
          className="p-3.5 rounded-2xl bg-rose-50 border border-rose-300 text-rose-950 text-xs sm:text-sm font-medium flex items-center gap-2.5 animate-fadeIn shadow-xs"
        >
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Available Colorful Topic Cards Tray (Source Cards) */}
      <div id="topic-cards-tray" className="p-4 sm:p-5 rounded-3xl bg-slate-50/80 border border-indigo-100 shadow-md space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              Konu ve Anlam Açıklama Kartları (Sürükle veya Tıkla)
            </h3>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            {selectedTopicId ? 'Kart seçildi, ayet kutusuna tıkla' : 'Sürükle / Tıkla'}
          </span>
        </div>

        {/* Topic Card Badges with Distinct Colorful Frames */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {topicCards.map((topic) => {
            const isAlreadyMatched = Object.values(matches).includes(topic.pairId);
            const isSelected = selectedTopicId === topic.pairId;
            const theme = topic.colorTheme;

            if (isAlreadyMatched) {
              return (
                <div
                  key={topic.pairId}
                  className="p-3.5 rounded-2xl border-2 border-emerald-200 bg-emerald-50/40 text-emerald-800 opacity-50 text-xs font-medium flex items-center justify-between gap-2"
                >
                  <span className="line-through">{topic.topicText}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                </div>
              );
            }

            return (
              <div
                key={topic.pairId}
                id={`topic-card-${topic.pairId}`}
                draggable
                onDragStart={(e) => handleDragStart(e, topic.pairId)}
                onClick={() => handleTopicCardClick(topic.pairId)}
                className={`p-4 rounded-2xl border-2 transition-all duration-200 cursor-grab active:cursor-grabbing flex items-start gap-3 select-none shadow-sm ${
                  isSelected
                    ? theme.selectedRing
                    : `${theme.border} ${theme.bg} ${theme.hoverBorder} ${theme.text}`
                }`}
              >
                <div className={`p-1.5 rounded-xl border shrink-0 mt-0.5 ${theme.badgeBg}`}>
                  <GripVertical className="w-3.5 h-3.5" />
                </div>
                <span className={`text-xs sm:text-sm font-bold leading-snug flex-1 ${theme.text}`}>
                  {topic.topicText}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Target Verses Matching Board */}
      <div id="verses-matching-board" className="space-y-4">
        {AYET_TOPIC_PAIRS.map((pair, index) => {
          const matchedTopicId = matches[pair.id];
          const isMatched = !!matchedTopicId;
          const isWrongTarget = wrongTargetId === pair.id;
          const matchedTopicCard = topicCards.find((c) => c.pairId === pair.id);
          const theme = matchedTopicCard?.colorTheme || CARD_THEMES[index % CARD_THEMES.length];

          return (
            <div
              key={pair.id}
              id={`verse-card-${pair.id}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, pair.id)}
              onClick={() => handleVerseSlotClick(pair.id)}
              className={`p-5 sm:p-6 rounded-3xl border-2 transition-all duration-300 bg-white shadow-md ${
                isMatched
                  ? 'border-emerald-400 bg-emerald-50/25 shadow-emerald-50'
                  : isWrongTarget
                  ? 'border-rose-400 bg-rose-50/50 ring-2 ring-rose-300 animate-pulse'
                  : selectedTopicId
                  ? 'border-indigo-300 hover:border-indigo-500 hover:bg-indigo-50/40 cursor-pointer shadow-indigo-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Verse Information: REGULAR & BOLD (not italic) */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-900 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-200">
                      {pair.source}
                    </span>
                    {isMatched && (
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Doğru Eşleşti
                      </span>
                    )}
                  </div>
                  {/* Ayet meali: NOT italic, regular font style, BOLD typography */}
                  <p className="text-xs sm:text-sm font-bold text-slate-900 font-sans not-italic leading-relaxed">
                    "{pair.verseText}"
                  </p>
                </div>

                {/* Target Drop Zone / Result Slot */}
                <div className="md:w-80 shrink-0">
                  {isMatched ? (
                    <div className={`p-3.5 rounded-2xl border-2 ${theme.border} ${theme.bg} ${theme.text} space-y-1 shadow-sm`}>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                        Eşleşen Konu:
                      </div>
                      <p className="text-xs font-bold leading-snug">
                        {pair.topicText}
                      </p>
                    </div>
                  ) : (
                    <div
                      className={`h-full min-h-[64px] p-3.5 rounded-2xl border-2 border-dashed flex items-center justify-center text-center transition-all ${
                        isWrongTarget
                          ? 'border-rose-400 bg-rose-50 text-rose-800 font-bold'
                          : selectedTopicId
                          ? 'border-indigo-400 bg-indigo-50 text-indigo-800 font-bold'
                          : 'border-slate-300 bg-slate-50/70 text-slate-500 font-medium'
                      }`}
                    >
                      <span className="text-xs">
                        {isWrongTarget
                          ? 'Yanlış Eşleşme!'
                          : selectedTopicId
                          ? 'Eşleştirmek İçin Buraya Tıkla'
                          : 'Konu Kartını Buraya Sürükle / Tıkla'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Matched Meaning Insight */}
              {isMatched && (
                <div className="mt-3.5 pt-2.5 border-t border-emerald-200/60 text-[11px] sm:text-xs text-emerald-950 font-medium flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong className="font-bold">Ayetin Anlam Özü:</strong> {pair.meaningSummary}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Completion Action Card */}
      {isAllMatched && (
        <div className="p-6 rounded-3xl bg-emerald-50 border-2 border-emerald-300 shadow-xl text-center space-y-3.5 animate-fadeIn">
          <div className="flex items-center justify-center gap-2 text-emerald-950 font-black text-sm sm:text-base font-cinzel">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>TEBRİKLER! TÜM AYET VE KONU EŞLEŞTİRMELERİ BAŞARIYLA TAMAMLANDI.</span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-900 font-medium max-w-lg mx-auto leading-relaxed">
            Ayetlerin derin anlamını doğru kavrayarak 3. kilidi açmaya ve Tövbe Kapısı'nı aralamaya hak kazandın.
          </p>
          <div className="pt-1">
            <button
              id="btn-open-great-gate"
              onClick={() => setShowGateSequence(true)}
              className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 text-slate-950 font-cinzel font-black text-sm sm:text-base tracking-wider shadow-lg shadow-amber-500/30 hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2.5 cursor-pointer mx-auto"
            >
              <Sparkles className="w-5 h-5" />
              <span>TÖVBE KAPISI'NI AÇ</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* 3. Kilit Unlock Modal Animation */}
      {showLock3Modal && (
        <LockUnlockModal
          lockNumber={3}
          stageTitle="3. Aşama: Ayet ve Konu Eşleştirme"
          stageSubtitle="Tebrikler! Ayetlerin anlamlarını doğru kavrayarak 3. ve son kilidi açtın."
          onProceed={() => {
            setShowLock3Modal(false);
            setShowGateSequence(true);
          }}
        />
      )}

      {/* Grand Gate Opening Cutscene */}
      {showGateSequence && (
        <GateOpeningSequence
          onComplete={() => {
            setShowGateSequence(false);
            onProceedToVictory();
          }}
        />
      )}
    </div>
  );
};
