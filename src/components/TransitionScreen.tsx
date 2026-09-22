'use client';

import React from 'react';
import { Eye, Sparkles } from 'lucide-react';

interface TransitionScreenProps {
  countdown: number;
}

export const TransitionScreen: React.FC<TransitionScreenProps> = ({ countdown }) => {
  return (
    <div className="w-full max-w-xl mx-auto px-4 py-16 sm:py-24 flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-fadeIn">
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-amber-100 border-4 border-amber-300 text-amber-600 flex items-center justify-center shadow-xl animate-bounce">
        <Eye className="w-10 h-10 sm:w-12 sm:h-12" />
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-800">
          Ready? Find what you saw!
        </h2>
        <p className="text-base sm:text-lg font-semibold text-slate-500">
          Get ready to spot the pictures you just memorized!
        </p>
      </div>

      {/* Big animated countdown pill */}
      <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black text-2xl sm:text-3xl shadow-lg shadow-indigo-200 animate-pulse">
        <Sparkles className="w-6 h-6 text-amber-300 fill-amber-300" />
        <span>Starting in {countdown > 0 ? countdown : 'Go!'}</span>
      </div>
    </div>
  );
};
