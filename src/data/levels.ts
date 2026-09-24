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
    displayDurationSec: 5.0,
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
    displayDurationSec: 4.8,
    gridCount: 8,
    color: 'from-sky-400 to-blue-500',
    badgeBg: 'bg-sky-100 text-sky-800 border-sky-300',
    borderColor: 'border-sky-200 hover:border-sky-400',
  },
  {
    id: 3,
    name: 'Explorer',
    tagline: 'Stepping into the memory wild!',
    stars: 2,
    memoryCount: 5,
    displayDurationSec: 4.5,
    gridCount: 10,
    color: 'from-cyan-400 to-teal-500',
    badgeBg: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    borderColor: 'border-cyan-200 hover:border-cyan-400',
  },
  {
    id: 4,
    name: 'Medium',
    tagline: 'A super memory adventurer!',
    stars: 3,
    memoryCount: 6,
    displayDurationSec: 4.3,
    gridCount: 12,
    color: 'from-amber-400 to-orange-500',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
    borderColor: 'border-amber-200 hover:border-amber-400',
  },
  {
    id: 5,
    name: 'Keen Eye',
    tagline: 'Sharp focus and quick thinking!',
    stars: 3,
    memoryCount: 7,
    displayDurationSec: 4.0,
    gridCount: 14,
    color: 'from-orange-400 to-red-500',
    badgeBg: 'bg-orange-100 text-orange-800 border-orange-300',
    borderColor: 'border-orange-200 hover:border-orange-400',
  },
  {
    id: 6,
    name: 'Hard',
    tagline: 'Speedy brain champions!',
    stars: 4,
    memoryCount: 8,
    displayDurationSec: 3.8,
    gridCount: 16,
    color: 'from-purple-400 to-indigo-500',
    badgeBg: 'bg-purple-100 text-purple-800 border-purple-300',
    borderColor: 'border-purple-200 hover:border-purple-400',
  },
  {
    id: 7,
    name: 'Brain Champ',
    tagline: 'Lightning-fast recognition!',
    stars: 4,
    memoryCount: 9,
    displayDurationSec: 3.5,
    gridCount: 18,
    color: 'from-violet-400 to-purple-600',
    badgeBg: 'bg-violet-100 text-violet-800 border-violet-300',
    borderColor: 'border-violet-200 hover:border-violet-400',
  },
  {
    id: 8,
    name: 'Memory Master',
    tagline: 'The ultimate memory wizard!',
    stars: 5,
    memoryCount: 10,
    displayDurationSec: 3.3,
    gridCount: 20,
    color: 'from-rose-400 to-pink-600',
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
    borderColor: 'border-rose-200 hover:border-rose-400',
  },
  {
    id: 9,
    name: 'Grand Master',
    tagline: 'Elite photographic recall!',
    stars: 5,
    memoryCount: 12,
    displayDurationSec: 3.1,
    gridCount: 24,
    color: 'from-pink-500 to-rose-600',
    badgeBg: 'bg-pink-100 text-pink-800 border-pink-300',
    borderColor: 'border-pink-200 hover:border-pink-400',
  },
  {
    id: 10,
    name: 'Memory Legend',
    tagline: 'The legendary memory champion of all time!',
    stars: 5,
    memoryCount: 15,
    displayDurationSec: 3.0,
    gridCount: 30,
    color: 'from-yellow-400 via-amber-500 to-purple-600',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300 ring-2 ring-amber-300',
    borderColor: 'border-amber-300 hover:border-amber-500',
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
  displayDurationSec: 5.0,
  gridCount: 10,
  selectedCategories: [], // empty = all categories
  showImageNames: true,
  recallTimeLimitSec: 0,
};
