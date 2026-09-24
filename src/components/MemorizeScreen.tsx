'use client';

import React from 'react';
import { GameImage } from '../data/images';
import { Volume2 } from 'lucide-react';
import { speakWord } from '../lib/audio';
import { GameItemGraphic } from './GameItemGraphic';

interface MemorizeScreenProps {
  currentImage: GameImage;
  currentIndex: number;
  totalImages: number;
  progressPercent: number; // 0 to 100 for current slide
  showImageNames: boolean;
  levelName: string;
}

export const MemorizeScreen: React.FC<MemorizeScreenProps> = ({
  currentImage,
  currentIndex,
  totalImages,
  progressPercent,
  showImageNames,
  levelName,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 sm:py-14 flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6 animate-fadeIn">
      {/* Top Phase Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-xs tracking-wider uppercase">
          <span>🧠</span> {levelName} • Remember This!
        </div>
        <p className="text-sm font-semibold text-slate-500">
          Image {currentIndex + 1} of {totalImages}
        </p>
      </div>

      {/* Main Slideshow Card */}
      <div
        key={currentImage.id}
        className="w-full max-w-md aspect-square bg-gradient-to-br from-white to-slate-50 border-4 border-indigo-200 rounded-3xl shadow-2xl p-6 sm:p-10 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 transform scale-100 hover:scale-[1.01]"
      >
        {/* Glow ambient background based on item gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-tr ${currentImage.bgGradient} opacity-50 pointer-events-none`}
        />

        {/* Big visual object representation */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <GameItemGraphic
            item={currentImage}
            size="xl"
            className="transform transition-transform duration-300 hover:scale-110 cursor-pointer drop-shadow-md"
            onClick={() => speakWord(currentImage.speechLabel, true)}
          />

          {/* Name Label with pronounce button */}
          {showImageNames && (
            <div className="mt-6 flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
                {currentImage.name}
              </span>
              <button
                onClick={() => speakWord(currentImage.speechLabel, true)}
                className="p-2 rounded-xl bg-white/80 hover:bg-white text-indigo-600 shadow-sm border border-indigo-100 transition-transform active:scale-95"
                title="Hear name again"
                aria-label={`Pronounce ${currentImage.name}`}
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Slide Duration Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-2.5 bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-indigo-600 transition-all duration-75 ease-linear"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Progress Dots Track */}
      <div className="flex items-center justify-center gap-2 pt-2">
        {Array.from({ length: totalImages }).map((_, idx) => {
          const isCompleted = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          return (
            <div
              key={idx}
              className={`rounded-full transition-all duration-300 ${
                isCurrent
                  ? 'w-6 h-3 bg-indigo-600 shadow-sm shadow-indigo-300'
                  : isCompleted
                  ? 'w-3 h-3 bg-emerald-400'
                  : 'w-3 h-3 bg-slate-200'
              }`}
            />
          );
        })}
      </div>

      <p className="text-xs text-slate-400 font-medium">
        Relax and watch! It moves to the next picture automatically ✨
      </p>
    </div>
  );
};
