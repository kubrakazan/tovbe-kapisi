import React, { useState, useEffect } from 'react';
import { GameState, StoryChoice } from '../types';
import { STORY_SCENES } from '../data/storyScenarios';
import { BookOpen, CheckCircle2, AlertTriangle, ArrowRight, Clock, RefreshCw } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { LockUnlockModal } from './LockUnlockModal';
import { StageLockTracker } from './StageLockTracker';

interface StoryStageProps {
  gameState: GameState;
  onChoiceMade: (sceneId: number, choice: StoryChoice) => void;
  onWrongOrTimeout?: () => void;
  onStage2Complete: () => void;
  onProceedToConditions: () => void;
}

export const StoryStage: React.FC<StoryStageProps> = ({
  gameState,
  onChoiceMade,
  onWrongOrTimeout,
  onStage2Complete,
  onProceedToConditions,
}) => {
  const SCENARIO_TIME_LIMIT = 50; // 50 seconds gives generous reading and reflection time

  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [isDecisionMade, setIsDecisionMade] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);
  const [showLock2Modal, setShowLock2Modal] = useState(false);

  // Timer state
  const [timeLeft, setTimeLeft] = useState(SCENARIO_TIME_LIMIT);

  const scene = STORY_SCENES[currentSceneIdx];
  const totalScenes = STORY_SCENES.length;

  const currentSavedChoiceId = gameState.storyAnswers[scene.id] || selectedChoiceId;
  const activeChoice = scene.choices.find((c) => c.id === currentSavedChoiceId);

  // Reset timer on scene change
  useEffect(() => {
    if (!isDecisionMade && !showLock2Modal) {
      setTimeLeft(SCENARIO_TIME_LIMIT);
      setIsTimeout(false);
    }
  }, [currentSceneIdx, isDecisionMade, showLock2Modal]);

  // Timer countdown
  useEffect(() => {
    if (isDecisionMade || showLock2Modal) {
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isDecisionMade, showLock2Modal]);

  // Timeout handler
  useEffect(() => {
    if (timeLeft === 0 && !isDecisionMade && !showLock2Modal) {
      setIsTimeout(true);
      setIsDecisionMade(true);
      soundManager.playHint();
      if (onWrongOrTimeout) onWrongOrTimeout();
    }
  }, [timeLeft, isDecisionMade, showLock2Modal, onWrongOrTimeout]);

  const handleSelectChoice = (choice: StoryChoice) => {
    if (isDecisionMade && activeChoice?.isBestChoice) return;
    setSelectedChoiceId(choice.id);
    setIsDecisionMade(true);
    setIsTimeout(false);

    if (choice.isBestChoice) {
      soundManager.playCorrect();
      onChoiceMade(scene.id, choice);

      // Check if this is the last scene
      const answersCount = Object.keys(gameState.storyAnswers).length + (gameState.storyAnswers[scene.id] ? 0 : 1);
      if (currentSceneIdx === totalScenes - 1 || answersCount >= totalScenes) {
        onStage2Complete();
        setTimeout(() => {
          setShowLock2Modal(true);
        }, 900);
      }
    } else {
      soundManager.playHint();
      if (onWrongOrTimeout) onWrongOrTimeout();
      onChoiceMade(scene.id, choice);
    }
  };

  const handleNextScene = () => {
    if (currentSceneIdx + 1 < totalScenes) {
      setCurrentSceneIdx((prev) => prev + 1);
      setSelectedChoiceId(null);
      setIsDecisionMade(false);
      setIsTimeout(false);
      setTimeLeft(SCENARIO_TIME_LIMIT);
    }
  };

  const handleRetryScene = () => {
    setSelectedChoiceId(null);
    setIsDecisionMade(false);
    setIsTimeout(false);
    setTimeLeft(SCENARIO_TIME_LIMIT);
  };

  const timerPercentage = Math.max(0, Math.min(100, (timeLeft / SCENARIO_TIME_LIMIT) * 100));

  return (
    <div id="story-stage-container" className="w-full max-w-3xl mx-auto px-3 sm:px-4 py-2 sm:py-4 space-y-4 animate-fadeIn">
      {/* 3-Locks Stage Tracker */}
      <StageLockTracker gameState={gameState} />

      {/* Stage Header Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-white border border-indigo-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 sm:p-3 rounded-2xl bg-sky-50 border border-sky-200 text-sky-700 shrink-0">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900 font-cinzel tracking-wide">
                2. AŞAMA: ÖRNEK OLAY VE KARAR
              </h2>
              <span className="text-xs text-sky-900 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200 font-bold">
                Bölüm {currentSceneIdx + 1} / {totalScenes}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5 font-medium">
              Durumu incele ve samimi tövbeye en uygun tutumu seç.
            </p>
          </div>
        </div>

        {/* Narrative Progress Dots */}
        <div className="flex items-center gap-1.5 self-end sm:self-center bg-slate-50 px-3 py-1.5 rounded-2xl border border-slate-200">
          {STORY_SCENES.map((sc, i) => (
            <div
              key={sc.id}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all ${
                gameState.storyAnswers[sc.id]
                  ? 'bg-amber-500 ring-2 ring-amber-300'
                  : i === currentSceneIdx
                  ? 'bg-sky-600 ring-2 ring-sky-300 scale-110'
                  : 'bg-slate-300'
              }`}
              title={sc.title}
            />
          ))}
        </div>
      </div>

      {/* Story Narrative Box */}
      <div id="story-narrative-card" className="p-4 sm:p-6 md:p-8 rounded-3xl bg-white border border-indigo-100 shadow-md space-y-5">
        
        {/* Visible Countdown Timer Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="flex items-center gap-1.5 text-slate-700">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-600" />
              Kalan Süre
            </span>
            <span
              className={`font-mono text-xs sm:text-sm font-black ${
                timeLeft <= 7 ? 'text-rose-600 animate-pulse' : 'text-slate-800'
              }`}
            >
              {timeLeft} sn
            </span>
          </div>

          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              className={`h-full transition-all duration-1000 ease-linear rounded-full ${
                timeLeft <= 7
                  ? 'bg-rose-500'
                  : timeLeft <= 15
                  ? 'bg-amber-500'
                  : 'bg-sky-600'
              }`}
              style={{ width: `${timerPercentage}%` }}
            />
          </div>
        </div>

        {/* Scene Title */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 font-cinzel">
            {scene.title}
          </h3>
        </div>

        {/* Scenario Narrative Text */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-serif text-justify">
            {scene.situation}
          </p>
        </div>

        {/* Decision Prompt Question */}
        <div className="pt-0.5">
          <h4 className="text-xs sm:text-sm md:text-base font-bold text-indigo-950 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-600 shrink-0"></span>
            {scene.question}
          </h4>
        </div>

        {/* Decision Choices */}
        <div className="space-y-2.5 pt-1">
          {scene.choices.map((choice) => {
            const isSelected = selectedChoiceId === choice.id || gameState.storyAnswers[scene.id] === choice.id;
            const isCorrect = choice.isBestChoice;

            let cardStyle = "border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50/30 text-slate-800";

            if (isDecisionMade && isSelected) {
              if (isCorrect) {
                cardStyle = "border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-300 font-semibold";
              } else {
                cardStyle = "border-rose-400 bg-rose-50 text-rose-950 ring-1 ring-rose-300";
              }
            }
            // If the user made a wrong decision, do NOT reveal the correct option automatically.
            // Only the selected option is styled as red (wrong), allowing the student to find the correct answer themselves.

            return (
              <button
                key={choice.id}
                id={`story-choice-${choice.id}`}
                onClick={() => handleSelectChoice(choice)}
                disabled={isDecisionMade && activeChoice?.isBestChoice}
                className={`w-full min-h-[48px] p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-200 flex items-start gap-3 cursor-pointer disabled:cursor-default ${cardStyle}`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                    isDecisionMade && isSelected
                      ? isCorrect
                        ? 'bg-emerald-600 text-white'
                        : 'bg-rose-500 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {choice.id}
                </div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm leading-relaxed">
                    {choice.text}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback on Selection */}
        {isDecisionMade && activeChoice && (
          <div
            id="story-feedback-box"
            className={`p-4 rounded-2xl border animate-fadeIn space-y-2.5 ${
              activeChoice.isBestChoice
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
              {activeChoice.isBestChoice ? (
                <>
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
                  <span>{activeChoice.feedback}</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 shrink-0" />
                  <span>{activeChoice.feedback}</span>
                </>
              )}
            </div>

            <div className="p-2.5 sm:p-3 rounded-xl bg-white/80 border border-current/20 text-xs sm:text-sm font-medium">
              <strong>Öğrenilen Değer:</strong> {activeChoice.moralLesson}
            </div>
          </div>
        )}

        {/* Timeout Box */}
        {isTimeout && !activeChoice && (
          <div
            id="story-timeout-box"
            className="p-4 rounded-2xl border bg-rose-50 border-rose-300 text-rose-950 animate-fadeIn space-y-2"
          >
            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
              <Clock className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Süre Doldu!</span>
            </div>
            <p className="text-xs sm:text-sm">
              Bu bölüm için tanınan süre doldu. Durumu yeniden değerlendirip kararını verebilirsin.
            </p>
            <button
              onClick={handleRetryScene}
              className="py-2 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Yeniden Dene</span>
            </button>
          </div>
        )}

        {/* Navigation Action Buttons */}
        <div className="pt-1 flex flex-col sm:flex-row items-center gap-3">
          {isDecisionMade && !activeChoice?.isBestChoice && !isTimeout && (
            <button
              id="btn-retry-story-choice"
              onClick={handleRetryScene}
              className="w-full min-h-[48px] py-3 px-6 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm tracking-wide shadow-sm transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Farklı Bir Seçim Yap</span>
            </button>
          )}

          {isDecisionMade && activeChoice?.isBestChoice && currentSceneIdx + 1 < totalScenes && (
            <button
              id="btn-next-story-scene"
              onClick={handleNextScene}
              className="w-full min-h-[48px] py-3.5 px-6 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm tracking-wider shadow-sm transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Sonraki Bölüme Geç</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Kilit Unlock Modal Animation */}
      {showLock2Modal && (
        <LockUnlockModal
          lockNumber={2}
          stageTitle="2. Aşama (Örnek Olay ve Karar)"
          stageSubtitle="Tebrikler! Örnek olayı başarıyla tamamlayarak 2. kilidi açtın."
          onProceed={() => {
            setShowLock2Modal(false);
            onProceedToConditions();
          }}
        />
      )}
    </div>
  );
};
