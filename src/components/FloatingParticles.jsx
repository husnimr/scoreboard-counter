import React, { useEffect } from 'react'

export default function FloatingParticles() {
  useEffect(() => {
    const container = document.getElementById('particles')
    if (!container) return
    container.innerHTML = ''
    for (let i = 0; i < 30; i++) {
      const div = document.createElement('div')
      div.className = 'particle'
      div.style.left = Math.random() * 100 + '%'
      div.style.top = Math.random() * 100 + '%'
      div.style.animationDelay = Math.random() * 20 + 's'
      div.style.animationDuration = (Math.random() * 15 + 15) + 's'
      container.appendChild(div)
    }
  }, [])

  return <div id="particles" className="floating-particles fixed inset-0 z-0" />
}
