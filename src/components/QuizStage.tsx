import React, { useState, useEffect } from 'react';
import { QuizQuestion, GameState } from '../types';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { CheckCircle2, ArrowRight, RefreshCw, AlertCircle, Clock, KeyRound } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { LockUnlockModal } from './LockUnlockModal';
import { StageLockTracker } from './StageLockTracker';

interface QuizStageProps {
  gameState: GameState;
  onQuestionAnswered: (questionId: number, isCorrect: boolean, points: number) => void;
  onWrongOrTimeout: () => void;
  onStage1Complete: () => void;
  onProceedToStory: () => void;
}

// Utility to shuffle array
function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Helper to render question text with <u> tags for underlined keywords
function renderFormattedQuestion(text: string) {
  if (text.includes('<u>') && text.includes('</u>')) {
    const parts = text.split(/(<u>.*?<\/u>)/g);
    return (
      <>
        {parts.map((part, index) => {
          if (part.startsWith('<u>') && part.endsWith('</u>')) {
            const inner = part.slice(3, -4);
            return (
              <u key={index} className="underline underline-offset-4 decoration-2 decoration-slate-900 font-black">
                {inner}
              </u>
            );
          }
          return <React.Fragment key={index}>{part}</React.Fragment>;
        })}
      </>
    );
  }
  return text;
}

