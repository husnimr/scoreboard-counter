import React from 'react'

export default function GameScreen({
  teamAName, teamBName, scoreA, scoreB,
  onAdd, onSubtract, onReset, onNewGame,
  audioEnabled, onToggleAudio
}) {
  return (
    <div className="hidden min-h-screen flex flex-col" id="gameScreen" style={{display: 'flex'}}>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
        <div onClick={() => onAdd('A')} className="team-section team-a ripple-effect cursor-pointer flex flex-col items-center justify-center min-h-[50vh] md:min-h-full">
          <h2 id="teamADisplay" className="text-4xl md:text-6xl font-bold mb-8 score-text">{teamAName}</h2>
          <div className="orbitron text-8xl md:text-[12rem] font-black score-text" id="scoreA">{scoreA}</div>
          <div className="text-lg md:text-xl opacity-80 mt-4">Tap untuk +1</div>
        </div>

        <div onClick={() => onAdd('B')} className="team-section team-b ripple-effect cursor-pointer flex flex-col items-center justify-center min-h-[50vh] md:min-h-full">
          <h2 id="teamBDisplay" className="text-4xl md:text-6xl font-bold mb-8 score-text">{teamBName}</h2>
          <div className="orbitron text-8xl md:text-[12rem] font-black score-text" id="scoreB">{scoreB}</div>
          <div className="text-lg md:text-xl opacity-80 mt-4">Tap untuk +1</div>
        </div>
      </div>

      <div className="control-panel py-6">
        <div className="flex justify-center space-x-4 flex-wrap gap-2">
          <button onClick={() => onSubtract('A')} className="glass-button text-white px-4 py-3 rounded-xl font-semibold transition-all text-sm">➖ Team A</button>
          <button onClick={() => onSubtract('B')} className="glass-button text-white px-4 py-3 rounded-xl font-semibold transition-all text-sm">➖ Team B</button>
          <button onClick={() => onReset()} className="glass-button text-white px-6 py-3 rounded-xl font-semibold transition-all text-base">🔄 Reset</button>
          <button onClick={() => onNewGame()} className="glass-button text-white px-6 py-3 rounded-xl font-semibold transition-all text-base">🎮 Game Baru</button>
          <button id="audioToggle" onClick={() => onToggleAudio()} className={`glass-button text-white px-6 py-3 rounded-xl font-semibold transition-all text-base ${!audioEnabled ? 'audio-toggle-off' : ''}`}>{audioEnabled ? '🔊 Suara ON' : '🔇 Suara OFF'}</button>
        </div>
      </div>
    </div>
  )
}
