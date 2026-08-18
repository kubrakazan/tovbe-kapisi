import { GameState } from '../types';

const STORAGE_KEY = 'tovbe_kapisi_save_v1';

export const INITIAL_GAME_STATE: GameState = {
  stage: 'intro',
  score: 0,
  lives: 3,
  maxLives: 3,
  unlockedLocks: [],
  unlockedKeys: [],
  quizAnsweredCount: 0,
  quizWrongCount: 0,
  storyAnswers: {},
  storyPoints: 0,
  conditionsCompleted: false,
  conditionsPoints: 0,
  soundEnabled: true,
  startTime: Date.now(),
};

export function loadSavedGameState(): GameState {
  if (typeof window === 'undefined') return INITIAL_GAME_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_GAME_STATE;
    const parsed = JSON.parse(raw);
    return {
      ...INITIAL_GAME_STATE,
      ...parsed,
      // safety check
      unlockedLocks: Array.isArray(parsed.unlockedLocks) ? parsed.unlockedLocks : [],
      unlockedKeys: Array.isArray(parsed.unlockedKeys) ? parsed.unlockedKeys : [],
      storyAnswers: parsed.storyAnswers || {},
    };
  } catch (e) {
    console.warn('Could not load saved game state', e);
    return INITIAL_GAME_STATE;
  }
}

export function saveGameState(state: GameState) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Could not save game state', e);
  }
}

export function clearSavedGameState() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Could not clear game state', e);
  }
}
