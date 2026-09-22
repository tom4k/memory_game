'use client';

import React from 'react';
import { GameEvaluation } from '../lib/gameEngine';
import { GameLevel } from '../data/levels';
import { RotateCcw, ArrowRight, Home, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import { GameImage } from '../data/images';

interface ResultScreenProps {
  evaluation: GameEvaluation;
  level: GameLevel;
  onPlayAgain: () => void;
  onNextLevel: () => void;
  onGoHome: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  evaluation,
  level,
  onPlayAgain,
  onNextLevel,
  onGoHome,
}) => {
  const {
    correctCount,
    missedCount,
    wrongCount,
    totalMemory,
    accuracyPercentage,
    score,
    encouragement,
    correctItems,
    missedItems,
    wrongItems,
  } = evaluation;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Celebration Header Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 sm:p-10 text-white text-center shadow-xl shadow-indigo-100">
        <div className="relative z-10 space-y-3 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold">
            <span>Level {level.id}: {level.name}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            {encouragement}
          </h2>

          <p className="text-indigo-100 font-bold text-lg sm:text-2xl">
            You remembered{' '}
            <strong className="text-amber-300 underline decoration-wavy">
              {correctCount} out of {totalMemory}
            </strong>{' '}
            pictures!
          </p>

          <div className="pt-2 text-xs font-semibold text-indigo-200">
            Score: <span className="text-white font-extrabold text-base">{score}</span> pts
          </div>
        </div>
      </div>

      {/* Accuracy & Breakdown Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Accuracy Gauge */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border-3 border-indigo-100 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Accuracy
          </span>
          <span className="text-3xl sm:text-4xl font-black text-indigo-600 block mt-1">
            {accuracyPercentage}%
          </span>
          <span className="text-[11px] font-semibold text-slate-500">of selections</span>
        </div>

        {/* Correct Count */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border-3 border-emerald-100 shadow-sm text-center">
          <div className="flex items-center justify-center gap-1 text-emerald-600">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Correct</span>
          </div>
          <span className="text-3xl sm:text-4xl font-black text-emerald-600 block mt-1">
            {correctCount}
          </span>
          <span className="text-[11px] font-semibold text-slate-500">remembered</span>
        </div>

        {/* Missed Count */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border-3 border-amber-100 shadow-sm text-center">
          <div className="flex items-center justify-center gap-1 text-amber-600">
            <AlertCircle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Missed</span>
          </div>
          <span className="text-3xl sm:text-4xl font-black text-amber-600 block mt-1">
            {missedCount}
          </span>
          <span className="text-[11px] font-semibold text-slate-500">left behind</span>
        </div>

        {/* Wrong Selections */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border-3 border-rose-100 shadow-sm text-center">
          <div className="flex items-center justify-center gap-1 text-rose-500">
            <XCircle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Extra</span>
          </div>
          <span className="text-3xl sm:text-4xl font-black text-rose-500 block mt-1">
            {wrongCount}
          </span>
          <span className="text-[11px] font-semibold text-slate-500">not shown</span>
        </div>
      </div>

      {/* Visual Review Sections */}
      <div className="space-y-6">
        {/* 1. Correctly Remembered */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-emerald-100 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
              ✓
            </span>
            <h3 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight">
              You remembered correctly ({correctItems.length})
            </h3>
          </div>

          {correctItems.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {correctItems.map((item) => (
                <ItemCard key={item.id} item={item} status="correct" />
              ))}
            </div>
          ) : (
            <p className="text-sm font-semibold text-slate-400 italic">
              No items were matched this round. Let&apos;s try again!
            </p>
          )}
        </div>

        {/* 2. Missed Items */}
        {missedItems.length > 0 && (
          <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-amber-100 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                !
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight">
                You missed ({missedItems.length})
              </h3>
            </div>
            <p className="text-xs font-medium text-slate-500">
              These appeared in your slideshow, but were not picked:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {missedItems.map((item) => (
                <ItemCard key={item.id} item={item} status="missed" />
              ))}
            </div>
          </div>
        )}

        {/* 3. Not Shown / Incorrectly Selected */}
        {wrongItems.length > 0 && (
          <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-rose-100 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm">
                ✕
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight">
                These were not shown ({wrongItems.length})
              </h3>
            </div>
            <p className="text-xs font-medium text-slate-500">
              Sneaky distractors that were picked by mistake:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {wrongItems.map((item) => (
                <ItemCard key={item.id} item={item} status="wrong" />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <button
          onClick={onPlayAgain}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-300 font-extrabold text-slate-700 flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer text-base"
        >
          <RotateCcw className="w-5 h-5 text-slate-500" />
          <span>Play Again</span>
        </button>

        <button
          onClick={onNextLevel}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 transition-transform active:scale-95 cursor-pointer text-base"
        >
          <span>Next Level</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <button
          onClick={onGoHome}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 font-extrabold text-slate-700 flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer text-base"
        >
          <Home className="w-5 h-5 text-slate-500" />
          <span>Home</span>
        </button>
      </div>
    </div>
  );
};

function ItemCard({ item, status }: { item: GameImage; status: 'correct' | 'missed' | 'wrong' }) {
  const borderColors = {
    correct: 'border-emerald-300 bg-emerald-50/50',
    missed: 'border-amber-300 bg-amber-50/50',
    wrong: 'border-rose-300 bg-rose-50/50',
  };

  const badgeLabels = {
    correct: '✓ Found',
    missed: '! Missed',
    wrong: '✕ Extra',
  };

  const badgeColors = {
    correct: 'text-emerald-700 bg-emerald-100',
    missed: 'text-amber-800 bg-amber-100',
    wrong: 'text-rose-700 bg-rose-100',
  };

  return (
    <div
      className={`rounded-2xl p-3 border-2 ${borderColors[status]} flex flex-col items-center justify-center text-center`}
    >
      <span className="text-4xl" role="img" aria-label={item.name}>
        {item.emoji}
      </span>
      <span className="mt-1 font-bold text-xs text-slate-800 truncate w-full">
        {item.name}
      </span>
      <span className={`mt-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full ${badgeColors[status]}`}>
        {badgeLabels[status]}
      </span>
    </div>
  );
}
