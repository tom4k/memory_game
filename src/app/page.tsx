'use client';

import React, { useState } from 'react';
import { useGame } from '../hooks/useGame';
import { Header } from '../components/Header';
import { HomeScreen } from '../components/HomeScreen';
import { MemorizeScreen } from '../components/MemorizeScreen';
import { TransitionScreen } from '../components/TransitionScreen';
import { RecallScreen } from '../components/RecallScreen';
import { ResultScreen } from '../components/ResultScreen';
import { ParentSettingsModal } from '../components/ParentSettingsModal';
import { ProgressModal } from '../components/ProgressModal';
import { CustomGameModal } from '../components/CustomGameModal';

export default function MemoryGameApp() {
  const {
    phase,
    setPhase,
    settings,
    updateSettings,
    progress,
    currentLevel,
    round,
    currentSlideIndex,
    slideProgress,
    selectedIds,
    recallSecondsLeft,
    transitionCountdown,
    evaluation,
    isSettingsOpen,
    setIsSettingsOpen,
    isProgressOpen,
    setIsProgressOpen,
    customConfig,
    setCustomConfig,
    startGame,
    startCustomGame,
    toggleCardSelection,
    submitRecall,
    playAgain,
    nextLevel,
  } = useGame();

  const [isCustomOpen, setIsCustomOpen] = useState(false);

  const handleToggleSound = () => {
    updateSettings({
      ...settings,
      soundEffectsEnabled: !settings.soundEffectsEnabled,
    });
  };

  const handleToggleAdaptive = () => {
    updateSettings({
      ...settings,
      adaptiveModeEnabled: !settings.adaptiveModeEnabled,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faff] bg-gradient-to-b from-indigo-50/80 via-purple-50/50 to-amber-50/60 text-slate-900 font-sans selection:bg-pink-300 selection:text-pink-900">
      {/* Universal Kid-Friendly Header */}
      <Header
        settings={settings}
        onToggleSound={handleToggleSound}
        onOpenProgress={() => setIsProgressOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onGoHome={() => setPhase('HOME')}
        isHome={phase === 'HOME'}
      />

      {/* Main Dynamic Game Container */}
      <main className="flex-1 flex flex-col items-center justify-start pb-12">
        {phase === 'HOME' && (
          <HomeScreen
            onSelectLevel={startGame}
            onOpenCustom={() => setIsCustomOpen(true)}
            onOpenProgress={() => setIsProgressOpen(true)}
            onOpenSettings={() => setIsSettingsOpen(true)}
            settings={settings}
            onToggleAdaptive={handleToggleAdaptive}
          />
        )}

        {phase === 'MEMORIZE' && round && (
          <MemorizeScreen
            currentImage={round.memoryImages[currentSlideIndex]}
            currentIndex={currentSlideIndex}
            totalImages={round.memoryImages.length}
            progressPercent={slideProgress}
            showImageNames={settings.showImageNames}
            levelName={currentLevel.name}
          />
        )}

        {phase === 'TRANSITION' && (
          <TransitionScreen countdown={transitionCountdown} />
        )}

        {phase === 'RECALL' && round && (
          <RecallScreen
            gridImages={round.recallGrid}
            selectedIds={selectedIds}
            onToggleCard={toggleCardSelection}
            onSubmit={submitRecall}
            targetCount={round.memoryImages.length}
            secondsLeft={recallSecondsLeft}
          />
        )}

        {phase === 'RESULT' && evaluation && (
          <ResultScreen
            evaluation={evaluation}
            level={currentLevel}
            onPlayAgain={playAgain}
            onNextLevel={nextLevel}
            onGoHome={() => setPhase('HOME')}
          />
        )}
      </main>

      {/* Child-Safe Footer */}
      <footer className="w-full py-4 text-center text-xs text-slate-400 font-medium border-t border-slate-100 bg-white/40">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>🧠 Memory Explorer • Designed with care for kids ages 5–9</span>
          <span className="text-[11px] text-slate-400">
            🔒 100% Private • No Ads • Local Device Only
          </span>
        </div>
      </footer>

      {/* Modals */}
      <ParentSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSave={updateSettings}
      />

      <ProgressModal
        isOpen={isProgressOpen}
        onClose={() => setIsProgressOpen(false)}
        progress={progress}
      />

      <CustomGameModal
        isOpen={isCustomOpen}
        onClose={() => setIsCustomOpen(false)}
        config={customConfig}
        onChangeConfig={setCustomConfig}
        onStart={startCustomGame}
      />
    </div>
  );
}
