import React, { useEffect, useState, useRef } from 'react'
import FloatingParticles from './components/FloatingParticles'
import SetupScreen from './components/SetupScreen'
import GameScreen from './components/GameScreen'
import useSpeechSynthesis from './hooks/useSpeechSynthesis'
import { motion, AnimatePresence } from 'framer-motion'

export default function App() {
  const { voices } = useSpeechSynthesis()
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(null)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [started, setStarted] = useState(false)
  const [teamAName, setTeamAName] = useState('Team A')
  const [teamBName, setTeamBName] = useState('Team B')
  const [scoreA, setScoreA] = useState(0)
  const [scoreB, setScoreB] = useState(0)
  const scoreARef = useRef(scoreA)
  const scoreBRef = useRef(scoreB)

  useEffect(() => { scoreARef.current = scoreA }, [scoreA])
  useEffect(() => { scoreBRef.current = scoreB }, [scoreB])

  // load voices when they become available
  useEffect(() => {
    if (voices.length > 0 && selectedVoiceIndex === null) {
      // pick Indonesian if exists
      const idx = voices.findIndex(v => (v.lang || '').toLowerCase().includes('id'))
      setSelectedVoiceIndex(idx >= 0 ? idx : 0)
    }
  }, [voices])

  function speak(text) {
    if (!audioEnabled) return
    const utter = new SpeechSynthesisUtterance(text)
    if (voices[selectedVoiceIndex]) {
      utter.voice = voices[selectedVoiceIndex]
      utter.lang = voices[selectedVoiceIndex].lang || 'id-ID'
    }
    utter.rate = 0.85
    speechSynthesis.cancel()
    speechSynthesis.speak(utter)
  }

  function testVoice() {
    if (!voices[selectedVoiceIndex]) {
      alert('Pilih suara terlebih dahulu!')
      return
    }
    speak('Halo, ini adalah tes suara untuk pertandingan. Tim A nol, Tim B nol.')
  }

  function startGame(aName, bName) {
    setTeamAName(aName)
    setTeamBName(bName)
    setStarted(true)
    setTimeout(() => {
      if (audioEnabled) speak('Pertandingan dimulai! Semoga beruntung!')
    }, 800)
  }

  function addScore(team) {
    if (team === 'A') {
      setScoreA(s => s + 1)
      setTimeout(() => announceScore('A'), 200)
      playScoreSound('A', true)
    } else {
      setScoreB(s => s + 1)
      setTimeout(() => announceScore('B'), 200)
      playScoreSound('B', true)
    }
  }

  function subtractScore(team) {
    if (team === 'A') {
      setScoreA(s => Math.max(0, s - 1))
      setTimeout(() => announceScore('A'), 200)
      playScoreSound('A', false)
    } else {
      setScoreB(s => Math.max(0, s - 1))
      setTimeout(() => announceScore('B'), 200)
      playScoreSound('B', false)
    }
  }

  function announceScore(team) {
    if (!audioEnabled || !voices[selectedVoiceIndex]) return
    let text = ''
    const a = scoreARef.current
    const b = scoreBRef.current
    if (a === b) text = `Skor sama ${a}`
    else if (team === 'A') text = `${teamAName} ${a}, ${teamBName} ${b}`
    else text = `${teamBName} ${b}, ${teamAName} ${a}`
    speak(text)
  }

  function playScoreSound(team, isAdd = true) {
    if (!audioEnabled) return
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (!AudioContext) return
      const audioContext = new AudioContext()
      if (isAdd) {
        const frequencies = team === 'A' ? [800,1000,1200] : [600,800,1000]
        frequencies.forEach((freq, i) => {
          setTimeout(() => {
            const osc = audioContext.createOscillator()
            const gain = audioContext.createGain()
            osc.connect(gain); gain.connect(audioContext.destination)
            osc.frequency.setValueAtTime(freq, audioContext.currentTime)
            osc.type = 'sine'
            gain.gain.setValueAtTime(0.2, audioContext.currentTime)
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
            osc.start(audioContext.currentTime); osc.stop(audioContext.currentTime + 0.3)
          }, i * 100)
        })
      } else {
        const osc = audioContext.createOscillator()
        const gain = audioContext.createGain()
        osc.connect(gain); gain.connect(audioContext.destination)
        osc.frequency.setValueAtTime(400, audioContext.currentTime)
        osc.frequency.linearRampToValueAtTime(200, audioContext.currentTime + 0.5)
        osc.type = 'triangle'
        gain.gain.setValueAtTime(0.3, audioContext.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
        osc.start(audioContext.currentTime); osc.stop(audioContext.currentTime + 0.5)
      }
    } catch (e) {
      // ignore
    }
  }

  function resetGame() {
    setScoreA(0); setScoreB(0)
    setTimeout(() => {
      if (audioEnabled) speak('Skor telah direset ke nol')
    }, 400)
  }

  function newGame() {
    setScoreA(0); setScoreB(0)
    setStarted(false)
  }

  // keyboard shortcuts
  useEffect(() => {
    function onKey(e) {
      if (!started) return
      const key = e.key.toLowerCase()
      if (key === 'a') addScore('A')
      if (key === 'b') addScore('B')
      if (key === 'q') subtractScore('A')
      if (key === 'w') subtractScore('B')
      if (key === 'r') resetGame()
      if (key === 'm') toggleAudio()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [started, selectedVoiceIndex, audioEnabled])

  function toggleAudio() {
    setAudioEnabled(v => !v)
  }

  return (
    <div className="relative min-h-screen">
      <FloatingParticles />
      <AnimatePresence>
        {!started ? (
          <motion.div key="setup" initial={{opacity:0, scale:0.98}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.98}}>
            <SetupScreen
              onStart={startGame}
              voices={voices}
              selectedVoiceIndex={selectedVoiceIndex}
              setSelectedVoiceIndex={setSelectedVoiceIndex}
              audioEnabled={audioEnabled}
              testVoice={testVoice}
            />
          </motion.div>
        ) : (
          <motion.div key="game" initial={{opacity:0, scale:1.02}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:1.02}}>
            <GameScreen
              teamAName={teamAName}
              teamBName={teamBName}
              scoreA={scoreA}
              scoreB={scoreB}
              onAdd={addScore}
              onSubtract={subtractScore}
              onReset={resetGame}
              onNewGame={newGame}
              audioEnabled={audioEnabled}
              onToggleAudio={toggleAudio}
            />
            {/* keyboard info */}
            <div className="fixed bottom-4 right-4 glass-card p-3 rounded-lg text-xs text-white/80 max-w-xs hidden md:block">
              <div className="font-semibold mb-2">⌨️ Keyboard Shortcuts:</div>
              <div>A = +1 Team A | Q = -1 Team A</div>
              <div>B = +1 Team B | W = -1 Team B</div>
              <div>R = Reset | M = Toggle Audio</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
