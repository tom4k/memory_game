'use client';

import React, { useState } from 'react';
import { ParentSettings } from '../lib/storage';
import { CATEGORIES, CategoryId } from '../data/images';
import { X, ShieldCheck, Check, Volume2, Mic, Lock, Zap } from 'lucide-react';

interface ParentSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ParentSettings;
  onSave: (settings: ParentSettings) => void;
}

export const ParentSettingsModal: React.FC<ParentSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave,
}) => {
  // Simple parent gate challenge: 7 + 6 = 13
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [gateAnswer, setGateAnswer] = useState('');
  const [gateError, setGateError] = useState(false);

  // Local draft state
  const [draft, setDraft] = useState<ParentSettings>(settings);

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (gateAnswer.trim() === '13' || gateAnswer.trim() === 'thirteen') {
      setIsUnlocked(true);
      setGateError(false);
    } else {
      setGateError(true);
    }
  };

  const handleToggleCategory = (catId: CategoryId) => {
    const current = new Set(draft.enabledCategories);
    if (current.has(catId)) {
      if (current.size <= 2) return; // keep at least 2 categories
      current.delete(catId);
    } else {
      current.add(catId);
    }
    setDraft({ ...draft, enabledCategories: Array.from(current) });
  };

  const handleSelectAllCategories = () => {
    setDraft({
      ...draft,
      enabledCategories: CATEGORIES.map((c) => c.id),
    });
  };

  const handleSaveAndClose = () => {
    onSave(draft);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="parent-settings-title"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border-4 border-purple-100 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-purple-200" />
            </div>
            <div>
              <h3 id="parent-settings-title" className="text-xl font-black">
                Parent Settings &amp; Controls
              </h3>
              <p className="text-xs text-purple-200 font-medium">
                Customize difficulty, categories, and sensory audio
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {!isUnlocked ? (
          /* Parent Gate */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-black text-slate-800">
                Adults Only Verification
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Please answer this quick math question to access parent settings:
              </p>
            </div>

            <form onSubmit={handleUnlock} className="max-w-xs mx-auto space-y-3">
              <div className="text-2xl font-black text-purple-900 bg-purple-50 py-3 rounded-2xl border border-purple-200">
                7 + 6 = ?
              </div>
              <input
                type="text"
                value={gateAnswer}
                onChange={(e) => {
                  setGateAnswer(e.target.value);
                  setGateError(false);
                }}
                placeholder="Enter answer"
                className="w-full text-center text-xl font-bold py-3 px-4 rounded-2xl border-2 border-slate-200 focus:border-purple-600 focus:outline-none"
                autoFocus
              />
              {gateError && (
                <p className="text-xs text-rose-500 font-bold">
                  Oops! That answer was incorrect. Try again!
                </p>
              )}
              <button
                type="submit"
                className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-extrabold rounded-2xl shadow-md transition-all active:scale-98"
              >
                Unlock Settings
              </button>
            </form>
          </div>
        ) : (
          /* Unlocked Settings Form */
          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Memorization Settings */}
            <section className="space-y-3">
              <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <span>🧠</span> Memorization Phase
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span>Default Memory Images</span>
                    <span className="text-indigo-600 font-black text-sm">
                      {draft.memoryCount}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={30}
                    value={draft.memoryCount}
                    onChange={(e) =>
                      setDraft({ ...draft, memoryCount: Number(e.target.value) })
                    }
                    className="w-full accent-indigo-600"
                  />
                  <span className="text-[11px] text-slate-400 block">
                    Range: 2 to 30 images
                  </span>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span>Seconds Per Image</span>
                    <span className="text-indigo-600 font-black text-sm">
                      {draft.displayDurationSec}s
                    </span>
                  </div>
                  <input
                    type="range"
                    min={3.0}
                    max={6.0}
                    step={0.5}
                    value={Math.max(3.0, draft.displayDurationSec)}
                    onChange={(e) =>
                      setDraft({ ...draft, displayDurationSec: Number(e.target.value) })
                    }
                    className="w-full accent-indigo-600"
                  />
                  <span className="text-[11px] text-slate-400 block">
                    3.0s (minimum) to 6.0s (relaxed)
                  </span>
                </div>
              </div>

              {/* Show/Hide Image Names */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-sm font-bold text-slate-800 block">
                    Show Object Names
                  </span>
                  <span className="text-xs text-slate-500">
                    Display text labels below images during slideshow
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setDraft({ ...draft, showImageNames: !draft.showImageNames })
                  }
                  className={`w-12 h-7 rounded-full transition-colors relative flex items-center p-1 cursor-pointer ${
                    draft.showImageNames ? 'bg-indigo-600' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      draft.showImageNames ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </section>

            {/* Recall Settings */}
            <section className="space-y-3">
              <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <span>🎯</span> Recall &amp; Selection
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span>Distractor Images</span>
                    <span className="text-indigo-600 font-black text-sm">
                      {draft.distractorCount}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={12}
                    value={draft.distractorCount}
                    onChange={(e) =>
                      setDraft({ ...draft, distractorCount: Number(e.target.value) })
                    }
                    className="w-full accent-indigo-600"
                  />
                  <span className="text-[11px] text-slate-400 block">
                    Extra distractor cards on screen
                  </span>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span>Recall Time Limit</span>
                    <span className="text-indigo-600 font-black text-sm">
                      {draft.recallTimeLimitSec === 0
                        ? 'Unlimited'
                        : `${draft.recallTimeLimitSec}s`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={60}
                    step={10}
                    value={draft.recallTimeLimitSec}
                    onChange={(e) =>
                      setDraft({ ...draft, recallTimeLimitSec: Number(e.target.value) })
                    }
                    className="w-full accent-indigo-600"
                  />
                  <span className="text-[11px] text-slate-400 block">
                    0 = No timer (recommended for young kids)
                  </span>
                </div>
              </div>
            </section>

            {/* Audio Settings */}
            <section className="space-y-3">
              <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <span>🔊</span> Audio &amp; Voice
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-indigo-600" />
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">
                        Sound Effects
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Chimes &amp; fanfare
                      </span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={draft.soundEffectsEnabled}
                    onChange={(e) =>
                      setDraft({ ...draft, soundEffectsEnabled: e.target.checked })
                    }
                    className="w-5 h-5 accent-indigo-600 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center gap-2">
                    <Mic className="w-5 h-5 text-purple-600" />
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">
                        Speech Voice
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Pronounce names
                      </span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={draft.speechEnabled}
                    onChange={(e) =>
                      setDraft({ ...draft, speechEnabled: e.target.checked })
                    }
                    className="w-5 h-5 accent-purple-600 cursor-pointer"
                  />
                </div>
              </div>
            </section>

            {/* Adaptive Mode */}
            <section className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between">
              <div className="space-y-0.5 max-w-sm">
                <div className="flex items-center gap-1.5 text-amber-900 font-bold text-sm">
                  <Zap className="w-4 h-4 fill-amber-500 text-amber-600" />
                  <span>Adaptive Difficulty</span>
                </div>
                <p className="text-xs text-amber-800">
                  Automatically adjusts difficulty up or down based on performance
                </p>
              </div>
              <input
                type="checkbox"
                checked={draft.adaptiveModeEnabled}
                onChange={(e) =>
                  setDraft({ ...draft, adaptiveModeEnabled: e.target.checked })
                }
                className="w-5 h-5 accent-amber-600 cursor-pointer"
              />
            </section>

            {/* Image Categories */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🎨</span> Active Categories ({draft.enabledCategories.length}/
                  {CATEGORIES.length})
                </h4>
                <button
                  type="button"
                  onClick={handleSelectAllCategories}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-700 underline"
                >
                  Select All
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CATEGORIES.map((cat) => {
                  const isChecked = draft.enabledCategories.includes(cat.id);
                  return (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => handleToggleCategory(cat.id)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all text-left cursor-pointer ${
                        isChecked
                          ? 'bg-purple-50 border-purple-300 text-purple-900'
                          : 'bg-white border-slate-200 text-slate-400 opacity-60'
                      }`}
                    >
                      <span className="text-base">{cat.icon}</span>
                      <span className="truncate flex-1">{cat.name}</span>
                      {isChecked && <Check className="w-3.5 h-3.5 text-purple-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-slate-600 font-bold text-sm hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveAndClose}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-sm shadow-md transition-all active:scale-98 cursor-pointer"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
