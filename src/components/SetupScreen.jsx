import React, { useEffect, useState } from 'react'
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa'

export default function SetupScreen({ onStart, voices, selectedVoiceIndex, setSelectedVoiceIndex, audioEnabled, testVoice }) {
  const [teamA, setTeamA] = useState('Team A')
  const [teamB, setTeamB] = useState('Team B')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window._initialTeams = { teamA, teamB }
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      <div className="glass-card rounded-3xl p-8 shadow-2xl max-w-lg w-full transform hover:scale-105 transition-all duration-500">
        <h1 className="text-3xl font-bold text-center mb-8 setup-title glow-effect">
          ⚡ Setup Pertandingan
        </h1>

        {/* Form Input */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white/90 mb-3">🏆 Nama Team A</label>
            <input
              value={teamA}
              onChange={e => setTeamA(e.target.value)}
              placeholder="Masukkan nama Team A"
              className="glass-input w-full px-4 py-4 rounded-xl focus:ring-2 focus:ring-white/30 transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/90 mb-3">🎯 Nama Team B</label>
            <input
              value={teamB}
              onChange={e => setTeamB(e.target.value)}
              placeholder="Masukkan nama Team B"
              className="glass-input w-full px-4 py-4 rounded-xl focus:ring-2 focus:ring-white/30 transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/90 mb-3">🎤 Pilih Suara</label>
            <select
              value={selectedVoiceIndex ?? ''}
              onChange={e => setSelectedVoiceIndex(e.target.value)}
              className="voice-selector w-full px-4 py-4"
            >
              {voices.length === 0 && <option>Loading voices...</option>}
              {voices.map((v, i) => (
                <option key={i} value={i}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={() => testVoice()}
              className="glass-button flex-1 text-white py-4 px-6 rounded-xl font-semibold text-lg ripple-effect"
            >
              🔊 Test Suara
            </button>
            <button
              onClick={() => onStart(teamA || 'Team A', teamB || 'Team B')}
              className="glass-button flex-1 text-white py-4 px-6 rounded-xl font-semibold text-lg ripple-effect"
            >
              🚀 Mulai
            </button>
          </div>
        </div>

        {/* Credit Section */}
        <div className="mt-8 pt-5 border-t border-white/20 flex items-center justify-center gap-5 text-white/90 text-sm">
          <a
            href="https://instagram.com/husnimbrrk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-pink-400 transition"
          >
            <FaInstagram className="text-lg" /> @husnimbrrk
          </a>
          <a
            href="https://github.com/husnimr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-gray-300 transition"
          >
            <FaGithub className="text-lg" /> husnimr
          </a>
          <a
            href="https://linkedin.com/in/husnimubarokramadhan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-blue-400 transition"
          >
            <FaLinkedin className="text-lg" /> Husni Mubarok
          </a>
        </div>
      </div>
    </div>
  )
}
