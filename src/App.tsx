/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GameState, StoryChoice } from './types';
import { loadSavedGameState, saveGameState, clearSavedGameState, INITIAL_GAME_STATE } from './utils/storage';
import { soundManager } from './utils/audio';
import { Header } from './components/Header';
import { IntroScreen } from './components/IntroScreen';
import { QuizStage } from './components/QuizStage';
import { StoryStage } from './components/StoryStage';
import { ConditionsStage } from './components/ConditionsStage';
import { SummaryStage } from './components/SummaryStage';
import { GameOverScreen } from './components/GameOverScreen';

export default function App() {
  const [gameState, setGameState] = useState<GameState>(() => {
    return loadSavedGameState();
  });

  // Sync sound manager enabled state
  useEffect(() => {
    soundManager.enabled = gameState.soundEnabled;
  }, [gameState.soundEnabled]);

  // Persist state changes
  useEffect(() => {
    saveGameState(gameState);
  }, [gameState]);

  // Handlers for stage transitions
  const handleStartGame = () => {
    setGameState((prev) => ({
      ...INITIAL_GAME_STATE,
      stage: 'quiz',
      soundEnabled: prev.soundEnabled,
      startTime: Date.now(),
    }));
  };

  const handleResumeGame = () => {
    if (gameState.stage === 'intro') {
      setGameState((prev) => ({ ...prev, stage: 'quiz' }));
    }
  };

  const handleToggleSound = () => {
    setGameState((prev) => {
      const nextSound = !prev.soundEnabled;
      soundManager.enabled = nextSound;
      return { ...prev, soundEnabled: nextSound };
    });
  };

  const handleReset = () => {
    clearSavedGameState();
    setGameState({
      ...INITIAL_GAME_STATE,
      stage: 'intro',
      soundEnabled: gameState.soundEnabled,
    });
  };

  // Wrong answer or timer expiration
  const handleWrongOrTimeout = () => {
    setGameState((prev) => {
      const nextLives = Math.max(0, prev.lives - 1);
      const isGameOver = nextLives === 0;

      return {
        ...prev,
        lives: nextLives,
        quizWrongCount: prev.quizWrongCount + 1,
        stage: isGameOver ? 'game_over' : prev.stage,
        endTime: isGameOver ? Date.now() : prev.endTime,
      };
    });
  };

  // Stage 1: Quiz handler
  const handleQuestionAnswered = (questionId: number, isCorrect: boolean, points: number) => {
    setGameState((prev) => {
      const isAlreadyUnlocked = prev.unlockedKeys.includes(questionId);
      const nextUnlockedKeys = isCorrect && !isAlreadyUnlocked
        ? [...prev.unlockedKeys, questionId]
        : prev.unlockedKeys;

      const addedPoints = isCorrect && !isAlreadyUnlocked ? points : 0;

      return {
        ...prev,
        score: prev.score + addedPoints,
        unlockedKeys: nextUnlockedKeys,
        quizAnsweredCount: prev.quizAnsweredCount + 1,
      };
    });
  };

  const handleStage1Complete = () => {
    setGameState((prev) => ({
      ...prev,
      unlockedLocks: prev.unlockedLocks.includes(1) ? prev.unlockedLocks : [...prev.unlockedLocks, 1],
    }));
  };

  const handleProceedToStory = () => {
    setGameState((prev) => ({ ...prev, stage: 'story' }));
  };

  // Stage 2: Story choices
  const handleChoiceMade = (sceneId: number, choice: StoryChoice) => {
    setGameState((prev) => {
      const wasAlreadyAnswered = prev.storyAnswers[sceneId] !== undefined;
      const pointDiff = wasAlreadyAnswered ? 0 : choice.points;

      return {
        ...prev,
        score: prev.score + pointDiff,
        storyPoints: prev.storyPoints + pointDiff,
        storyAnswers: {
          ...prev.storyAnswers,
          [sceneId]: choice.id,
        },
      };
    });
  };

  const handleStage2Complete = () => {
    setGameState((prev) => ({
      ...prev,
      unlockedLocks: prev.unlockedLocks.includes(2) ? prev.unlockedLocks : [...prev.unlockedLocks, 2],
    }));
  };

  const handleProceedToConditions = () => {
    setGameState((prev) => ({ ...prev, stage: 'conditions' }));
  };

  // Stage 3: Conditions completion
  const handleCompleteConditions = (points: number) => {
    setGameState((prev) => {
      const added = prev.conditionsCompleted ? 0 : points;
      return {
        ...prev,
        score: prev.score + added,
        conditionsPoints: prev.conditionsPoints + added,
        conditionsCompleted: true,
      };
    });
  };

  const handleStage3Complete = () => {
    setGameState((prev) => ({
      ...prev,
      unlockedLocks: prev.unlockedLocks.includes(3) ? prev.unlockedLocks : [...prev.unlockedLocks, 3],
    }));
  };

  const handleProceedToVictory = () => {
    setGameState((prev) => ({
      ...prev,
      stage: 'victory_summary',
      endTime: Date.now(),
    }));
  };

  return (
    <div className="min-h-screen bg-islamic-pattern text-slate-900 flex flex-col selection:bg-amber-400 selection:text-slate-950 font-sans">
      {/* Header */}
      <Header
        gameState={gameState}
        onReset={handleReset}
        onToggleSound={handleToggleSound}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center py-4">
        {gameState.stage === 'intro' && (
          <IntroScreen
            gameState={gameState}
            onStartGame={handleStartGame}
            onResumeGame={gameState.unlockedLocks.length > 0 ? handleResumeGame : undefined}
          />
        )}

        {gameState.stage === 'quiz' && (
          <QuizStage
            gameState={gameState}
            onQuestionAnswered={handleQuestionAnswered}
            onWrongOrTimeout={handleWrongOrTimeout}
            onStage1Complete={handleStage1Complete}
            onProceedToStory={handleProceedToStory}
          />
        )}

        {gameState.stage === 'story' && (
          <StoryStage
            gameState={gameState}
            onChoiceMade={handleChoiceMade}
            onWrongOrTimeout={handleWrongOrTimeout}
            onStage2Complete={handleStage2Complete}
            onProceedToConditions={handleProceedToConditions}
          />
        )}

        {gameState.stage === 'conditions' && (
          <ConditionsStage
            gameState={gameState}
            onCompleteConditions={handleCompleteConditions}
            onWrongOrTimeout={handleWrongOrTimeout}
            onStage3Complete={handleStage3Complete}
            onProceedToVictory={handleProceedToVictory}
          />
        )}

        {gameState.stage === 'victory_summary' && (
          <SummaryStage
            gameState={gameState}
            onRestartGame={handleReset}
          />
        )}

        {gameState.stage === 'game_over' && (
          <GameOverScreen
            gameState={gameState}
            onRestartGame={handleStartGame}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="py-4 border-t border-slate-200 text-center text-xs text-slate-500 font-medium print:hidden">
        <p>
          TÖVBE KAPISI • Temel Dinî Bilgiler: Hatalardan Arınma: Tövbe
        </p>
      </footer>
    </div>
  );
}
