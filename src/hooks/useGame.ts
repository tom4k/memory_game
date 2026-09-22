'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { GameImage, GAME_IMAGES } from '../data/images';
import { GameLevel, PRESET_LEVELS, CustomLevelSettings, DEFAULT_CUSTOM_SETTINGS } from '../data/levels';
import {
  generateGameRound,
  evaluateRecall,
  GameRound,
  GameEvaluation,
  calculateAdaptiveDifficulty,
} from '../lib/gameEngine';
import {
  ParentSettings,
  DEFAULT_PARENT_SETTINGS,
  loadParentSettings,
  saveParentSettings,
  saveGameResult,
  ProgressStats,
  INITIAL_PROGRESS_STATS,
  loadProgressStats,
} from '../lib/storage';
import {
  playCardTapSound,
  playSlideChimeSound,
  playTickSound,
  playVictoryFanfare,
  speakWord,
} from '../lib/audio';
import confetti from 'canvas-confetti';

export type GamePhase =
  | 'HOME'
  | 'CUSTOM_SETUP'
  | 'MEMORIZE'
  | 'TRANSITION'
  | 'RECALL'
  | 'RESULT';

export function useGame() {
  const [phase, setPhase] = useState<GamePhase>('HOME');
  const [settings, setSettings] = useState<ParentSettings>(DEFAULT_PARENT_SETTINGS);
  const [progress, setProgress] = useState<ProgressStats>(INITIAL_PROGRESS_STATS);

  // Synchronize persisted client settings and progress on mount
  useEffect(() => {
    setSettings(loadParentSettings());
    setProgress(loadProgressStats());
  }, []);

  // Active round state
  const [currentLevel, setCurrentLevel] = useState<GameLevel>(PRESET_LEVELS[0]);
  const [round, setRound] = useState<GameRound | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0); // 0 to 100%

  // Recall selections
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [recallSecondsLeft, setRecallSecondsLeft] = useState<number | null>(null);

  // Transition countdown
  const [transitionCountdown, setTransitionCountdown] = useState(3);

  // Results
  const [evaluation, setEvaluation] = useState<GameEvaluation | null>(null);

  // Adaptive history (last 5 rounds in current session)
  const [sessionAccuracies, setSessionAccuracies] = useState<number[]>([]);

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProgressOpen, setIsProgressOpen] = useState(false);

  // Custom setup temporary state
  const [customConfig, setCustomConfig] = useState<CustomLevelSettings>(DEFAULT_CUSTOM_SETTINGS);

  // Timers ref
  const slideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const slideProgressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const recallTimerRef = useRef<NodeJS.Timeout | null>(null);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up all timers on unmount
  useEffect(() => {
    return () => {
      if (slideTimerRef.current) clearTimeout(slideTimerRef.current);
      if (slideProgressIntervalRef.current) clearInterval(slideProgressIntervalRef.current);
      if (recallTimerRef.current) clearInterval(recallTimerRef.current);
      if (transitionTimerRef.current) clearInterval(transitionTimerRef.current);
    };
  }, []);

  // Update settings and save to storage
  const updateSettings = useCallback((newSettings: ParentSettings) => {
    setSettings(newSettings);
    saveParentSettings(newSettings);
  }, []);

  // Start a new game with a specified level
  const startGame = useCallback(
    (level: GameLevel) => {
      // Clear timers
      if (slideTimerRef.current) clearTimeout(slideTimerRef.current);
      if (slideProgressIntervalRef.current) clearInterval(slideProgressIntervalRef.current);

      let effectiveLevel = level;

      // If parent settings specify override durations or counts when in custom/adaptive
      if (settings.adaptiveModeEnabled && sessionAccuracies.length >= 2) {
        const adaptive = calculateAdaptiveDifficulty(sessionAccuracies, level);
        if (adaptive.adjusted) {
          effectiveLevel = adaptive.newLevel;
        }
      }

      const freshRound = generateGameRound(
        effectiveLevel,
        GAME_IMAGES,
        settings.enabledCategories
      );

      setCurrentLevel(effectiveLevel);
      setRound(freshRound);
      setCurrentSlideIndex(0);
      setSlideProgress(0);
      setSelectedIds(new Set());
      setEvaluation(null);
      setPhase('MEMORIZE');

      // Play chime & speak first word
      playSlideChimeSound(settings.soundEffectsEnabled);
      if (settings.speechEnabled && settings.showImageNames) {
        speakWord(freshRound.memoryImages[0]?.speechLabel || '', true);
      }
    },
    [settings, sessionAccuracies]
  );

  // Slideshow progress and auto-advance in MEMORIZE phase
  useEffect(() => {
    if (phase !== 'MEMORIZE' || !round) return;

    const durationSec = currentLevel.displayDurationSec;
    const durationMs = durationSec * 1000;
    const intervalStepMs = 50;
    const progressIncrement = (intervalStepMs / durationMs) * 100;

    setSlideProgress(0);

    // Speak word for the current slide
    const currentItem = round.memoryImages[currentSlideIndex];
    if (currentItem && settings.speechEnabled && settings.showImageNames) {
      speakWord(currentItem.speechLabel, true);
    }

    slideProgressIntervalRef.current = setInterval(() => {
      setSlideProgress((prev) => Math.min(100, prev + progressIncrement));
    }, intervalStepMs);

    slideTimerRef.current = setTimeout(() => {
      if (slideProgressIntervalRef.current) clearInterval(slideProgressIntervalRef.current);

      if (currentSlideIndex < round.memoryImages.length - 1) {
        // Next image
        setCurrentSlideIndex((prev) => prev + 1);
        playSlideChimeSound(settings.soundEffectsEnabled);
      } else {
        // All images shown -> TRANSITION
        setTransitionCountdown(3);
        setPhase('TRANSITION');
        playTickSound(settings.soundEffectsEnabled);
      }
    }, durationMs);

    return () => {
      if (slideTimerRef.current) clearTimeout(slideTimerRef.current);
      if (slideProgressIntervalRef.current) clearInterval(slideProgressIntervalRef.current);
    };
  }, [phase, currentSlideIndex, round, currentLevel.displayDurationSec, settings]);

  // Transition countdown phase
  useEffect(() => {
    if (phase !== 'TRANSITION') return;

    transitionTimerRef.current = setInterval(() => {
      setTransitionCountdown((prev) => {
        if (prev <= 1) {
          if (transitionTimerRef.current) clearInterval(transitionTimerRef.current);
          setPhase('RECALL');
          // Initialize optional recall timer
          if (settings.recallTimeLimitSec > 0) {
            setRecallSecondsLeft(settings.recallTimeLimitSec);
          } else {
            setRecallSecondsLeft(null);
          }
          return 0;
        }
        playTickSound(settings.soundEffectsEnabled);
        return prev - 1;
      });
    }, 800);

    return () => {
      if (transitionTimerRef.current) clearInterval(transitionTimerRef.current);
    };
  }, [phase, settings.soundEffectsEnabled, settings.recallTimeLimitSec]);

  // Optional recall timer countdown
  useEffect(() => {
    if (phase !== 'RECALL' || recallSecondsLeft === null) return;

    if (recallSecondsLeft <= 0) {
      // Auto submit when time runs out
      submitRecall();
      return;
    }

    recallTimerRef.current = setInterval(() => {
      setRecallSecondsLeft((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      if (recallTimerRef.current) clearInterval(recallTimerRef.current);
    };
  }, [phase, recallSecondsLeft]);

  // Toggle card selection in RECALL phase
  const toggleCardSelection = useCallback(
    (cardId: string) => {
      if (phase !== 'RECALL') return;
      playCardTapSound(settings.soundEffectsEnabled);

      setSelectedIds((prev) => {
        const next = new Set(prev);
        if (next.has(cardId)) {
          next.delete(cardId);
        } else {
          next.add(cardId);
        }
        return next;
      });
    },
    [phase, settings.soundEffectsEnabled]
  );

  // Submit recall selection
  const submitRecall = useCallback(() => {
    if (!round) return;

    const evalResult = evaluateRecall(round.memoryImages, selectedIds, round.recallGrid);
    setEvaluation(evalResult);

    // Save to storage
    const updatedStats = saveGameResult(evalResult, currentLevel);
    setProgress(updatedStats);

    // Track session accuracies for adaptive mode
    setSessionAccuracies((prev) => [...prev, evalResult.accuracyPercentage]);

    setPhase('RESULT');

    // Victory sound and confetti
    playVictoryFanfare(settings.soundEffectsEnabled);
    if (evalResult.accuracyPercentage >= 70) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#38bdf8', '#fb7185', '#facc15', '#4ade80', '#c084fc'],
        });
      } catch {
        // Fallback
      }
    }
  }, [round, selectedIds, currentLevel, settings.soundEffectsEnabled]);

  // Play again on the same level
  const playAgain = useCallback(() => {
    startGame(currentLevel);
  }, [startGame, currentLevel]);

  // Advance to next level
  const nextLevel = useCallback(() => {
    const currentId = typeof currentLevel.id === 'number' ? currentLevel.id : 1;
    const nextIdx = PRESET_LEVELS.findIndex((l) => l.id === currentId + 1);
    if (nextIdx !== -1) {
      startGame(PRESET_LEVELS[nextIdx]);
    } else {
      // Loop or replay master
      startGame(PRESET_LEVELS[0]);
    }
  }, [startGame, currentLevel]);

  // Start custom level game
  const startCustomGame = useCallback(() => {
    const customLevel: GameLevel = {
      id: 'custom',
      name: 'Custom Game',
      tagline: 'Your personalized challenge!',
      stars: 3,
      memoryCount: customConfig.memoryCount,
      displayDurationSec: customConfig.displayDurationSec,
      gridCount: customConfig.gridCount,
      color: 'from-fuchsia-500 to-pink-500',
      badgeBg: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300',
      borderColor: 'border-fuchsia-300 hover:border-fuchsia-500',
    };

    startGame(customLevel);
  }, [customConfig, startGame]);

  return {
    phase,
    setPhase,
    settings,
    updateSettings,
    progress,
    currentLevel,
    round,
    currentSlideIndex,
    slideProgress,
    selectedIds,
    recallSecondsLeft,
    transitionCountdown,
    evaluation,
    isSettingsOpen,
    setIsSettingsOpen,
    isProgressOpen,
    setIsProgressOpen,
    customConfig,
    setCustomConfig,
    startGame,
    startCustomGame,
    toggleCardSelection,
    submitRecall,
    playAgain,
    nextLevel,
  };
}
