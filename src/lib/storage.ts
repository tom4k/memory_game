import { GameEvaluation } from './gameEngine';
import { GameLevel } from '../data/levels';
import { CategoryId } from '../data/images';

export interface ParentSettings {
  memoryCount: number;
  displayDurationSec: number;
  showImageNames: boolean;
  distractorCount: number;
  recallTimeLimitSec: number; // 0 = unlimited
  enabledCategories: CategoryId[];
  soundEffectsEnabled: boolean;
  speechEnabled: boolean;
  adaptiveModeEnabled: boolean;
}

export const DEFAULT_PARENT_SETTINGS: ParentSettings = {
  memoryCount: 4,
  displayDurationSec: 3.0,
  showImageNames: true,
  distractorCount: 4,
  recallTimeLimitSec: 0,
  enabledCategories: [
    'animals',
    'fruits',
    'vegetables',
    'food',
    'vehicles',
    'toys',
    'household',
    'school',
    'nature',
    'sports',
    'clothing',
    'birds',
    'sea_animals',
  ],
  soundEffectsEnabled: true,
  speechEnabled: false, // do not read out image names by default
  adaptiveModeEnabled: false,
};

export interface GameRecord {
  id: string;
  timestamp: number;
  levelName: string;
  levelId: number | 'custom';
  correctCount: number;
  missedCount: number;
  wrongCount: number;
  totalMemory: number;
  accuracyPercentage: number;
  score: number;
}

export interface ProgressStats {
  gamesPlayed: number;
  highestLevelCompleted: number;
  bestAccuracy: number;
  averageAccuracy: number;
  totalCorrectRecalls: number;
  levelStats: Record<
    string,
    {
      games: number;
      bestScore: number;
      avgAccuracy: number;
    }
  >;
  recentGames: GameRecord[];
}

const SETTINGS_KEY = 'memory_explorer_parent_settings_v2';
const PROGRESS_KEY = 'memory_explorer_progress_v1';

export function loadParentSettings(): ParentSettings {
  if (typeof window === 'undefined') return DEFAULT_PARENT_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_PARENT_SETTINGS;
    return { ...DEFAULT_PARENT_SETTINGS, ...JSON.parse(raw) };
  } catch (err) {
    console.warn('Could not load parent settings, falling back to defaults:', err);
    return DEFAULT_PARENT_SETTINGS;
  }
}

export function saveParentSettings(settings: ParentSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Could not save parent settings:', err);
  }
}

export const INITIAL_PROGRESS_STATS: ProgressStats = {
  gamesPlayed: 0,
  highestLevelCompleted: 0,
  bestAccuracy: 0,
  averageAccuracy: 0,
  totalCorrectRecalls: 0,
  levelStats: {},
  recentGames: [],
};

export function loadProgressStats(): ProgressStats {
  if (typeof window === 'undefined') return INITIAL_PROGRESS_STATS;
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return INITIAL_PROGRESS_STATS;
    return { ...INITIAL_PROGRESS_STATS, ...JSON.parse(raw) };
  } catch (err) {
    console.warn('Could not load progress stats:', err);
    return INITIAL_PROGRESS_STATS;
  }
}

export function saveGameResult(
  evaluation: GameEvaluation,
  level: GameLevel
): ProgressStats {
  const current = loadProgressStats();

  const record: GameRecord = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: Date.now(),
    levelName: level.name,
    levelId: level.id,
    correctCount: evaluation.correctCount,
    missedCount: evaluation.missedCount,
    wrongCount: evaluation.wrongCount,
    totalMemory: evaluation.totalMemory,
    accuracyPercentage: evaluation.accuracyPercentage,
    score: evaluation.score,
  };

  const newGamesPlayed = current.gamesPlayed + 1;
  const newBestAccuracy = Math.max(current.bestAccuracy, evaluation.accuracyPercentage);
  const newTotalCorrect = current.totalCorrectRecalls + evaluation.correctCount;

  // Calculate new running average
  const totalAccSoFar = current.averageAccuracy * current.gamesPlayed;
  const newAverageAccuracy = Math.round(
    (totalAccSoFar + evaluation.accuracyPercentage) / newGamesPlayed
  );

  let newHighestLevel = current.highestLevelCompleted;
  if (typeof level.id === 'number' && evaluation.accuracyPercentage >= 70) {
    newHighestLevel = Math.max(newHighestLevel, level.id);
  }

  // Update level specific stats
  const levelKey = String(level.id);
  const existingLevel = current.levelStats[levelKey] || {
    games: 0,
    bestScore: 0,
    avgAccuracy: 0,
  };
  const updatedLevelGames = existingLevel.games + 1;
  const updatedLevelAvg = Math.round(
    (existingLevel.avgAccuracy * existingLevel.games + evaluation.accuracyPercentage) /
      updatedLevelGames
  );
  const updatedLevelBest = Math.max(existingLevel.bestScore, evaluation.score);

  const updatedLevelStats = {
    ...current.levelStats,
    [levelKey]: {
      games: updatedLevelGames,
      bestScore: updatedLevelBest,
      avgAccuracy: updatedLevelAvg,
    },
  };

  // Keep last 10 games
  const newRecentGames = [record, ...current.recentGames].slice(0, 10);

  const updatedStats: ProgressStats = {
    gamesPlayed: newGamesPlayed,
    highestLevelCompleted: newHighestLevel,
    bestAccuracy: newBestAccuracy,
    averageAccuracy: newAverageAccuracy,
    totalCorrectRecalls: newTotalCorrect,
    levelStats: updatedLevelStats,
    recentGames: newRecentGames,
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(updatedStats));
    } catch (e) {
      console.error('Could not save progress to localStorage:', e);
    }
  }

  return updatedStats;
}