export const QuizStage: React.FC<QuizStageProps> = ({
  gameState,
  onQuestionAnswered,
  onWrongOrTimeout,
  onStage1Complete,
  onProceedToStory,
}) => {
  const REQUIRED_CORRECT = 5;
  const QUESTION_TIME_LIMIT = 35; // 35 seconds gives enough time to read question and options

  // Shuffled question pool
  const [questionPool] = useState<QuizQuestion[]>(() => {
    return shuffleArray(QUIZ_QUESTIONS);
  });
  
  const [poolIndex, setPoolIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isTimeout, setIsTimeout] = useState(false);
  const [correctCount, setCorrectCount] = useState(gameState.unlockedKeys.length);
  const [showLockModal, setShowLockModal] = useState(false);

  // Timer state
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);

  const isStageComplete = correctCount >= REQUIRED_CORRECT || gameState.unlockedLocks.includes(1);

  // Active question
  const currentQuestion: QuizQuestion = questionPool[poolIndex % questionPool.length];

  // Reset timer on question change
  useEffect(() => {
    if (!isAnswerChecked && !isStageComplete && !showLockModal) {
      setTimeLeft(QUESTION_TIME_LIMIT);
    }
  }, [poolIndex, isAnswerChecked, isStageComplete, showLockModal]);

  // Timer interval
  useEffect(() => {
    if (isAnswerChecked || isStageComplete || showLockModal) {
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isAnswerChecked, isStageComplete, showLockModal]);

  // Handle timeout when timeLeft hits 0
  useEffect(() => {
    if (timeLeft === 0 && !isAnswerChecked && !isStageComplete && !showLockModal) {
      setIsTimeout(true);
      setIsAnswerChecked(true);
      setIsCorrect(false);
      soundManager.playHint();
      onWrongOrTimeout();
      onQuestionAnswered(currentQuestion.id, false, 0);
    }
  }, [timeLeft, isAnswerChecked, isStageComplete, showLockModal, currentQuestion.id, onWrongOrTimeout, onQuestionAnswered]);

  const handleSelectOption = (idx: number) => {
    if (isAnswerChecked && isCorrect) return;
    setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null || isAnswerChecked) return;

    const correct = selectedOption === currentQuestion.correctIndex;
    setIsAnswerChecked(true);
    setIsCorrect(correct);

    if (correct) {
      soundManager.playCorrect();
      const newCorrectCount = correctCount + 1;
      setCorrectCount(newCorrectCount);
      onQuestionAnswered(currentQuestion.id, true, 20);

      if (newCorrectCount >= REQUIRED_CORRECT && !gameState.unlockedLocks.includes(1)) {
        onStage1Complete();
        setTimeout(() => {
          setShowLockModal(true);
        }, 800);
      }
    } else {
      soundManager.playHint();
      onWrongOrTimeout();
      onQuestionAnswered(currentQuestion.id, false, 0);
    }
  };

  // Move to next question on wrong answer or timeout
  const handleNextQuestion = () => {
    setPoolIndex((prev) => (prev + 1) % questionPool.length);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setIsCorrect(null);
    setIsTimeout(false);
    setTimeLeft(QUESTION_TIME_LIMIT);
  };

  const timerPercentage = Math.max(0, Math.min(100, (timeLeft / QUESTION_TIME_LIMIT) * 100));

  return (
    <div id="quiz-stage-container" className="w-full max-w-3xl mx-auto px-3 sm:px-4 py-2 sm:py-4 space-y-4 animate-fadeIn">
      {/* 3-Locks Stage Tracker */}
      <StageLockTracker gameState={gameState} />

      {/* Stage Header Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-white border border-indigo-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 sm:p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 shrink-0">
            <KeyRound className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900 font-cinzel tracking-wide">
                1. AŞAMA: BİLGİ SORULARI
              </h2>
              <span className="text-xs text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 font-bold">
                {Math.min(correctCount, REQUIRED_CORRECT)} / {REQUIRED_CORRECT} Doğru
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5 font-medium">
              1. kilidi açmak için soruları dikkatle okuyup doğru cevapla.
            </p>
          </div>
        </div>

        {/* Question Progress Dots */}
        <div className="flex items-center gap-1.5 self-end sm:self-center bg-slate-50 px-3 py-1.5 rounded-2xl border border-slate-200">
          {Array.from({ length: REQUIRED_CORRECT }).map((_, idx) => (
            <div
              key={idx}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all ${
                idx < correctCount
                  ? 'bg-amber-500 ring-2 ring-amber-300'
                  : idx === correctCount
                  ? 'bg-indigo-600 ring-2 ring-indigo-300 scale-110'
                  : 'bg-slate-300'
              }`}
              title={`${idx + 1}. Soru`}
            />
          ))}
        </div>
      </div>

      {/* Active Question Card */}
      <div id="quiz-question-card" className="p-4 sm:p-6 md:p-8 rounded-3xl bg-white border border-indigo-100 shadow-md space-y-5 relative overflow-hidden">
        
        {/* Visible Countdown Timer Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="flex items-center gap-1.5 text-slate-700">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />
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
                  : 'bg-indigo-600'
              }`}
              style={{ width: `${timerPercentage}%` }}
            />
          </div>
        </div>

        {/* Question Text */}
        <div className="space-y-2 pt-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-800 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-200">
            Soru {Math.min(correctCount + 1, REQUIRED_CORRECT)}
          </span>
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 leading-snug pt-0.5">
            {renderFormattedQuestion(currentQuestion.question)}
          </h3>
        </div>

        {/* Multiple Choice Options (A, B, C, D) */}
        <div className="space-y-2.5 pt-1">
          {currentQuestion.options.map((optionText, idx) => {
            const letter = String.fromCharCode(65 + idx); // A, B, C, D
            const isSelected = selectedOption === idx;
            const isThisOptionCorrect = idx === currentQuestion.correctIndex;

            let optionStyle = "border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-800 hover:border-slate-300";

            if (isAnswerChecked) {
              if (isThisOptionCorrect) {
                optionStyle = "border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-300 font-semibold";
              } else if (isSelected && !isThisOptionCorrect) {
                optionStyle = "border-rose-400 bg-rose-50 text-rose-950 ring-1 ring-rose-200 opacity-90";
              } else {
                optionStyle = "border-slate-200 bg-slate-50 text-slate-400 opacity-60";
              }
            } else if (isSelected) {
              optionStyle = "border-indigo-600 bg-indigo-50/80 text-indigo-950 ring-2 ring-indigo-300 font-medium";
            }

            return (
              <button
                key={idx}
                id={`quiz-option-${letter}`}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswerChecked && isCorrect === true}
                className={`w-full min-h-[48px] p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-200 flex items-start gap-3 cursor-pointer disabled:cursor-default ${optionStyle}`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                    isAnswerChecked && isThisOptionCorrect
                      ? 'bg-emerald-600 text-white'
                      : isAnswerChecked && isSelected && !isThisOptionCorrect
                      ? 'bg-rose-500 text-white'
                      : isSelected
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {letter}
                </div>
                <span className="text-xs sm:text-sm leading-relaxed pt-0.5 flex-1">
                  {optionText}
                </span>
              </button>
            );
          })}
        </div>

        {/* Feedback Section (Clean, Educative, Pedagogical) */}
        {isAnswerChecked && (
          <div
            id="quiz-feedback-box"
            className={`p-4 rounded-2xl border animate-fadeIn space-y-1.5 ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
                  <span>Doğru Cevap!</span>
                </>
              ) : isTimeout ? (
                <>
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 shrink-0" />
                  <span>Süre Doldu!</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 shrink-0" />
                  <span>Bu Seçenek Doğru Değildir.</span>
                </>
              )}
            </div>

            <p className="text-xs sm:text-sm leading-relaxed opacity-95 font-medium">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Action Controls */}
        <div className="pt-1 flex flex-col sm:flex-row items-center gap-3">
          {!isAnswerChecked ? (
            <button
              id="btn-check-answer"
              onClick={handleCheckAnswer}
              disabled={selectedOption === null}
              className="w-full min-h-[48px] py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-sm tracking-wide shadow-sm transition-all active:scale-98 cursor-pointer disabled:cursor-not-allowed"
            >
              Cevabı Onayla
            </button>
          ) : !isCorrect ? (
            <button
              id="btn-retry-question"
              onClick={handleNextQuestion}
              className="w-full min-h-[48px] py-3.5 px-6 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm tracking-wide shadow-sm transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Sonraki Soruya Geç</span>
            </button>
          ) : correctCount < REQUIRED_CORRECT ? (
            <button
              id="btn-next-correct-question"
              onClick={handleNextQuestion}
              className="w-full min-h-[48px] py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-cinzel font-black text-sm tracking-wider shadow-sm transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Sonraki Soruya Geç</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : null}
        </div>
      </div>

      {/* 1. Kilit Unlock Modal Animation */}
      {showLockModal && (
        <LockUnlockModal
          lockNumber={1}
          stageTitle="1. Aşama (Bilgi Soruları)"
          stageSubtitle="Tebrikler! Soruları başarıyla tamamlayarak 1. kilidi açtın."
          onProceed={() => {
            setShowLockModal(false);
            onProceedToStory();
          }}
        />
      )}
    </div>
  );
};
