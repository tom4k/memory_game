import { GameImage } from '../data/images';
import { GameLevel } from '../data/levels';

export interface GameRound {
  level: GameLevel;
  memoryImages: GameImage[];
  distractorImages: GameImage[];
  recallGrid: GameImage[];
}

export interface GameEvaluation {
  correctCount: number;
  missedCount: number;
  wrongCount: number;
  totalMemory: number;
  accuracyPercentage: number;
  recallPercentage: number;
  score: number;
  encouragement: string;
  correctItems: GameImage[];
  missedItems: GameImage[];
  wrongItems: GameImage[];
}

/**
 * Fisher-Yates shuffle that creates a newly shuffled shallow copy of the array.
 */
export function shuffleArray<T>(array: readonly T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Pick N random items from pool without replacement, avoiding excluded IDs.
 */
export function selectRandomImages(
  pool: readonly GameImage[],
  count: number,
  excludeIds: ReadonlySet<string> = new Set()
): GameImage[] {
  const available = pool.filter((item) => !excludeIds.has(item.id));
  const shuffled = shuffleArray(available);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Generates a fresh game round ensuring:
 * 1. Exactly memoryCount memory images chosen
 * 2. Exactly (gridCount - memoryCount) distractor images chosen
 * 3. Distractors NEVER contain any memory images
 * 4. Recall grid contains ALL memory images + all distractors
 * 5. Recall grid is thoroughly shuffled
 */
export function generateGameRound(
  level: GameLevel,
  imagePool: readonly GameImage[],
  selectedCategoryIds?: readonly string[]
): GameRound {
  // Filter pool if categories are specified
  let validPool = imagePool;
  if (selectedCategoryIds && selectedCategoryIds.length > 0) {
    const catSet = new Set(selectedCategoryIds);
    const filtered = imagePool.filter((item) => catSet.has(item.category));
    if (filtered.length >= level.gridCount) {
      validPool = filtered;
    }
  }

  // If pool is still smaller than gridCount, fallback to entire pool
  if (validPool.length < level.gridCount) {
    validPool = imagePool;
  }

  // 1. Select memory images
  const memoryCount = Math.min(level.memoryCount, validPool.length);
  const memoryImages = selectRandomImages(validPool, memoryCount);
  const memoryIdSet = new Set(memoryImages.map((img) => img.id));

  // 2. Select distractors that are strictly NOT in memory
  const distractorCount = Math.max(0, level.gridCount - memoryCount);
  const distractorImages = selectRandomImages(validPool, distractorCount, memoryIdSet);

  // 3. Combine memory and distractors, then shuffle
  const combined = [...memoryImages, ...distractorImages];
  const recallGrid = shuffleArray(combined);

  return {
    level,
    memoryImages,
    distractorImages,
    recallGrid,
  };
}

/**
 * Evaluates the player's selected cards against the memory images.
 */
export function evaluateRecall(
  memoryImages: readonly GameImage[],
  selectedIds: ReadonlySet<string>,
  gridImages: readonly GameImage[]
): GameEvaluation {
  const memoryMap = new Map(memoryImages.map((img) => [img.id, img]));
  const gridMap = new Map(gridImages.map((img) => [img.id, img]));

  const correctItems: GameImage[] = [];
  const wrongItems: GameImage[] = [];
  const missedItems: GameImage[] = [];

  // Categorize selections
  for (const id of selectedIds) {
    const memItem = memoryMap.get(id);
    if (memItem) {
      correctItems.push(memItem);
    } else {
      const gridItem = gridMap.get(id);
      if (gridItem) {
        wrongItems.push(gridItem);
      }
    }
  }

  // Find missed items
  for (const memItem of memoryImages) {
    if (!selectedIds.has(memItem.id)) {
      missedItems.push(memItem);
    }
  }

  const correctCount = correctItems.length;
  const missedCount = missedItems.length;
  const wrongCount = wrongItems.length;
  const totalMemory = memoryImages.length;
  const totalSelected = selectedIds.size;

  // Accuracy: correct / (correct + wrong) -> percentage of child's selections that were correct
  // If nothing was selected, accuracy is 0%
  const accuracyPercentage =
    totalSelected > 0 ? Math.round((correctCount / totalSelected) * 100) : 0;

  // Recall percentage: correct / totalMemory
  const recallPercentage =
    totalMemory > 0 ? Math.round((correctCount / totalMemory) * 100) : 0;

  // Friendly score: 100 pts per correct, minus 20 per wrong
  const score = Math.max(0, correctCount * 100 - wrongCount * 20);

  // Encouraging feedback according to score/performance
  let encouragement = 'Great effort! Keep practicing! 🌟';
  if (correctCount === totalMemory && wrongCount === 0) {
    encouragement = 'Incredible! Perfect memory champion! 🏆🎉';
  } else if (accuracyPercentage >= 90) {
    encouragement = 'Amazing memory! Super star! ⭐✨';
  } else if (accuracyPercentage >= 70 || correctCount >= Math.ceil(totalMemory * 0.75)) {
    encouragement = 'Great job! You have sharp eyes! 🚀';
  } else if (correctCount > 0) {
    encouragement = "You're getting better every time! 🎈";
  }

  return {
    correctCount,
    missedCount,
    wrongCount,
    totalMemory,
    accuracyPercentage,
    recallPercentage,
    score,
    encouragement,
    correctItems,
    missedItems,
    wrongItems,
  };
}

/**
 * Adaptive difficulty adjustment based on recent rounds.
 */
export function calculateAdaptiveDifficulty(
  recentAccuracies: number[],
  currentLevel: GameLevel
): { newLevel: GameLevel; adjusted: boolean; direction: 'up' | 'down' | 'same' } {
  if (recentAccuracies.length < 2) {
    return { newLevel: currentLevel, adjusted: false, direction: 'same' };
  }

  const lastTwo = recentAccuracies.slice(-2);
  const consecutiveHigh = lastTwo.every((acc) => acc >= 90);
  const recentLow = lastTwo[lastTwo.length - 1] < 60;

  if (consecutiveHigh) {
    // Increase difficulty slightly
    const newMemory = Math.min(12, currentLevel.memoryCount + 1);
    const newGrid = Math.min(24, currentLevel.gridCount + 2);
    const newDuration = Math.max(3.0, Number((currentLevel.displayDurationSec - 0.25).toFixed(2)));

    const updated: GameLevel = {
      ...currentLevel,
      memoryCount: newMemory,
      gridCount: newGrid,
      displayDurationSec: newDuration,
    };
    return { newLevel: updated, adjusted: true, direction: 'up' };
  }

  if (recentLow && currentLevel.memoryCount > 2) {
    // Decrease difficulty slightly
    const newMemory = Math.max(2, currentLevel.memoryCount - 1);
    const newGrid = Math.max(4, currentLevel.gridCount - 2);
    const newDuration = Math.min(5.0, Number((currentLevel.displayDurationSec + 0.5).toFixed(2)));

    const updated: GameLevel = {
      ...currentLevel,
      memoryCount: newMemory,
      gridCount: newGrid,
      displayDurationSec: newDuration,
    };
    return { newLevel: updated, adjusted: true, direction: 'down' };
  }

  return { newLevel: currentLevel, adjusted: false, direction: 'same' };
}
