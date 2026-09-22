export interface GameLevel {
  id: number | 'custom';
  name: string;
  tagline: string;
  stars: number;
  memoryCount: number;
  displayDurationSec: number; // in seconds
  gridCount: number; // total images in recall grid (memory + distractors)
  color: string;
  badgeBg: string;
  borderColor: string;
}

export const PRESET_LEVELS: GameLevel[] = [
  {
    id: 1,
    name: 'Starter',
    tagline: 'Warm up your memory eyes!',
    stars: 1,
    memoryCount: 3,
    displayDurationSec: 4.0,
    gridCount: 6,
    color: 'from-emerald-400 to-teal-500',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    borderColor: 'border-emerald-200 hover:border-emerald-400',
  },
  {
    id: 2,
    name: 'Easy',
    tagline: 'Spot the familiar friends!',
    stars: 2,
    memoryCount: 4,
    displayDurationSec: 3.0,
    gridCount: 8,
    color: 'from-sky-400 to-blue-500',
    badgeBg: 'bg-sky-100 text-sky-800 border-sky-300',
    borderColor: 'border-sky-200 hover:border-sky-400',
  },
  {
    id: 3,
    name: 'Medium',
    tagline: 'A super memory adventurer!',
    stars: 3,
    memoryCount: 6,
    displayDurationSec: 2.5,
    gridCount: 12,
    color: 'from-amber-400 to-orange-500',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
    borderColor: 'border-amber-200 hover:border-amber-400',
  },
  {
    id: 4,
    name: 'Hard',
    tagline: 'Speedy brain champions!',
    stars: 4,
    memoryCount: 8,
    displayDurationSec: 2.0,
    gridCount: 16,
    color: 'from-purple-400 to-indigo-500',
    badgeBg: 'bg-purple-100 text-purple-800 border-purple-300',
    borderColor: 'border-purple-200 hover:border-purple-400',
  },
  {
    id: 5,
    name: 'Memory Master',
    tagline: 'The ultimate memory wizard!',
    stars: 5,
    memoryCount: 10,
    displayDurationSec: 1.5,
    gridCount: 20,
    color: 'from-rose-400 to-pink-600',
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
    borderColor: 'border-rose-200 hover:border-rose-400',
  },
];

export interface CustomLevelSettings {
  memoryCount: number;
  displayDurationSec: number;
  gridCount: number;
  selectedCategories: string[];
  showImageNames: boolean;
  recallTimeLimitSec: number; // 0 = no time limit
}

export const DEFAULT_CUSTOM_SETTINGS: CustomLevelSettings = {
  memoryCount: 5,
  displayDurationSec: 3.0,
  gridCount: 10,
  selectedCategories: [], // empty = all categories
  showImageNames: true,
  recallTimeLimitSec: 0,
};
