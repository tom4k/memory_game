'use client';

import React from 'react';
import { Volume2, VolumeX, Sparkles, BarChart2, ShieldCheck, Home } from 'lucide-react';
import { ParentSettings } from '../lib/storage';

interface HeaderProps {
  settings: ParentSettings;
  onToggleSound: () => void;
  onOpenProgress: () => void;
  onOpenSettings: () => void;
  onGoHome: () => void;
  isHome: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  onToggleSound,
  onOpenProgress,
  onOpenSettings,
  onGoHome,
  isHome,
}) => {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b-2 border-indigo-100 shadow-sm sticky top-0 z-40 px-4 py-3 sm:px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Brand / Logo */}
        <button
          onClick={onGoHome}
          className="flex items-center gap-2.5 text-left group transition-transform active:scale-95 focus:outline-none"
          aria-label="Memory Explorer Home"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-amber-400 via-pink-500 to-indigo-500 flex items-center justify-center shadow-md shadow-pink-200 group-hover:rotate-6 transition-transform">
            <span className="text-xl sm:text-2xl" role="img" aria-label="brain">
              🧠
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-purple-700 via-pink-600 to-indigo-700 bg-clip-text text-transparent">
                Memory Explorer
              </span>
              <Sparkles className="w-4 h-4 text-amber-400 fill-amber-300 hidden sm:inline" />
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              Visual Memory Training for Kids
            </p>
          </div>
        </button>

        {/* Action controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {!isHome && (
            <button
              onClick={onGoHome}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
              title="Return to Home"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </button>
          )}

          {/* Sound toggle */}
          <button
            onClick={onToggleSound}
            aria-label={settings.soundEffectsEnabled ? 'Mute Sound' : 'Unmute Sound'}
            className={`p-2.5 rounded-xl border transition-all ${
              settings.soundEffectsEnabled
                ? 'bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100'
                : 'bg-slate-100 text-slate-400 border-slate-200 hover:bg-slate-200'
            }`}
            title={settings.soundEffectsEnabled ? 'Sound is ON' : 'Sound is OFF'}
          >
            {settings.soundEffectsEnabled ? (
              <Volume2 className="w-5 h-5" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </button>

          {/* Progress dashboard button */}
          <button
            onClick={onOpenProgress}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 text-indigo-700 font-bold text-xs sm:text-sm transition-colors shadow-xs"
            aria-label="Open Progress Tracker"
          >
            <BarChart2 className="w-4 h-4 text-indigo-600" />
            <span className="hidden sm:inline">Progress</span>
          </button>

          {/* Parent settings button */}
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 border border-purple-200 hover:bg-purple-100 text-purple-700 font-bold text-xs sm:text-sm transition-colors shadow-xs"
            aria-label="Open Parent Settings"
          >
            <ShieldCheck className="w-4 h-4 text-purple-600" />
            <span className="hidden sm:inline">Parents</span>
          </button>
        </div>
      </div>
    </header>
  );
};
