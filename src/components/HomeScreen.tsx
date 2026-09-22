'use client';

import React from 'react';
import { PRESET_LEVELS, GameLevel } from '../data/levels';
import { Star, Play, Settings, BarChart3, Sliders, Zap } from 'lucide-react';
import { ParentSettings } from '../lib/storage';

interface HomeScreenProps {
  onSelectLevel: (level: GameLevel) => void;
  onOpenCustom: () => void;
  onOpenProgress: () => void;
  onOpenSettings: () => void;
  settings: ParentSettings;
  onToggleAdaptive: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectLevel,
  onOpenCustom,
  onOpenProgress,
  onOpenSettings,
  settings,
  onToggleAdaptive,
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 sm:py-10 space-y-8 animate-fadeIn">
      {/* Playful Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 sm:p-10 text-white shadow-xl shadow-indigo-100">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wide">
            <span>✨</span> Daily Brain Adventure <span>🚀</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight drop-shadow-xs">
            How Good is Your Memory?
          </h1>
          <p className="text-indigo-100 font-medium text-base sm:text-lg leading-relaxed">
            Watch the pictures slide by, remember what you see, and find them in the puzzle grid!
          </p>

          {/* Quick Actions in Hero */}
          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenCustom}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-extrabold bg-white text-indigo-950 hover:bg-slate-50 shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-pink-600" />
              <span>🎯 Build Custom Game</span>
            </button>

            <button
              onClick={onToggleAdaptive}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95 cursor-pointer ${
                settings.adaptiveModeEnabled
                  ? 'bg-amber-300 text-amber-950 hover:bg-amber-200'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              <Zap className={`w-4 h-4 ${settings.adaptiveModeEnabled ? 'fill-amber-500 text-amber-600' : ''}`} />
              <span>
                Adaptive Mode: {settings.adaptiveModeEnabled ? 'ON (Auto Adjusts)' : 'OFF (Choose Level)'}
              </span>
            </button>
          </div>
        </div>

        {/* Floating playful background emojis */}
        <div className="absolute right-4 -bottom-6 opacity-25 text-8xl select-none pointer-events-none sm:opacity-35 sm:right-10 sm:-bottom-4">
          🐘
        </div>
        <div className="absolute right-36 top-4 opacity-20 text-6xl select-none pointer-events-none hidden sm:block">
          🍎
        </div>
        <div className="absolute right-64 bottom-6 opacity-20 text-5xl select-none pointer-events-none hidden md:block">
          🚀
        </div>
      </div>

      {/* Levels Selection Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
            <span>Choose Your Challenge</span>
            <span className="text-sm font-normal text-slate-500">Pick any level or build your own</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Custom Game Card - Displayed FIRST at the start */}
          <div className="relative bg-gradient-to-br from-fuchsia-50 via-pink-50 to-purple-50 rounded-3xl p-6 border-3 border-dashed border-pink-300 hover:border-pink-500 transition-all flex flex-col justify-between shadow-md hover:shadow-xl">
            <div className="space-y-3">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-pink-100 text-pink-800 border border-pink-300">
                Custom Mode
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight">
                  🎯 Custom Game
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Choose your own picture count, speeds, and rules!
                </p>
              </div>

              <div className="bg-white/80 rounded-2xl p-3 text-xs text-slate-600 font-semibold border border-pink-100 space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <span>🎨</span> Pick your favorite categories
                </div>
                <div className="flex items-center gap-1.5">
                  <span>⏱️</span> Set custom seconds &amp; cards
                </div>
                <div className="flex items-center gap-1.5">
                  <span>⏳</span> Optional recall time limit
                </div>
              </div>
            </div>

            <div className="pt-5">
              <button
                onClick={onOpenCustom}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 active:scale-98 text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-lg shadow-pink-200 transition-all cursor-pointer"
              >
                <Sliders className="w-5 h-5" />
                <span>Build Custom Game</span>
              </button>
            </div>
          </div>

          {/* Predefined Levels 1 to 5 */}
          {PRESET_LEVELS.map((lvl) => {
            return (
              <div
                key={lvl.id}
                className="group relative bg-white rounded-3xl p-6 border-3 border-slate-100 hover:border-indigo-300 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${lvl.badgeBg}`}
                    >
                      Level {lvl.id}
                    </span>

                    {/* Stars */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < lvl.stars
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">
                      {lvl.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {lvl.tagline}
                    </p>
                  </div>

                  {/* Level Specs Chips */}
                  <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-semibold text-slate-600">
                    <div className="bg-slate-50 rounded-xl p-2.5 text-center border border-slate-100">
                      <span className="block text-base font-black text-indigo-600">
                        {lvl.memoryCount}
                      </span>
                      <span>To Remember</span>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-2.5 text-center border border-slate-100">
                      <span className="block text-base font-black text-amber-500">
                        {lvl.displayDurationSec}s
                      </span>
                      <span>Each Picture</span>
                    </div>
                  </div>
                </div>

                <div className="pt-5">
                  <button
                    onClick={() => onSelectLevel(lvl)}
                    className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-98 text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 transition-all cursor-pointer"
                  >
                    <Play className="w-5 h-5 fill-white" />
                    <span>Play Level {lvl.id}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Child & Parent Shortcuts Bar */}
      <section className="bg-slate-50 rounded-3xl p-4 sm:p-6 border-2 border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-xl font-black">
            🏆
          </div>
          <div>
            <h4 className="font-extrabold text-slate-800 text-sm sm:text-base">
              Track Your Stars & Memory Growth
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              See high scores, recent rounds, and accuracy awards!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={onOpenProgress}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white border-2 border-slate-200 hover:border-indigo-400 font-extrabold text-xs sm:text-sm text-slate-700 flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <BarChart3 className="w-4 h-4 text-indigo-600" />
            <span>My Progress</span>
          </button>

          <button
            onClick={onOpenSettings}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white border-2 border-slate-200 hover:border-purple-400 font-extrabold text-xs sm:text-sm text-slate-700 flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <Settings className="w-4 h-4 text-purple-600" />
            <span>Parent Settings</span>
          </button>
        </div>
      </section>
    </div>
  );
};
