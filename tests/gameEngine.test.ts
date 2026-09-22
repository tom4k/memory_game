import { describe, it, expect } from 'vitest';
import {
  generateGameRound,
  selectRandomImages,
  shuffleArray,
  evaluateRecall,
  calculateAdaptiveDifficulty,
} from '../src/lib/gameEngine';
import { GAME_IMAGES } from '../src/data/images';
import { PRESET_LEVELS, GameLevel } from '../src/data/levels';

describe('Game Engine Test Suite', () => {
  const level1 = PRESET_LEVELS[0]; // Starter: 3 memory, 6 grid, 4.0s
  const level3 = PRESET_LEVELS[2]; // Medium: 6 memory, 12 grid, 2.5s
  const level5 = PRESET_LEVELS[4]; // Master: 10 memory, 20 grid, 1.5s

  // 1. Correct number of memory images selected
  it('1. selects correct number of memory images according to level', () => {
    const round1 = generateGameRound(level1, GAME_IMAGES);
    expect(round1.memoryImages.length).toBe(level1.memoryCount);

    const round3 = generateGameRound(level3, GAME_IMAGES);
    expect(round3.memoryImages.length).toBe(level3.memoryCount);

    const round5 = generateGameRound(level5, GAME_IMAGES);
    expect(round5.memoryImages.length).toBe(level5.memoryCount);
  });

  // 2. No duplicate memory images
  it('2. guarantees no duplicate images in memory sequence', () => {
    for (let i = 0; i < 20; i++) {
      const round = generateGameRound(level4Or5(i % 2 === 0 ? level3 : level5), GAME_IMAGES);
      const ids = round.memoryImages.map((img) => img.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    }
  });

  // Helper for alternating levels
  function level4Or5(level: GameLevel) {
    return level;
  }

  // 3. Distractors are not memory images
  it('3. ensures distractors never duplicate any memory images', () => {
    for (let i = 0; i < 20; i++) {
      const round = generateGameRound(level3, GAME_IMAGES);
      const memoryIds = new Set(round.memoryImages.map((img) => img.id));

      for (const distractor of round.distractorImages) {
        expect(memoryIds.has(distractor.id)).toBe(false);
      }
    }
  });

  // 4. Recall grid contains every memory image
  it('4. guarantees recall grid contains every single memory image', () => {
    for (const lvl of PRESET_LEVELS) {
      const round = generateGameRound(lvl, GAME_IMAGES);
      const gridIds = new Set(round.recallGrid.map((img) => img.id));

      for (const memImg of round.memoryImages) {
        expect(gridIds.has(memImg.id)).toBe(true);
      }
    }
  });

  // 5. Recall grid has correct size
  it('5. ensures recall grid has the exact expected total count', () => {
    for (const lvl of PRESET_LEVELS) {
      const round = generateGameRound(lvl, GAME_IMAGES);
      expect(round.recallGrid.length).toBe(lvl.gridCount);
      expect(round.memoryImages.length + round.distractorImages.length).toBe(lvl.gridCount);
    }
  });

  // 6. Score calculation is correct
  it('6. calculates score, accuracy, and categorizes remembered/missed/wrong correctly', () => {
    const memory = GAME_IMAGES.slice(0, 6); // 6 images to remember
    const distractors = GAME_IMAGES.slice(6, 12); // 6 distractors
    const grid = [...memory, ...distractors];

    // Case: Child selected 5 correct, 1 missed, 2 wrong distractors
    const selectedIds = new Set([
      memory[0].id,
      memory[1].id,
      memory[2].id,
      memory[3].id,
      memory[4].id, // 5 correct
      distractors[0].id,
      distractors[1].id, // 2 wrong
    ]);

    const result = evaluateRecall(memory, selectedIds, grid);

    expect(result.correctCount).toBe(5);
    expect(result.missedCount).toBe(1);
    expect(result.wrongCount).toBe(2);
    expect(result.totalMemory).toBe(6);
    // Accuracy = 5 / (5 + 2) = 71%
    expect(result.accuracyPercentage).toBe(71);
    expect(result.recallPercentage).toBe(83); // 5/6 = 83%

    expect(result.correctItems.map((x) => x.id)).toEqual(
      expect.arrayContaining([memory[0].id, memory[1].id, memory[2].id, memory[3].id, memory[4].id])
    );
    expect(result.missedItems.map((x) => x.id)).toEqual([memory[5].id]);
    expect(result.wrongItems.map((x) => x.id)).toEqual(
      expect.arrayContaining([distractors[0].id, distractors[1].id])
    );
  });

  // 7. Shuffle does not remove or duplicate images
  it('7. shuffle preserves array length and all original elements without loss', () => {
    const sample = GAME_IMAGES.slice(0, 15);
    const shuffled = shuffleArray(sample);

    expect(shuffled.length).toBe(sample.length);
    const originalIds = new Set(sample.map((x) => x.id));
    const shuffledIds = new Set(shuffled.map((x) => x.id));

    expect(shuffledIds.size).toBe(originalIds.size);
    for (const id of originalIds) {
      expect(shuffledIds.has(id)).toBe(true);
    }
  });

  // 8. Difficulty settings are correctly applied
  it('8. difficulty settings apply exact memoryCount, duration, and gridCount', () => {
    PRESET_LEVELS.forEach((lvl) => {
      const round = generateGameRound(lvl, GAME_IMAGES);
      expect(round.level.memoryCount).toBe(lvl.memoryCount);
      expect(round.level.displayDurationSec).toBe(lvl.displayDurationSec);
      expect(round.level.gridCount).toBe(lvl.gridCount);
    });

    // Test Adaptive adjustments
    const baseLevel = PRESET_LEVELS[1]; // Easy: 4 memory, 8 grid, 3.0s
    const adaptUp = calculateAdaptiveDifficulty([95, 92], baseLevel);
    expect(adaptUp.adjusted).toBe(true);
    expect(adaptUp.direction).toBe('up');
    expect(adaptUp.newLevel.memoryCount).toBe(5);
    expect(adaptUp.newLevel.gridCount).toBe(10);
    expect(adaptUp.newLevel.displayDurationSec).toBeLessThan(baseLevel.displayDurationSec);

    const adaptDown = calculateAdaptiveDifficulty([70, 50], adaptUp.newLevel);
    expect(adaptDown.adjusted).toBe(true);
    expect(adaptDown.direction).toBe('down');
    expect(adaptDown.newLevel.memoryCount).toBe(4);
  });
});
