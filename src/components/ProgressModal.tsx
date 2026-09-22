'use client';

import React from 'react';
import { ProgressStats } from '../lib/storage';
import { X, Trophy, Target, Star, Award, History } from 'lucide-react';
import { PRESET_LEVELS } from '../data/levels';

interface ProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: ProgressStats;
}

export const ProgressModal: React.FC<ProgressModalProps> = ({
  isOpen,
  onClose,
  progress,
}) => {
  if (!isOpen) return null;

  const {
    gamesPlayed,
    highestLevelCompleted,
    bestAccuracy,
    averageAccuracy,
    totalCorrectRecalls,
    levelStats,
    recentGames,
  } = progress;

  // Badges calculations
  const badges = [
    {
      id: 'first_game',
      name: 'Memory Scout',
      desc: 'Completed your 1st game round',
      icon: '🌱',
      unlocked: gamesPlayed >= 1,
    },
    {
      id: 'sharp_eye',
      name: 'Sharp Eye',
      desc: 'Achieved 85%+ accuracy in a round',
      icon: '🦅',
      unlocked: bestAccuracy >= 85,
    },
    {
      id: 'perfect_memory',
      name: 'Perfect Recall',
      desc: 'Achieved 100% accuracy in a round',
      icon: '⭐',
      unlocked: bestAccuracy === 100,
    },
    {
      id: 'explorer',
      name: 'Memory Explorer',
      desc: 'Played 5 or more game rounds',
      icon: '🚀',
      unlocked: gamesPlayed >= 5,
    },
    {
      id: 'level_master',
      name: 'Master Mind',
      desc: 'Unlocked Level 4 or higher',
      icon: '🏆',
      unlocked: highestLevelCompleted >= 4,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="progress-modal-title"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border-4 border-indigo-100 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-amber-300 fill-amber-300" />
            </div>
            <div>
              <h3 id="progress-modal-title" className="text-xl font-black">
                My Memory Growth &amp; Stars
              </h3>
              <p className="text-xs text-indigo-100 font-medium">
                Celebrating your practice and achievements!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close progress"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Top 4 Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Games Played
              </span>
              <span className="text-3xl font-black text-slate-800 block mt-1">
                {gamesPlayed}
              </span>
            </div>

            <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 text-center">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                Avg Accuracy
              </span>
              <span className="text-3xl font-black text-indigo-600 block mt-1">
                {averageAccuracy}%
              </span>
            </div>

            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 text-center">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-wider block">
                Best Score
              </span>
              <span className="text-3xl font-black text-amber-600 block mt-1">
                {bestAccuracy}%
              </span>
            </div>

            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 text-center">
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider block">
                Highest Level
              </span>
              <span className="text-3xl font-black text-emerald-600 block mt-1">
                {highestLevelCompleted > 0 ? `Lvl ${highestLevelCompleted}` : '—'}
              </span>
            </div>
          </div>

          {/* Badges Section */}
          <section className="space-y-3">
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Explorer Badges</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {badges.map((b) => (
                <div
                  key={b.id}
                  className={`p-3 rounded-2xl border flex items-center gap-3 transition-all ${
                    b.unlocked
                      ? 'bg-amber-50/70 border-amber-200 text-amber-950 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                  }`}
                >
                  <span className="text-3xl">{b.icon}</span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-black text-sm">{b.name}</span>
                      {b.unlocked && (
                        <span className="text-[10px] bg-amber-200 text-amber-800 px-1.5 py-0.2 rounded-full font-bold">
                          Unlocked
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-medium text-slate-500 block">
                      {b.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Level by Level Accuracy */}
          <section className="space-y-3">
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Target className="w-4 h-4 text-indigo-500" />
              <span>Level Accuracy Breakdown</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PRESET_LEVELS.map((lvl) => {
                const stat = levelStats[String(lvl.id)] || { games: 0, avgAccuracy: 0, bestScore: 0 };
                return (
                  <div
                    key={lvl.id}
                    className="bg-white p-3.5 rounded-2xl border-2 border-slate-100 flex items-center justify-between shadow-2xs"
                  >
                    <div>
                      <span className="font-extrabold text-sm text-slate-800">
                        Level {lvl.id} ({lvl.name})
                      </span>
                      <span className="text-xs text-slate-400 block">
                        {stat.games} round{stat.games === 1 ? '' : 's'} played
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="font-black text-base text-indigo-600">
                        {stat.avgAccuracy > 0 ? `${stat.avgAccuracy}%` : '—'}
                      </span>
                      <span className="text-[10px] text-slate-400 block font-semibold">
                        avg accuracy
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Recent 10 Games History */}
          <section className="space-y-3">
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <History className="w-4 h-4 text-purple-500" />
              <span>Recent Games (Last 10)</span>
            </h4>

            {recentGames.length === 0 ? (
              <div className="p-6 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-400 font-semibold text-sm">
                No games recorded yet! Play a round to start tracking.
              </div>
            ) : (
              <div className="space-y-2">
                {recentGames.map((game, idx) => (
                  <div
                    key={game.id || idx}
                    className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-800 text-sm block">
                        {game.levelName}
                      </span>
                      <span className="text-slate-500 font-medium">
                        Remembered {game.correctCount}/{game.totalMemory} • Missed{' '}
                        {game.missedCount} • Extra {game.wrongCount}
                      </span>
                    </div>

                    <div className="text-right">
                      <span
                        className={`font-black text-sm px-2.5 py-1 rounded-full ${
                          game.accuracyPercentage >= 80
                            ? 'bg-emerald-100 text-emerald-800'
                            : game.accuracyPercentage >= 60
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {game.accuracyPercentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Close button */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-sm cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
