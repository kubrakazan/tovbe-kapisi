export type GameStage = 
  | 'intro'
  | 'quiz'
  | 'story'
  | 'conditions'
  | 'victory_summary'
  | 'game_over';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sourceNote?: string;
}

export interface StoryChoice {
  id: string;
  text: string;
  isBestChoice: boolean;
  points: number;
  feedback: string;
  moralLesson: string;
}

export interface StoryScene {
  id: number;
  title: string;
  situation: string;
  character: string;
  imageIcon: string;
  question: string;
  choices: StoryChoice[];
}

export interface AyetTopicPair {
  id: string;
  source: string;
  verseText: string;
  topicText: string;
  meaningSummary: string;
}

export interface GameState {
  stage: GameStage;
  score: number;
  lives: number;
  maxLives: number;
  unlockedLocks: number[]; // [1] after stage 1, [1, 2] after stage 2, [1, 2, 3] after stage 3
  unlockedKeys: number[]; // legacy alias / stage 1 questions count
  quizAnsweredCount: number;
  quizWrongCount: number;
  storyAnswers: Record<number, string>; // sceneId -> choiceId
  storyPoints: number;
  conditionsCompleted: boolean;
  conditionsPoints: number;
  soundEnabled: boolean;
  startTime: number;
  endTime?: number;
}
