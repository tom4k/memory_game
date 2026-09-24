'use client';

import React from 'react';
import { GameImage } from '../data/images';
import { Check, Clock, CheckCircle2 } from 'lucide-react';
import { GameItemGraphic } from './GameItemGraphic';

interface RecallScreenProps {
  gridImages: GameImage[];
  selectedIds: Set<string>;
  onToggleCard: (id: string) => void;
  onSubmit: () => void;
  targetCount: number;
  secondsLeft: number | null;
}

export const RecallScreen: React.FC<RecallScreenProps> = ({
  gridImages,
  selectedIds,
  onToggleCard,
  onSubmit,
  targetCount,
  secondsLeft,
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-3xl p-4 sm:p-6 border-3 border-indigo-100 shadow-sm">
        <div className="text-center sm:text-left space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight flex items-center justify-center sm:justify-start gap-2">
            <span>Which pictures did you see?</span>
            <span className="text-2xl" role="img" aria-label="thinking">
              🤔
            </span>
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-500">
            Tap all the pictures that were in the slideshow. You saw {targetCount} pictures!
          </p>
        </div>

        {/* Status badges */}
        <div className="flex items-center gap-3">
          {/* Optional timer */}
          {secondsLeft !== null && (
            <div
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl font-black text-sm border ${
                secondsLeft <= 5
                  ? 'bg-rose-100 text-rose-700 border-rose-300 animate-pulse'
                  : 'bg-amber-100 text-amber-800 border-amber-300'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{secondsLeft}s left</span>
            </div>
          )}

          {/* Selected count pill */}
          <div className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-indigo-50 border-2 border-indigo-200 text-indigo-800 font-extrabold text-sm sm:text-base shadow-xs">
            <CheckCircle2 className="w-5 h-5 text-indigo-600" />
            <span>
              Selected: <strong className="text-indigo-900">{selectedIds.size}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Cards */}
      {/* Desktop: 4-5 cols, Tablet: 3-4 cols, Mobile: 2-3 cols */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 select-none"
        role="group"
        aria-label="Picture recall selection grid"
      >
        {gridImages.map((item) => {
          const isSelected = selectedIds.has(item.id);

          return (
            <button
              key={item.id}
              onClick={() => onToggleCard(item.id)}
              aria-pressed={isSelected}
              aria-label={`${item.name}${isSelected ? ', selected' : ''}`}
              className={`relative group rounded-3xl p-4 sm:p-5 flex flex-col items-center justify-center transition-all duration-150 transform active:scale-95 cursor-pointer min-h-[130px] sm:min-h-[160px] ${
                isSelected
                  ? 'bg-white border-4 border-indigo-600 shadow-lg shadow-indigo-100 ring-4 ring-indigo-100 -translate-y-1'
                  : 'bg-white border-3 border-slate-100 hover:border-indigo-300 shadow-sm hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              {/* Checkmark Indicator */}
              <div
                className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white scale-100 shadow-xs'
                    : 'bg-slate-100 text-transparent scale-90 border border-slate-200 group-hover:border-indigo-200'
                }`}
              >
                <Check className="w-4 h-4 stroke-[3]" />
              </div>

              {/* Card visual graphic */}
              <GameItemGraphic
                item={item}
                size="md"
                className={`transition-transform duration-200 ${
                  isSelected ? 'scale-110' : 'group-hover:scale-105'
                }`}
              />

              {/* Object Name (same appearance for targets and distractors) */}
              <span
                className={`mt-2 font-bold text-xs sm:text-sm tracking-tight text-center ${
                  isSelected ? 'text-indigo-900' : 'text-slate-700'
                }`}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="sticky bottom-4 z-30 flex items-center justify-center pt-2">
        <button
          onClick={onSubmit}
          className="w-full sm:w-auto min-w-[240px] px-8 py-4 rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white font-black text-xl sm:text-2xl shadow-xl shadow-emerald-200/50 hover:shadow-2xl transition-all transform active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
        >
          <span>I&apos;m Done!</span>
          <span className="text-2xl">⭐</span>
        </button>
      </div>
    </div>
  );
};
