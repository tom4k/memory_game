'use client';

import React from 'react';
import { CustomLevelSettings } from '../data/levels';
import { X, Play, Sliders, Clock, Eye, Check } from 'lucide-react';
import { CATEGORIES, CategoryId } from '../data/images';

interface CustomGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CustomLevelSettings;
  onChangeConfig: (config: CustomLevelSettings) => void;
  onStart: () => void;
}

export const CustomGameModal: React.FC<CustomGameModalProps> = ({
  isOpen,
  onClose,
  config,
  onChangeConfig,
  onStart,
}) => {
  if (!isOpen) return null;

  const handleToggleCategory = (catId: CategoryId) => {
    const current = new Set(config.selectedCategories);
    if (current.has(catId)) {
      current.delete(catId);
    } else {
      current.add(catId);
    }
    onChangeConfig({
      ...config,
      selectedCategories: Array.from(current),
    });
  };

  const handleSelectAllCategories = () => {
    onChangeConfig({
      ...config,
      selectedCategories: [], // empty means all categories
    });
  };

  const handleStart = () => {
    onStart();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="custom-game-title"
    >
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border-4 border-pink-100 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
              <Sliders className="w-6 h-6 text-pink-200" />
            </div>
            <div>
              <h3 id="custom-game-title" className="text-xl font-black">
                Custom Game Builder
              </h3>
              <p className="text-xs text-pink-100 font-medium">
                Set your own rules, speed, and cards!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close custom builder"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sliders & Controls */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Images to remember */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-sm font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <span>🧠</span> Pictures to Remember
              </span>
              <span className="text-xl font-black text-pink-600">
                {config.memoryCount}
              </span>
            </div>
            <input
              type="range"
              min={2}
              max={30}
              value={config.memoryCount}
              onChange={(e) => {
                const newMem = Number(e.target.value);
                onChangeConfig({
                  ...config,
                  memoryCount: newMem,
                  gridCount: Math.max(config.gridCount, newMem + 2),
                });
              }}
              className="w-full accent-pink-600"
            />
            <span className="text-[11px] text-slate-400 block">
              Choose between 2 and 30 pictures to memorize
            </span>
          </div>

          {/* Seconds per image */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-sm font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-500" /> Seconds Per Picture
              </span>
              <span className="text-xl font-black text-amber-500">
                {config.displayDurationSec}s
              </span>
            </div>
            <input
              type="range"
              min={3.0}
              max={6.0}
              step={0.5}
              value={Math.max(3.0, config.displayDurationSec)}
              onChange={(e) =>
                onChangeConfig({
                  ...config,
                  displayDurationSec: Number(e.target.value),
                })
              }
              className="w-full accent-amber-500"
            />
            <span className="text-[11px] text-slate-400 block">
              3.0s (minimum) to 6.0s (relaxed)
            </span>
          </div>

          {/* Total recall grid count */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-sm font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <span>🎲</span> Total Recall Puzzle Grid
              </span>
              <span className="text-xl font-black text-indigo-600">
                {config.gridCount}
              </span>
            </div>
            <input
              type="range"
              min={Math.max(4, config.memoryCount + 1)}
              max={60}
              value={Math.max(config.gridCount, config.memoryCount + 1)}
              onChange={(e) =>
                onChangeConfig({
                  ...config,
                  gridCount: Number(e.target.value),
                })
              }
              className="w-full accent-indigo-600"
            />
            <span className="text-[11px] text-slate-400 block">
              Includes all {config.memoryCount} memory cards +{' '}
              {Math.max(0, config.gridCount - config.memoryCount)} distractors
            </span>
          </div>

          {/* Show image names toggle */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-slate-600" /> Show Picture Names
              </span>
              <span className="text-xs text-slate-500">
                Display word under each picture during slides
              </span>
            </div>
            <button
              type="button"
              onClick={() =>
                onChangeConfig({
                  ...config,
                  showImageNames: !config.showImageNames,
                })
              }
              className={`w-12 h-7 rounded-full transition-colors relative flex items-center p-1 cursor-pointer ${
                config.showImageNames ? 'bg-pink-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  config.showImageNames ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Categories picker */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-600">
                Categories ({config.selectedCategories.length === 0 ? 'All' : config.selectedCategories.length})
              </span>
              <button
                type="button"
                onClick={handleSelectAllCategories}
                className="text-xs font-bold text-pink-600 hover:text-pink-700 underline"
              >
                Use All Categories
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => {
                const isSelected =
                  config.selectedCategories.length === 0 ||
                  config.selectedCategories.includes(cat.id);

                return (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => handleToggleCategory(cat.id)}
                    className={`flex items-center gap-2 p-2 rounded-xl border text-xs font-bold transition-all text-left cursor-pointer ${
                      isSelected
                        ? 'bg-pink-50 border-pink-300 text-pink-900'
                        : 'bg-white border-slate-200 text-slate-400 opacity-60'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span className="truncate flex-1">{cat.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-pink-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-2xl text-slate-600 font-bold text-sm hover:bg-slate-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleStart}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-black text-base shadow-lg shadow-pink-200 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Start Custom Round!</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
